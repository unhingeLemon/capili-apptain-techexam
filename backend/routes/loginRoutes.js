import express from "express";
import bcrypt from "bcrypt";
import db from "../config/db.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// @route   POT api/auth/register
// @desc    register a user
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { username, password, nickname } = req.body;

    // CHECK IF DATA IS EXIST
    if (
      username === undefined ||
      password === undefined ||
      nickname === undefined ||
      username === null ||
      password === null ||
      nickname === null
    ) {
      res
        .status(400)
        .json({ error: "One or more required properties are missing." });
    } else {
      const userId = username;

      // Hash the password before inserting to DB
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) console.log(err);

        // Insert registered user into db
        const insertUserQuery = `
            INSERT INTO users (user_id, password,nickname )
            VALUES ('${userId}', '${hash}', '${nickname}');
        `;

        db.query(insertUserQuery, async (err, result) => {
          if (err) {
            console.error("Error inserting user:", err);
            res.status(400).json({ message: "Error inserting user: " + err });
          } else {
            console.log("User inserted successfully");

            // Register the new user to the sendbird API
            const sendBirdResult = await registerToSendBird(
              userId,
              nickname,
              req,
              res
            );
            if (sendBirdResult === undefined) {
              res.status(400).json({ message: "User Already Exist" });
            } else {
              // console.log(sendBirdResult);
              res.status(200).json({ message: "User inserted successfully" });
            }
          }
        });
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).sendStatus("Server Error");
  }
});

// @route   POST api/auth/login
// @desc    login a user
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if any of the required properties is undefined or null
    if (
      username === undefined ||
      password === undefined ||
      username === null ||
      password === null
    ) {
      res
        .status(400)
        .json({ error: "One or more required properties are missing." });
    } else {
      const userId = username;

      const selectUserQry = `
              SELECT * FROM users WHERE user_id='${userId}' ;
          `;

      await db.query(selectUserQry, (err, result) => {
        // Check if the user was found
        if (err || result.rowCount === 0) {
          console.error("Error login user:", err);
          res.status(400).json({ message: "Error login in user: " + err });
          return;
        } else {
          bcrypt.compare(
            password,
            result.rows[0].password,
            function (err, isMatch) {
              if (isMatch) {
                res
                  .status(200)
                  .json({ message: result.rows[0], isMatch: isMatch });
              } else {
                res
                  .status(200)
                  .json({ message: "Credential Error", isMatch: isMatch });
              }
            }
          );
        }
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).sendStatus("Server Error");
  }
});

const registerToSendBird = async (userId, nickname, req, res) => {
  try {
    // Access credentials:
    const apiUrl = process.env.SENDBIRD_API_URL;
    const API_KEY = process.env.SENDBIRD_API_TOKEN;

    // Required headers for sendbird
    const headers = {
      "Content-Type": "application/json",
      "Api-Token": API_KEY,
    };

    const jsonData = {
      user_id: userId,
      nickname: nickname,
      profile_url:
        "https://sendbird.com/main/img/profiles/profile_05_512px.png",
    };

    // Sendbird API only accept JSON on string
    const response = await axios.post(apiUrl, JSON.stringify(jsonData), {
      headers,
    });

    const apiData = response.data;

    return apiData;
  } catch (error) {
    console.error("Error making API call to sendbird:", error);
  }
};

export default router;

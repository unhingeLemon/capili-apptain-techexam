import express from "express";
import db from "../config/db.js";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const router = express.Router();

// @route   POST api/user/check
// @desc    Check if user exist
// @access  Public
router.post("/check", async (req, res) => {
  try {
    const { username } = req.body;

    // Check if any of the required properties is undefined or null
    if (username === undefined || username === null) {
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
          console.error("Check chatmate error:", err);
          res.status(404).json({ message: "Chatmate not found!: " + err });
          return;
        } else {
          res.status(200).json({ message: "user was found! " });
        }
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).sendStatus("Server Error");
  }
});

// @route   PUT api/user/update
// @desc    Update user nickname and profile URL
// @access  Public
router.put("/update", async (req, res) => {
  try {
    const { userId, profileUrl, nickname } = req.body;

    // Check if any of the required properties is undefined or null
    if (
      userId === undefined ||
      userId === null ||
      profileUrl === undefined ||
      profileUrl === null ||
      nickname === undefined ||
      nickname === null
    ) {
      res
        .status(400)
        .json({ error: "One or more required properties are missing." });
    } else {
      const updateUserQry = `
              UPDATE users 
              SET profile_url = '${profileUrl}', nickname = '${nickname}'
              WHERE user_id='${userId}';
          `;

      await db.query(updateUserQry, (err, result) => {
        if (err) {
          console.error("update user error:", err);
          res.status(404).json({ message: "update user error: " + err });
          return;
        } else {
          if (result.rowCount === 0) {
            res.status(404).json({ message: "404: User not found" });
          } else {
            res
              .status(200)
              .json({ message: result.rowCount + " User updated" });
          }
        }
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).sendStatus("Server Error");
  }
});

export default router;

import express from "express";
import bcrypt from "bcrypt";
import db from "../config/db.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// @route   POST api/channel/
// @desc    Add a channel
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { channel_url, created_by, chatmate, channel_name } = req.body;

    // CHECK IF DATA IS EXIST
    if (
      channel_url === undefined ||
      created_by === undefined ||
      chatmate === undefined ||
      channel_name === undefined ||
      channel_url === null ||
      created_by === null ||
      chatmate === null ||
      channel_name === null
    ) {
      res
        .status(400)
        .json({ error: "One or more required properties are missing." });
    } else {
      // INSERT CHANNEL OBJ TO CHANNEL TABLE
      const insertChannelQry = `INSERT INTO channel (channel_url, created_by, chatmate, channel_name )
          VALUES ('${channel_url}', '${created_by}', '${chatmate}' ,'${channel_name}');
      `;
      db.query(insertChannelQry, async (err, result) => {
        if (err) {
          console.error("Error inserting channel:", err);
          res.status(400).json({ message: "Error inserting channel: " + err });
        } else {
          console.log("channel inserted successfully");
          res.status(200).json({ message: "Channel inserted successfully" });
        }
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).sendStatus("Server Error");
  }
});

export default router;

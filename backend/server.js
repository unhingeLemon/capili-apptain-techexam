import express from "express";
import client from "./config/db.js";
const app = express();
const PORT = 8080;

app.listen(
  8080,
  console.log(`The server is running in port http://localhost:${PORT}/`)
);

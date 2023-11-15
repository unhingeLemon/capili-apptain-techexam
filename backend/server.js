import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import client from "./config/db.js";
import loginRoutes from "./routes/loginRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.NODE_ENV === "production" ? process.env.PORT : 8080;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/api/auth", loginRoutes);
app.use("/api/channel", channelRoutes);

app.listen(
  8080,
  console.log(`The server is running in port http://localhost:${PORT}/`)
);

import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

var client;

try {
  client = await pool.connect();
  const result = await client.query("SELECT 1");
  result ? console.log("Connected to DB!") : console.log("error connect to DB");
} catch (error) {
  console.error("Error executing query", error);
}

export default client;

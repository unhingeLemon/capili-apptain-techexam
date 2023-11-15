import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "chatApp",
  password: "password",
  port: 5432,
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

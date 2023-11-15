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

  client.release();
  console.log(result, "Connected!");
} catch (error) {
  console.error("Error executing query", error);
}

export default client;

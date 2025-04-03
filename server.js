const express = require("express");
const { Pool } = require("pg");

const app = express();

// PostgreSQL connection using environment variables
const pool = new Pool({
  user: process.env.DB_USER,          // Get value from environment variable
  host: process.env.DB_HOST,          // Get value from environment variable
  database: process.env.DB_NAME,      // You can define this in the ConfigMap if needed
  password: process.env.DB_PASSWORD,  // Get value from environment variable
  port: process.env.DB_PORT,          // Get value from environment variable
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).send("Database error");
  }
});

// Set server port from environment variable or fallback to 3000
const port = process.env.PORT || 3000;  // Use environment variable for port (optional)
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${port}`);
});

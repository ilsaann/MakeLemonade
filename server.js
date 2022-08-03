import express from "express";
import pg from "pg";
import { readFile } from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ...(process.env.NODE_ENV === "production"
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {}),
});

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.get("/stir", (req, res) => {
  pool.query("SELECT * FROM journal").then((result) => {
    res.send(result.rows);
  });
});

//app.post to get users into the user/ journal tables

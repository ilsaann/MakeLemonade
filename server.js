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

// app.get("/stir", (req, res) => {
//   pool.query("SELECT * FROM journal").then((result) => {
//     res.send(result.rows);
//   });
// });

//app.post to get users into the user/ journal tables

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//POST user to database//////////////////////////////////////////////////////////////////////////////

app.post("/", (req, res) => {
  const newUser = req.body;
  pool
    .query(
      "INSERT INTO users(username, email, userID) VALUES ($1, $2, $3) RETURNING *",
      [newUser.username, newUser.email, newUser.userID]
    )
    .then((res) => {
      console.log("success");
    })
    .catch((error) => {
      console.log("error");
    });
});

//app.post((users)=>{INSERT TO users (username,email,userID) VALUES (tempUser[0], tempUser[1], tempUser[2]) look to petshop for some quick help on how to write this correctly

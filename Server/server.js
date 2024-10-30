const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dangky",
});

app.get("/", (req, res) => {
  return res.json("From Backend Side");
});

app.get("/user/:email", (req, res) => {
  const email = req.params.email;
  const sql = "SELECT name FROM login WHERE email = ?";
  db.query(sql, [email], (err, data) => {
    if (err) {
      console.log("Error fetching user data:", err);
      return res.json("Error");
    } else {
      if (data.length > 0) {
        console.log("User data fetched successfully:", data[0]);
        return res.json(data[0]);
      } else {
        return res.json("User not found");
      }
    }
  });
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO login (name, email, password) VALUES (?,?,?)";
  const { name, email, password } = req.body;
  db.query(sql, [name, email, password], (err, data) => {
    if (err) {
      console.log("Error inserting data:", err);
      return res.json("Error");
    } else {
      console.log("Data inserted successfully:", data);
      return res.json(data);
    }
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
  const { email, password } = req.body;
  db.query(sql, [email, password], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Invalid Email or Password");
    }
  });
});

app.listen("8081", () => {
  console.log("Server is running on port 8081");
});

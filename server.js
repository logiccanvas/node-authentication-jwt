require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const posts = [
  {
    username: "Kashif",
    title: "Sr. Frontend Developer",
  },
  {
    username: "Abdul",
    title: "Web Designer",
  },
];

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.listen(3000);

function authenticateToken(req, res, next) {
  const authheader = req.headers["authorization"];
  const token = authheader && authheader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

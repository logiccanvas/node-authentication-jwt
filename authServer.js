require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

let refreshTokens = [];

app.post("/login", (req, res) => {
  const name = req.body.username;
  const user = { name };

  const refreshToken = generateAccessToken(user, "refresh", false);
  const accessToken = generateAccessToken(user);

  refreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
});

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) return res.sendStatus(401);

  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const _user = { name: user.name };

    const accessToken = generateAccessToken(_user);

    res.json({ accessToken });
  });
});

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);

  res.sendStatus(204);
});

app.listen(4000);

function generateAccessToken(user, tokenType = "access", expires = true) {
  const token =
    tokenType === "refresh"
      ? process.env.REFRESH_TOKEN_SECRET
      : process.env.ACCESS_TOKEN_SECRET;

  const expiresIn = expires ? { expiresIn: "30s" } : {};

  return jwt.sign(user, token, { ...expiresIn });
}

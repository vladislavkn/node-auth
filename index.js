const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const KEY = "secret_token";

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api", (req, res) => {
  res.json({
    message: "It is not protected route",
  });
});

const verify = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) res.sendStatus(403);
  req.token = bearerHeader.split(" ")[1];
  next();
};

app.post("/api/protected", verify, (req, res) => {
  jwt.verify(req.token, KEY, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    }
    res.json({
      message: "It is protected route",
      data,
    });
  });
});

app.post("/api/login", (req, res) => {
  const mockUser = {
    name: "John",
    email: "johndoe@gmail.com",
    _id: "fdgjo34j5435ko",
  };

  jwt.sign({ mockUser }, KEY, (err, token) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.json({
      message: "Successful",
      token,
    });
  });
});

app.listen(3000, () => console.log("[Server]: Started http://localhost:3000"));

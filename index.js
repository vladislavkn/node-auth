const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "It is not protected route",
  });
});

app.post("/api/protected", (req, res) => {
  res.json({
    message: "It is protected route",
  });
});

app.post("/api/login", (req, res) => {
  const mockUser = {
    name: "John",
    email: "johndoe@gmail.com",
    _id: "fdgjo34j5435ko",
  };

  jwt.sign({ mockUser }, "secretKey", (err, token) => {
    if (err) console.log(err);
    res.json({
      message: "Successful",
      token,
    });
  });
});

app.listen(3000, () => console.log("[Server]: Started http://localhost:3000"));

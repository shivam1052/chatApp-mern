import express from "express";

const route = express.Router();

//Signup route
route.post("/signup", (req, res) => {
  res.send("Signup page");
});

//Login route
route.post("/login", (req, res) => {
  res.send("Login page");
});

//Logout route
route.post("/logout", (req, res) => {
  res.send("Logout page");
});

export default route;

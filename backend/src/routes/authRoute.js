import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/authController.js";

const route = express.Router();

//Signup route
route.post("/signup", signup);

//Login route
route.post("/login", login);

//Logout route
route.get("/logout", logout);

//Update-profile route
route.post("/update-profile", updateProfile);

export default route;

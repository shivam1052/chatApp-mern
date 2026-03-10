import express from "express";
import { login, logout, signup } from "../controllers/authController.js";

const route = express.Router();

//Signup route
route.get("/signup", signup);

//Login route
route.get("/login", login);

//Logout route
route.get("/logout", logout);

export default route;

import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(400).json({ message: "Token is required!" });
    }

    const decode = jwt.verify(token, process.env.JWT_TOKEN);

    if (!decode) {
      res.status(401).json({ message: "Unauthorised or invalid token" });
    }
    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("checkAuth middleware error", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

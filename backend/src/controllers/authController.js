import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import createToken from "../lib/token.js";

export const signup = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    if (!username || !email || !password)
      return res.status(400).json({ message: "Please enter all fields!" });

    if (password.length < 5) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 5 characters long!" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    if (newUser) {
      createToken(newUser._id, res);
      res.status(201).json({ message: "User created successfully!", newUser });
    }
  } catch (error) {
    console.log("Signup failed!", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = (req, res) => {
  res.send("Login page");
};

export const logout = (req, res) => {
  res.send("Logout page");
};

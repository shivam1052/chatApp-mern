import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import createToken from "../lib/token.js";

//Signup controller
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

//Login controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      res.status(400).json({ message: "Incorrect password!" });
    }

    createToken(user._id, res);
    res.status(200).json({
      message: "User logged in successfully!",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Login error!", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Logout controller
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    console.log("Logout failed", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = (req, res) => {
  try {
  } catch (error) {
    console.log("Profile update failed", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

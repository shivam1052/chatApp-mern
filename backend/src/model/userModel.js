import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    profilepic: {
      type: String,
      default: "https://api.dicebear.com/9.x/avataaars/svg?seed=default",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;

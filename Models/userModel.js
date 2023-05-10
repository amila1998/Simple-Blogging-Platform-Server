const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      min: 6,
    },
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/amiladevin1998/image/upload/v1642784922/avatar/pic_1171831236_1_axiiom.png",
    },
  },
  { timestamp: true }
);

const User = model("User", userSchema);

module.exports = User;
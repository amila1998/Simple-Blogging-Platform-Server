const createToken = require("../Helpers/createToken");
const validateEmail = require("../Helpers/validateEmail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
require("dotenv").config();

const userController = {
  register: async (req, res) => {
    try {
      // get info
      const { name, email, password } = req.body;

      // check fields
      if (!name || !email || !password)
        return res.status(400).json({ msg: "Please fill in all fields." });

      // check email
      if (!validateEmail(email))
        return res
          .status(400)
          .json({ msg: "Please enter a valid email address." });

      // check user
      const user = await User.findOne({ email });
      if (user)
        return res
          .status(400)
          .json({ msg: "This email is already registered in our system." });

      // check password
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters." });

      // hash password
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      // add user
      const newUser = new User({
        name,
        email,
        password:hashPassword,
      });
      await newUser.save();

      // registration success
      res.status(200).json({ msg: "Your account has been activated, you can now sign in." });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  signing: async (req, res) => {
    try {
      // get cred
      const { email, password } = req.body;

      // check email
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "This email is not registered in our system." });

      // check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "This password is incorrect." });

      // refresh token
      const rf_token = createToken.refresh({ id: user._id });
      res.cookie("_apprftoken", rf_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 24h
      });

      // signing success
      res.status(200).json({ msg: "Signing success" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  access: async (req, res) => {
    try {
      // rf token
      const rf_token = req.cookies._apprftoken;
      if (!rf_token) return res.status(400).json({ msg: "Please sign in." });

      // validate
      jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please sign in again." });
        // create access token
        const ac_token = createToken.access({ id: user.id });
        // access success
        return res.status(200).json({ ac_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  info: async (req, res) => {
    try {
      // get info -password
      const user = await User.findById(req.user.id).select("-password");
      // return user
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  update: async (req, res) => {
    try {
      // get info
      const { name, avatar } = req.body;

      // update
      await User.findOneAndUpdate({ _id: req.user.id }, { name, avatar });
      // success
      res.status(200).json({ msg: "Update success." });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  signout: async (req, res) => {
    try {
      // clear cookie
      res.clearCookie("_apprftoken");
      //change the access token
      createToken.access({ id: "abc0" });
      createToken.refresh({ id: "abc0" });
      // success
      return res.status(200).json({ msg: "Signout success." });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

}

module.exports = userController;
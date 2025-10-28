// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // <-- 1. Import model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Tìm tất cả user
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.id });
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/sign-up", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/sign-in", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ message: "Email or password is invalid!!!" });

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Email or password is invalid!!!" });

  const token = jwt.sign(
    { _id: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

module.exports = router;

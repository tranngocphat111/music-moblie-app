// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // <-- 1. Import model
const bcrypt = require("bcrypt");
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

router.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      _id: req.body._id,
      user_id: req.body.user_id,
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

// Bạn có thể viết tiếp cho UPDATE (PUT) và DELETE
// ...

module.exports = router;

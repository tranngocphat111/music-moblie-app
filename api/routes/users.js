// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // <-- 1. Import model

// READ (GET) tất cả user
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Tìm tất cả user
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ (GET) một user theo ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.id }); // Tìm theo user_id
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE (POST) một user mới
router.post("/", async (req, res) => {
  const user = new User({
    _id: req.body._id,
    user_id: req.body.user_id,
    username: req.body.username,
    email: req.body.email,
    // ...thêm các trường khác
  });

  try {
    const newUser = await user.save(); // Lưu vào database
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Bạn có thể viết tiếp cho UPDATE (PUT) và DELETE
// ...

module.exports = router;
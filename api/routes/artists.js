// routes/artists.js
const express = require("express");
const router = express.Router();
const Artist = require("../models/Artist"); // Import model Artist

// GET: Lấy TẤT CẢ nghệ sĩ
router.get("/", async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Lấy MỘT nghệ sĩ bằng artist_id
router.get("/:id", async (req, res) => {
  try {
    // Dùng findOne với artist_id thay vì _id của Mongoose
    const artist = await Artist.findOne({ artist_id: req.params.id }); 
    if (artist == null) {
      return res.status(404).json({ message: "Không tìm thấy nghệ sĩ" });
    }
    res.json(artist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Tạo một nghệ sĩ mới
router.post("/", async (req, res) => {
  const artist = new Artist({
    _id: req.body._id,
    artist_id: req.body.artist_id,
    name: req.body.name,
    bio: req.body.bio,
    image_url: req.body.image_url,
    albums: req.body.albums
  });

  try {
    const newArtist = await artist.save();
    res.status(201).json(newArtist);
  } catch (err) {
    // 400 là lỗi do client (ví dụ: thiếu 'name', 'artist_id' bị trùng)
    res.status(400).json({ message: err.message });
  }
});

// (Bạn có thể tự viết tiếp cho PUT để update và DELETE)

module.exports = router;
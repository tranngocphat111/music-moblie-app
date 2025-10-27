// routes/songs.js
const express = require("express");
const router = express.Router();
const Song = require("../models/Song"); // Import model Song

// GET: Lấy TẤT CẢ bài hát
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find(); // Tìm tất cả bài hát
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Lấy MỘT bài hát bằng song_id
router.get("/:id", async (req, res) => {
  try {
    const song = await Song.findOne({ song_id: req.params.id });
    if (song == null) {
      return res.status(404).json({ message: "Không tìm thấy bài hát" });
    }
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Tạo một bài hát mới (bạn có thể dùng Postman để test)
router.post("/", async (req, res) => {
  const song = new Song({
    _id: req.body._id,
    song_id: req.body.song_id,
    title: req.body.title,
    duration: req.body.duration,
    image_url: req.body.image_url,
    audio_url: req.body.audio_url,
    artist: req.body.artist,
    album: req.body.album,
    lyric: req.body.lyric
  });

  try {
    const newSong = await song.save();
    res.status(201).json(newSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// (Bạn có thể tự viết tiếp cho PUT để update và DELETE)

module.exports = router;
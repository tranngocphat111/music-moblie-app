const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/artists.json");

// READ all artists
router.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  res.json(data);
});

// READ one artist
router.get("/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  const artist = data.find(a => a.id === parseInt(req.params.id));
  res.json(artist || {});
});

// CREATE artist
router.post("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  const newArtist = { id: Date.now(), ...req.body };
  data.push(newArtist);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.json(newArtist);
});

// UPDATE artist
router.put("/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  const index = data.findIndex(a => a.id === parseInt(req.params.id));
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.json(data[index]);
  } else {
    res.status(404).json({ message: "Artist not found" });
  }
});

// DELETE artist
router.delete("/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath));
  const newData = data.filter(a => a.id !== parseInt(req.params.id));
  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
  res.json({ message: "Deleted successfully" });
});

module.exports = router;

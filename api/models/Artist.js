// models/Artist.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema con cho album (lồng bên trong artist)
const AlbumInfoSchema = new Schema(
  {
    album_id: Number,
    title: String,
    release_date: String,
  },
  { _id: false }
); // Tắt _id cho schema con

// Schema chính cho Artist
const ArtistSchema = new Schema(
  {
    artist_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    bio: String,
    image_url: String,
    albums: [AlbumInfoSchema], // Một mảng chứa các album
  },
  { collection: "artists" }
); // Tên collection trong database

module.exports = mongoose.model("Artist", ArtistSchema);

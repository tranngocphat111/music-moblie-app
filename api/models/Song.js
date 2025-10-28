// models/Song.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Đây là các schema con (sub-documents)
// Chúng ta thêm { _id: false } để MongoDB không tự tạo _id cho chúng
const ArtistInfoSchema = new Schema({
    artist_id: Number,
    name: String
}, { _id: false });

const AlbumInfoSchema = new Schema({
    album_id: Number,
    title: String,
    release_date: String // Có thể dùng Date, nhưng String đơn giản hơn
}, { _id: false });

const LyricSchema = new Schema({
    time: Number,
    text: String
}, { _id: false });

// Đây là Schema chính cho Song
const SongSchema = new Schema({
    song_id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    duration: Number,
    image_url: String,
    audio_url: String,
    artist: ArtistInfoSchema, // Nhúng schema con vào
    album: AlbumInfoSchema,   // Nhúng schema con vào
    lyric: [LyricSchema]      // Mảng chứa các lyric
}, { collection: 'songs' }); // Tên collection trong database

module.exports = mongoose.model('Song', SongSchema);
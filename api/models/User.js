const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Đây là các schema cho các mảng lồng nhau
const SongSchema = new Schema({
    song_id: Number,
    title: String
});

const ListenHistorySchema = new Schema({
    song_id: Number,
    title: String,
    listened_at: Date
});

const PlaylistSchema = new Schema({
    playlist_id: Number,
    name: String,
    created_at: Date,
    songs: [SongSchema] // Mảng chứa các bài hát
});

// Đây là schema chính cho User
const UserSchema = new Schema({
    _id: String, // Dùng _id của bạn làm khóa chính
    user_id: { type: Number, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar_url: String,
    created_at: Date,
    playlists: [PlaylistSchema], // Mảng chứa các playlist
    favorite_songs: [SongSchema], // Mảng chứa các bài hát yêu thích
    listen_history: [ListenHistorySchema] // Mảng chứa lịch sử nghe
}, { collection: 'users' }); // Tên collection (bảng) trong database

// Tạo và export model
module.exports = mongoose.model('User', UserSchema);
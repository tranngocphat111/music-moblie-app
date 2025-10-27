// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// --- KẾT NỐI DATABASE (ĐÃ CÓ) ---
const dbUri = process.env.MONGODB_URI; 
mongoose.connect(dbUri)
  .then(() => console.log("Database connected successfully!"))
  .catch(err => console.error("Database connection error:", err));
// ---------------------------------

// === IMPORT CẢ 3 ROUTES ===
const artistsRoutes = require("./routes/artists");
const usersRoutes = require("./routes/users");
const songsRoutes = require("./routes/songs");

// === SỬ DỤNG CẢ 3 ROUTES ===
app.use("/api/artists", artistsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/songs", songsRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
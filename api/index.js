const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// import routes
const artistsRoutes = require("./routes/artists");
const usersRoutes = require("./routes/users");
const songsRoutes = require("./routes/songs");

app.use("/api/artists", artistsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/songs", songsRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

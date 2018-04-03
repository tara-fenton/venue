// USER MODEL !!! not used
const db = require("../database/index");

const Playlist = {};

// findAll
// Playlist.findAll = () => db.any("SELECT * FROM users ORDER BY id");
Playlist.findByPlaylist = username =>
  db.one("SELECT * FROM playlists WHERE user_name= $1", [username]);

// gonna have to check if the username was used already so that there is only one
// user per username

// create
Playlist.create = (data, hashPass) =>
  db.one(
    "INSERT INTO playlists (user_name, hashed_password) VALUES ($1, $2) RETURNING id",
    [data.username, hashPass]
  );

module.exports = Playlist;

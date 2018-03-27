// USER MODEL !!! not really used, but inserts into djs, will implement later
const { db } = require("../database/index");

const Dj = {};

// findAll
// Dj.findAll = () => db.any("SELECT * FROM users ORDER BY id");
Dj.findByDj = username =>
  db.one("SELECT * FROM djs WHERE user_name= $1", [username]);

// gonna have to check if the username was used already so that there is only one
// user per username

// create
Dj.create = (user, venue) =>
  db.one("INSERT INTO djs (user_id, venue_id) VALUES ($1, $2) RETURNING id", [
    user,
    venue
  ]);

module.exports = Dj;

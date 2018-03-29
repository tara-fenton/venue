// USER MODEL !!! this is my crud!!! :)
const db = require("../database/index");

const Venue = {};

// findOne
Venue.findByName = name =>
  db.one("SELECT * FROM venues WHERE name= $1", [name]);

// findOne
Venue.findById = id => db.one("SELECT * FROM venues WHERE id= $1", [id]);

// create CCCC
Venue.create = (name, playlistId) =>
  db.one("INSERT INTO venues (name, playlist_id) VALUES ($1, $2)", [
    name,
    playlistId
  ]);

// findAll RRRRR
Venue.findAll = () => db.any("SELECT * FROM venues ORDER BY id");

// edit UUUUUU
Venue.edit = venue =>
  db.one("UPDATE venues SET name = $1 WHERE id= $2 RETURNING id", [
    venue.venueName,
    venue.venueId
  ]);

// delete DDDDDDD
Venue.delete = id => db.result("DELETE FROM venues WHERE id = $1", [id]);

module.exports = Venue;

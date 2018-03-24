// USER MODEL !!!
const { db } = require("../database/index");

const Venue = {};

// findAll
Venue.findAll = () => db.any("SELECT * FROM venues ORDER BY id");

// findOne
Venue.findByUser = username =>
  db.one("SELECT * FROM users WHERE name= $1", [username]);

module.exports = Venue;

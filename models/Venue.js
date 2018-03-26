// USER MODEL !!!
const { db } = require("../database/index");

const Venue = {};

// findAll
Venue.findAll = () => db.any("SELECT * FROM venues ORDER BY id");

// findOne
Venue.findByName = name =>
  db.one("SELECT * FROM venues WHERE name= $1", [name]);

module.exports = Venue;

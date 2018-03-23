// USER MODEL !!!
const { db } = require("../database/index");

const Venue = {};

// findAll
Venue.findAll = () => db.any("SELECT * FROM venues ORDER BY id");

module.exports = Venue;

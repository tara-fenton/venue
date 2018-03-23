// USER MODEL !!!
const { db } = require("../database/index");

const User = {};

// findAll
// User.findAll = () => db.any("SELECT * FROM users ORDER BY id");
User.findByUser = username =>
  db.one("SELECT * FROM users WHERE name= $1", [username]);

// gonna have to check if the username was used already so that there is only one
// user per username

// create
User.create = (data, hashPass) =>
  db.one("INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id", [
    data.username,
    hashPass
  ]);

module.exports = User;

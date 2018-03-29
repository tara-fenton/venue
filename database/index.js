// Import pg-promise and initialize the library with an empty object.
const pgp = require("pg-promise")({});

let db;

if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  db = pgp({
    // Fill in with your local database name
    database: "venue_app",
    port: 5432,
    host: "localhost"
  });
} else if (process.env.NODE_ENV === "production") {
  // Heroku will set this variable for you.
  db = pgp(`${process.env.DATABASE_URL}`);
}

module.exports = db;

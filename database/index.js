// Import pg-promise and initialize the library with an empty object.
const pgp = require("pg-promise")({});

// Prepare the connection URL from the format: 'postgres://username:password@host:port/database';
const connectionURL = "postgres://localhost:5432/venue_app";

// Creating a new database connection with the provided URL.
const db = pgp(connectionURL);

module.exports = {
  db
};

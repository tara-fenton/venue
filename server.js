// Set up your server.js with the necessities ex: express, port, etc..
const express = require("express");

const app = express();
const PORT = 3000;

const bodyParser = require("body-parser");
const session = require("express-session");

// listen for port
app.listen(PORT, () => {
  // console.log(`Listening on ${PORT}`);
});

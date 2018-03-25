// Set up your server.js with the necessities ex: express, port, etc..
const express = require("express");

const app = express();
const PORT = 3000;

const bodyParser = require("body-parser");
const session = require("express-session");

// import models
const User = require("./models/User");
const Venue = require("./models/Venue");

const spotifyApp = require("./spotify-api");

app.use(spotifyApp);
const urlencodedParser = bodyParser.urlencoded({ extended: false });
require("es6-promise").polyfill();
require("isomorphic-fetch");

// styles sheets
app.use("/styles", express.static("styles"));
app.use("/images", express.static("images"));

// Set up the session middleware which will let use `request.session`
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);

// Require the bcrypt package
const bcrypt = require("bcrypt");

// Create a password salt
// const salt = bcrypt.genSaltSync(10);
// hardcoded salt for app
const salt = "$2a$10$XVZRCAmMi5REehBuXAV5l.";

// set view engine
app.set("view engine", "ejs");

// Middleware to check whether the user is authenticated.
const requireLogin = (request, response, next) => {
  if (!request.session.authenticated) {
    response.redirect("/login");
    return;
  }
  next();
};
app.get("/", requireLogin, (request, response) => {
  response.send(`<a href="/login/index">login</a>`);
});

let message = "";
// ///////////////////////////////////////////////////////// LOG IN ////////
// Render a login form for the user.
app.get("/login", (request, response) => {
  response.render("login", { message });
});
app.get("/spotify-login", (request, response) => {
  response.render("spotify-login");
});
// Login the user if their username and password are correct.
app.post("/login", urlencodedParser, (request, response) => {
  message = "";
  // Salt and hash password

  // get the username and password from database
  User.findByUser(request.body.username)
    .then(user => {
      // get password entered by user
      const passwordEnteredByUser = request.body.password;
      const hashedPasswordEnteredByUser = bcrypt.hashSync(
        passwordEnteredByUser,
        salt
      );
      const isMatch = hashedPasswordEnteredByUser === user.hashed_password;
      // check if username and hashed password match
      if (request.body.username === user.user_name && isMatch) {
        // Set the session data.
        request.session.authenticated = true;
        // response.redirect("/");
        response.render("spotify-login");
      } else {
        // password does not match
        message = "sorry password does not match with username";
        response.render("login", { message });
      }
    })
    .catch(error => {
      response.send(error);
    });
});
// ///////////////////////////////////////////////////////// SIGN UP ///////
// Render a signup form for the user.
app.get("/signup", (request, response) => {
  message = "";
  response.render("signup", { message });
});

// Sign up the user
app.post("/signup", urlencodedParser, (request, response) => {
  // get password entered by user
  const data = request.body;
  const passwordEnteredByUser = data.password;
  // Salt and hash password
  const passwordToSend = bcrypt.hashSync(passwordEnteredByUser, salt);
  // create new user in database with hashed password
  User.create(data, passwordToSend)
    .then(response.redirect("/"))
    .catch(error => {
      response.send(error);
    });
});
// /////////////////////////////////////////////////// VENUE LIST ////////
// Render a venue list page for the user to select a venue page to go to
app.get("/venue-list", (request, response) => {
  Venue.findAll().then(venues => {
    // store the access token in a session variable
    request.session.access_token = request.query.access_token;
    // render the list of venues
    response.render("venue-list", { venues });
  });
});
// https://api.spotify.com/v1/users/tarafenton/playlists
// /////////////////////////////////////////////////// VENUE PAGE ////////
const getReponseAsJSON = url => {
  return fetch(url).then(response => response.json());
};
// Render a venue page for the user to play
app.get("/venue/", (request, response) => {
  // get the venue name passed from the venue list page
  const venueName = request.query.venue;
  // get the json from the playlist api
  getReponseAsJSON(
    `https://api.spotify.com/v1/users/tarafenton/playlists/?access_token=${
      request.session.access_token
    }`
  ).then(data => {
    // render the venue page
    response.render("venue", { venueName, data });
  });
});
// /////////////////////////////////////////////////// PLAYLIST PAGE ////////

// Render a venue page for the user to play
app.get("/playlist/", (request, response) => {
  // get the venue name passed from the venue list page
  const playlistId = request.query.playlistId;
  // get the json from the playlist api
  getReponseAsJSON(
    `https://api.spotify.com/v1/users/tarafenton/playlists/${playlistId}?access_token=${
      request.session.access_token
    }`
  ).then(data => {
    console.log(data);
    // render the playlist page
    response.render("playlist", { data });
  });
});
// /////////////////////////////////////////////////// TRACK PAGE ////////

// Render a venue page for the user to play
app.get("/track/", (request, response) => {
  // get the venue name passed from the venue list page
  const trackId = request.query.trackId;
  // get the json from the playlist api
  getReponseAsJSON(
    `https://api.spotify.com/v1/tracks/${trackId}?access_token=${
      request.session.access_token
    }`
  ).then(data => {
    console.log(data);
    // render the playlist page
    response.render("track", { data });
  });
});
// //////////////////////////////////////////////////// LISTEN TO PORT ////
// listen for port
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

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

var SpotifyWebApi = require("spotify-web-api-node");

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: "cb37096286df46e7a1882448247c71ff",
  clientSecret: "1f0febc6b6534cd2b33e07b4119f4bd9",
  redirectUri: "http://localhost:8888/callback"
});
spotifyApi.setAccessToken(
  "BQD8-fNdQGGYb9o2OIFUICyg2kD45fJaRMJw41dKaSPX16URkKUCJ_EA57O-215iuqg2g3RC1iuQGa8kbGO4ZnCV0GGPe1LtwQHARchxuU_Rwfwb-SHAy647bgyVHmYk9J9RAx6e8aOUTBsbEHVBKBdjy0UqUKN46A&refresh_token=AQBmfXEu3xOP1FfMiZMczttl9D8-jf5VEEuL7glVzt7GA1RN6QwKhufbce2YF-Pj_zBPoqoiNb1YzMk4v2KkCWOkjC6zDuWxxx3h0MPBlTzqzcWfUR7JMADJjf7NAyKt04o"
);
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
    request.session.access_token = request.query.access_token;
    console.log(
      "request.query.access_token in venue list ",
      request.session.access_token
    );
    response.render("venue-list", { venues: venues });
    //response.json(venues);
  });
});
// https://api.spotify.com/v1/users/tarafenton/playlists
// /////////////////////////////////////////////////// VENUE PAGE ////////
const getReponseAsJSON = url => {
  return fetch(url).then(response => response.json());
};
// Render a venue page for the user to play
app.get("/venue/", (request, response) => {
  const venueName = request.query.venue;

  // console.log(access_token);
  // const sendData = { venue: venueName };
  getReponseAsJSON(
    `https://api.spotify.com/v1/users/tarafenton/playlists/?access_token=${
      request.session.access_token
    }`
  ).then(json => {
    console.log(json);
    response.render("venue", { venueName: venueName, data: json });
  });
  // fetch(
  //   `https://api.spotify.com/v1/users/tarafenton/playlists/?access_token=${
  //     request.session.access_token
  //   }`
  // )
  //   .then(data => {
  //     if (response.status >= 400) {
  //       throw new Error("Bad response from server");
  //     }
  //     console.log(data);
  //     response.render("venue", { venueName: venueName, data: data });
  //     // return response.json();
  //   })
  //   .catch(error => {
  //     response.send(error);
  //   });
});

// get users playlists
// Get a user's playlists
// spotifyApi.getUserPlaylists("tarafenton").then(
//   function(data) {
//     console.log("Retrieved playlists", data.body);
//     sendData.data = data.body;
//     response.render("venue", { venueName: venueName });
//   },
//   function(err) {
//     console.log("Something went wrong!", err);
//   }
// );

// Get Elvis' albums
// spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
//   function(data) {
//     sendData.data = data.body;
//     console.log("Artist albums", data.body);
//     response.render("venue", { sendData: sendData });
//   },
//   function(err) {
//     console.error(err);
//   }
// );

app.get("/playlist/", (request, response) => {
  const playlistId = request.query.playlistId;
  //const sendData = { venue: venueName };

  // get users playlists
  // Get a user's playlists
  // Get a playlist
  spotifyApi.getPlaylist("tarafenton", playlistId).then(
    function(data) {
      console.log("Some information about this playlist", data.body);

      response.render("venue", { sendData: data.body });
    },
    function(err) {
      console.log("Something went wrong!", err);
    }
  );
});
// //////////////////////////////////////////////////// LISTEN TO PORT ////
// listen for port
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

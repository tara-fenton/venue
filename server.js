// Set up your server.js with the necessities ex: express, port, etc..
const express = require("express");

const app = express();
const PORT = 3000;

const bodyParser = require("body-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

// import models
const User = require("./models/User");
const Venue = require("./models/Venue");
const Dj = require("./models/Dj");
// const Playlist = require("./models/Playlist");

// spotify log in - code from developer site
const spotifyApp = require("./spotify-api");

app.use(spotifyApp);
const urlencodedParser = bodyParser.urlencoded({ extended: false });
require("es6-promise").polyfill();
const fetch = require("isomorphic-fetch");

// styles sheets
app.use("/styles", express.static("styles"));
app.use("/images", express.static("images"));

// Set up the session middleware which will let use `request.session`
app.use(
  session({
    store: new FileStore(),
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
        request.session.venueUserId = user.id;
        // response.json(user);
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
// /////////////////////////////////////////////////// GET JSON //////////
const getReponseAsJSON = url => {
  return fetch(url).then(response => response.json());
};
// /////////////////////////////////////////////////// VENUE LIST ////////
// Render a venue list page for the user to select a venue page to go to
app.get("/venue-list", (request, response) => {
  // store the access token in a session variable
  if (!request.session.access_token) {
    request.session.access_token = request.query.access_token;
  }
  // get the json from the spotify user
  getReponseAsJSON(
    `https://api.spotify.com/v1/me?access_token=${request.session.access_token}`
  ).then(data => {
    // response.json(data);
    request.session.spotifyId = data.id;

    Venue.findAll().then(venues => {
      // render the list of venues
      response.render("venue-list", { venues });
    });
  });
});

// /////////////////////////////////////////////////// VENUE PAGE ////////
// Render a venue page for the user to play
app.get("/venue/", (request, response) => {
  // get the venue name passed from the venue list page
  const venueName = request.query.venue;
  // render the venue page
  Venue.findByName(venueName)
    .then(venue => {
      request.session.venueId = venue.id;
      //response.render("venue", { venue });
      getReponseAsJSON(
        `https://api.spotify.com/v1/users/${
          request.session.spotifyId
        }/playlists/${venue.playlist_id}?access_token=${
          request.session.access_token
        }`
      ).then(data => {
        console.log(data);
        // render the playlist page
        //response.json(data);
        response.render("venue", { data, venueName });
      });
    })
    .catch();
});
// /////////////////////////////////////////////////// DJ PAGE ////////
// Render a venue page for the user to play
app.get("/dj/", (request, response) => {
  const venueName = request.query.venue;
  // get the venue name passed from the venue list page
  // next and previous functionality
  let justOffSet = 0;
  if (
    request.query.nextUrl !== undefined &&
    request.query.nextUrl !== null &&
    request.query.nextUrl !== ""
  ) {
    const offSetUrl = request.query.nextUrl;
    justOffSet = offSetUrl.slice(offSetUrl.indexOf("?") + 8);
  }
  const spotifyUserName = request.session.spotifyId;
  // const venueName = request.query.venue;
  // get the json from the playlist api
  getReponseAsJSON(
    `https://api.spotify.com/v1/users/${
      request.session.spotifyId
    }/playlists/?offset=${justOffSet}&access_token=${
      request.session.access_token
    }`
  ).then(data => {
    response.render("dj", { data, spotifyUserName, venueName });
    // response.json(data);
    Dj.create(request.session.venueUserId, request.session.venueId).then({
      // render the venue page
    });
  });
});

// /////////////////////////////////////////////////// PLAYLIST PAGE ////////
// Render a venue page for the user to play
app.get("/playlist/", (request, response) => {
  // get the venue name passed from the venue list page
  const playlistId = request.query.playlistId;
  const playlistName = request.query.playlistName;
  const venueName = request.query.venue;
  // get the json from the playlist api
  getReponseAsJSON(
    `https://api.spotify.com/v1/users/${
      request.session.spotifyId
    }/playlists/${playlistId}?access_token=${request.session.access_token}`
  ).then(data => {
    console.log(data);
    // render the playlist page
    //response.json(data);
    response.render("playlist", { data, playlistName, venueName });
  });
});
// /////////////////////////////////////////////////// CREATE PLAYLIST ////////
// fetch request to create a playlist
app.post("/createPlaylist", urlencodedParser, (request, response) => {
  const token = request.session.access_token;
  const data = {
    name: "New Playlist",
    description: "New playlist description",
    public: false
  };

  fetch(
    `https://api.spotify.com/v1/users/${request.session.spotifyId}/playlists`,
    {
      body: JSON.stringify(data), // must match 'Content-Type' header

      headers: {
        Authorization: `Bearer ${request.session.access_token}`,
        "content-type": "application/json"
      },

      method: "POST" // *GET, POST, PUT, DELETE, etc.
    }
  )
    .then(apiResponse => apiResponse.json())
    .then(json => response.render("playlistAdded", json)); // parses response to JSON
});
// /////////////////////////////////////////////////// ADD TO PLAYLIST ////////
// fetch request to add to a playlist
app.post("/addToPlaylist", urlencodedParser, (request, response) => {
  //  https://api.spotify.com/v1/users/{user_id}/playlists/{playlist_id}/tracks
  const venueName = request.query.venue;
  const trackId = request.query.trackId;
  Venue.findByName(venueName).then(venue => {
    // get the playlist id stored in venues table in database
    const playlistId = venue.playlist_id;
    // fetch spotify api to add tracks to venue playlist
    fetch(
      `https://api.spotify.com/v1/users/${
        request.session.spotifyId
      }/playlists/${playlistId}/tracks?uris=spotify:track:${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${request.session.access_token}`,
          "content-type": "application/json"
        },
        method: "POST" // *GET, POST, PUT, DELETE, etc.
      }
    )
      .then(apiResponse => apiResponse.json())
      .then(json => response.render("trackAdded", json)); // parses response to JSON
  });
});
// /////////////////////////////////////////////////// TRACK PAGE ////////
// Render a venue page for the user to play
app.get("/track/", (request, response) => {
  // get the venue name passed from the venue list page
  const trackId = request.query.trackId;
  const token = request.session.access_token;
  const venueName = request.query.venue;
  // get the json from the playlist api
  getReponseAsJSON(
    `https://api.spotify.com/v1/tracks/${trackId}?access_token=${token}`
  ).then(data => {
    console.log(data);
    // render the playlist page
    // response.json(data);
    response.render("track", { data, token, venueName });
  });
});
// //////////////////////////////////////////////////// LISTEN TO PORT ////
// listen for port
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

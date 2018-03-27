/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require("express"); // Express web server framework
var request = require("request"); // "Request" library
var querystring = require("querystring");
var cookieParser = require("cookie-parser");

var client_id = "cb37096286df46e7a1882448247c71ff"; // Your client id
var client_secret = "1f0febc6b6534cd2b33e07b4119f4bd9"; // Your secret
var redirect_uri = "http://localhost:3000/callback"; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = "spotify_auth_state";

var app = express();

app.use(express.static(__dirname + "/public")).use(cookieParser());
// app.use(cookieParser);

app.get("/spotify-login", function(req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope =
    "user-read-private user-read-email playlist-read-collaborative user-library-read playlist-modify-public playlist-modify-private playlist-read-private";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  );
});
//curl -X "POST" "https://api.spotify.com/v1/users/tarafenton/playlists" --data "{\"name\":\"New Playlist\",\"description\":\"New playlist description\",\"public\":false}" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQBQXc8qYOVtgMYu-Bejwis0YzbE1kBdugMnUYg9VQm-Y2rlDLmWU4ouJQrrcFNkD6RyujQXq_311X3gcbv9QIW9nKSxM6MMrgAsVJoiPSu3kFdnCEQB19jnSmUW-BLAFmVH4k_f2OOo-djIhVP0CRf5APEi4GtSpbLA6T5MUfif7guySECqHExIlK9nh4L-pDfUd_u_lEOG"
app.get("/callback", (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch"
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code"
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64")
      },
      json: true
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let access_token = body.access_token,
          refresh_token = body.refresh_token;

        let options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: `Bearer ${access_token}` },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log("this is the body ", body);
          // request.session.token = access_token;
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          "/venue-list?" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            })
        );
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token"
            })
        );
      }
    });
  }
});

app.get("/refresh_token", function(req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64")
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token
      });
    }
  });
});
module.exports = app;
// console.log("Listening on 3000");
// app.listen(3000);

/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

const express = require("express"); // Express web server framework
const request = require("request"); // "Request" library
const querystring = require("querystring");
const cookieParser = require("cookie-parser");

const client_id = "cb37096286df46e7a1882448247c71ff"; // Your client id
const client_secret = "1f0febc6b6534cd2b33e07b4119f4bd9"; // Your secret
const redirect_uri = "https://rocky-chamber-28173.herokuapp.com/callback"; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = length => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";

const app = express();

app.use(express.static(`${__dirname}/public`)).use(cookieParser());
// app.use(cookieParser);

app.get("/spotify-login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope =
    "user-read-private user-read-email playlist-read-collaborative user-library-read playlist-modify-public playlist-modify-private playlist-read-private";
  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: "code",
      client_id,
      scope,
      redirect_uri,
      state
    })}`
  );
});
// curl -X "POST" "https://api.spotify.com/v1/users/tarafenton/playlists" --data "{\"name\":\"New Playlist\",\"description\":\"New playlist description\",\"public\":false}" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQBQXc8qYOVtgMYu-Bejwis0YzbE1kBdugMnUYg9VQm-Y2rlDLmWU4ouJQrrcFNkD6RyujQXq_311X3gcbv9QIW9nKSxM6MMrgAsVJoiPSu3kFdnCEQB19jnSmUW-BLAFmVH4k_f2OOo-djIhVP0CRf5APEi4GtSpbLA6T5MUfif7guySECqHExIlK9nh4L-pDfUd_u_lEOG"
app.get("/callback", (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      `/#${querystring.stringify({
        error: "state_mismatch"
      })}`
    );
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code,
        redirect_uri,
        grant_type: "authorization_code"
      },
      headers: {
        Authorization: `Basic ${new Buffer(
          `${client_id}:${client_secret}`
        ).toString("base64")}`
      },
      json: true
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        const options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: `Bearer ${access_token}` },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, (error, response, body) => {
          console.log("this is the body ", body);
          // request.session.token = access_token;
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          `/venue-list?${querystring.stringify({
            access_token,
            refresh_token
          })}`
        );
      } else {
        res.redirect(
          `/#${querystring.stringify({
            error: "invalid_token"
          })}`
        );
      }
    });
  }
});

app.get("/refresh_token", (req, res) => {
  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization: `Basic ${new Buffer(
        `${client_id}:${client_secret}`
      ).toString("base64")}`
    },
    form: {
      grant_type: "refresh_token",
      refresh_token
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        access_token
      });
    }
  });
});
module.exports = app;
// console.log("Listening on 3000");
// app.listen(3000);

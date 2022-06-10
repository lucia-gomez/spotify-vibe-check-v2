const express = require('express');
const cors = require('cors');
const path = require('path');
const request = require('request');
const querystring = require('querystring');
const spotifyWebApi = require('spotify-web-api-node');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors()).use(express.json()).use(cookieParser());

const port = process.env.PORT || 8000;
const spotifyApi = new spotifyWebApi();

const clientId = "38632b26273a47e28539a2b34468d660";
const clientSecret = "e9c85b9cd03a4cd7a2ea1fd3b56b9a97";
const scopes = [
  "user-read-private",
  "playlist-read-private",
  "playlist-read-collaborative",
];

const isDev = process.env.NODE_ENV !== 'production';
const liveUrl = "https://spotify-vibe-check.herokuapp.com";
const redirectUri = isDev ? "http://localhost:8000/callback" : + '/callback';
const clientUrl = isDev ? "http://localhost:3000" : liveUrl;

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.post('/login', (req, res) => {
  const authUrl = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: clientId,
      scope: scopes.join('%20'),
      redirect_uri: redirectUri,
    });
  res.status(200).send(authUrl);
});

app.get('/callback', (req, res) => {
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: req.query.code || null,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = response.body.access_token,
        refresh_token = response.body.refresh_token;

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      res.redirect(clientUrl + "/token?" +
        querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token
        }));
    } else {
      res.redirect(clientUrl);
    }
  });
});

app.get('/refresh_token', function (req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

app.get('/logout', (req, res) => {

});

app.get('/user', (req, res) => {
  spotifyApi.getMe().then(response => res.status(200).send(response));
});

app.get('/playlists', async (req, res) => {
  let playlists = [];
  let data = null;
  let i = 0;
  try {
    do {
      data = await spotifyApi.getUserPlaylists({ limit: 50, offset: 50 * i++ });
      playlists = playlists.concat(data.body.items)
    } while (data.body.next !== null);
    res.status(200).send(playlists);
  } catch (ex) {
    res.status(400);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
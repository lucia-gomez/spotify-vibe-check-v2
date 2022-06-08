const express = require('express');
const cors = require('cors');
const path = require('path');
const querystring = require('querystring');
const spotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8000;

const spotifyApi = new spotifyWebApi();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.post('/callback', (req, res) => {
  const token = req.body.token;

  spotifyApi.setAccessToken(token);
  res.status(200);
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
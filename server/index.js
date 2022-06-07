const express = require('express');
const cors = require('cors');
const path = require('path');
const spotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 8000;

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.post('/callback', (req, res) => {
  let spotifyApi = new spotifyWebApi();
  const token = req.body.token;

  spotifyApi.setAccessToken(token);
  spotifyApi.getMe().then(response => res.status(200).send(response));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
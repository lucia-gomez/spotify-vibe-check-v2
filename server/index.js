const express = require('express');
const cors = require('cors');
const spotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors());
app.use(express.json());
const port = 8000;

// const credentials = {
//   clientId: "38632b26273a47e28539a2b34468d660",
//   clientSecret: "e9c85b9cd03a4cd7a2ea1fd3b56b9a97",
//   redirectUri: "http://localhost:3000/callback/",
// };

app.get('/', (req, res) => {
  console.log('Hello World!');
});

app.post('/auth', (req, res) => {
  let spotifyApi = new spotifyWebApi();
  const token = req.body.token;

  spotifyApi.setAccessToken(token);
  spotifyApi.getMe().then(response => res.status(200).send(response));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
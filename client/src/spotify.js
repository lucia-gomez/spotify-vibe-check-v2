const isDev = process.env.NODE_ENV !== 'production';
const liveUrl = "https://spotify-vibe-check.herokuapp.com";
export const redirectUri = isDev ? "http://localhost:3000/" : liveUrl;
export const clientId = "38632b26273a47e28539a2b34468d660";

export const scopes = [
  "user-read-private",
  "playlist-read-private",
  "playlist-read-collaborative",
];

const port = process.env.PORT || 8000;
export const serverUrl = isDev ? "http://localhost:" + port : liveUrl;
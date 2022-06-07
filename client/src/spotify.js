export const redirectUri = "http://localhost:3000/callback/";
export const clientId = "38632b26273a47e28539a2b34468d660";

export const scopes = [
  "user-read-private",
  "playlist-read-private",
  "playlist-read-collaborative",
];

export const server = "http://localhost:8000";

// export const loginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes.join(
//   "%20"
// )}`;
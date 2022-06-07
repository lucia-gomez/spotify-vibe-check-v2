import React from 'react';
import { SpotifyAuth } from 'react-spotify-auth';
import { redirectUri, clientId, scopes, server } from './spotify';
import axios from 'axios';

import 'react-spotify-auth/dist/index.css';

function App() {
  const [token, setToken] = React.useState();
  const [user, setUser] = React.useState();

  const onAccessToken = (newToken) => {
    if (newToken != null) {
      setToken(newToken);
      axios.post(server + '/auth', { token: newToken }).then(res => {
        setUser(res.data.body);
      });
    }
  };

  return (
    <div className='app'>
      {token ? (
        user && <h1>Hi {user.display_name}</h1>
      ) : (
        <SpotifyAuth
          redirectUri={redirectUri}
          clientID={clientId}
          scopes={scopes}
          onAccessToken={onAccessToken}
        />
      )}
    </div>
  )
}

export default App;

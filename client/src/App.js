import React from 'react';
import { SpotifyAuth } from 'react-spotify-auth';
import { redirectUri, clientId, scopes, server } from './spotify';
import axios from 'axios';

import 'react-spotify-auth/dist/index.css';

function App() {
  const [user, setUser] = React.useState();

  const onAccessToken = (newToken) => {
    console.log('ONACCESSTOKEN');
    if (newToken != null) {
      axios.post(server + '/callback', { token: newToken }).then(res => {
        console.log('GOT USER');
        setUser(res.data.body);
      });
    }
  };

  return (
    <div className='app'>
      {user ? <h1>Hi {user.display_name}</h1>
        : <SpotifyAuth
          redirectUri={redirectUri}
          clientID={clientId}
          scopes={scopes}
          onAccessToken={onAccessToken}
        />
      }
    </div>
  )
}

export default App;

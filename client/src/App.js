import React from 'react';
import { SpotifyAuth } from 'react-spotify-auth';
import { redirectUri, clientId, scopes, serverUrl } from './spotify';
import axios from 'axios';
import { ActionType, useStore } from './state.tsx';
import PageLayout from './pages/layout';

import 'react-spotify-auth/dist/index.css';

function App() {
  const { state, dispatch } = useStore();

  const onAccessToken = (newToken) => {
    if (newToken != null) {
      axios.post(serverUrl + '/callback', { token: newToken });
      dispatch({ action: ActionType.SetToken, payload: newToken });
    }
  };

  return (
    <div className='app'>
      {state.isAuth ?
        <PageLayout />
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

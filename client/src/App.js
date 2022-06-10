import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/login';
import PageLayout from './pages/layout';
import { ActionType, useStore } from './state.tsx';

function App() {
  const { dispatch } = useStore();
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get('access_token');
  const refreshToken = urlParams.get('refresh_token');

  useEffect(() => {
    dispatch({ action: ActionType.SetAccessToken, payload: accessToken });
  }, [dispatch, accessToken]);

  useEffect(() => {
    dispatch({ action: ActionType.SetRefreshToken, payload: refreshToken });
  }, [dispatch, refreshToken]);

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/token/*" element={<PageLayout />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;

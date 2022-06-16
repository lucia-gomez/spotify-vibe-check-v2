import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useStore } from '../state.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

const PageCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

const LoginButton = styled.div`
  background-color: ${props => props.theme.green};
  color: ${props => props.theme.white};
  font-weight: 600;
  width: 200px;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 200ms cubic-bezier(0.4, 0, 1, 1);

  :hover {
    transform: scale(1.03);
  }
`;

const SpotifyIcon = styled(FontAwesomeIcon)`
  height: 30px;
  margin-right: 10px;
`;

export default function Login() {
  const { state } = useStore();

  const onLogin = () => {
    axios.post(state.serverUrl + '/login').then(response => {
      if (response.data != null) {
        window.location.href = response.data;
      }
    });
  };

  return (
    <PageCenter>
      <LoginButton onClick={onLogin}>
        <SpotifyIcon icon={faSpotify} />
        Login with Spotify
      </LoginButton>
    </PageCenter>
  );
}
import React from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import UserInfo from './userInfo';
import SpotifyLogo from '../assets/icon.png';
import BackButton from './back';

const NavWrapper = styled.div`
  background-color: ${props => props.theme.black};
  color: ${props => props.theme.white};
  width: 100%;
  height: 70px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
  padding: 0px 20px;
`;

export default function Nav() {
  const location = useLocation();

  return (
    <NavWrapper>
      <Logo src={SpotifyLogo} />
      {location.pathname !== '/token' && <BackButton />}
      <UserInfo />
    </NavWrapper>
  );
}
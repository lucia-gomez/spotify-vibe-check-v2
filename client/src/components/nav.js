import React from 'react';
import styled from 'styled-components';
import UserInfo from './userInfo';
import SpotifyLogo from '../assets/logo_white.png';

const NavWrapper = styled.div`
  background-color: ${props => props.theme.black};
  color: ${props => props.theme.white};
  width: 100%;
  height: 70px;
  position: relative;
`;

const Logo = styled.img`
  height: 40px;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  left: 20px;
`;

export default function Nav() {
  return (
    <NavWrapper>
      <Logo src={SpotifyLogo} />
      <UserInfo />
    </NavWrapper>
  );
}
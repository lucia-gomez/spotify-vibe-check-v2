import React from 'react';
import styled from 'styled-components';

const NavWrapper = styled.div`
  background-color: ${props => props.theme.black};
  color: ${props => props.theme.white};
  width: 240px;
  min-height: 0px;
`;

export default function Nav() {
  return <NavWrapper>hi</NavWrapper>;
}
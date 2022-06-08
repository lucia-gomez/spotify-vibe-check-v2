import React from 'react';
import styled from 'styled-components';
import Nav from '../components/nav';
import UserInfo from '../components/userInfo';
import LandingPage from './landing';

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`;

const Page = styled.div`
  width: 100%;
  background-color: ${props => props.theme.lightBlack};
  min-height: 100vh;

  @media only screen and (max-width: 576px) {
    min-height: -webkit-fill-available;
  }
`;

export default function PageLayout() {
  return (
    <>
      <Layout>
        <Nav />
        <Page />
      </Layout>
      <UserInfo />
    </>
  );
}
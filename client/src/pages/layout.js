import React from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import styled from 'styled-components';
import Nav from '../components/nav';
import Playlists from '../components/playlists';
import PlaylistVibe from './playlistVibe';

const Layout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
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
    <Layout>
      <Nav />
      <Page>
        <Routes>
          <Route path="/playlist" element={<PlaylistVibe />} />
          <Route path="" element={<Playlists />}></Route>
        </Routes>
      </Page>
    </Layout>
  );
}
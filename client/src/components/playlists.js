import { useEffect, useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../spotify';
import styled from 'styled-components';

const PLAYLIST_ITEM_WIDTH = 180;

const PlaylistItemDesktop = styled.div`
  background-color: ${props => props.theme.secondary};
  border-radius: 6px;
  padding: 16px;
  max-width: ${PLAYLIST_ITEM_WIDTH}px;

  :hover {
    background-color: ${props => props.theme.hover};
    transition: background-color 500ms ease;
  }

  img {
    border-radius: 6px;
    width: 100%;
    margin-bottom: 16px;
  }

  @media only screen and (max-width: 576px) {
    display: none;
  }
`;

const PlaylistName = styled.p`
  margin: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.5rem;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
`;

const PlaylistDescription = styled.p`
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  margin: 0px;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => props.theme.grayBodyText};
  font-weight: 500;
  font-size: 0.9em;
`;

function PlaylistDesktop(props) {
  return (
    <PlaylistItemDesktop>
      <img src={props.images[0]?.url} alt="Playlist cover" />
      <PlaylistName>{props.name}</PlaylistName>
      <PlaylistDescription>{props.description.length > 0 ? props.description : props.owner.display_name}</PlaylistDescription>
    </PlaylistItemDesktop>
  );
}

const PlaylistItemMobile = styled.div`
  display: flex;
  flex-direction: 'row';
  align-items: center;
  margin-bottom: 12px;

  img {
    border-radius: 4px;
    width: 80px;
    padding-right: 10px;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  @media only screen and (min-width: 576px) {
    display: none;
  }
`;

function PlaylistMobile(props) {
  return (
    <PlaylistItemMobile>
      <img src={props.images[0]?.url} alt="Playlist cover" />
      <div>
        <PlaylistName style={{ fontWeight: 600 }}>{props.name}</PlaylistName>
        <PlaylistDescription>{props.owner.display_name}</PlaylistDescription>
      </div>
    </PlaylistItemMobile>
  );
}

function Playlist(props) {
  return (
    <div key={props.id}>
      {PlaylistDesktop(props)}
      {PlaylistMobile(props)}
    </div>
  );
}

const PlaylistsWrapper = styled.div`
  padding: 10px;

  @media only screen and (min-width: 576px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(${PLAYLIST_ITEM_WIDTH}px ,1fr));
    grid-gap: 24px;
    padding: 16px;
  }
`;

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    axios.get(serverUrl + '/playlists').then(response => {
      setPlaylists(response.data);
    });
  }, []);

  return (
    <PlaylistsWrapper>
      {playlists.map(Playlist)}
    </PlaylistsWrapper>
  );
}
import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { ActionType, useStore } from '../state.tsx';

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

  @media only screen and (max-width: 576px) {
    display: none;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 16px;
  padding-bottom: 100%;
`;

const PlaylistImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 6px;
  object-fit: cover;
  object-position: center center;
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
  color: ${props => props.theme.white};
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
  box-lines: 2;
  text-decoration: none;
`;

function PlaylistDesktop(props) {
  return (
    <PlaylistItemDesktop>
      <ImageWrapper>
        <PlaylistImage src={props.images[0]?.url} alt="Playlist cover" />
      </ImageWrapper>
      <div style={{ minHeight: 60 }}>
        <PlaylistName>{props.name}</PlaylistName>
        <PlaylistDescription>{props.description.length > 0 ? props.description : props.owner.display_name}</PlaylistDescription>
      </div>
    </PlaylistItemDesktop>
  );
}

const PlaylistItemMobile = styled.div`
  display: flex;
  flex-direction: 'row';
  align-items: center;
  margin-bottom: 12px;

  

  @media only screen and (min-width: 576px) {
    display: none;
  }
`;

const MobileCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageWrapperMobile = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  padding-right: 10px;

  img {
    object-fit: cover;
    object-position: center center;
    height: 100%;
    width: 100%;
    border-radius: 4px;
  }
`;

function PlaylistMobile(props) {
  return (
    <PlaylistItemMobile>
      <ImageWrapperMobile>
        <img src={props.images[0]?.url} alt="Playlist cover" />
      </ImageWrapperMobile>
      <MobileCol>
        <PlaylistName style={{ fontWeight: 600 }}>{props.name}</PlaylistName>
        <PlaylistDescription>{props.owner.display_name}</PlaylistDescription>
      </MobileCol>
    </PlaylistItemMobile>
  );
}

function Playlist(props) {
  return (
    <>
      {PlaylistDesktop(props)}
      {PlaylistMobile(props)}
    </>
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
  const { state, dispatch } = useStore();

  const onSelect = useCallback(playlist => {
    dispatch({ action: ActionType.SetPlaylist, payload: playlist });
  }, [dispatch]);

  useEffect(() => {
    if (state.playlists == null) {
      axios.get(state.serverUrl + '/playlists').then(response => {
        dispatch({ action: ActionType.SetPlaylists, payload: response.data });
      });
    }
  }, [state.playlists, state.serverUrl, dispatch]);

  return (
    <PlaylistsWrapper>
      {state.playlists != null && state.playlists.map(playlist =>
        <Link
          to="/token/playlist"
          onClick={() => onSelect(playlist)}
          key={playlist.id}
          style={{ textDecoration: 'none' }}
        >
          {Playlist(playlist)}
        </Link>
      )}
    </PlaylistsWrapper>
  );
}
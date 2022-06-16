import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlaylistAuthorSass from '../components/playlistAuthor';
import PlaylistHeader from '../components/playlistHeader';
import PlaylistTrackPopularity from '../components/playlistTrackPopularity';
import { useStore } from '../state.tsx';

const PlaylistVibeContent = styled.div`
  padding: 24px;
  color: ${props => props.theme.grayBodyText};
`;

export default function PlaylistVibe() {
  const { state } = useStore();
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    axios.get(state.serverUrl + '/playlistTracks', {
      params: {
        playlistId: state.playlist.id,
      }
    }).then(response => setTracks(response.data));
  }, [state.serverUrl, state.playlist.id]);

  return (
    <>
      <PlaylistHeader playlist={state.playlist} />
      <PlaylistVibeContent>
        <PlaylistAuthorSass playlist={state.playlist} />
        <PlaylistTrackPopularity tracks={tracks} />
      </PlaylistVibeContent>
    </>
  );
}
import React from 'react';
import styled from 'styled-components';
import PlaylistAuthorSass from '../components/playlistAuthor';
import PlaylistHeader from '../components/playlistHeader';
import { useStore } from '../state.tsx';

const PlaylistVibeContent = styled.div`
  padding: 24px;
  color: ${props => props.theme.grayBodyText};
`;

export default function PlaylistVibe() {
  const { state } = useStore();
  console.log(state.playlist);

  return (
    <>
      <PlaylistHeader playlist={state.playlist} />
      <PlaylistVibeContent>
        <PlaylistAuthorSass playlist={state.playlist} />
      </PlaylistVibeContent>
    </>
  );
}
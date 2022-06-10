import React from 'react';
import { useStore } from '../state.tsx';

export default function PlaylistAuthorSass({ playlist }) {
  const { state } = useStore();

  const msg = () => {
    if (playlist.collaborative) {
      return "This is a collaborative playist, so whatever happens isn't entirely your fault. But fear not, we can still roast you";
    } else {
      if (playlist.owner.display_name === state.userName) {
        return "You made this playlist, so you're responsible for whatever vibes we find";
      }
      return "You didn't make this playlist. But you listen to it, so you're complicit in whatever weird vibes we find here";
    }
  }
  return <h2>{msg()}</h2>;
}
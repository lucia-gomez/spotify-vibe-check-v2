import React, { useContext, useReducer } from "react";

export enum ActionType {
  SetAccessToken,
  SetRefreshToken,
  SetUser,
  SetPlaylist,
  SetPlaylists,
}

export type Action = { action: ActionType, payload: any };

type State = {
  serverUrl: string,
  accessToken: string | null,
  refreshToken: string | null,
  playlists: Array<any>,
  playlist: any | null,
  userName: string | null,
  userPhotoUri: string | null,
}

type Dispatch = (action: Action) => void;

function Reducer(state: State, action: Action): State {
  switch (action.action) {
    case ActionType.SetAccessToken:
      return {
        ...state,
        accessToken: action.payload,
      };
    case ActionType.SetRefreshToken:
      return {
        ...state,
        refreshToken: action.payload,
      };
    case ActionType.SetUser:
      return {
        ...state,
        userName: action.payload.display_name,
        userPhotoUri: action.payload.images[0]?.url,
      };
    case ActionType.SetPlaylists:
      return {
        ...state,
        playlists: action.payload,
      };
    case ActionType.SetPlaylist:
      return {
        ...state,
        playlist: action.payload,
      };
  }
}

const StateContext = React.createContext(undefined);
const DispatchContext = React.createContext(undefined);

const liveUrl = "https://spotify-vibe-check.herokuapp.com";
const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8000;

export const Provider = (props) => {
  const initialState: State = {
    accessToken: null,
    refreshToken: null,
    serverUrl: isDev ? "http://localhost:" + port : liveUrl,
    playlists: null,
    playlist: null,
    userName: null,
    userPhotoUri: null,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useStore(): { state: State, dispatch: Dispatch } {
  const state: State = useContext(StateContext);
  const dispatch: Dispatch = useContext(DispatchContext);

  if (state == null || dispatch == null) {
    throw new Error('useStore must be used inside Provider');
  }

  return { state, dispatch };
}
import React, { useContext, useReducer } from "react";

export enum ActionType {
  SetToken,
  SetUser,
}

export type Action = { action: ActionType, payload: any };

type State = {
  isAuth: boolean,
  token: string | null,
  userName: string | null,
  userPhotoUri: string | null,
}

type Dispatch = (action: Action) => void;

function Reducer(state: State, action: Action): State {
  switch (action.action) {
    case ActionType.SetToken:
      return {
        ...state,
        isAuth: true,
        token: action.payload,
      };
    case ActionType.SetUser:
      return {
        ...state,
        userName: action.payload.display_name,
        userPhotoUri: action.payload.images[0]?.url,
      };
  }
}

const StateContext = React.createContext(undefined);
const DispatchContext = React.createContext(undefined);

export const Provider = (props) => {
  const initialState: State = {
    isAuth: false,
    token: null,
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
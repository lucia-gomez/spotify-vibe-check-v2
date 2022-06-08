import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ActionType, useStore } from '../state.tsx';
import { serverUrl } from '../spotify';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 5px;

  img {
    height: 28px;
    border-radius: 50px;
    margin-left: 5px;
  }

  p {
    max-width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export default function UserInfo() {
  const { state, dispatch } = useStore();

  useEffect(() => {
    axios.post(serverUrl + '/user').then(response => {
      const data = response.data.body;
      console.log(response.data.body);
      dispatch({ action: ActionType.SetUser, payload: data });
    });
  }, []);

  return (
    <Wrapper>
      <p>{state.userName}</p>
      <img src={state.userPhotoUri} alt="Spotify user profile" />
    </Wrapper>
  );
}
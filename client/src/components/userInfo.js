import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ActionType, useStore } from '../state.tsx';
import { serverUrl } from '../spotify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  background-color: ${props => props.theme.secondary};
  border-radius: 50px;
  padding: 2px;
  height: 32px;
  cursor: pointer;

  img {
    height: 28px;
    border-radius: 50px;
    margin-right: 10px;
  }

  span {
    max-width: 150px;
  }

  svg {
    padding: 0px 10px;
  }
`;

const DropdownWrapper = styled.div`
  width: 125px;
  border-radius: 6px;
  background-color: ${props => props.theme.hover};
  position: absolute;
  bottom: -100%;
  transform: translateY(50%);
  padding: 16px;
  cursor: pointer;
`;

function Dropdown() {
  const logout = () => {
    axios.get(serverUrl + '/logout');
  }

  return (
    <DropdownWrapper onClick={logout}>
      <span>Logout</span>
    </DropdownWrapper>
  );
}

export default function UserInfo() {
  const { state, dispatch } = useStore();
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    axios.get(serverUrl + '/user').then(response => {
      const data = response.data.body;
      dispatch({ action: ActionType.SetUser, payload: data });
    });
  }, [dispatch]);

  return (
    <Wrapper onClick={() => { setExpanded(prev => !prev) }}>
      <img src={state.userPhotoUri} alt="Spotify user profile" />
      <span>{state.userName}</span>
      <FontAwesomeIcon icon={isExpanded ? faCaretUp : faCaretDown} />
      {isExpanded && <Dropdown />}
    </Wrapper>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ActionType, useStore } from '../state.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  color: ${props => props.theme.green};
  font-weight: 600;

  p {
    margin: 0px;
  }

  svg {
    padding-right: 3px;
  }
`;

export default function BackButton() {
  const { dispatch } = useStore();

  const goBack = () => {
    dispatch({ action: ActionType.SetPlaylist, payload: null });
  };

  return (
    <Link to="/token" style={{ textDecoration: 'none' }}>
      <Row onClick={goBack}>
        <FontAwesomeIcon icon={faChevronLeft} />
        <p>Back</p>
      </Row>
    </Link>
  );
}
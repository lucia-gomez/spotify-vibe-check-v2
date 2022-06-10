import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ActionType, useStore } from '../state.tsx';

export default function Login() {
  const { state } = useStore();

  const onLogin = () => {
    axios.post(state.serverUrl + '/login').then(response => {
      if (response.data != null) {
        window.location.href = response.data;
      }
    });
  };

  return (<button onClick={onLogin}>Login</button>);
}
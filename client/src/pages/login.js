import React from 'react';
import axios from 'axios';
import { useStore } from '../state.tsx';

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
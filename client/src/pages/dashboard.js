import React from 'react';
import useAuth from '../useAuth';

export default function Dashboard(code) {
  const accessToken = useAuth(code);
  return (
    <>
      <p>{code}</p>
      <p>{accessToken}</p>
    </>
  );
}
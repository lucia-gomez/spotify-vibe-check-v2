import React from 'react';
import { loginUrl } from '../spotify';

export default function LoginPage() {
  return (
    <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
  );
}
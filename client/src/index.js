import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { theme } from './theme';
import App from './App';
import { Provider } from './state.tsx';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.lightBlack};
  }

  html {
    background-color: ${props => props.theme.lightBlack};
  }
`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

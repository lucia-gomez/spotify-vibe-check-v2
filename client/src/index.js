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
    background-color: ${props => props.theme.primary};
    font-family: 'Montserrat';
  }

  html {
    background-color: ${props => props.theme.primary};
  }

  span {
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1rem;
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

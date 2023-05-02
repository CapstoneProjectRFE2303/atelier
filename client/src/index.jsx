import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

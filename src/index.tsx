import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App, ProviderWrapper } from './App';

ReactDOM.render(
  <React.StrictMode>
    <ProviderWrapper>
      <App />
    </ProviderWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);
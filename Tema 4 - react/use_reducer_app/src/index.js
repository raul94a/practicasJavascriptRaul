import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GovernmentProvider from './store/GovernmentProvider';

ReactDOM.render(
  <React.StrictMode>
    <GovernmentProvider>

      <App />

    </GovernmentProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';
import Alert from './components/alertColor/ContextProvider.js';

ReactDOM.render(
  <React.StrictMode>
    <Alert>
      <App/>
    </Alert>
  </React.StrictMode>,
  document.getElementById('root')
)

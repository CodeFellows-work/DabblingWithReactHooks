import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';
import AlertColor from './components/alertColor/ContextProvider.js';

ReactDOM.render(
  <React.StrictMode>
    <AlertColor>
      <App/>
    </AlertColor>
  </React.StrictMode>,
  document.getElementById('root')
)

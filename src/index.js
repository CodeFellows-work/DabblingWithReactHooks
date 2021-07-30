import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';
import Alert from './components/alertColor/ContextProvider.js';
import LogInContext from './components/auth/context.js';
import  SignUpContext  from './components/signUp/context.js';

ReactDOM.render(
  <React.StrictMode>
    <SignUpContext>
      <LogInContext>
        <Alert>
          <App/>
        </Alert>
      </LogInContext>
    </SignUpContext>
  </React.StrictMode>,
  document.getElementById('root')
)

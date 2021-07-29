import React from 'react';

import ToDo from './components/todo/todo.js';
import NavigatingBar from './components/Navbar';

import Auth from './components/auth/auth.js';
import Login from './components/auth/login.js';


import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';


export default class App extends React.Component {
  render() {
    return (
      <>
        <NavigatingBar/> 
        <Login /> 
        <Auth capability="create">
          <ToDo />
        </Auth>  
  
      </>
    );
  }
}

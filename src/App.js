import React from 'react';

import ToDo from './components/todo/todo.js';
import NavigatingBar from './components/Navbar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';
export default class App extends React.Component {
  render() {
    return (
      <>
      <NavigatingBar/> 
      <ToDo />
      </>
    );
  }
}

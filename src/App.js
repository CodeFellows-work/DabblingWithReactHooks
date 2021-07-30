import React, { useContext } from 'react';

import ToDo from './components/todo/todo.js';


import Auth from './components/auth/auth.js';
import Login from './components/auth/login.js';
import Footer from './components/footer/Footer.js';
import SignUp from './components/signUp/signUp.js';
import { SignUpContext } from './components/signUp/context.js'





import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';




export default function App() {


  const { needSU} = useContext(SignUpContext);  


  

    return (
      <>
      { needSU ? 
    
        <SignUp />
    
        :
      <div>
        <Login />
        <Auth capability='read'>
          <ToDo />
          <Footer /> 
        </Auth>  
      </div>
        }

        
      </>
    );
  }

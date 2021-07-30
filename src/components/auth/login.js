import React, { useContext } from 'react';
// import {When} from 'react-if';

import { LoginContext }  from './context.js';
import { SignUpContext } from '../signUp/context.js';

import './login.scss';

import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';


import logo from './logo.jpg'

function Login() {
    
    const { isAuthenticated, login, logout } = useContext(LoginContext);
    
    function handleSubmit(e){
        e.preventDefault();
        let username = e.target.username.value;
        let password = e.target.password.value;


        login(username, password);
        console.log('from login handleSubmit', username, password)
    };

    const { needSU, clickedSignUp } = useContext(SignUpContext);  
    function handleClickSignUp(){
        clickedSignUp(true);
      }
    
        return (
            <div className="login">
                {isAuthenticated 

                    ? 
                        <Navbar bg="dark" variant="dark">
                            <Container>
                                <Navbar.Brand href="/"><img style={{width: '50px'}}src={logo} alt="logo"/></Navbar.Brand>
                                <Nav className="me-auto">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="#features">Features</Nav.Link>
                                    <Button variant="danger" onClick={logout}>Log Out</Button> 
                                </Nav>
                            </Container>
                        </Navbar>
                        :
                        <div>
                            <Navbar bg="dark" variant="dark">
                                <Navbar.Brand href="/"><img style={{width: '50px'}}src={logo} alt="logo"/></Navbar.Brand>
                                <Nav>
                                    <Button variant="info" type="button" onClick={handleClickSignUp}>Sign Up</Button> 
                                </Nav>
                            </Navbar>
                        <div className="loginForm">
                            <div className="login">
                                <div className="H1">
                                    <img className="logo" src={logo} alt="logo" ></img>
                                    <h1>ToDoHub</h1>
                                </div>
                                <form onSubmit={handleSubmit}>

                                    <div className="bp3-input-group .modifier">
                                        <label>Enter Username:</label>

                                        <input
                                            placeholder="Username"
                                            name="username"
                                            id="username"
                                        
                                        />
                                    </div>

                                    <div>
                                        <label>
                                            Enter Password:
                                        </label>

                                        <input
                                            placeholder="Password"
                                            name="password"
                                            type="password"
                                            id="password"
                                        />
                                    </div>
                                    <Button variant="danger"  type='submit' >Login</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                }
        </div>
        );
    }

export default Login;
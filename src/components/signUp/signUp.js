import React, { useContext } from 'react';
import Form  from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

import axios from 'axios';

import './signUp.scss';

import { SignUpContext } from './context.js';

import logo from '../auth/logo.jpg'

function SignUp() {

    const { clickedSignUp } = useContext(SignUpContext);

   

    function handleSubmit(e){
        e.preventDefault(); 
        let username = e.target.username.value;
        let password = e.target.password.value;
        console.log('from handlesubmit in signup', username, password)

        axios.post('https://todohubserver.herokuapp.com/signup', {
                username: username,
                password: password,
        })
            .then(function (response) {
                console.log(response);
                clickedSignUp(false);
            })
            .catch(function(err){
                console.log(err);
            })
    }

    return(

        <>
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/"><img style={{width: '50px'}}src={logo} alt="logo"/></Navbar.Brand>
            <Button style={{marginLeft:'80%'}} variant="danger" onClick={handleSubmit}>Let's Go Back</Button> 
        </Navbar>
        <h1 className="heading" style={{marginTop: "10%", marginLeft:"5%"}}>Let's Sign Up because you have things ToDo©</h1>
        <div className="signupStuff">
            <h1 style={{color: "white"}}>Sign Up</h1>
            <div className="signUp">
                <Form  className="form" onSubmit={handleSubmit}>
                    <Form.Group className="label">
                    <Form.Label style={{marginLeft: "5%"}}>
                        <Form.Text name="username" id="username" style={{color:"white"}}>User Name </Form.Text>
                        <Form.Control name="username" id="username"  type="text" placeholder="Create Username" />
                    </Form.Label>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label style={{marginLeft: "5%"}} className="label">
                        <Form.Text style={{color:"white"}}>Password </Form.Text>
                        <Form.Control name="password" id="password" type="text" placeholder="Create Password" />
                    </Form.Label>
                    </Form.Group>
                    <Button  style={{opacity: "0.7", marginLeft: "5%"}} variant="danger" type="submit">Sign Up</Button>
                </Form>

            </div>
        </div>
        </>
    )
}

export default SignUp; 
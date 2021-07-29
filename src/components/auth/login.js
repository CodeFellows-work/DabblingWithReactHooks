import React, { useState, useContext } from 'react';
// import {When} from 'react-if';

import { LoginContext }  from './context.js';


function Login(props) {
    
    const context = useContext(LoginContext);
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    function handleChange(e) {
     setUsername({[e.target.name]: e.target.value});
    };
    function handleChangeTwo(e){
        setPassword({[e.target.name]: e.target.value});
    }
    
    
    function handleSubmit(e){
        e.preventDefault();

        context.login(username, password);
        console.log('from login handleSubmit', username, password)
    };



        return (
            <div>
                {context.loggedIn
                    ? <button onClick={context.logout}>Log Out</button> 
                    :
                        <form onSubmit={handleSubmit}>
                            <input
                                placeholder="UserName"
                                name="username"
                                id="username"
                                onChange={handleChange}
                            />
                            <input
                                placeholder="password"
                                name="password"
                                id="password"
                                onChange={handleChangeTwo}
                            />
                            <button type='submit' >Login</button>
                        </form>
                }

        {/* <When condition={context.loggedIn}>
            <button onClick={context.logout}>Log Out</button>
            </When>
            
            <When condition={!context.loggedIn}>
            
            <form onSubmit={handleSubmit}>
            <input
            placeholder="UserName"
            name="username"
            onChange={handleChange}
            />
            <input
            placeholder="password"
            name="password"
            onChange={handleChange}
            />
            <button >Login</button>
            </form>
        </When> */}
        </div>
        );
    }

export default Login;
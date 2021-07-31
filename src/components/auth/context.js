import React from 'react';

import cookies from 'react-cookies';


import axios from 'axios'
export const LoginContext = React.createContext();


// const testUsers = [
//     {
//         password:'password',
//         name:'Administrator',
//         role:'admin',
//         capabilities:['create','read','update','delete']
//     },
//     {
//         password: 'password',
//         name: 'Editor',
//         role: 'editor',
//         capabilities: ['read', 'update']
//     },
//     {
//         password: 'password',
//         name: 'Writer',
//         role: 'writer',
//         capabilities: ['create', 'read']
//     }
// ]


class LoginProvider extends React.Component {

    constructor() {
        super();
        this.state = {
            login: this.login,
            logout: this.logout,
            isAuthenticated: false,
            isAuthorized: this.isAuthorized,
            user: {capabilities:[]},
        };
    }
    
// try to get users and then map through them before comparing them to the user inputs 

    login = (username, password) => {
        // search our testUser and return a valid user.
        axios.post('http://localhost:3000/signin', {}, {auth : {
            username: username,
            password: password,
            },
        })
        .then((response) => {
            console.log('then response',response);
            this.setState({ isAuthenticated: true, user: response.data.user })
            // axios.get('http://localhost:3000/users')
            // .then(function(respone) {
            //     console.log('getting users', response);
            // })
            // .catch(function(err){
            //     console.error(err);
            // })
            
            // let validUser = {};
            // let token = null;
            // if(response.data.user === username && response.data.password === password){
            //     validUser = response.data.user
            //     token = response.data.token
            //     console.log('validUser', validUser);
                // this.setState({ isAuthenticated: true, user: validUser });
            
            // cookies.save('token', token);
        })
        .catch((err) => {
            console.error(err)
        });
    }
        
    logout = () => {
        this.setState({
            isAuthenticated: false, 
            isAuthorized: null, 
            user: {}
        });
    };
        
    isAuthorized = (capability) => {
        if(this.state.user) {
            return this.state.user.capabilities?.includes(capability);
        }
    }
    
        
    
    // validateToken = (token) => {
    //     try {
    //         let user = jwt.verify(token, 'secret');
    //         this.setState({loggedIn: true, token: token, user: user});
    //     }
    //     catch (e) {
    //         this.setState({loggedIn: false, can: null, user:{}});
    //         console.log('Token Validation Error', e);
    //     }
        
    // };
        
    //     setLoginState = (loggedIn, token, user) => {
    //         cookies.save('auth', token);
    //         this.setState({ token: token, loggedIn: loggedIn, user: user });
    //         console.log('includes', this.state.user);
    // };

    // componentDidMount() {
    //     // const qs = new URLSearchParams(window.location.search);
    //     const cookieToken = cookies.load('token');
    //     // const token = qs.get('token') || cookieToken || null;
    //     // this.validateToken(token);
    // }

    render() {
        return (
        <LoginContext.Provider value={this.state}>
            {this.props.children}
        </LoginContext.Provider>
        );
    }
}

export default LoginProvider;
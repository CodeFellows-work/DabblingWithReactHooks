import { useContext } from 'react';

import { LoginContext } from '../auth/context.js'

function Auth(props){
    
    const { isAuthorized, loggedIn } = useContext(LoginContext);

    return (
        <>
        {(loggedIn && isAuthorized(props.capability))
        ? props.children
        : null
        }

        </>
    )
}

export default Auth;
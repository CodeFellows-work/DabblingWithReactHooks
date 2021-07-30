import { useContext } from 'react';

import { LoginContext } from '../auth/context.js'

function Auth(props) {

    const { isAuthenticated, isAuthorized } = useContext(LoginContext);

    return (
        <>
            {(isAuthenticated && isAuthorized(props.capability))
                ? props.children
                : null
            }
        </>
    )
}

export default Auth;
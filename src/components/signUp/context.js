import React, { useState } from 'react';


export const SignUpContext = React.createContext();


function SignUp(props){

const [needSU, setNeedSU] = useState(false); 

function clickedSignUp(clicked) {
    setNeedSU(clicked); 
}


    return(

        <SignUpContext.Provider value={{needSU, clickedSignUp}}>
            {props.children}
        </SignUpContext.Provider>

    )
}

export default SignUp;  
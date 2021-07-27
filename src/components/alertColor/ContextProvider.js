import React, {useState} from 'react';

export const AlertContext = React.createContext();

function AlertColor(props){

    const [color, setColor] = useState('danger');

    return (
        <AlertContext.Provider value ={{color: color, setColor: setColor}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertColor; 
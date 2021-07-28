import React, { useState} from 'react';

export const AlertContext = React.createContext();

function Alert(props){

    const [hide, setHide] = useState('hidden');
    const [item, setItem] = useState(5);
    const [sort, setSort] = useState('');
    const [pageOne, setPageOne] = useState('hidden');
    const [pageTwo, setPageTwo] = useState('hidden');
    const [pageThree, setPageThree] = useState('hidden');

   
    return (
        <AlertContext.Provider value ={{hide, item, sort, pageOne, setPageOne, pageTwo, setPageTwo, pageThree, setPageThree, setSort, setItem, setHide}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default Alert; 
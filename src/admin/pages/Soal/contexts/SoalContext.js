import React,{createContext, useState} from 'react'; 


export const SoalContext = createContext();

const SoalContextProvider = (props) => {
    const [formStateContext, setFormStateContext] = useState({
        id: '',
        soal: '',
        url: '',
        hint: ''
    });
    const [onEdit, setOnEdit] = useState(false);
    return(
        <SoalContext.Provider value={{formStateContext, onEdit, setFormStateContext, setOnEdit}}>
            {props.children}
        </SoalContext.Provider>
    );
}

export default SoalContextProvider;
import { useState,useEffect } from 'react';
import {IoCheckmark,IoClose } from "react-icons/io5";
import './styles/checkBox.css';

type Props = {
    selected:(checked:boolean)=>void;
    initialState:boolean;
}


export function CheckBox({selected,initialState}:Props) {
    const [checked,setChecked] = useState(initialState);

    useEffect(() => {
        setChecked(initialState);
    }, [initialState]);

    const handleCheck = () => {
        selected(!checked);
        setChecked(!checked);
    };  

    if(checked){
        return(
            <IoCheckmark className="checkbox" type="checkbox" onClick={()=>handleCheck()} style={{color:'green'}}></IoCheckmark>
        );
    }

    else{
        return(
            <IoClose className="checkbox" type="checkbox" onClick={()=>handleCheck()} style={{color:'#af2b2b'}}></IoClose>
        );
    }
}
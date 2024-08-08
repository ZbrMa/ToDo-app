import './styles/input.css';
import { Button } from './button';
import { useEffect, useState } from 'react';
import { IoAdd } from 'react-icons/io5';

type Props = {
    placeholder:string;
    children?:React.ReactNode;
    onClick:(value:string)=>void;
};

export function Input({placeholder,children,onClick}:Props){
    const [value,setValue] = useState('');

    const handleClick = (value:string) =>{
        if(value === ''){
            alert('Zadejte prosím název')
        }
        else {
            onClick(value);
        };
    };

    return(
        <div className='input-cont'>
            {children &&(<label>{children}</label>)}
                <input placeholder={placeholder} onChange={(e)=>setValue(e.target.value)}></input>
            <Button onClick={()=>handleClick(value)} size='big'><IoAdd></IoAdd></Button>
        </div>
    );
};

type FormProps = {
    onChange:(value:any)=>void;
    initialValue:any;
    type:'text' | 'number' | 'date';
};

export function FormInput({onChange,initialValue,type}:FormProps){
    const [data,setData] = useState(initialValue);

    const handleChange = (value:string) =>{
        onChange(value);
        setData(value);
    };

    return(
        <div className='form-input-cont'>
            <input onChange={(e)=>handleChange(e.target.value)} value={data} type={type}></input>
        </div>
    );
};
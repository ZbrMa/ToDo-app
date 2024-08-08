import { useState } from "react";
import { Button } from "./button";
import { Event } from "../Page";
import { FormInput } from "./input";
import { CheckBox } from "./checkBox";
import './styles/form.css';

type Props = {
    returnData:(data:Event)=>void;
    initialData:Event;
};

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const parseDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
};

export function Form({returnData,initialData}:Props) {
    const [data,setData] = useState<Event>(initialData);

    const handleSubmit = ()=>{
        returnData(data);
    };

    const handleChange = (param: keyof Event, value: string) => {
        if (param === 'day') {
            setData({
                ...data,
                [param]: parseDate(value)
            });
        } else {
            setData({
                ...data,
                [param]: value
            });
        }
    };

    return (
        <div className="form">
            <label>Id: </label>
            <label style={{padding:'8px 16px'}}>{data.id}</label>
            <label>Název: </label>
            <FormInput onChange={(e)=>handleChange('name',e)} initialValue={data.name} type="text"></FormInput>
            <label>Den: </label>
            <FormInput onChange={(e)=>handleChange('day',e)} initialValue={formatDate(data.day)} type="date"></FormInput>
            <label>Dokončeno: </label>
            <CheckBox selected={(e)=>setData({...data,done:e})} initialState={data.done}></CheckBox>
            <div className="form-btns">
                <Button onClick={handleSubmit}>Uložit</Button>
            </div>
        </div>
    );
}
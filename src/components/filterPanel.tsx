import { useState } from "react";
import { FilterButton } from "./button"
import './styles/filterPanel.css';

type Props = {
    returnValue:(value:string)=>void;
    initialOption:string;
}

export function FilterPanel({returnValue,initialOption}:Props){

    const [option,setOption] = useState(initialOption);

    const handleChoose = (value:string) =>{
        returnValue(value);
        setOption(value);
    };
    
    return(
        <div className="filter-btns">
            <FilterButton onClick={(e)=>handleChoose(e)} filterValue='Vše' filter={option}></FilterButton>
            <FilterButton onClick={(e)=>handleChoose(e)} filterValue='Dokončeno' filter={option}></FilterButton>
            <FilterButton onClick={(e)=>handleChoose(e)} filterValue='Nedokončeno' filter={option}></FilterButton>
        </div>
    );
}
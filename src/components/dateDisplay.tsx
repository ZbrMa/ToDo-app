import { useEffect, useState } from "react";
import { Button } from "./button";
import {IoChevronBack,IoChevronForward} from "react-icons/io5";
import './styles/dateDisplay.css';

const days = ['Neděle','Pondělí','Úterý','Středa','Čtvrtek','Pátek','Sobota'];
const months = ['Leden','Únor','Březen','Duben','Květen','Červen','Červenec','Srpen','Září','Říjen','Listopad','Prosinec'];

type Props = {
    returnDate:(day:Date)=>void,
}

export function DateDisplay({returnDate}:Props) {

    const [date,setDate] = useState<Date>(new Date());

    const handleDateChange = (direction: number) => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + direction);
        setDate(newDate);
        returnDate(newDate);
    };

    return(
        <div className="date-container">
            <Button onClick={()=>handleDateChange(-1)} color="ghost" size="big"><IoChevronBack></IoChevronBack></Button>
            <div className="date-info">
                <div className="date-day-text">{days[date.getDay()]}</div>
                <div className="date-day">{date.getDate()}</div>
                <div className="date-my">
                    <div className="date-month">{months[date.getMonth()]}</div>
                    <div className="date-year">{date.getFullYear()}</div>
                </div>
            </div>
            <Button onClick={()=>handleDateChange(1)} color="ghost" size="big"><IoChevronForward></IoChevronForward></Button>
        </div>
    );
}
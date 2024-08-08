import {Button, FilterButton} from './components/button';
import { useEffect, useState } from 'react';
import { Input } from './components/input';
import { TopPanel } from './blocks/topPanel';
import { DateDisplay } from './components/dateDisplay';
import { List } from './components/list';
import { FilterPanel } from './components/filterPanel';

export interface Event {
    id:number,
    name:string,
    day:Date,
    done:boolean,
};

const today = new Date();
const prevDay = new Date();
const nextDay = new Date();
prevDay.setDate(today.getDate() - 1);
nextDay.setDate(today.getDate() + 1);

let events:Event[] = [
    {id:1,name:'Práce',day:today ,done:false},
    {id:2,name:'Nákup',day:prevDay,done:false},
    {id:3,name:'Prádlo',day:nextDay,done:false},
    {id:4,name:'Úklid',day:today,done:true},
    {id:5,name:'Úklid',day:nextDay,done:false},
    {id:6,name:'Nákup',day:today,done:false},
    {id:7,name:'Zahrada',day:prevDay,done:false},
    {id:8,name:'Úklid',day:today,done:true},
    {id:9,name:'Nákup',day:nextDay,done:false},
    {id:10,name:'Práce',day:today,done:true},
    {id:11,name:'Úklid',day:today ,done:false},
    {id:12,name:'Nákup',day:prevDay,done:false},
    {id:13,name:'Prádlo',day:nextDay,done:false},
    {id:14,name:'Zahrada',day:today,done:true},
    {id:15,name:'Úklid',day:nextDay,done:false},
    {id:16,name:'Práce',day:today,done:false},
    {id:17,name:'Prádlo',day:prevDay,done:false},
    {id:18,name:'Zahrada',day:today,done:true},
    {id:19,name:'Nákup',day:nextDay,done:false},
    {id:20,name:'Práce',day:today,done:true},
];

export function Page(){
    const [day,setDay] = useState(new Date());
    const [filteredEvents,setFilteredEvents] = useState<Event[]>([]);
    const [filterState,setFilterState] = useState<boolean|null>(null);

    const updateEvent = (event:Event,param:keyof Event,newValue:any)=>{
        const eventIndex = events.findIndex(oldEvent=>oldEvent.id === event.id);
        if (eventIndex !== -1){
            const editEvent = events[eventIndex];
            const newEvent = {...editEvent,[param]:newValue};
            events[eventIndex] = newEvent;
        };
        filter();
    };

    function filter(){
        const filtered = events.filter(event => 
            event.day.getFullYear() === day.getFullYear() &&
            event.day.getMonth() === day.getMonth() &&
            event.day.getDate() === day.getDate()
            
        );
        const filteredDone = filtered.filter(event => 
            filterState !== null ? event.done === filterState : true
        );
        setFilteredEvents(filteredDone);
    };

    useEffect(() => {
        filter();
    }, [day,filterState]);

    const handleAdd = (value:string) =>{
        const createEvent:Event = {id:events[events.length-1].id+1 ,name:value,day:day,done:false};
        events.push(createEvent);
        filter();
    };
    
    const handleDelete = (event:Event) =>{
        const initialEvents = events.filter(oldEvent => oldEvent.id !== event.id);
        events = initialEvents;
        filter();
    };

    const handleFilter = (value:string) =>{
        if(value === 'Vše'){
            setFilterState(null);
        }
        else if(value==='Dokončeno'){
            setFilterState(true);
        }
        else {
            setFilterState(false);
        };
    };

    return(
        <div className="page" style={{textAlign:'center'}}>
            <TopPanel></TopPanel>
            <DateDisplay returnDate={setDay}></DateDisplay>
                <Input placeholder='Přidej událost...' onClick={handleAdd}></Input>
            <List data={filteredEvents} updateEvent={updateEvent} deleteEvent={handleDelete}/>
            <FilterPanel returnValue={(e)=>handleFilter(e)} initialOption={'Vše'}></FilterPanel>
        </div>
    )

};
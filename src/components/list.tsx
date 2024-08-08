import './styles/list.css';
import { Button } from './button';
import { IoTrashOutline, IoPencil, IoCheckmark,IoClose } from "react-icons/io5";
import { CheckBox } from './checkBox';
import { Event } from '../Page';
import { Modal } from './modal';
import { useState } from 'react';
import { Form } from './form';

type Props = {
    data:Event[];
    updateEvent:(event:Event,param:keyof Event, newValue:any)=>void;
    deleteEvent:(event:Event)=>void;
}

export function List({data,updateEvent,deleteEvent}:Props) {

    const [editEvent,setEditEvent] = useState<Event>();
    const [modalOpen,setModalOpen] = useState(false);

    const handleDelete = (event:Event) => {
        deleteEvent(event);
    };

    const handleCheck = (checked:boolean,event:Event) =>{
        updateEvent(event,'done',checked); 
    };

    const handleEdit = (event:Event) => {
        setEditEvent(event);
        setModalOpen(true);
    };

    const saveEdit = (event:Event)=>{
        updateEvent(event,'id',event.id);
        updateEvent(event,'name',event.name);
        updateEvent(event,'day',event.day);
        updateEvent(event,'done',event.done);
        setModalOpen(false);
    }
    
    return(
        <ul className="event-list">
            {data.map((event:any,index:number)=>{
                const backgroundColor = index % 2 === 0 ? '#343434' : '#3b3b3b';
                
                return(
                <li className='list-item' key={index} style={{backgroundColor}}>
                    {event.done? (<IoCheckmark style={{color:'green',fontSize:'1.2rem'}}></IoCheckmark>):(<IoClose style={{color:'#af2b2b',fontSize:'1.2rem'}}></IoClose>)}
                    {event.name}
                    <div className='event-btns'>
                        <Button onClick={()=>handleEdit(event)} color='ghost'>
                            <IoPencil></IoPencil>
                        </Button> 
                        <Button onClick={()=>handleDelete(event)} color='ghost'>
                            <IoTrashOutline></IoTrashOutline>
                        </Button>
                    </div>
                </li>
                );
            })}
        <Modal header='Editace úkolu' showModal={modalOpen} closeModal={()=>setModalOpen(false)}>
            {editEvent &&(<Form initialData={editEvent} returnData={(e)=>saveEdit(e)}></Form>)}
        </Modal>
        </ul>
    );
}
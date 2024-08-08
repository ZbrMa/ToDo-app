import { useEffect, useState } from "react";
import { Button } from "./button";
import './styles/modal.css';

type Props = {
    header:string,
    children:React.ReactNode,
    showModal:boolean;
    closeModal:(state:boolean)=>void;
}

export function Modal({header,children,showModal,closeModal}:Props){
    const[open,setOpen] = useState(false);

    useEffect(()=>{
        setOpen(showModal);
    },[showModal]);

    const handleClose=()=>{
        setOpen(false);
        closeModal(false);
    }

    if(open){
        return(
            <div className="modal-overlay">
                <div className="modal">
                    <div className="modal-head">
                        {header} 
                        <Button onClick={handleClose}>X</Button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-content">{children}</div>
                    </div>
                </div>
            </div>

        );
    }
    else{
        return null;
    }
   
}
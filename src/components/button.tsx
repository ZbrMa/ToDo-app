import { useEffect, useState } from "react";
import './styles/button.css';

type ColorsOptions = 'primary' | 'secondary' | 'destructive' | 'ghost';
type SizeOptions = 'small' | 'default' | 'big';

type ColorStyle = {
    backgroundColor:string;
    color:string;
};

interface SizeStyle {
    fontSize:string;
};

const sizes:Record<SizeOptions,SizeStyle> = {
    'small': {fontSize:'0.8rem'},
    'default': {fontSize:'1.2rem'},
    'big': {fontSize:'1.8rem'},
};

type Props = {
    onClick:()=>void;
    color?:ColorsOptions;
    size?:SizeOptions;
    children:React.ReactNode;
}

export function Button({onClick,color='primary',size='default',children}:Props){

    const [isHover,setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const colors:Record<ColorsOptions,ColorStyle> = {
        'primary': isHover? {backgroundColor:'var(--primaryHover)',color:'var(--grayHover)'} :{backgroundColor:'var(--primary)',color:'var(--grayHover)'},
        'secondary': isHover? {backgroundColor:'var(--secondaryHover)',color:'black'} :{backgroundColor:'var(--secondary)',color:'black'},
        'destructive': isHover? {backgroundColor:'var(--redHover)',color:'white'} :{backgroundColor:'var(--red)',color:'white'},
        'ghost': isHover? {backgroundColor:'transparent',color:'var(--grayHover)'} :{backgroundColor:'transparent',color:'var(--gray)'},
    };

    const choosenColor = colors[color];
    const choosenSize = sizes[size];
    const styles = {...choosenColor,...choosenSize}

    return(
        <button className="btn" onClick={onClick} style={styles} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{children}</button>
    );
};

type FilterProps = {
    onClick: (value:string)=>void;
    filterValue:string;
    filter:string;
}

export function FilterButton({onClick,filterValue,filter}:FilterProps){
    const  [active,setActive] = useState(false);    

    useEffect(()=>{
        if(filter === filterValue){
            setActive(true);
        }
        else {
            setActive(false);
        }
    },[filter])
    
    const handleClick = ()=> {
        onClick(filterValue);
        setActive(true);
    };

    return(
        <Button size="small" color={active? 'primary':'ghost'} onClick={()=>onClick(filterValue)}>{filterValue}</Button>
    );
};
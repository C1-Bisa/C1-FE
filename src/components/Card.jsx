'use client';
import Button from './Button';
import { FiX } from 'react-icons/fi';

function Card({ className, children }) {
    return <div className={`${className} relative h-full w-full overflow-hidden rounded-rad-3 bg-white shadow-low`}>{children}</div>;
}

function Title({ handleCardShow, className, children }) {
    return (
        //border-b-[1px] -> optional
        <div className={`${className} flex items-center justify-between px-4`}>
            <div>{children || ''}</div>
            <Button onClick={handleCardShow} className='bg-white h-7 w-7'>
                <FiX className='w-full h-full' />
            </Button>
        </div>
    );
}

function Body({ className, children }) {
    return <div className={`${className} px-4`}>{children}</div>;
}

function Footer({ handleCardAction, className, children }) {
    return (
        <div className={`${className} absolute bottom-3 right-4`}>
            <Button onClick={handleCardAction} className='h-[48px] w-[150px] rounded-rad-3 bg-pur-5 py-3 text-white hover:bg-pur-2 '>
                {children}
            </Button>
        </div>
    );
}

Card.Title = Title;
Card.Body = Body;
Card.Footer = Footer;

export default Card;

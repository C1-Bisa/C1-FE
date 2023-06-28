'use client';

import Label from './Label';
import Input from './Input';

export default function ToggleSwitch({ className, id, isToggle, handleToggleAction }) {
    return (
        <div className={`${className}`}>
            <Label htmlFor={id} className='relative inline-block h-[24px] w-[40px] cursor-pointer'>
                <Input
                    id={id}
                    name={id}
                    type='checkbox'
                    checked={isToggle}
                    onChange={handleToggleAction}
                    className='peer h-0 w-0 opacity-0'
                />

                <span className='absolute bottom-0 left-0 right-0 top-0 cursor-pointer rounded-[20px] bg-net-3 transition duration-300 before:absolute before:bottom-[2px] before:left-[2px] before:h-[20px] before:w-[20px] before:cursor-pointer before:rounded-[20px] before:bg-white before:transition before:duration-300 before:content-[""] peer-checked:bg-pur-5 peer-checked:before:translate-x-[16px]' />
            </Label>
        </div>
    );
}

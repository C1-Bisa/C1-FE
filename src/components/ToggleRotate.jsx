'use client';

import Image from 'next/image';

export default function ToggleRotate({ isToggle, handleToggleAction }) {
    return (
        <div onClick={handleToggleAction} className='relative h-[32px] w-[32px]'>
            <Image className={`${isToggle ? 'rotate-180' : 'rotate-0'} transition-all`} src='./images/rotate_icon.svg' alt='Rotate icon' fill />
        </div>
    );
}

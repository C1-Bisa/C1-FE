'use client';

import { FiUser,FiList,FiBell } from 'react-icons/fi';
import Image from 'next/image';
// import Button from './ButtonRiwayatPassword';

export default function Navbar({ className }, onClick) {
    return (
        <div className={`${className} shadow-low -my-2`}>
            <div className=' container mx-auto flex max-w-screen-xl justify-between py-[18px]'>
                <div className='ml-[128px] flex items-center justify-between'>
                    <Image src={'./images/tiketku_logo.svg'} width={98} height={53} alt='' />

                    {/* <SearchBar /> */}
                </div>
                <div className='mx-[136px] flex items-center justify-center gap-6'>
                    <FiList onClick={onClick} className='cursor-pointer hover:text-pur-3' width={24} height={24} />
                    <FiBell onClick={onClick} className='cursor-pointer hover:text-pur-3' width={24} height={24}  />
                    <FiUser onClick={onClick} className='cursor-pointer hover:text-pur-3' width={24} height={24}  />
                </div>

                {/* <Button className='flex items-center justify-center gap-3 rounded-rad-3 bg-pur-4 px-4 py-[14px] text-white'>
                    <FiLogIn />
                    Masuk
                </Button> */}
            </div>
        </div>
    );
}

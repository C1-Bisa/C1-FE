'use client';

import { FiLogIn } from 'react-icons/fi';
import Image from 'next/image';

export default function Navbar({ className }) {
    return (
        <div className={`${className} shadow-low -my-2`}>
            <div className=' container mx-auto flex max-w-screen-xl justify-between py-[18px]'>
                <div className='ml-[128px] flex items-center justify-between'>
                    <Image src={'./images/logo_tiketku.svg'} width={98} height={53} alt='' />

                    {/* <SearchBar /> */}
                </div>
                <div className='mx-[136px] flex items-center justify-center gap-6'>
                    <Image src={'./images/fi_list.svg'} width={24} height={24} alt='' />
                    <Image src={'./images/fi_bell.svg'} width={24} height={24} alt='' />
                    <Image src={'./images/fi_user.svg'} width={24} height={24} alt='' />
                </div>

                {/* <Button className='flex items-center justify-center gap-3 rounded-rad-3 bg-pur-4 px-4 py-[14px] text-white'>
                    <FiLogIn />
                    Masuk
                </Button> */}
            </div>
        </div>
    );
}

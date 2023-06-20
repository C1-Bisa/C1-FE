'use client';

import {
    MdFlightTakeoff,
    MdDateRange,
    MdAirlineSeatReclineNormal,
    MdNotifications,
    MdOutlineAccountCircle,
} from 'react-icons/md';
// import { FaUser } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';
import { SlNotebook } from 'react-icons/sl';

export default function BottomNavbar() {
    return (
        <div className='fixed inset-x-0 bottom-0 flex justify-around  bg-white  p-2 text-center text-3xl '>
            <div className='flex flex-col items-center justify-center gap-1'>
                <FiHome />
                <h1 className='text-body-1 font-bold'>Home</h1>
            </div>
            <div className='flex flex-col items-center justify-center gap-1'>
                <SlNotebook />
                <h1 className='text-body-1 font-bold'>Riwayat</h1>
            </div>
            <div className='flex flex-col items-center justify-center gap-1'>
                <MdNotifications />
                <h1 className='text-body-1 font-bold'>Notifikasi</h1>
            </div>
            <div className='flex flex-col items-center justify-center gap-1'>
                <MdOutlineAccountCircle />
                <h1 className='text-body-1 font-bold'> Akun</h1>
            </div>
        </div>
    );
}

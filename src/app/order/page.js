'use client';
import Navbar from '@/components/Navbar';
import Label from '@/components/Label';
import Input from '@/components/Input';

import Button from '@/components/Button';
import { useState } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { flightSeat } from '@/utils/flightSeat';
import styles from '../../style/SeatSelect.module.css';
import ToggleSwitch from '@/components/ToggleSwitch';

export default function Order() {
    const [seat, setSeat] = useState([]);

    const handleSeat = (value) => {
        let lenth = 5;

        if (seat.length === lenth) {
            setSeat([]);
            return;
        }

        const newArr = seat.filter((data) => data !== value);
        setSeat((prev) => (prev.find((data) => data === value) ? [...newArr] : [...seat, value]));
    };

    // console.log(seat);

    const center = { display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '100px' };

    return (
        <>
            <Navbar className={'hidden lg:block'} />

            {/* DEKSTOP MODE */}
            <div className='mx-auto mt-[47px] hidden max-w-screen-lg grid-cols-12 font-poppins lg:grid '>
                {/* header order */}
                <div className='col-span-12 flex gap-3 text-head-1 font-bold'>
                    <h1 className='cursor-pointer text-black'>Isi Data Diri</h1>
                    <p>{'>'}</p>
                    <h1 className='text-net-3'>Bayar</h1>
                    <p>{'>'}</p>
                    <h1 className='text-net-3'>Selesai</h1>
                </div>
                {/* header order */}
                <div className='col-span-6'>
                    {/* INPUT USER */}
                    <div className='flex flex-col gap-4 rounded-rad-2 px-[16px] py-[24px] shadow-low'>
                        <h1>Isi Data Diri Pemesan</h1>
                        <div className=' rounded-t-rad-2 bg-net-4 px-4 py-2 text-white'>
                            <h2>Data Diri Pemesan</h2>
                        </div>
                        <div>
                            <Label>Nama Lengkap</Label>
                            <Input />
                        </div>

                        <div className='flex items-center justify-between'>
                            <p>Punya Nama Keluarga?</p>
                            <ToggleSwitch />
                        </div>
                        <div>
                            <Label>Nama Keluarga</Label>
                            <Input />
                        </div>
                        <div>
                            <Label>Nomor Telepon</Label>
                            <Input />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input />
                        </div>
                    </div>
                    {/* INPUT USER */}
                </div>
                <div className='col-span-6'>
                    <h1>Test</h1>
                </div>
            </div>
            {/* DEKSTOP MODE */}
        </>
    );
}

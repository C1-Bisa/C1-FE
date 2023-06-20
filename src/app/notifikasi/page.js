'use client';

import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Label from '@/components/Label';
import Input from '@/components/Input';
import { FiArrowLeft, FiFilter } from 'react-icons/fi';
import { IoSearchSharp } from 'react-icons/io5';
import RiwayatPesananKanan from '@/components/RiwayatPesananKanan';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BottomNavbar from '@/components/BottomNavbar';

export default function Notifikasi() {
    const router = useRouter();
    return (
        <>
            <Navbar className={'hidden lg:block'} />
            <div className='container mx-auto hidden max-w-screen-lg grid-cols-12 gap-3 font-poppins lg:grid'>
                <h1 className='col-span-12 mb-[24px] mt-[47px] font-poppins text-head-1 font-bold'>Notifikasi</h1>
                <div className='col-span-12 grid grid-cols-12 gap-[18px]'>
                    <div
                        className='col-span-10 flex cursor-pointer items-center gap-4 rounded-rad-3 bg-pur-3 py-[13px] font-poppins text-title-2 font-medium text-white'
                        onClick={() => router.push('/')}>
                        <FiArrowLeft className='ml-[21px]  h-6 w-6 ' />
                        <p>Beranda</p>
                    </div>
                    <div className='col-span-2 flex items-center gap-4'>
                        <Button className='flex items-center gap-2 rounded-rad-4 border border-pur-4 px-2 py-[4px] text-title-2'>
                            <FiFilter className='h-5 w-5 text-net-3 ' /> Filter
                        </Button>
                        <IoSearchSharp className='h-6 w-6 text-pur-4' />
                    </div>
                </div>
            </div>

            <div className='container mx-auto mt-5 hidden max-w-screen-lg grid-cols-12 gap-3 font-poppins lg:grid'>
                <div className='col-span-10 flex justify-between border-b border-net-3 py-4'>
                    <div className='flex items-start gap-3'>
                        <Image alt='' src={'/images/bell_notif.svg'} height={24} width={24} />
                        <div>
                            <p className='text-net-3'>Promosi</p>
                            <p>Dapatkan Potongan 50% Tiket!</p>
                            <p className='text-net-3'>Syarat dan Ketentuan berlaku!</p>
                        </div>
                    </div>
                    <div className='flex items-start gap-3'>
                        <p className='text-net-3'>20 Maret, 14:04</p>
                        <Image alt='' src={'/images/notif_notread.svg'} width={12} height={12} className='mt-1 block' />
                    </div>
                </div>
                <div className='col-span-10 flex justify-between border-b border-net-3 py-4'>
                    <div className='flex items-start gap-3'>
                        <Image alt='' src={'/images/bell_notif.svg'} height={24} width={24} />
                        <div className='max-w-[410px]'>
                            <p className='text-net-3'>Notifikasi</p>
                            <p>
                                Terdapat perubahan pada jadwal penerbangan kode booking 45GT6. Cek jadwal perjalanan Anda disini!
                            </p>
                            {/* <p className='text-net-3'>Syarat dan Ketentuan berlaku!</p> */}
                        </div>
                    </div>
                    <div className='flex  items-start gap-3 '>
                        <p className=' text-net-3'>5 Maret, 14:04</p>
                        <Image alt='' src={'/images/notif_read.svg'} width={12} height={12} className='mt-1 block' />
                    </div>
                </div>
            </div>

            {/* RESPONSIVE MODE */}
            <div className='mx-[24px] mt-[64px] font-poppins lg:hidden'>
                <h1 className='text-head-2 font-bold text-black'>Notifikasi</h1>
                {/* notif container */}
                <div className='mt-[30px]'>
                    <div>
                        <div className='flex items-start gap-3 border-b border-net-3 py-4'>
                            <Image alt='' src={'/images/bell_notif.svg'} height={24} width={24} />
                            <div className=' w-full'>
                                <div className='flex justify-between'>
                                    <p className='text-body-1 text-net-3'>Promosi</p>
                                    <div className='flex items-start gap-3'>
                                        <p className='text-body-1 text-net-3'>20 Maret, 14:04</p>
                                        <Image
                                            alt=''
                                            src={'/images/notif_notread.svg'}
                                            width={12}
                                            height={12}
                                            className='mt-1 block'
                                        />
                                    </div>
                                </div>
                                <p className='text-body-2'>Dapatkan Potongan 50% Tiket!</p>
                                <p className='text-body-1 text-net-3'>Syarat dan Ketentuan berlaku!</p>
                            </div>
                        </div>
                        <div className='flex items-start gap-3 border-b border-net-3 py-4'>
                            <Image alt='' src={'/images/bell_notif.svg'} height={24} width={24} />
                            <div className=' w-full'>
                                <div className='flex justify-between'>
                                    <p className='text-body-1 text-net-3'>Promosi</p>
                                    <div className='flex items-start gap-3'>
                                        <p className='text-body-1 text-net-3'>20 Maret, 14:04</p>
                                        <Image
                                            alt=''
                                            src={'/images/notif_notread.svg'}
                                            width={12}
                                            height={12}
                                            className='mt-1 block'
                                        />
                                    </div>
                                </div>
                                <p className='text-body-2'>Dapatkan Potongan 50% Tiket!</p>
                                <p className='text-body-1 text-net-3'>Syarat dan Ketentuan berlaku!</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* notif container */}
                <BottomNavbar />
            </div>
            {/* RESPONSIVE MODE */}
        </>
    );
}

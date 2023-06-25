'use client';
import Navbar from '@/components/Navbar';
import Label from '@/components/Label';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useState } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Payment() {
    const router = useRouter();

    const [open, setOpen] = useState({
        id: 0,
    });

    const handleOpen = (value) =>
        setOpen((prev) =>
            prev.id === value.id
                ? {
                      id: 0,
                  }
                : {
                      id: value.id,
                  }
        );

    const datas = [
        {
            id: 1,
            name: 'Gopay',
        },
        {
            id: 2,
            name: 'Virtual Account',
        },
        {
            id: 3,
            name: 'Credit Card',
        },
    ];

    const paymentMenu = {
        1: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', margin: '24px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h1>First Name</h1>
                        <Input />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h1>Last Name</h1>
                        <Input />
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h1>Number</h1>
                    <Input type='number' style={{ width: '100%' }} />
                </div>
            </div>
        ),
        2: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', margin: '24px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h1>First Name</h1>
                        <Input />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h1>Last Name</h1>
                        <Input />
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h1>Email Address</h1>
                    <Input style={{ width: '100%' }} />
                </div>
            </div>
        ),
        3: (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <div
                    style={{
                        margin: '24px 0',
                        display: 'flex',
                        gap: '16px',
                        justifyContent: 'center',
                    }}>
                    <div className='relative h-[30px] w-[30px]'>
                        <Image src={'/images/mastercard_logo.svg'} fill alt='' />
                    </div>
                    <div className='relative h-[30px] w-[30px]'>
                        <Image src={'/images/visa_logo.svg'} fill alt='' />
                    </div>
                    <div className='relative h-[30px] w-[30px]'>
                        <Image src={'/images/amex_logo.svg'} fill alt='' />
                    </div>
                    <div className='relative h-[30px] w-[30px]'>
                        <Image src={'/images/paypal_logo.svg'} fill alt='' />
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '18px',
                    }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <Label fontSize='1.4rem' fontWeight='500' color='#151515' lineHeight='20px'>
                            Card number
                        </Label>
                        <Input placeholder='4480 0000 0000 0000' type='number' style={{ width: '100%' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <Label fontSize='1.4rem' fontWeight='500' color='#151515' lineHeight='20px'>
                            Card holder name
                        </Label>
                        <Input placeholder='John Doe' style={{ width: '100%' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '32px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <Label fontSize='1.4rem' fontWeight='500' color='#151515' lineHeight='20px'>
                                CVV
                            </Label>
                            <Input placeholder='000' type='number' />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <Label fontSize='1.4rem' fontWeight='500' color='#151515' lineHeight='20px'>
                                Expiry date
                            </Label>
                            <Input placeholder='07/24' type='number' />
                        </div>
                    </div>
                </div>
            </div>
        ),
    };
    return (
        <>
            <Navbar />

            <div className='mx-auto mt-[47px] grid max-w-screen-lg grid-cols-12 font-poppins'>
                {/* header order */}
                <div className='col-span-12 flex gap-3 text-head-1 font-bold'>
                    <h1 className='cursor-pointer text-black' onClick={() => router.push('/order')}>
                        Isi Data Diri
                    </h1>
                    <p>{'>'}</p>
                    <h1 className='text-black'>Bayar</h1>
                    <p>{'>'}</p>
                    <h1 className='text-net-3'>Selesai</h1>
                </div>
                {/* header order */}
                <div className='col-span-12 mt-[120px] grid grid-cols-12'>
                    <div className='col-span-7'>
                        <div className='flex w-[486px] flex-col gap-[10px]'>
                            {datas &&
                                datas.map((data, index) => (
                                    <div key={index}>
                                        <div
                                            style={{ background: open.id === data.id ? '#7126B5' : '#3c3c3c' }}
                                            className='flex h-[50px] w-full items-center justify-between rounded-rad-1 bg-[#3c3c3c] px-[16px]'
                                            onClick={() => handleOpen(data)}>
                                            <p className='text-white'>{data.name}</p>
                                            {open.id === data.id ? (
                                                <FiChevronUp style={{ color: 'white', width: '20px', height: '20px' }} />
                                            ) : (
                                                <FiChevronDown style={{ color: 'white', width: '20px', height: '20px' }} />
                                            )}
                                        </div>
                                        {open.id === data.id && paymentMenu[data.id]}
                                    </div>
                                ))}
                            <Button
                                text={'Bayar'}
                                className='rounded-rad-3 bg-[#7126b5] px-[12px] py-[16px] text-head-1 font-medium text-white hover:bg-pur-3'
                            />
                        </div>
                    </div>

                    <div className='col-span-5'>
                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center justify-between'>
                                <h1 className='text-title-3 font-bold '>Detail Pesanan</h1>
                                <p className='w-max rounded-rad-4 bg-alert-1 px-3 py-1 text-body-6 text-white'>Issued</p>
                            </div>
                            <h1 className=' text-title'>
                                Booking Code : <span className='font-bold text-pur-5'>6723y2GHK</span>
                            </h1>
                            <div className='flex justify-between'>
                                <div>
                                    <h2 className='text-title-2 font-bold'>19:10</h2>
                                    <p className='text-body-6 font-normal'>5 Maret 2023</p>
                                    <p className='text-body-6 font-normal'>Soekarno Hatta</p>
                                </div>
                                <div>
                                    <h3 className='font-bold text-pur-3'>Keberangkaran</h3>
                                </div>
                            </div>
                            {/* divider */}
                            <div className='mb-2 mt-4 flex justify-center'>
                                <div className='w-1/2 border border-net-2'></div>
                            </div>
                            {/* divider */}

                            <div className='flex items-center gap-4'>
                                <div className='relative h-[24px] w-[24px]'>
                                    <Image src={'/images/flight_badge.svg'} fill alt='' />
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div>
                                        <h1 className='text-body-6 font-bold'>Jet Air - Economy</h1>
                                        <h2 className='text-body-5 font-bold'>JT - 203</h2>
                                    </div>
                                    <div>
                                        <h3 className='text-body-5 font-bold'>Informasi :</h3>
                                        <p className='text-body-5 font-normal'>Penumpang 1: Mr.Arief</p>
                                        <p className='text-body-5 font-normal'>ID: 1234567</p>
                                        <p className='text-body-5 font-normal'>Penumpang 2: Mr.Alexa</p>
                                        <p className='text-body-5 font-normal'>ID: 1234567</p>
                                    </div>
                                </div>
                            </div>
                            {/* divider */}
                            <div className='mb-2 mt-4 flex justify-center'>
                                <div className='w-1/2 border-[1px] border-t-net-2'></div>
                            </div>
                            {/* divider */}
                            <div className='flex justify-between'>
                                <div>
                                    <h2 className='text-title-2 font-bold'>21:10</h2>
                                    <p className='text-body-6 font-normal'>Melbourne International Airport</p>
                                    <p className='text-body-6 font-normal'>Soekarno Hatta</p>
                                </div>
                                <div>
                                    <h3 className='font-bold text-pur-3'>Kedatangan</h3>
                                </div>
                            </div>
                            {/* divider */}
                            <div className='mb-2 mt-4 flex justify-center'>
                                <div className='w-full border-[1px] border-t-net-2'></div>
                            </div>
                            {/* divider */}
                            <h1 className='text-body-6 font-bold'>Rincian Harga : </h1>
                            <div className='flex justify-between'>
                                <div className='text-body-6'>
                                    <p>2 Adults</p>
                                    <p>1 Baby</p>
                                    <p>TAX</p>
                                </div>
                                <div className='text-body-6'>
                                    <p>IDR 9.550.000</p>
                                    <p>IDR 0</p>
                                    <p>IDR 300.000</p>
                                </div>
                            </div>
                            {/* divider */}
                            <div className='mb-2 mt-4 flex justify-center'>
                                <div className='w-full border-[1px] border-t-net-2'></div>
                            </div>
                            {/* divider */}
                            <div className='flex justify-between text-title-3 font-bold'>
                                <p>Total</p>
                                <p className='text-pur-5'>IDR 9.850.000</p>
                            </div>
                            <Button className='w-full rounded-rad-3 bg-pur-4 py-[18px] text-head-1 font-medium text-white'>
                                Simpan
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

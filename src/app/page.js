'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import HomeSearch from '@/components/HomeSearch';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { flightSlice } from '@/store/flight';
import Button from '@/components/Button';
import ToggleSwitch from '@/components/ToggleSwitch';
// import { useSession, signOut, signIn } from 'next-auth/react';
// import { getTest } from '@/store/flight';

// responsive mode
import {
    MdFlightTakeoff,
    MdDateRange,
    MdAirlineSeatReclineNormal,
    MdNotifications,
    MdOutlineAccountCircle,
} from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { FiHome } from 'react-icons/fi';
import { SlNotebook } from 'react-icons/sl';
// import { BiSolidUser } from 'react-icons/bi';
// import { BiSolidUser } from 'react-icons/bi';
// import { MdFlightTakeoff } from 'react-icons/md';
import Input from '@/components/Input';
import BottomNavbar from '@/components/BottomNavbar';
// responsive mode

export default function Home() {
    const router = useRouter();
    const dispatch = useDispatch();
    // const test_data = useSelector(getTest);
    // console.log('Test BRO:>', test_data);
    // const { data: session, status } = useSession();
    const { setFetchFlightStatus, setSearchPageIsSearchAgain } = flightSlice.actions;

    return (
        <>
            <Navbar className={'hidden lg:block'} />
            <div className=' mt-8 hidden h-[232px] grid-cols-12  lg:grid'>
                <div className='relative col-span-12 '>
                    <Image
                        src={'./images/banner.svg'}
                        alt=''
                        fill={true}
                        quality={100}
                        priority
                        className='opacity-0 transition-opacity duration-[1s]'
                        onLoadingComplete={(image) => image.classList.remove('opacity-0')}
                    />
                </div>
            </div>
            <HomeSearch
                className={'h-[298px] w-[968px]'}
                handleActionHomeSearch={() => {
                    dispatch(setSearchPageIsSearchAgain(true));
                    dispatch(setFetchFlightStatus(true));
                    router.push('/search');
                }}
            />

            {/* RESPONSIVE MODE */}
            <div className='h-screen bg-pur-2 px-4 font-poppins lg:hidden'>
                <h1 className='pt-[32px] text-head-2 font-bold text-net-5'>Hei, Mau Kemana</h1>
                <div className='mt-4 flex   flex-col gap-5 rounded-rad-2 bg-white px-[30px]'>
                    <div className='invisible '>
                        <h1>test</h1>
                    </div>
                    {/* input flight */}
                    <div className=' flex flex-col gap-1 rounded-rad-2 border p-2 '>
                        <div className='my-1 grid grid-cols-12'>
                            <div className='col-span-4 flex gap-[10px]'>
                                <MdFlightTakeoff className='h-[20px] w-[20px] text-net-3' />
                                <p className='text-net-3'>From</p>
                            </div>
                            <Input
                                className='col-span-8 border-none text-title-2 font-medium text-black'
                                value={'Jakarta (JKTA)'}
                            />
                        </div>

                        <div className=' flex items-center gap-3'>
                            <div className='h-[1px] w-full border text-net-3'></div>
                            <Image alt='' src={'/images/up_down.svg'} width={20} height={20} />
                        </div>

                        <div className='my-1 grid grid-cols-12 '>
                            <div className='col-span-4 flex gap-[10px]'>
                                <MdFlightTakeoff className='h-[20px] w-[20px] text-net-3' />
                                <p className='text-net-3'>To</p>
                            </div>
                            <Input
                                className='col-span-8 border-none text-title-2 font-medium text-black'
                                value={'Melbourne (MLB)'}
                            />
                        </div>
                    </div>
                    {/* input flight */}

                    {/* pp */}
                    <div className=' flex justify-between'>
                        <h1 className='text-body-5'>Pulang-Pergi?</h1>
                        <ToggleSwitch />
                    </div>
                    {/* pp */}

                    {/* penumpang */}
                    <div className='flex flex-col gap-5'>
                        <div className='grid grid-cols-12 gap-3'>
                            <div className='col-span-6 flex items-center gap-4'>
                                <MdDateRange className='h-[30px] w-[30px] text-net-3' />
                                <div>
                                    <h1 className='text-body-5 font-medium text-net-3'>Derpature</h1>
                                    <Input
                                        className='mt-1 border-[1px] border-l-0 border-r-0 border-t-0 border-b-net-2  py-1 font-poppins text-body-5 font-medium'
                                        value={'1 Maret 2023'}
                                    />
                                </div>
                            </div>
                            <div className='col-span-6 flex items-center gap-4'>
                                <MdDateRange className='h-[30px] w-[30px] text-net-3' />
                                <div>
                                    <h1 className='text-body-5 font-medium text-net-3'>Return</h1>
                                    <Input
                                        className='mt-1 border-[1px] border-l-0 border-r-0 border-t-0 border-b-net-2  py-1 font-poppins text-body-5 font-medium'
                                        value={'1 Maret 2023'}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* divide */}
                        <div className='grid grid-cols-12 gap-4'>
                            <div className='col-span-6 flex items-center gap-4'>
                                <FaUser className='h-[24px] w-[24px] text-net-3' />
                                <div>
                                    <h1 className='text-body-5 font-medium text-net-3'>Passenger</h1>
                                    <Input
                                        className='mt-1 border-[1px] border-l-0 border-r-0 border-t-0 border-b-net-2  py-1 font-poppins text-body-5 font-medium'
                                        value={'1 Maret 2023'}
                                    />
                                </div>
                            </div>
                            <div className='col-span-6 flex items-center gap-4'>
                                <MdAirlineSeatReclineNormal className='h-[30px] w-[30px] text-net-3' />
                                <div>
                                    <h1 className='text-body-5 font-medium text-net-3'>Seat Class</h1>
                                    <Input
                                        className='mt-1 border-[1px] border-l-0 border-r-0 border-t-0 border-b-net-2  py-1 font-poppins text-body-5 font-medium'
                                        value={'1 Maret 2023'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* penumpang */}
                    <Button className=' w-full rounded-rad-3 bg-pur-4 py-3 text-white'>Cari Penerbangan</Button>

                    {/* destinasi */}

                    <h1 className='text-title-2 font-medium'>Destinasi Favorite</h1>
                    <div className='mb-28 grid grid-cols-12 gap-3'>
                        <div className='col-span-6   flex  flex-col gap-2 rounded-rad-2 p-1 shadow-low'>
                            <div className='relative h-[100px] w-full'>
                                <Image alt='' src={'/images/sidney.svg'} fill style={{ objectFit: 'cover' }} />
                            </div>
                            <div>
                                <h1 className='text-body-3 font-medium'>Jakarta {'->'} Bangkok</h1>
                                <p className='text-body-1 font-bold'>AirAsia</p>
                                <p className='text-body-2 font-medium'>20 - 30 Maret 2023</p>
                                <p className='text-body-2  text-black'>
                                    Mulai dari <span className='font-bold text-alert-3'>IDR 950.000</span>
                                </p>
                            </div>
                        </div>
                        <div className='col-span-6 flex flex-col  gap-2 rounded-rad-2 p-1 shadow-low'>
                            <div className='relative h-[100px] w-full '>
                                <Image alt='' src={'/images/sidney.svg'} fill style={{ objectFit: 'cover' }} />
                            </div>
                            <div>
                                <h1 className='text-body-3 font-medium'>Jakarta {'->'} Bangkok</h1>
                                <p className='text-body-1 font-bold'>AirAsia</p>
                                <p className='text-body-2 font-medium'>20 - 30 Maret 2023</p>
                                <p className='text-body-2  text-black'>
                                    Mulai dari <span className='font-bold text-alert-3'>IDR 950.000</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* destinasi */}

                    {/* bottom navbar */}
                    {/* <div className='fixed inset-x-0 bottom-0 flex justify-around  bg-white  p-2 text-center text-3xl '>
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
                    </div> */}
                    <BottomNavbar />
                </div>
            </div>
            {/* RESPONSIVE MODE*/}

            {/* <div className='fixed inset-0 flex items-center justify-end bg-black bg-opacity-60'>
                <div className='relative h-screen w-1/2 bg-white font-poppins'>
                    <h1 className='m-5 text-3xl font-bold'>Your Ticket</h1>

                    <Button className='absolute bottom-5 right-5 rounded-rad-3 bg-pur-4 px-8 py-5 text-xl text-white'>
                        Order Now
                    </Button>
                </div>
            </div> */}
        </>
    );
}

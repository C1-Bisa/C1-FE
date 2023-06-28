'use client';

//Core
import { useRouter } from 'next/navigation';
import Image from 'next/image';

//Third Parties
import {
    MdFlightTakeoff,
    MdDateRange,
    MdAirlineSeatReclineNormal,
    MdNotifications,
    MdOutlineAccountCircle,
} from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { FiHome, FiX, FiSearch } from 'react-icons/fi';
import { SlNotebook } from 'react-icons/sl';

//Redux
import { useDispatch } from 'react-redux';
import { flightSlice } from '@/store/flight';

//Components
import Navbar from '@/components/Navbar';
import HomeSearch from '@/components/HomeSearch';
import Button from '@/components/Button';
import ToggleSwitch from '@/components/ToggleSwitch';
import Input from '@/components/Input';
import BottomNavbar from '@/components/BottomNavbar';
import { useState } from 'react';
import ToggleRotate from '@/components/ToggleRotate';
import Label from '@/components/Label';

//Utils
//----

export default function Home() {
    /*=== router ===*/
    const router = useRouter();

    /*=== next auth ===*/
    //----

    /*=== redux ===*/
    const dispatch = useDispatch();
    const { setFetchFlightStatus, setSearchPageIsSearchAgain } = flightSlice.actions;

    /*=== state ===*/
    const [choosedDesinationMenu, setChoosedDesinationMenu] = useState(1);

    /*=== dummy data ===*/
    const menuDataShape = [
        {
            id: 1,
            destination: 'Semua',
        },
        {
            id: 2,
            destination: 'Asia',
        },
        {
            id: 3,
            destination: 'Amerika',
        },
        {
            id: 4,
            destination: 'Australia',
        },
        {
            id: 5,
            destination: 'Eropa',
        },
        {
            id: 6,
            destination: 'Afrika',
        },
    ];

    const destinationDataShape = [
        {
            id: 1,
            imgUrl: '/new_images/bangkok.png',
            from: 'Jakarta',
            to: 'Bangkok',
            departure_dateTime_first: '2023-06-20',
            departure_dateTime_last: '2023-06-30',
            priceMinimum: 950000,
        },
        {
            id: 2,
            imgUrl: '/new_images/bangkok.png',
            from: 'Jakarta',
            to: 'Bangkok',
            departure_dateTime_first: '2023-06-20',
            departure_dateTime_last: '2023-06-30',
            priceMinimum: 950000,
        },
        {
            id: 3,
            imgUrl: '/new_images/sidney.png',
            from: 'Jakarta',
            to: 'Sidney',
            departure_dateTime_first: '2023-06-05',
            departure_dateTime_last: '2023-06-25',
            priceMinimum: 3650000,
        },
        {
            id: 4,
            imgUrl: '/new_images/sidney.png',
            from: 'Jakarta',
            to: 'Sidney',
            departure_dateTime_first: '2023-06-05',
            departure_dateTime_last: '2023-06-25',
            priceMinimum: 3650000,
        },
    ];

    /*=== function ===*/
    //----

    /*=== effects ===*/
    //----

    return (
        <div className='overflow-x-hidden'>
            {/* DEKSTOP MODE */}

            <Navbar className={'hidden lg:block'} />
            <div className=' mt-8 hidden h-[232px] grid-cols-12  lg:grid'>
                <div className='relative col-span-12 '>
                    <Image
                        src={'/new_images/home_banner.svg'}
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
                    // dispatch(setFetchFlightStatus(true));
                    router.push('/search');
                }}
            />

            <div className='mx-auto mt-8 hidden max-w-screen-lg grid-cols-12 font-poppins lg:grid'>
                <div className='col-span-12 grid grid-cols-12'>
                    <h1 className='col-span-12 mb-4 text-title-2 font-bold'>Destinasi Favorit</h1>
                    <div className='col-span-12 flex items-center gap-4'>
                        {menuDataShape &&
                            menuDataShape.map((menu, index) => {
                                return (
                                    <div key={index}>
                                        <Button
                                            className={`${
                                                choosedDesinationMenu === menu.id ? 'bg-pur-3 text-white ' : 'bg-pur-2 text-net-4'
                                            } flex items-center  gap-2 rounded-rad-3  px-6 py-[14px] text-body-6 `}>
                                            <FiSearch /> {menu.destination}
                                        </Button>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className='col-span-12 mt-8 grid grid-cols-12 gap-5 '>
                    {destinationDataShape &&
                        destinationDataShape.map((destination, index) => {
                            return (
                                <div key={index} className='col-span-3 rounded-rad-2 p-1 shadow-low'>
                                    <div className='relative h-[140px] w-full'>
                                        <Image alt='' src={destination.imgUrl} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <div className='flex items-center gap-2'>
                                            <h1 className='text-title-1 font-medium'>{destination.from}</h1>
                                            <p>{'->'}</p>
                                            <h1 className='text-title-1 font-medium'>{destination.to}</h1>
                                        </div>
                                        <p className='text-body-6 font-bold text-pur-3'>AirAsia</p>
                                        <p className='ttext-body-4 font-medium'>20 - 30 Maret 2023</p>
                                        <p className='text-body-6 text-black'>
                                            Mulai dari <span className='font-bold text-alert-3'>IDR 950.000</span>
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>

            <div className='mx-auto hidden h-screen max-w-screen-lg lg:block'>
                <h1 className='mt-5'>Content</h1>
            </div>
            {/* DEKSTOP MODE */}

            {/* RESPONSIVE MODE */}
            <div className='h-screen font-poppins lg:hidden '>
                <div style={{ height: 'calc(100vh - 40vh)' }} className='bg-pur-3 px-4 '>
                    <h1 className='pt-[32px] text-head-2 font-bold text-white'>Hei, Mau Kemana</h1>
                    <div className='mt-2 grid grid-cols-12 rounded-rad-2 bg-white shadow-low'>
                        {/* form airport */}
                        <div className='col-span-12 m-5 border px-1'>
                            <div>
                                <div className='grid grid-cols-12'>
                                    <div className='col-span-3 flex items-center gap-2 text-net-3'>
                                        <MdFlightTakeoff />
                                        <p className='text-body-4'>From</p>
                                    </div>
                                    <Input
                                        className='col-span-9 border-b-0 border-l-0 border-r-0 border-t-0 py-3 font-poppins text-title-1 font-medium'
                                        placeholder={'Silahkan pilih lokasi...'}
                                        readOnly
                                        // value={chosenFromAirport}
                                        // onFocus={() => setFocusFromInput(true)}
                                        // onChange={handleFromInputChange}
                                    />
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div className='w-full border'></div>
                                    <ToggleRotate
                                    // isToggle={isToggle}
                                    // handleToggleAction={handleToggleAction}
                                    />
                                </div>
                                <div className='grid grid-cols-12'>
                                    <div className='col-span-3 flex items-center gap-2 text-net-3'>
                                        <MdFlightTakeoff />
                                        <p className='text-body-4'>to</p>
                                    </div>
                                    <Input
                                        className='col-span-9 border-b-0 border-l-0 border-r-0 border-t-0 py-3 font-poppins text-title-1 font-medium'
                                        placeholder={'Silahkan pilih lokasi...'}
                                        readOnly
                                        // value={chosenFromAirport}
                                        // onFocus={() => setFocusFromInput(true)}
                                        // onChange={handleFromInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* form airport */}

                        {/* toggle switch */}
                        <div className='col-span-12 flex items-center justify-between px-4'>
                            <h1 className='text-body-6 font-medium'>Pulang Pergi</h1>
                            <ToggleSwitch
                                // isToggle={isTwoWay}
                                // handleToggleAction={handleCalendarToggleAction}
                                id={'toggle_calendar'}
                                // className={'absolute right-[-36px]'}
                            />
                        </div>
                        {/* toggle switch */}

                        {/* choose airport */}
                        <div className='col-span-12 my-4 grid grid-cols-12 gap-2 px-4'>
                            <div className='col-span-6 flex items-center gap-3'>
                                <MdDateRange className='h-[40px] w-[40px] text-net-4' />
                                <div>
                                    <Label className='font-poppins text-body-6 font-medium text-net-3' htmlFor={'departure'}>
                                        Departure
                                    </Label>

                                    <Input
                                        id={'departure'}
                                        readOnly
                                        // value={formatToLocale(homeSearch.departure_dateTime)}
                                        // onClick={handleOpenCalendar}
                                        className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                                    />
                                </div>
                            </div>
                            <div className='col-span-6 flex items-center gap-3'>
                                <MdDateRange className='h-[40px] w-[40px] text-net-4' />
                                <div>
                                    <Label className='font-poppins text-body-6 font-medium text-net-3' htmlFor={'return'}>
                                        Return
                                    </Label>

                                    <Input
                                        id={'return'}
                                        readOnly
                                        // value={formatToLocale(homeSearch.departure_dateTime)}
                                        // onClick={handleOpenCalendar}
                                        className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                                    />
                                </div>
                            </div>
                            <div className='col-span-6 flex items-center gap-3'>
                                <FaUser className='h-[36px] w-[36px] text-net-4' />
                                <div>
                                    <Label className='font-poppins text-body-6 font-medium text-net-3' htmlFor={'passenger'}>
                                        Passengers
                                    </Label>
                                    <Input
                                        id={'passenger'}
                                        readOnly
                                        // onClick={handleOpenPassengerModal}
                                        className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                                        // value={`${totalPassenger} penumpang`}
                                        placeholder={'10 penumpang'}
                                    />
                                </div>
                            </div>
                            <div className='col-span-6 flex items-center gap-3'>
                                <MdAirlineSeatReclineNormal className='h-[44px] w-[44px] text-net-4' />
                                <div>
                                    <Label className='font-poppins text-body-6 font-medium text-net-3' htmlFor={'seat'}>
                                        Seat Class
                                    </Label>
                                    <Input
                                        id={'seat'}
                                        readOnly
                                        // onClick={handleOpenFlightClassModal}
                                        className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                                        // value={flightClass}
                                        placeholder={'Pilih kelas pesawat'}
                                    />
                                </div>
                            </div>

                            <div className='col-span-12 mt-6'>
                                <Button className='font-body-6 w-full rounded-rad-2 bg-pur-3 py-3 text-white'>
                                    Cari Penerbangan
                                </Button>
                            </div>
                        </div>
                        {/* choose airport */}
                    </div>
                </div>
                <div className='mt-[120px] px-4 '>
                    <h1 className='text-title-2 font-bold'>Destinasi Favorit</h1>
                    <div className='mt-8 grid grid-cols-12 gap-3 '>
                        {destinationDataShape &&
                            destinationDataShape.map((destination, index) => {
                                return (
                                    <div key={index} className='col-span-6 rounded-rad-2 p-2 shadow-low'>
                                        <div className='relative h-[140px] w-full'>
                                            <Image alt='' src={destination.imgUrl} fill style={{ objectFit: 'cover' }} />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='flex items-center gap-2'>
                                                <h1 className='text-body-4 font-medium'>{destination.from}</h1>
                                                <p>{'->'}</p>
                                                <h1 className='text-body-4 font-medium'>{destination.to}</h1>
                                            </div>
                                            <p className='text-body-4 font-bold text-pur-3'>AirAsia</p>
                                            <p className='text-body-4 font-medium'>20 - 30 Maret 2023</p>
                                            <p className='text-body-4 text-black'>
                                                Mulai dari <span className='font-bold text-alert-3'>IDR 950.000</span>
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>

                <div className='mt-[50px] h-screen px-4'>
                    <h1 className=''>Content</h1>
                </div>

                <BottomNavbar />
            </div>
            {/* RESPONSIVE MODE*/}
        </div>
    );
}

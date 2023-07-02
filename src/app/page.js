'use client';

//core
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

//third parties
import {
    MdFlightTakeoff,
    MdDateRange,
    MdAirlineSeatReclineNormal,
    MdNotifications,
    MdOutlineAccountCircle,
} from 'react-icons/md';
import { FaUser, FaTwitter, FaFacebook, FaInstagramSquare, FaYoutube, FaTiktok } from 'react-icons/fa';
import { FiHome, FiX, FiSearch } from 'react-icons/fi';
import { SlNotebook } from 'react-icons/sl';

//redux
import { useDispatch } from 'react-redux';
import { flightSlice } from '@/store/flight';

//components
import Navbar from '@/components/Navbar';
import HomeSearch from '@/components/HomeSearch';
import Button from '@/components/Button';
import ToggleSwitch from '@/components/ToggleSwitch';
import Input from '@/components/Input';
import BottomNavbar from '@/components/BottomNavbar';
import ToggleRotate from '@/components/ToggleRotate';
import Label from '@/components/Label';

//utils
import { menuDataShape, destinationDataShape } from '@/utils/dummyData';

export default function Home() {
    /*=== core ===*/
    const router = useRouter();

    /*=== next auth ===*/
    //----

    /*=== redux ===*/
    const dispatch = useDispatch();
    const { setFetchFlightStatus, setSearchPageIsSearchAgain } = flightSlice.actions;

    /*=== state ===*/
    const [choosedDesinationMenu, setChoosedDesinationMenu] = useState(1);

    /*=== function ===*/
    //----

    /*=== effects ===*/
    //----

    return (
        <div className='overflow-x-hidden'>
            {/* ==== DEKSTOP MODE ====  */}

            <Navbar className={'hidden lg:block'} />
            {/* banner */}
            <div className=' mt-[128px] hidden h-[232px] grid-cols-12  lg:grid'>
                <div className='relative col-span-12 '>
                    <Image
                        src={'/new_images/home_banner.svg'}
                        alt='home banner'
                        fill={true}
                        quality={100}
                        priority
                        className='opacity-0 transition-opacity duration-[1s]'
                        onLoadingComplete={(image) => image.classList.remove('opacity-0')}
                    />
                </div>
            </div>
            {/* banner */}

            {/* homesearch */}
            <HomeSearch
                className={'lg:h-[298px] lg:w-[968px]'}
                handleActionHomeSearch={() => {
                    dispatch(setSearchPageIsSearchAgain(true));
                    // dispatch(setFetchFlightStatus(true));
                    router.push('/search');
                }}
            />
            {/* homesearch */}

            {/* destination */}
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
                                                choosedDesinationMenu === menu.id ? 'bg-pur-3 text-white ' : 'bg-pur-4 text-net-1'
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
                                    <div className='relative  h-[140px] w-full'>
                                        <Image
                                            alt=''
                                            src={destination.imgUrl}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            className='z-0'
                                        />
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
            {/* destination */}

            {/* banner full image */}
            <div className='relative mt-[100px] hidden h-[600px] w-screen font-poppins lg:block'>
                <Image src={'https://i.imgur.com/j7QSh2P.jpg'} alt='' fill />

                <div className='absolute bottom-[72px] left-1/2 translate-x-[-50%]'>
                    <div className='flex w-[500px] flex-col  items-center gap-3 text-white '>
                        <h1 className='text-head-3 font-bold'>Travel with Enjoy</h1>
                        <div className='w-full border border-white'></div>
                        <h2 className='text-head-1'>Because {"you're"} our priority</h2>
                        <Button className=' rounded-rad-2 border-2 border-white bg-transparent px-5 py-3 text-white hover:border-pur-3 hover:bg-pur-3'>
                            Lebih Detail
                        </Button>
                    </div>
                </div>
            </div>
            {/* banner full image */}

            {/* describe our service */}
            <div className='mx-auto mb-[40px] mt-[50px] hidden max-w-screen-lg items-center justify-center font-poppins lg:flex '>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <div className='flex items-center '>
                        <Image src={'/new_images/logo.svg'} width={150} height={150} alt='' className='cursor-pointer' />
                        <h1 className='text-head-1 font-bold text-[#45705Cff]'>Team</h1>
                    </div>
                    <div className='mx-auto w-[576px]'>
                        <h1 className='text-center text-body-6'>
                            <span className='text-head-1 font-bold text-[#45705Cff]'>
                                FLY<span className='mr-1 text-[16px]'>ID</span>
                            </span>
                            adalah platform pemesanan tiket pesawat terdepan se-Asia Tenggara, kami menyediakan berbagai akses
                            tiket pesawat yang kamu bisa cari dan beli untuk mempermudah kebutuhan perjalanan kamu.
                        </h1>
                    </div>
                    <div>
                        <Button className=' rounded-rad-2 border-2 border-[#45705Cff] bg-transparent px-5 py-3 text-[#45705Cff] hover:border-[#45705Cff] hover:bg-[#45705Cff] hover:text-white'>
                            Lebih Detail
                        </Button>
                    </div>
                </div>
            </div>
            {/* describe our service */}

            {/* banner mobile */}
            <div className='relative hidden h-[600px] w-screen font-poppins lg:block'>
                <Image src={'/new_images/banner_mobile.svg'} alt='' fill />
            </div>

            {/* banner mobile */}

            {/* our partnets */}
            <div className='mx-auto mb-[100px] mt-[80px] hidden max-w-screen-lg grid-cols-12  items-center  border-b-2 border-t-2 border-pur-4 py-5 font-poppins lg:grid'>
                <div className='col-span-4'>
                    <h1 className='text-head-2 font-bold text-pur-4'>Our Airlines Partners</h1>
                </div>
                <div className='col-span-8 grid grid-cols-12 items-center gap-5'>
                    <Image alt='' src={'/new_images/garuda.png'} width={100} height={100} className='col-span-3' />
                    <Image alt='' src={'/new_images/batik.png'} width={100} height={100} className='col-span-3' />
                    <Image alt='' src={'/new_images/super_air_jet.png'} width={100} height={100} className='col-span-3' />
                    <Image alt='' src={'/new_images/air_asia.png'} width={100} height={100} className='col-span-3' />
                    <Image alt='' src={'/new_images/citilink.png'} width={100} height={100} className='col-span-3' />
                    <Image alt='' src={'/new_images/lion_air.png'} width={100} height={100} className='col-span-3' />
                    <Image alt='' src={'/new_images/sriwijaya_air.png'} width={100} height={100} className='col-span-3' />
                </div>
            </div>
            {/* our partnets */}

            {/* footer */}
            <footer style={{ height: 'calc(100vh - 200px)' }} className=' relative hidden bg-pur-5 font-poppins lg:block'>
                <div className=' mx-auto grid h-full max-w-screen-lg grid-cols-12 pb-12 '>
                    <div className='col-span-4 flex flex-col gap-5'>
                        <div className='mt-3  '>
                            <Image
                                src={'/new_images/logo_white.svg'}
                                width={150}
                                height={150}
                                alt=''
                                className='cursor-pointer'
                            />
                        </div>
                        <div className='flex items-center gap-5'>
                            <div>
                                <Image src={'/new_images/iata.png'} width={50} height={50} alt='' className='cursor-pointer' />
                            </div>
                            <div>
                                <Image src={'/new_images/asita.png'} width={50} height={50} alt='' className='cursor-pointer' />
                            </div>
                            <div>
                                <Image src={'/new_images/bsi.png'} width={50} height={50} alt='' className='cursor-pointer' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <h1 className='font-bold text-net-2'>Payment Partners</h1>
                            <div className='grid grid-cols-12'>
                                <div className='col-span-2 flex h-[50px] w-[50px] items-center justify-center rounded-rad-3 bg-white p-1'>
                                    <Image
                                        src={'/new_images/mastercard_logo.svg'}
                                        width={50}
                                        height={50}
                                        alt=''
                                        className='cursor-pointer '
                                    />
                                </div>
                                <div className='col-span-2 flex h-[50px] w-[50px] items-center justify-center rounded-rad-3 bg-white p-1'>
                                    <Image
                                        src={'/new_images/paypal_logo.svg'}
                                        width={50}
                                        height={50}
                                        alt=''
                                        className='cursor-pointer '
                                    />
                                </div>
                                <div className='col-span-2 flex h-[50px] w-[50px] items-center justify-center rounded-rad-3 bg-white p-1'>
                                    <Image
                                        src={'/new_images/visa_logo.svg'}
                                        width={50}
                                        height={50}
                                        alt=''
                                        className='cursor-pointer '
                                    />
                                </div>
                                <div className='col-span-2 flex h-[50px] w-[50px] items-center justify-center rounded-rad-3 bg-white p-1'>
                                    <Image
                                        src={'/new_images/amex_logo.svg'}
                                        width={50}
                                        height={50}
                                        alt=''
                                        className='cursor-pointer '
                                    />
                                </div>
                                <div className='col-span-2 flex h-[50px] w-[50px] items-center justify-center rounded-rad-3 bg-white p-1'>
                                    <Image
                                        src={'/new_images/gopay.svg'}
                                        width={50}
                                        height={50}
                                        alt=''
                                        className='cursor-pointer '
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-span-5 flex flex-col justify-center gap-6 '>
                        <div className='mt-4 flex gap-16'>
                            <div className='  flex flex-col gap-1 text-net-2'>
                                <h1 className='font-bold '>
                                    About FLY<span className='text-[12px]'>ID</span>
                                </h1>
                                <div className='flex flex-col gap-2'>
                                    <p className='cursor-pointer text-body-6 hover:font-bold'>How to book</p>
                                    <p className='cursor-pointer text-body-6 hover:font-bold'>Contact Us</p>
                                    <p className='cursor-pointer text-body-6 hover:font-bold'>Help Center</p>
                                    <p className='cursor-pointer text-body-6 hover:font-bold'>Karir</p>
                                    <p className='cursor-pointer text-body-6 hover:font-bold'>About Us</p>
                                </div>
                            </div>
                            <div className='  flex flex-col gap-1 text-net-2'>
                                <h1 className='font-bold '>Products</h1>
                                <div className='flex flex-col gap-2'>
                                    <p className='cursor-pointer text-body-6 hover:font-bold'>Flights</p>
                                    <p className='cursor-pointer text-body-6 hover:font-bold'>Round Trip</p>
                                    <p className='cursor-pointer text-body-6 hover:font-bold'>Pay Later</p>
                                </div>
                            </div>
                        </div>
                        <div className=' mb-4 flex flex-col gap-1 text-net-2'>
                            <h1 className='font-bold '>Follow Us On</h1>
                            <div className='flex flex-col gap-2'>
                                <div className='group flex cursor-pointer items-center gap-2'>
                                    <FaTwitter className='group-hover:text-[#1DA1F2]' />{' '}
                                    <p className='text-body-6 group-hover:font-bold'>Twitter</p>
                                </div>
                                <div className='group flex cursor-pointer items-center gap-2'>
                                    <FaFacebook className='group-hover:text-[#4267B2]' />{' '}
                                    <p className='text-body-6 group-hover:font-bold'>Facebook</p>
                                </div>
                                <div className='group flex cursor-pointer items-center gap-2'>
                                    <FaInstagramSquare className='from-indigo-500 via-purple-500 to-pink-500 group-hover:bg-gradient-to-r' />{' '}
                                    <p className='text-body-6 group-hover:font-bold'>Instagram</p>
                                </div>
                                <div className='group flex  cursor-pointer items-center gap-2'>
                                    <FaYoutube className='group-hover:text-[#FF0000]' />
                                    <p className='text-body-6 group-hover:font-bold'>Youtube</p>
                                </div>
                                <div className='group flex cursor-pointer items-center gap-2'>
                                    <div className='flex h-[20px] w-[20px] items-center justify-center bg-black'>
                                        <FaTiktok className='group-hover:text-white' />
                                    </div>
                                    <p className='text-body-6 group-hover:font-bold'>Tiktok</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-3 flex  items-center justify-center text-net-2'>
                        <div className='flex flex-col gap-3'>
                            <h1 className='text-title-1 font-bold'>
                                Download FLY<span className='text-[12px]'>ID</span> App
                            </h1>
                            <div className='flex flex-col gap-3'>
                                <Image
                                    src={'/new_images/google_play.png'}
                                    width={150}
                                    height={100}
                                    alt=''
                                    className='cursor-pointer'
                                />
                                <Image
                                    src={'/new_images/app_store.png'}
                                    width={150}
                                    height={100}
                                    alt=''
                                    className='cursor-pointer'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='absolute bottom-0  w-full bg-net-4 py-4 text-center'>
                    <h1 className='  text-title-1 text-white'>
                        Copyright © 2023 FLY<span className='text-[12px]'>ID</span>. All rights reserved
                    </h1>
                </div>
            </footer>
            {/* footer */}

            {/* ==== DEKSTOP MODE ====  */}

            {/* ==== MOBILE MODE ====  */}

            {/* ==== MOBILE MODE ==== */}
        </div>
    );
}

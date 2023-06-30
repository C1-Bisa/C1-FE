'use client';

//Core
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

//Third Parties
import axios from 'axios';
import { useSession, signOut } from 'next-auth/react';
import { FiArrowLeft, FiFilter } from 'react-icons/fi';
import { IoSearchSharp } from 'react-icons/io5';

//Redux
import { useDispatch } from 'react-redux';
import { flightSlice } from '@/store/flight';
//----

//Components
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Label from '@/components/Label';
import Input from '@/components/Input';
import RiwayatPesananKanan from '@/components/RiwayatPesananKanan';
import BottomNavbar from '@/components/BottomNavbar';
import AlertBottom from '@/components/AlertBottom';
import AlertTop from '@/components/AlertTop';

//Utils
import { reformatDate, reformatDateWithHour } from '@/utils/reformatDate';

export default function Notifikasi() {
    /*=== router ===*/
    const router = useRouter();

    /*=== next auth ===*/
    const { data: session, status } = useSession();
    const token = session?.user?.token; //becarefull it has lifecycle too, prevent with checking it first

    /*=== redux ===*/
    const dispatch = useDispatch();
    const { setStatusNotif } = flightSlice.actions;
    //----

    /*=== state ===*/
    const [isLoading, setIsLoading] = useState(true);
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [alertType, setAlertType] = useState('');
    const [fetchUserData, setFetchUserData] = useState(true);
    const [fetchNotif, setFetchNotif] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        email: '',
    });

    /*=== function ===*/
    const handleVisibleAlert = (text, alertType) => {
        setAlertText(text);
        setAlertType(alertType);
        setVisibleAlert(!visibleAlert);
    };

    console.log('====================================');
    console.log(notifications);
    console.log('====================================');

    const handleReadNotif = async () => {
        try {
            const UPDATE_NOTIF = 'https://kel1airplaneapi-production.up.railway.app/api/v1/notification/update';

            const res = await axios.get(UPDATE_NOTIF, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFetchNotif(true);
            dispatch(setStatusNotif(true));
            console.log('UPDATE NOTIF:', res.data);
        } catch (error) {
            console.log('ERROR UPDATE NOTIF:', error);
        }
    };

    /*=== effects ===*/
    useEffect(() => {
        if (token) {
            if (fetchUserData) {
                async function fetchUserData() {
                    try {
                        const URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/user/getProfile';
                        const res = await axios.get(URL, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });

                        setUserData({
                            name: res.data.data.nama,
                            email: res.data.data.email,
                            phone: res.data.data.phone,
                        });

                        console.log('CURRENT USER:', res.data);
                    } catch (error) {
                        handleVisibleAlert('Sesi Anda telah Berakhir!', 'failed');
                        setTimeout(() => {
                            signOut();
                        }, 2500);
                    }
                }
                fetchUserData();
            }
            setFetchUserData(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchUserData, session, token]);

    useEffect(() => {
        if (token) {
            if (fetchNotif) {
                const getNotifications = async () => {
                    try {
                        const NOTIF_URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/notification';
                        const res = await axios.get(NOTIF_URL, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        // console.log('RESPOND NOTIF:', res.data.data);
                        res.data.data.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
                        setNotifications(res.data.data);
                    } catch (error) {
                        console.log('ERROR GET Notif:', error);
                    } finally {
                        setIsLoading(false);
                    }
                };
                getNotifications();
            }
            setFetchNotif(false);
        }
    }, [fetchNotif, token]);

    if (isLoading) {
        return (
            <div className='overflow-x-hidden'>
                <Navbar className={'hidden lg:block'} />
                {/* DESKTOP MODE */}

                <div className='hidden w-screen border border-b-net-2 pb-4 lg:block'>
                    <div className='container relative mx-auto hidden max-w-screen-lg grid-cols-12 gap-3 font-poppins lg:grid'>
                        <h1 className='col-span-12 mb-[24px] mt-[47px] font-poppins text-head-1 font-bold'>Notifikasi</h1>
                        <div className='col-span-12 grid grid-cols-12 gap-[18px]'>
                            <div
                                className='col-span-10 flex cursor-pointer items-center gap-4 rounded-rad-3 bg-pur-3 py-[13px] font-poppins text-title-2 font-medium text-white'
                                onClick={() => router.push('/')}>
                                <FiArrowLeft className='ml-[21px]  h-6 w-6 ' />
                                <p>Beranda</p>
                            </div>
                            <div className='col-span-2 flex items-center gap-4'>
                                <Button className='flex items-center gap-2 rounded-rad-4 border-[1px] border-pur-4 px-2 py-[4px] text-title-2'>
                                    <FiFilter className='h-5 w-5 text-net-3 ' /> Filter
                                </Button>
                                <IoSearchSharp className='h-6 w-6 text-pur-4' />
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    style={{ height: 'calc(100vh - 270px)' }}
                    className=' container mx-auto mt-[27px]  hidden max-w-screen-lg flex-col items-center  justify-center gap-3  font-poppins lg:flex'>
                    <h1 className='text-title-2 font-bold text-net-3'>Harap menunggu...</h1>
                    <Image alt='' src={'/new_images/loading.svg'} width={200} height={200} priority style={{ width: 'auto' }} />
                </div>
            </div>
        );
    }

    return (
        <div className='overflow-x-hidden'>
            <Navbar className={'hidden lg:block'} />
            <div className='hidden w-screen border border-b-net-2 pb-4 lg:block'>
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
                            <Button
                                onClick={() => handleReadNotif()}
                                className='rounded-rad-3 border border-pur-5 bg-white px-5 py-3 text-body-6 text-pur-5 hover:border-white hover:bg-purple-400 hover:text-white'>
                                Sudah Dibaca
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container relative mx-auto mt-5 hidden max-w-screen-lg grid-cols-12 gap-3 font-poppins lg:grid'>
                {notifications.length ? (
                    notifications.map((notif, index) => {
                        const optionDate = {
                            day: 'numeric',
                            month: '2-digit',
                            year: 'numeric',
                            minute: '2-digit',
                            hour: '2-digit',
                        };

                        return (
                            <div key={index} className='col-span-12 flex justify-between border-b border-net-3 py-4'>
                                <div className='flex items-start gap-3'>
                                    <Image alt='' src={'/images/bell_notif.svg'} height={24} width={24} />
                                    <div>
                                        <p className='text-net-3'>{notif.headNotif}</p>
                                        <p>{notif.message}</p>
                                    </div>
                                </div>
                                <div className='flex items-start gap-3'>
                                    <p className='text-net-3'>{reformatDateWithHour(notif.createdAt, optionDate)}</p>
                                    {notif?.isRead ? (
                                        <Image
                                            alt=''
                                            src={'/images/notif_notread.svg'}
                                            width={12}
                                            height={12}
                                            className='mt-1 block'
                                        />
                                    ) : (
                                        <Image
                                            alt=''
                                            src={'/images/notif_read.svg'}
                                            width={12}
                                            height={12}
                                            className='mt-1 block'
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div
                        style={{ height: 'calc(100vh - 270px)' }}
                        className='col-span-12 flex h-[500px] items-center justify-center '>
                        <div className='flex flex-col justify-center gap-8'>
                            <div className='flex flex-col items-center justify-center text-center'>
                                <Image alt='' src={'/new_images/empty_list.svg'} width={200} height={200} />
                                <h1 className='mt-4 text-body-6 font-bold text-pur-3'>Oops! Notifikasi Anda Kosong!</h1>
                                <h3 className='text-body-6'>Anda belum melakukan penerbangan</h3>
                            </div>
                        </div>
                    </div>
                )}

                {/* <AlertBottom
                    visibleAlert={visibleAlert}
                    handleVisibleAlert={handleVisibleAlert}
                    text={alertText}
                    type={alertType}
                /> */}
            </div>

            {/* RESPONSIVE MODE */}
            <div className='mx-[24px] mt-[64px] font-poppins lg:hidden'>
                <h1 className='text-head-2 font-bold text-black'>Notifikasi</h1>
                {/* notif container */}
                <div className='mt-[30px] grid grid-cols-12'>
                    <div className='col-span-12 mb-2 flex items-center justify-end'>
                        <Button
                            onClick={() => handleReadNotif()}
                            className='rounded-rad-3 border border-pur-5 bg-white px-3 py-2 text-body-3 text-pur-5 hover:border-white hover:bg-purple-400 hover:text-white'>
                            Sudah Dibaca
                        </Button>
                    </div>
                    {notifications.length ? (
                        notifications.map((notif, index) => {
                            const optionDate = {
                                day: 'numeric',
                                month: '2-digit',
                                year: 'numeric',
                                minute: '2-digit',
                                hour: '2-digit',
                            };

                            return (
                                <div key={index} className='col-span-12  border-b border-net-3 py-4'>
                                    <div className=' grid grid-cols-12 gap-2 '>
                                        <div className='relative col-span-1 h-[24px] w-[24px]'>
                                            <Image alt='' src={'/new_images/notif.svg'} fill />
                                        </div>
                                        <div className='col-span-11'>
                                            <div className='flex items-center justify-between'>
                                                <p className='text-body-3 text-net-3'>
                                                    {reformatDateWithHour(notif.createdAt, optionDate)}
                                                </p>
                                                {notif?.isRead ? (
                                                    <Image
                                                        alt=''
                                                        src={'/images/notif_notread.svg'}
                                                        width={12}
                                                        height={12}
                                                        // className='mt-1 '
                                                    />
                                                ) : (
                                                    <Image
                                                        alt=''
                                                        src={'/images/notif_read.svg'}
                                                        width={12}
                                                        height={12}
                                                        // className='mt-1 '
                                                    />
                                                )}
                                            </div>
                                            <p className='mb-1 text-body-6 font-bold text-pur-5 '>{notif.headNotif}</p>
                                            <p className=' text-body-4'>{notif.message}</p>
                                        </div>
                                    </div>
                                    {/* <div className='flex items-start gap-3'>
                                        <p className='text-body-3 text-net-3'>
                                            {reformatDateWithHour(notif.createdAt, optionDate)}
                                        </p>
                                        {notif?.isRead ? (
                                            <Image
                                                alt=''
                                                src={'/images/notif_notread.svg'}
                                                width={12}
                                                height={12}
                                                className='mt-1 block'
                                            />
                                        ) : (
                                            <Image
                                                alt=''
                                                src={'/images/notif_read.svg'}
                                                width={12}
                                                height={12}
                                                className='mt-1 block'
                                            />
                                        )}
                                    </div> */}
                                </div>
                            );
                        })
                    ) : (
                        <div
                            style={{ height: 'calc(100vh - 270px)' }}
                            className='col-span-12 flex h-[500px] items-center justify-center '>
                            <div className='flex flex-col justify-center gap-8'>
                                <div className='flex flex-col items-center justify-center text-center'>
                                    <Image alt='' src={'/new_images/empty_list.svg'} width={200} height={200} />
                                    <h1 className='mt-4 text-body-6 font-bold text-pur-3'>Oops! Notifikasi Anda Kosong!</h1>
                                    <h3 className='text-body-6'>Anda belum melakukan penerbangan</h3>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {/* notif container */}
                <BottomNavbar />
            </div>
            {/* RESPONSIVE MODE */}

            <AlertTop
                visibleAlert={visibleAlert}
                handleVisibleAlert={handleVisibleAlert}
                text={alertText}
                type={alertType}
                bgType='none'
            />
        </div>
    );
}

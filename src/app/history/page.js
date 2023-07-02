'use client';

//Core
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

// //Third Parties
import axios from 'axios';
import { useSession, signOut } from 'next-auth/react';
import { FiArrowLeft, FiFilter, FiHome, FiX } from 'react-icons/fi';
import { IoSearchSharp, IoLocationSharp } from 'react-icons/io5';
import { MdNotifications, MdSearch, MdOutlineAccountCircle } from 'react-icons/md';
import { SlNotebook } from 'react-icons/sl';

// //Redux
import { useDispatch } from 'react-redux';
import { historySlice } from '@/store/history';

// //Components
import AlertBottom from '@/components/AlertBottom';
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
import BottomNavbar from '@/components/BottomNavbar';
// import RiwayatPesananKanan from '@/components/RiwayatPesananKanan';
import AlertTop from '@/components/AlertTop';
import Input from '@/components/Input';

// //Utils
import { reformatDate } from '@/utils/reformatDate';
import { reformatDuration } from '@/utils/reformatDuration';
import { fixedHour } from '@/utils/fixedHour';
import { formatRupiah } from '@/utils/formatRupiah';
import { extractWord } from '@/utils/extractWord';
import { groupingByTransactionDates } from '@/utils/reShapeData';

export default function History() {
    /*=== core ===*/
    const pathname = usePathname();
    const router = useRouter();

    /*=== next auth ===*/
    const { data: session, status } = useSession();
    const token = session?.user?.token; //becarefull it has lifecycle too, prevent with checking it first

    /*=== redux ===*/
    const dispatch = useDispatch();
    const { setHistoryDetail } = historySlice.actions;

    /*=== state ===*/
    const [openFilterHistoryByCode, setOpenFilterHistoryByCode] = useState(false);
    const [filterInput, setFilterInput] = useState('');
    const [historyFilter, setHistoryFilter] = useState([]);
    const [openMobileHistoryDetail, setOpenMobileHistoryDetail] = useState(false);
    const [mobileHistoryDetailData, setMobileHistoryDetailData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [historyItem, setHistoryItem] = useState(null);
    const [historyData, setHistoryData] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(true);
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [alertType, setAlertType] = useState('');
    const [visibleAlertError, setVisibleAlertError] = useState(false);
    const [alertTextError, setAlertTextError] = useState('');
    const [alertTypeError, setAlertTypeError] = useState('');
    const [fetchData, setFetchData] = useState(true);
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        email: '',
    });

    /*=== function === */
    const handleOpenFilterHistoryByCode = () => {
        setOpenFilterHistoryByCode(!openFilterHistoryByCode);
    };

    const handleOnChangeFilterByCode = (event) => {
        setFilterInput(event.target.value);

        const searchHistory = historyData.map((historyItem) =>
            historyItem.data.filter((item) =>
                item.transaction?.transaction_code.toLowerCase().includes(event.target.value.toLowerCase())
            )
        );

        const filteredHistory = groupingByTransactionDates(searchHistory[0]);

        setHistoryFilter(filteredHistory);
    };

    const historyStatusStyling = (historyStatus) => {
        if (historyStatus?.toLowerCase() === 'issued') {
            return 'bg-alert-1 text-white';
        }
        if (historyStatus?.toLowerCase() === 'unpaid') {
            return 'bg-alert-3 text-white';
        }
        if (historyStatus?.toLowerCase() === 'cancelled') {
            return 'bg-net-3 text-white';
        }
    };

    const handleOpenMobileHistoryDetail = (data) => {
        setMobileHistoryDetailData(data);
        setOpenMobileHistoryDetail(!openMobileHistoryDetail);
    };

    const handleHistoryDetailMobile = (data) => {
        dispatch(setHistoryDetail(data));
        router.push('/history/detail');
    };

    const handleVisibleAlert = (text, alertType) => {
        setAlertText(text);
        setAlertType(alertType);
        setVisibleAlert(!visibleAlert);
    };
    const handleVisibleAlertError = (text, alertType) => {
        setAlertTextError(text);
        setAlertTypeError(alertType);
        setVisibleAlertError(!visibleAlertError);
    };

    const handleHistoryDetail = (history) => {
        setHistoryItem(history);
        console.log('History Detail : ', history);
    };

    const handleUpdatePayment = async (transaction) => {
        router.push(`/history/payment/${transaction?.Flights[0]?.Transaction_Flight?.transaction_id}`);
    };

    const handleSendTicket = async (id) => {
        if (token) {
            try {
                const URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/transaction/printticket';
                const res = await axios.post(
                    URL,
                    {
                        transaction_id: id,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // console.log('PESANN', res);

                if (res.status === 201 || res.data.status === 'Ok') {
                    // console.log('SUCCESS');
                    handleVisibleAlert('Tiket sudah dikirim, harap check email Anda');
                    router.refresh();
                }

                // console.log('ID TICKET', id);
            } catch (error) {
                // console.log('ERROR SEND EMAIL TICKET', error);
                handleVisibleAlertError('Kami tidak bisa memproses tiketmu, mohon untuk mencoba dilain waktu', 'failed');
            }
        }
    };
    /*=== effects ===*/
    useEffect(() => {
        if (token) {
            if (fetchData) {
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
            setFetchData(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData, session, token]);

    useEffect(() => {
        if (token) {
            if (fetchStatus) {
                const fetchBooking = async () => {
                    try {
                        const URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/transaction/history';

                        const response = await axios.get(URL, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });

                        //sorting data
                        response.data.data.sort(
                            (a, b) => new Date(b?.transaction?.transaction_date) - new Date(a?.transaction?.transaction_date)
                        );

                        const groupingByDatesDatas = groupingByTransactionDates(response?.data?.data);

                        setHistoryData(groupingByDatesDatas);
                        setHistoryFilter(groupingByDatesDatas);
                    } catch (error) {
                        console.log(error);
                    } finally {
                        setIsLoading(false);
                    }
                };
                fetchBooking();
            }

            setFetchStatus(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchStatus, token]);

    // console.log('DATA HISTORy', historyData);
    if (isLoading) {
        return (
            <div className='hidden overflow-x-hidden lg:block'>
                <Navbar className={'hidden lg:block'} />
                {/* DESKTOP MODE */}

                <div className='mt-[80px] hidden w-screen border border-b-net-2 pb-4 lg:block'>
                    <div className='container relative mx-auto hidden max-w-screen-lg grid-cols-12 gap-3 font-poppins lg:grid'>
                        <h1 className='col-span-12 mb-[24px] mt-[47px] font-poppins text-head-1 font-bold'>Riwayat Pemesanan</h1>
                        <div className='col-span-12 grid grid-cols-12 gap-[18px]'>
                            <div
                                className='col-span-8 flex cursor-pointer items-center gap-4 rounded-rad-3 bg-pur-4 py-[13px] font-poppins text-title-2 font-medium text-white'
                                onClick={() => router.push('/')}>
                                <FiArrowLeft className='ml-[21px]  h-6 w-6 ' />
                                <p>Beranda</p>
                            </div>
                            <div className='col-span-4 flex items-center gap-4'>
                                <Input
                                    onChange={handleOnChangeFilterByCode}
                                    value={filterInput}
                                    onClick={() => setHistoryItem('')}
                                    placeholder={'Masukan kode transaksi Anda'}
                                    className='rounded-rad-4 border-net-2 px-6 py-[14px] text-title-1 focus:border-pur-4'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{ height: 'calc(100vh - 270px)' }}
                    className='container mx-auto hidden max-w-screen-lg flex-col items-center justify-center gap-3 font-poppins lg:flex'>
                    <h1 className='text-title-2 font-bold text-net-3'>Harap menunggu...</h1>
                    <Image alt='' src={'/new_images/loading.svg'} width={200} height={200} priority style={{ width: 'auto' }} />
                </div>
            </div>
        );
    }
    return (
        <div className='overflow-x-hidden bg-pur-3 lg:bg-white'>
            <Navbar className={'hidden lg:block'} />
            {/* DESKTOP MODE */}

            <div className='mt-[80px]  hidden w-screen border border-b-net-2 pb-4 lg:block'>
                <div className='container relative mx-auto hidden max-w-screen-lg grid-cols-12 gap-3 font-poppins lg:grid'>
                    <h1 className='col-span-12 mb-[24px] mt-[47px] font-poppins text-head-1 font-bold'>Riwayat Pemesanan</h1>
                    <div className='col-span-12 grid grid-cols-12 gap-[18px]'>
                        <div
                            className='col-span-8 flex cursor-pointer items-center gap-4 rounded-rad-3 bg-pur-4 py-[13px] font-poppins text-title-2 font-medium text-white'
                            onClick={() => router.push('/')}>
                            <FiArrowLeft className='ml-[21px]  h-6 w-6 ' />
                            <p>Beranda</p>
                        </div>
                        <div className='col-span-4 flex items-center gap-4'>
                            <Input
                                onChange={handleOnChangeFilterByCode}
                                value={filterInput}
                                onClick={() => setHistoryItem('')}
                                placeholder={'Masukan kode transaksi Anda'}
                                className='rounded-rad-4 border-net-2 px-6 py-[14px] text-title-1 focus:border-pur-4'
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div
                // style={{ height: 'calc(100vh - 270px)' }}
                className='container mx-auto mt-4 hidden max-w-screen-lg font-poppins lg:block'>
                <div className='grid grid-cols-12 '>
                    {historyFilter.length > 0 ? (
                        <div className='col-span-12 grid grid-cols-12 gap-10'>
                            <div className='col-span-7'>
                                {historyFilter.length > 0 &&
                                    historyFilter?.map((history, index) => {
                                        return (
                                            <div key={index} className='grid grid-cols-12'>
                                                <h1 className='col-span-12 text-title-2 font-bold'>{history.month}</h1>
                                                <div className='col-span-12 mt-3 flex flex-col gap-4'>
                                                    {history?.data?.map((historyItems, index) => {
                                                        console.log('====================================');
                                                        console.log('HISTORY ITEM', historyItems);
                                                        console.log('====================================');
                                                        return (
                                                            <div
                                                                onClick={() => handleHistoryDetail(historyItems)}
                                                                key={index}
                                                                className={`${
                                                                    historyItems?.transaction?.transaction_code ===
                                                                    historyItem?.transaction?.transaction_code
                                                                        ? 'border-pur-2'
                                                                        : 'border-white'
                                                                } flex cursor-pointer flex-col gap-4 rounded-rad-3 border   p-4 shadow-low`}>
                                                                <h1
                                                                    className={`${historyStatusStyling(
                                                                        historyItems?.transaction?.transaction_status
                                                                    )} w-max rounded-rad-4 px-3 py-1 text-body-6`}>
                                                                    {historyItems?.transaction?.transaction_status}
                                                                </h1>
                                                                {historyItems?.transaction?.Flights &&
                                                                    historyItems?.transaction?.Flights?.map((flight, index) => {
                                                                        return (
                                                                            <div
                                                                                className='flex items-center justify-between gap-4 '
                                                                                key={index}>
                                                                                <div className='flex gap-2'>
                                                                                    <IoLocationSharp className='h-[24px] w-[24px] text-net-3' />
                                                                                    <div>
                                                                                        <p className='text-body-6 font-bold'>
                                                                                            {
                                                                                                flight?.Airport_from
                                                                                                    ?.airport_location
                                                                                            }
                                                                                        </p>
                                                                                        <p className='text-body-3 font-medium'>
                                                                                            {reformatDate(flight?.departure_date)}
                                                                                        </p>
                                                                                        <p className='text-body-3 font-medium'>
                                                                                            {fixedHour(flight?.departure_time)}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                                <div className=''>
                                                                                    <p className='text-center text-body-4 text-net-3'>
                                                                                        {reformatDuration(flight?.duration)}
                                                                                    </p>
                                                                                    <div className='relative h-[8px] w-[233px]'>
                                                                                        <Image
                                                                                            alt=''
                                                                                            src={'./images/arrow.svg'}
                                                                                            fill
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className='flex gap-2'>
                                                                                    <IoLocationSharp className='h-[24px] w-[24px] text-net-3' />
                                                                                    <div>
                                                                                        <p className='text-body-6 font-bold'>
                                                                                            {flight?.Airport_to?.airport_location}
                                                                                        </p>
                                                                                        <p className='text-body-3 font-medium'>
                                                                                            {reformatDate(flight?.arrival_date)}
                                                                                        </p>
                                                                                        <p className='text-body-3 font-medium'>
                                                                                            {fixedHour(flight?.arrival_time)}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                <div className='w-full border'></div>
                                                                <div className='flex items-center justify-between'>
                                                                    <div>
                                                                        <h3 className='text-body-5 font-bold'>Booking Code:</h3>
                                                                        <p className='text-body-5 font-normal'>
                                                                            {historyItems?.transaction?.transaction_code}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <h3 className='text-body-5 font-bold'>Class:</h3>
                                                                        <p className='text-body-5 font-normal'>
                                                                            {historyItems?.transaction?.Flights[0]?.flight_class}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <h3 className='text-body-5 font-bold text-pur-5'>
                                                                            {formatRupiah(historyItems?.price?.total)}
                                                                        </h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>

                            <div className='col-span-5'>
                                {historyItem ? (
                                    <div>
                                        {historyItem && (
                                            <div>
                                                <div className='flex justify-between'>
                                                    <h1 className='text-title-2 font-bold'>Detail Transaksi</h1>
                                                    <h1
                                                        className={`${historyStatusStyling(
                                                            historyItem?.transaction?.transaction_status
                                                        )} w-max rounded-rad-4 px-3 py-1 text-body-6`}>
                                                        {historyItem?.transaction?.transaction_status}
                                                    </h1>
                                                </div>
                                                <h2 className='text-title-3'>
                                                    Booking Code :{' '}
                                                    <span className='font-bold text-pur-5'>
                                                        {' '}
                                                        {historyItem?.transaction?.transaction_code}
                                                    </span>
                                                </h2>
                                                {historyItem?.transaction?.Flights[0] && (
                                                    <div className={`${historyItem?.transaction?.Flights[1] && 'mt-3'} `}>
                                                        {historyItem?.transaction?.Flights[1] && (
                                                            <h1 className='mb-2 w-max rounded-rad-2 bg-pur-4 px-4 py-2 text-body-6 text-white'>
                                                                Keberangkatan
                                                            </h1>
                                                        )}
                                                        <div className='flex justify-between'>
                                                            <div>
                                                                <h1 className='text-title-2 font-bold'>
                                                                    {fixedHour(
                                                                        historyItem?.transaction?.Flights[0]?.departure_time
                                                                    )}
                                                                </h1>
                                                                <h1 className='text-body-6'>
                                                                    {reformatDate(
                                                                        historyItem?.transaction?.Flights[0]?.departure_date
                                                                    )}
                                                                </h1>
                                                                <h1 className='text-body-6 font-medium'>
                                                                    {
                                                                        historyItem?.transaction?.Flights[0]?.Airport_from
                                                                            ?.airport_name
                                                                    }
                                                                </h1>
                                                            </div>
                                                            <h1 className='text-body-3 font-bold text-pur-3'>Keberangkatan</h1>
                                                        </div>
                                                        <div className='mb-2 mt-4 w-full border text-net-3'></div>
                                                        <div className='flex items-center gap-2'>
                                                            <div className='relative h-[24px] w-[24px] '>
                                                                <Image
                                                                    src={historyItem?.transaction?.Flights[0]?.Airline?.image}
                                                                    fill
                                                                    alt=''
                                                                />
                                                            </div>
                                                            <div className='flex flex-col gap-4'>
                                                                <div>
                                                                    <h3 className='text-body-5 font-bold'>
                                                                        {
                                                                            historyItem?.transaction?.Flights[0]?.Airline
                                                                                .airline_name
                                                                        }{' '}
                                                                        - {historyItem?.transaction?.Flights[0]?.flight_class}
                                                                    </h3>
                                                                    <h3 className='text-body-5 font-bold'>
                                                                        {
                                                                            historyItem?.transaction?.Flights[0]?.Airline
                                                                                .airline_code
                                                                        }
                                                                    </h3>
                                                                </div>
                                                                <div>
                                                                    <h3 className='text-body-5 font-bold'>Informasi : </h3>
                                                                    <div>
                                                                        {historyItem?.transaction?.Passengers &&
                                                                            historyItem?.transaction?.Passengers?.map(
                                                                                (passenger, index) => {
                                                                                    return (
                                                                                        <div key={index} className=''>
                                                                                            <h1 className='text-body-5 font-medium text-pur-5'>
                                                                                                Penumpang {index + 1}:{' '}
                                                                                                <span className='ml-1'>
                                                                                                    {passenger.title}
                                                                                                    {passenger.name}
                                                                                                </span>
                                                                                            </h1>
                                                                                            <h2>
                                                                                                ID:{' '}
                                                                                                <span className='ml-1'>
                                                                                                    {passenger.nik_paspor}
                                                                                                </span>
                                                                                            </h2>
                                                                                        </div>
                                                                                    );
                                                                                }
                                                                            )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mb-4 mt-2 w-full border text-net-3'></div>
                                                        <div className='flex justify-between'>
                                                            <div>
                                                                <h1 className='text-title-2 font-bold'>
                                                                    {fixedHour(
                                                                        historyItem?.transaction?.Flights[0]?.arrival_time
                                                                    )}
                                                                </h1>
                                                                <h1 className='text-body-6'>
                                                                    {reformatDate(
                                                                        historyItem?.transaction?.Flights[0]?.arrival_date
                                                                    )}
                                                                </h1>
                                                                <h1 className='text-body-6 font-medium'>
                                                                    {
                                                                        historyItem?.transaction?.Flights[0]?.Airport_to
                                                                            .airport_name
                                                                    }
                                                                </h1>
                                                            </div>
                                                            <h1 className='text-body-3 font-bold text-pur-3'>Kedatangan</h1>
                                                        </div>
                                                    </div>
                                                )}
                                                <div
                                                    className={`${
                                                        historyItem?.transaction?.Flights[1] ? 'block' : 'hidden'
                                                    } mb-2 mt-4 w-full border text-net-3`}></div>
                                                {historyItem?.transaction?.Flights[1] && (
                                                    <div className='mt-3'>
                                                        <h1 className='mb-2 w-max rounded-rad-2 bg-pur-4 px-4 py-2 text-body-6 text-white'>
                                                            Kepulangan
                                                        </h1>
                                                        <div className='flex justify-between'>
                                                            <div>
                                                                <h1 className='text-title-2 font-bold'>
                                                                    {fixedHour(
                                                                        historyItem?.transaction?.Flights[1]?.departure_time
                                                                    )}
                                                                </h1>
                                                                <h1 className='text-body-6'>
                                                                    {reformatDate(
                                                                        historyItem?.transaction?.Flights[1]?.departure_date
                                                                    )}
                                                                </h1>
                                                                <h1 className='text-body-6 font-medium'>
                                                                    {
                                                                        historyItem?.transaction?.Flights[1]?.Airport_from
                                                                            ?.airport_name
                                                                    }
                                                                </h1>
                                                            </div>
                                                            <h1 className='text-body-3 font-bold text-pur-3'>Keberangkatan</h1>
                                                        </div>
                                                        <div className='mb-2 mt-4 w-full border text-net-3'></div>
                                                        <div className='flex items-center gap-2'>
                                                            <div className='relative h-[24px] w-[24px] '>
                                                                <Image
                                                                    src={historyItem?.transaction?.Flights[1]?.Airline?.image}
                                                                    fill
                                                                    alt=''
                                                                />
                                                            </div>
                                                            <div className='flex flex-col gap-4'>
                                                                <div>
                                                                    <h3 className='text-body-5 font-bold'>
                                                                        {
                                                                            historyItem?.transaction?.Flights[1]?.Airline
                                                                                .airline_name
                                                                        }{' '}
                                                                        - {historyItem?.transaction?.Flights[1]?.flight_class}
                                                                    </h3>
                                                                    <h3 className='text-body-5 font-bold'>
                                                                        {
                                                                            historyItem?.transaction?.Flights[1]?.Airline
                                                                                .airline_code
                                                                        }
                                                                    </h3>
                                                                </div>
                                                                <div>
                                                                    <h3 className='text-body-5 font-bold'>Informasi : </h3>
                                                                    <div>
                                                                        {historyItem?.transaction?.Passengers &&
                                                                            historyItem?.transaction?.Passengers?.map(
                                                                                (passenger, index) => {
                                                                                    return (
                                                                                        <div key={index} className=''>
                                                                                            <h1 className='text-body-5 font-medium text-pur-5'>
                                                                                                Penumpang {index + 1}:{' '}
                                                                                                <span className='ml-1'>
                                                                                                    {passenger.name}
                                                                                                </span>
                                                                                            </h1>
                                                                                            <h2>
                                                                                                ID:{' '}
                                                                                                <span className='ml-1'>
                                                                                                    {passenger.nik_paspor}
                                                                                                </span>
                                                                                            </h2>
                                                                                        </div>
                                                                                    );
                                                                                }
                                                                            )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='mb-4 mt-2 w-full border text-net-3'></div>
                                                        <div className='flex justify-between'>
                                                            <div>
                                                                <h1 className='text-title-2 font-bold'>
                                                                    {fixedHour(
                                                                        historyItem?.transaction?.Flights[1]?.arrival_time
                                                                    )}
                                                                </h1>
                                                                <h1 className='text-body-6'>
                                                                    {reformatDate(
                                                                        historyItem?.transaction?.Flights[1]?.arrival_date
                                                                    )}
                                                                </h1>
                                                                <h1 className='text-body-6 font-medium'>
                                                                    {
                                                                        historyItem?.transaction?.Flights[1]?.Airport_to
                                                                            .airport_name
                                                                    }
                                                                </h1>
                                                            </div>
                                                            <h1 className='text-body-3 font-bold text-pur-3'>Kedatangan</h1>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <div className='mb-2 mt-4 w-full border text-net-3'></div>
                                        <h1 className='mb-2 text-body-6 font-bold'>Rincian Harga</h1>
                                        <div>
                                            {historyItem?.transaction?.Flights[0] && (
                                                <div className='flex flex-col gap-1'>
                                                    <h1 className='font-bold'>
                                                        {historyItem?.transaction?.Flights[0].Airline.airline_name}
                                                    </h1>
                                                    {historyItem?.type_passenger?.adult > 0 && (
                                                        <div className='flex justify-between text-body-6'>
                                                            <h1>{historyItem?.type_passenger?.adult} Dewasa</h1>
                                                            <h1>
                                                                {' '}
                                                                {formatRupiah(
                                                                    historyItem?.type_passenger?.adult *
                                                                        historyItem?.price?.departure
                                                                )}
                                                            </h1>
                                                        </div>
                                                    )}
                                                    {historyItem?.type_passenger?.child > 0 && (
                                                        <div className='flex justify-between text-body-6'>
                                                            <h1>{historyItem?.type_passenger?.child} Anak</h1>
                                                            <h1>
                                                                {' '}
                                                                {formatRupiah(
                                                                    historyItem?.type_passenger?.child *
                                                                        historyItem?.price?.departure
                                                                )}
                                                            </h1>
                                                        </div>
                                                    )}
                                                    {historyItem?.type_passenger?.baby > 0 && (
                                                        <div className='flex justify-between text-body-6'>
                                                            <h1>{historyItem?.type_passenger?.baby} Bayi</h1>
                                                            <h1> RP 0</h1>
                                                        </div>
                                                    )}

                                                    <div className='mb-3 mt-2 w-full border text-net-3'></div>
                                                    <div
                                                        className={`${
                                                            historyItem?.transaction?.Flights[1] ? 'hidden' : 'block'
                                                        } flex justify-between text-body-6`}>
                                                        <h1>Tax</h1>
                                                        <h1>
                                                            <span>{formatRupiah(historyItem?.price?.tax)}</span>
                                                        </h1>
                                                    </div>
                                                    <div
                                                        className={`${
                                                            historyItem?.transaction?.Flights[1] ? 'hidden' : 'block'
                                                        } flex justify-between text-title-2 font-bold`}>
                                                        <h1>Total</h1>
                                                        <h1 className='text-pur-4'>
                                                            <span className='ml-1'>
                                                                {formatRupiah(historyItem?.price?.total)}
                                                            </span>
                                                        </h1>
                                                    </div>
                                                </div>
                                            )}

                                            {historyItem?.transaction?.Flights[1] && (
                                                <div className='flex flex-col gap-1'>
                                                    <h1 className='font-bold'>
                                                        {historyItem?.transaction?.Flights[1].Airline.airline_name}
                                                    </h1>
                                                    {historyItem?.type_passenger?.adult > 0 && (
                                                        <div className='flex justify-between text-body-6'>
                                                            <h1>{historyItem?.type_passenger?.adult} Dewasa</h1>
                                                            <h1>
                                                                {' '}
                                                                {formatRupiah(
                                                                    historyItem?.type_passenger?.adult *
                                                                        historyItem?.price?.arrival
                                                                )}
                                                            </h1>
                                                        </div>
                                                    )}
                                                    {historyItem?.type_passenger?.child > 0 && (
                                                        <div className='flex justify-between text-body-6'>
                                                            <h1>{historyItem?.type_passenger?.child} Anak</h1>
                                                            <h1>
                                                                {' '}
                                                                {formatRupiah(
                                                                    historyItem?.type_passenger?.child *
                                                                        historyItem?.price?.arrival
                                                                )}
                                                            </h1>
                                                        </div>
                                                    )}
                                                    {historyItem?.type_passenger?.baby > 0 && (
                                                        <div className='flex justify-between text-body-6'>
                                                            <h1>{historyItem?.type_passenger?.baby} Bayi</h1>
                                                            <h1> RP 0</h1>
                                                        </div>
                                                    )}

                                                    <div className='mb-3 mt-2 w-full border text-net-3'></div>
                                                    <div className='flex justify-between text-body-6'>
                                                        <h1>Tax</h1>
                                                        <h1>
                                                            <span>{formatRupiah(historyItem?.price?.tax)}</span>
                                                        </h1>
                                                    </div>
                                                    <div className='flex justify-between text-title-2 font-bold'>
                                                        <h1>Total</h1>
                                                        <h1 className='text-pur-4'>
                                                            <span className='ml-1'>
                                                                {formatRupiah(historyItem?.price?.total)}
                                                            </span>
                                                        </h1>
                                                    </div>
                                                </div>
                                            )}

                                            {historyItem?.transaction?.transaction_status.toLowerCase() === 'unpaid' ? (
                                                <Button
                                                    onClick={() => handleUpdatePayment(historyItem?.transaction)}
                                                    className='mt-8 w-full rounded-rad-4 bg-alert-3 py-4 text-head-1 font-medium text-white hover:bg-red-500 '>
                                                    Lanjut Bayar
                                                </Button>
                                            ) : (
                                                // BUTOON
                                                <Button
                                                    onClick={() =>
                                                        handleSendTicket(
                                                            historyItem?.transaction?.Flights[0]?.Transaction_Flight
                                                                ?.transaction_id
                                                        )
                                                    }
                                                    className='mt-8 w-full rounded-rad-4 bg-pur-4 py-4 text-head-1 font-medium text-white hover:bg-pur-3 '>
                                                    Cetak Tiket
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <h1 className='text-title-2 font-bold'>Detail Transaksi</h1>
                                        <div className='flex h-[500px] items-center justify-center'>
                                            <div className='text-center text-body-6'>
                                                <p>Silahkan pilih transaksi di sebelah kiri</p>
                                                <p>untuk melihat detailnya</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className='col-span-12 flex h-[500px] items-center justify-center '>
                            <div className='flex flex-col justify-center gap-4'>
                                <div className='flex flex-col items-center justify-center text-center'>
                                    <Image alt='' src={'/new_images/empty_list.svg'} width={200} height={200} />
                                    <h1 className='mt-4 text-body-6 font-bold text-pur-3'>Oops! Riwayat Pesanan Kosong!</h1>
                                    <h3 className='text-body-6'>Anda belum melakukan penerbangan</h3>
                                </div>
                                <Button>Cari Penerbangan</Button>
                            </div>
                        </div>
                    )}
                </div>
                {/* trick */}
                <div className='invisible h-[100px]'></div>
            </div>

            {/* DESKTOP MODE */}

            {/* MOBILE MODE */}
            <div className='h-screen  font-poppins lg:hidden'>
                <div className='mx-4 mt-[64px] flex items-center justify-between text-head-2 font-bold text-white'>
                    <h1>Riwayat Pesanan</h1>
                    <MdSearch className='h-6 w-6' />
                </div>
                <div className='mx-4 mt-8 flex justify-end'>
                    <Button className='flex items-center gap-2 rounded-rad-4 bg-white px-3 py-1 text-body-6'>
                        <FiFilter /> Filter
                    </Button>
                </div>

                <div className='mx-4 mt-3'>
                    {historyData?.length &&
                        historyData.map((history, index) => {
                            return (
                                <div key={index}>
                                    <h1 className='text-title-1 font-bold text-white'>{history.month}</h1>
                                    {history?.data?.length &&
                                        history?.data.map((historyItem, indexHistoryItem) => {
                                            const type = historyItem?.transaction?.Flights[1] ? 'Round Trip' : 'One Trip';
                                            return (
                                                <div
                                                    onClick={() => handleOpenMobileHistoryDetail(historyItem)}
                                                    key={indexHistoryItem}
                                                    className='mt-4 flex cursor-pointer flex-col gap-2'>
                                                    <div className='flex flex-col gap-3 rounded-rad-3 bg-white p-4'>
                                                        <div className='flex items-center justify-between '>
                                                            <p
                                                                className={`${historyStatusStyling(
                                                                    historyItem?.transaction?.transaction_status
                                                                )} w-max rounded-rad-4  px-3 py-1 text-body-6 text-white`}>
                                                                {historyItem?.transaction?.transaction_status}
                                                            </p>
                                                            <p className='text-title-1 font-bold'>{type}</p>
                                                        </div>

                                                        <div className='mt-6 flex flex-col gap-2'>
                                                            {historyItem?.transaction?.Flights[0] && (
                                                                <div className='grid w-full grid-cols-12 items-center  gap-3 '>
                                                                    <div className='col-span-5 flex items-start gap-2'>
                                                                        <IoLocationSharp className='h-[24px] w-[24px] text-net-3' />
                                                                        <div className='text-body-4'>
                                                                            <p className='font-bold'>
                                                                                {historyItem?.transaction?.Flights[0]?.from}
                                                                            </p>
                                                                            <p>
                                                                                {reformatDate(
                                                                                    historyItem?.transaction?.Flights[0]
                                                                                        ?.departure_date
                                                                                )}
                                                                            </p>
                                                                            <p>
                                                                                {fixedHour(
                                                                                    historyItem?.transaction?.Flights[0]
                                                                                        ?.departure_time
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-span-2 flex flex-col items-center'>
                                                                        <p className='text-body-4'>
                                                                            {reformatDuration(
                                                                                historyItem?.transaction.Flights[0]?.duration
                                                                            )}
                                                                        </p>
                                                                        <div className='w-full border'></div>
                                                                    </div>
                                                                    <div className='col-span-5 flex items-start gap-2'>
                                                                        <IoLocationSharp className='h-[24px] w-[24px] text-net-3' />
                                                                        <div className='text-body-4'>
                                                                            <p className='font-bold'>
                                                                                {historyItem?.transaction?.Flights[0]?.to}
                                                                            </p>
                                                                            <p>
                                                                                {reformatDate(
                                                                                    historyItem?.transaction?.Flights[0]
                                                                                        ?.arrival_date
                                                                                )}
                                                                            </p>
                                                                            <p>
                                                                                {fixedHour(
                                                                                    historyItem?.transaction?.Flights[0]
                                                                                        ?.arrival_time
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {historyItem?.transaction?.Flights[1] && (
                                                                <div className='grid w-full grid-cols-12 items-center  gap-3 '>
                                                                    <div className='col-span-5 flex items-start gap-2'>
                                                                        <IoLocationSharp className='h-[24px] w-[24px] text-net-3' />
                                                                        <div className='text-body-4'>
                                                                            <p className='font-bold'>
                                                                                {historyItem?.transaction?.Flights[1]?.from}
                                                                            </p>
                                                                            <p>
                                                                                {reformatDate(
                                                                                    historyItem?.transaction?.Flights[1]
                                                                                        ?.departure_date
                                                                                )}
                                                                            </p>
                                                                            <p>
                                                                                {fixedHour(
                                                                                    historyItem?.transaction?.Flights[1]
                                                                                        ?.departure_time
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className='col-span-2 flex flex-col items-center'>
                                                                        <p className='text-body-4'>
                                                                            {reformatDuration(
                                                                                historyItem?.transaction.Flights[1]?.duration
                                                                            )}
                                                                        </p>
                                                                        <div className='w-full border'></div>
                                                                    </div>
                                                                    <div className='col-span-5 flex items-start gap-2'>
                                                                        <IoLocationSharp className='h-[24px] w-[24px] text-net-3' />
                                                                        <div className='text-body-4'>
                                                                            <p className='font-bold'>
                                                                                {historyItem?.transaction?.Flights[1]?.to}
                                                                            </p>
                                                                            <p>
                                                                                {reformatDate(
                                                                                    historyItem?.transaction?.Flights[1]
                                                                                        ?.arrival_date
                                                                                )}
                                                                            </p>
                                                                            <p>
                                                                                {fixedHour(
                                                                                    historyItem?.transaction?.Flights[1]
                                                                                        ?.arrival_time
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className='w-full border'></div>

                                                        <div className='flex items-center justify-between'>
                                                            <div className='text-body-6'>
                                                                <p className='font-bold'>Booking Code:</p>
                                                                <p>{historyItem?.transaction?.transaction_code}</p>
                                                            </div>
                                                            <div className='text-body-6'>
                                                                <p className='font-bold'>Class:</p>
                                                                <p>{historyItem?.transaction?.Flights[0].flight_class}</p>
                                                            </div>
                                                            <div className='text-body-6'>
                                                                <p className='font-bold text-pur-5'>
                                                                    {historyItem?.price.total
                                                                        ? formatRupiah(historyItem?.price.total)
                                                                        : 'Loading...'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            );
                        })}
                </div>

                <div className='invisible h-[100px] bg-pur-3'></div>
                <BottomNavbar />
            </div>

            {openMobileHistoryDetail && (
                <div className='fixed  inset-0 top-0 h-screen overflow-y-scroll bg-white font-poppins'>
                    <div className='px-4'>
                        <div
                            onClick={() => setOpenMobileHistoryDetail(!openMobileHistoryDetail)}
                            className='fixed inset-x-0 top-0  flex cursor-pointer items-center gap-6 bg-pur-3  px-[16px] py-[10px] text-white '>
                            <FiArrowLeft className='h-[30px] w-[30px]' /> <h1>Rincian Penerbangan</h1>
                        </div>

                        {/* transaction title */}
                        <div className='mx-4 mt-[64px] flex flex-col gap-3 rounded-rad-3 bg-white  '>
                            <div className='flex items-center justify-between '>
                                <h1
                                    className={`${historyStatusStyling(
                                        mobileHistoryDetailData?.transaction?.transaction_status
                                    )} w-max rounded-rad-4  px-3 py-1 text-body-6 text-white`}>
                                    {mobileHistoryDetailData.transaction.transaction_status}
                                </h1>
                                <p className='text-title-1 font-bold'>
                                    {mobileHistoryDetailData?.transaction?.Flights[1] ? 'Round Trip' : 'One Trip'}
                                </p>
                            </div>
                        </div>
                        {/* transaction title */}

                        <div className='mx-4 mt-3 flex flex-col gap-4 rounded-[10px] border border-pur-2 p-4'>
                            {/* Booking code */}
                            <h1 className='font-medium'>
                                Booking Code:{' '}
                                <span className='font-bold text-pur-3'>
                                    {mobileHistoryDetailData.transaction.transaction_code}
                                </span>
                            </h1>
                            {/* Booking code */}

                            {/* Detail Transaction 0 */}
                            {mobileHistoryDetailData.transaction.Flights[0] && (
                                <div className='flex flex-col gap-2'>
                                    {mobileHistoryDetailData.transaction.Flights[1] && (
                                        <p className='w-max rounded-rad-4 bg-pur-5 px-2 py-1 text-body-6 text-white'>
                                            Kepergian - Flight 1
                                        </p>
                                    )}

                                    <div className='flex justify-between'>
                                        <div>
                                            <p className='text-title-1 font-bold'>
                                                {fixedHour(mobileHistoryDetailData.transaction.Flights[0].departure_time)}
                                            </p>
                                            <p className='text-body-5'>
                                                {reformatDate(mobileHistoryDetailData.transaction.Flights[0].departure_date)}
                                            </p>
                                            <p className='text-body-5 font-medium'>
                                                {mobileHistoryDetailData.transaction.Flights[0].Airport_from.airport_name}
                                            </p>
                                        </div>
                                        <p className='text-body-5 font-bold text-pur-3'>Keberangkatan</p>
                                    </div>

                                    <div className='w-full border'></div>

                                    <div className='flex items-center gap-4 '>
                                        <Image src={'/images/flight_badge.svg'} alt='' width={24} height={24} />

                                        <div className='flex flex-col gap-4'>
                                            <div>
                                                <h1 className='text-body-6 font-bold'>
                                                    {mobileHistoryDetailData.transaction.Flights[0].Airline.airline_name} -{' '}
                                                    {mobileHistoryDetailData.transaction.Flights[0].flight_class}
                                                </h1>
                                                <h2 className='text-body-5 font-bold'>
                                                    {mobileHistoryDetailData.transaction.Flights[0].Airline.airline_code}
                                                </h2>
                                            </div>
                                            <div>
                                                <h3 className='text-body-5 font-bold'>Informasi :</h3>
                                                <p className='text-body-5 font-normal'>
                                                    {extractWord(mobileHistoryDetailData.transaction.Flights[0].description)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-full border'></div>

                                    <div className='flex justify-between'>
                                        <div>
                                            <p className='text-title-1 font-bold'>
                                                {fixedHour(mobileHistoryDetailData.transaction.Flights[0].arrival_time)}
                                            </p>
                                            <p className='text-body-5'>
                                                {reformatDate(mobileHistoryDetailData.transaction.Flights[0].arrival_date)}
                                            </p>
                                            <p className='text-body-5 font-medium'>
                                                {mobileHistoryDetailData.transaction.Flights[0].Airport_to.airport_name}
                                            </p>
                                        </div>
                                        <p className='text-body-5 font-bold text-pur-3'>Kedatangan</p>
                                    </div>
                                </div>
                            )}
                            {/* Detail Transaction 0 */}

                            {mobileHistoryDetailData.transaction.Flights[1] && <div className=' w-full border'></div>}

                            {/* Detail Transaction 1 */}
                            {mobileHistoryDetailData.transaction.Flights[1] && (
                                <div className='flex flex-col gap-2'>
                                    <p className='w-max rounded-rad-4 bg-pur-5 px-2 py-1 text-body-6 text-white'>
                                        Kepulangan - Flight 2
                                    </p>

                                    <div className='flex justify-between'>
                                        <div>
                                            <p className='text-title-1 font-bold'>
                                                {fixedHour(mobileHistoryDetailData.transaction.Flights[1].departure_time)}
                                            </p>
                                            <p className='text-body-5'>
                                                {reformatDate(mobileHistoryDetailData.transaction.Flights[1].departure_date)}
                                            </p>
                                            <p className='text-body-5 font-medium'>
                                                {mobileHistoryDetailData.transaction.Flights[1].Airport_from.airport_name}
                                            </p>
                                        </div>
                                        <p className='text-body-5 font-bold text-pur-3'>Keberangkatan</p>
                                    </div>

                                    <div className='w-full border'></div>

                                    <div className='flex items-center gap-4 '>
                                        <Image src={'/images/flight_badge.svg'} alt='' width={24} height={24} />

                                        <div className='flex flex-col gap-4'>
                                            <div>
                                                <h1 className='text-body-6 font-bold'>
                                                    {mobileHistoryDetailData.transaction.Flights[1].Airline.airline_name} -{' '}
                                                    {mobileHistoryDetailData.transaction.Flights[1].flight_class}
                                                </h1>
                                                <h2 className='text-body-5 font-bold'>
                                                    {mobileHistoryDetailData.transaction.Flights[1].Airline.airline_code}
                                                </h2>
                                            </div>
                                            <div>
                                                <h3 className='text-body-5 font-bold'>Informasi :</h3>
                                                <p className='text-body-5 font-normal'>
                                                    {extractWord(mobileHistoryDetailData.transaction.Flights[1].description)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-full border'></div>

                                    <div className='flex justify-between'>
                                        <div>
                                            <p className='text-title-1 font-bold'>
                                                {fixedHour(mobileHistoryDetailData.transaction.Flights[1].arrival_time)}
                                            </p>
                                            <p className='text-body-5'>
                                                {reformatDate(mobileHistoryDetailData.transaction.Flights[1].arrival_date)}
                                            </p>
                                            <p className='text-body-5 font-medium'>
                                                {mobileHistoryDetailData.transaction.Flights[1].Airport_to.airport_name}
                                            </p>
                                        </div>
                                        <p className='text-body-5 font-bold text-pur-3'>Kedatangan</p>
                                    </div>
                                </div>
                            )}
                            {/* Detail Transaction 1 */}
                        </div>

                        {/* Rincian Harga */}
                        <div className='my-3 flex flex-col gap-2 px-4'>
                            <h3 className='text-title-1 font-bold'>Rincian Harga</h3>
                            {mobileHistoryDetailData.transaction.Flights[0] && (
                                <div>
                                    {mobileHistoryDetailData.transaction.Flights[1] && (
                                        <p className='w-max rounded-rad-4 bg-pur-5 px-2 py-1 text-body-6 text-white'>
                                            {mobileHistoryDetailData.transaction.Flights[0].Airline.airline_name} - Kepergian
                                        </p>
                                    )}
                                    {mobileHistoryDetailData?.type_passenger?.adult > 0 && (
                                        <div className='flex items-center justify-between'>
                                            <p>{mobileHistoryDetailData.type_passenger.adult} Dewasa</p>
                                            <p>{formatRupiah(mobileHistoryDetailData.transaction.Flights[0].price)}</p>
                                        </div>
                                    )}

                                    {mobileHistoryDetailData?.type_passenger?.child > 0 && (
                                        <div className='flex items-center justify-between'>
                                            <p>{mobileHistoryDetailData?.type_passenger?.child} Anak</p>
                                            <p>{formatRupiah(mobileHistoryDetailData.transaction.Flights[0].price)}</p>
                                        </div>
                                    )}
                                    {mobileHistoryDetailData?.type_passenger?.baby > 0 && (
                                        <div className='flex items-center justify-between'>
                                            <p>{mobileHistoryDetailData?.type_passenger?.baby} Bayi</p>
                                            <p>{formatRupiah(0)}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                            {mobileHistoryDetailData.transaction.Flights[1] && <div className=' w-full border'></div>}
                            {mobileHistoryDetailData.transaction.Flights[1] && (
                                <div>
                                    <p className='w-max rounded-rad-4 bg-pur-5 px-2 py-1 text-body-6 text-white'>
                                        {mobileHistoryDetailData.transaction.Flights[1].Airline.airline_name} - Kepulangan
                                    </p>
                                    {mobileHistoryDetailData?.type_passenger?.adult > 0 && (
                                        <div className='flex items-center justify-between'>
                                            <p>{mobileHistoryDetailData.type_passenger.adult} Dewasa</p>
                                            <p>{formatRupiah(mobileHistoryDetailData.transaction.Flights[1].price)}</p>
                                        </div>
                                    )}

                                    {mobileHistoryDetailData?.type_passenger?.child > 0 && (
                                        <div className='flex items-center justify-between'>
                                            <p>{mobileHistoryDetailData?.type_passenger?.child} Anak</p>
                                            <p>{formatRupiah(mobileHistoryDetailData.transaction.Flights[1].price)}</p>
                                        </div>
                                    )}
                                    {mobileHistoryDetailData?.type_passenger?.baby > 0 && (
                                        <div className='flex items-center justify-between'>
                                            <p>{mobileHistoryDetailData?.type_passenger?.baby} Bayi</p>
                                            <p>{formatRupiah(0)}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className='my-1 w-full border'></div>
                            <div className='flex flex-col gap-1 '>
                                <div className='flex items-center justify-between'>
                                    <p className='font-bold'>Tax</p>
                                    <p className='font-bold'>{formatRupiah(mobileHistoryDetailData?.price?.tax)}</p>
                                </div>
                            </div>
                        </div>
                        {/* Rincian Harga */}

                        <div className='  invisible h-[120px] '></div>

                        <div className='fixed inset-x-0 bottom-0  flex  h-[120px] flex-col gap-3   bg-white px-4 py-4 shadow-low '>
                            <div className='flex justify-between'>
                                <h1 className='text-title-1 font-bold'>Total</h1>
                                <h1 className='text-head-1 font-bold text-alert-3'>
                                    {formatRupiah(mobileHistoryDetailData.price.total)}
                                </h1>
                            </div>

                            <Button
                                onClick={() => console.log('Hello')}
                                disabled={mobileHistoryDetailData?.transaction?.transaction_status?.toLowerCase() === 'issued'}
                                className={`${
                                    mobileHistoryDetailData?.transaction?.transaction_status?.toLowerCase() === 'issued'
                                        ? 'opacity-50'
                                        : 'opacity-100'
                                } my-1 w-full rounded-rad-3 bg-pur-3 py-2 text-white`}>
                                {mobileHistoryDetailData?.transaction?.transaction_status?.toLowerCase() === 'unpaid'
                                    ? 'Bayar!'
                                    : 'Sudah di Bayar'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* MOBILE MODE */}
            <AlertTop
                visibleAlert={visibleAlert}
                handleVisibleAlert={handleVisibleAlert}
                text={alertText}
                type={alertType}
                bgType='none'
            />
            <AlertTop
                visibleAlert={visibleAlertError}
                handleVisibleAlert={handleVisibleAlertError}
                text={alertTextError}
                type={alertTypeError}
                bgType='none'
            />

            {openFilterHistoryByCode && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
                    <div className='h-[300px] w-[668px] rounded-rad-3 bg-white px-4 shadow-low'>
                        <div className='flex items-center gap-2 pt-3'>
                            <Input
                                className='w-full appearance-none  px-4 py-2 font-poppins outline-none'
                                // onChange={handleFromInputChange}
                                onChange={handleOnChangeFilterByCode}
                                value={filterInput}
                            />
                            <div>
                                <Button className='bg-white' onClick={() => setOpenFilterHistoryByCode(!openFilterHistoryByCode)}>
                                    <FiX className='h-[32px] w-[32px]' />
                                </Button>
                            </div>
                        </div>

                        <div style={{ height: 'calc(300px - 62px)' }} className='overflow-y-scroll pt-3'></div>
                    </div>
                </div>
            )}
        </div>
    );
}

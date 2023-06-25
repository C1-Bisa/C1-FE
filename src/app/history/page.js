'use client';

//Core
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

//Third Parties
import axios from 'axios';
import dayjs from 'dayjs';
import { useSession, signOut } from 'next-auth/react';
import { FiArrowLeft, FiFilter } from 'react-icons/fi';
import { IoSearchSharp, IoLocationSharp } from 'react-icons/io5';
import { MdSearch } from 'react-icons/md';

//Redux
import { useDispatch } from 'react-redux';
import { historySlice } from '@/store/history';

//Components
import AlertBottom from '@/components/AlertBottom';
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
import BottomNavbar from '@/components/BottomNavbar';
import RiwayatPesananKanan from '@/components/RiwayatPesananKanan';

//Utils
import { reformatDate } from '@/store/reformatDate';
import { reformatDuration } from '@/utils/reformatDuration';
import { fixedHour } from '@/utils/fixedHour';
import { formatRupiah } from '@/utils/formatRupiah';
import { extractWord } from '@/utils/extractWord';

export default function History() {
    //router
    const router = useRouter();

    //next auth
    const { data: session, status } = useSession();
    let token = session?.user?.token;

    //redux
    const dispatch = useDispatch();
    const { setHistoryDetail } = historySlice.actions;

    //state
    const [historyItem, setHistoryItem] = useState(null);
    const [historyData, setHistoryData] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(true);
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [alertType, setAlertType] = useState('');
    const [fetchData, setFetchData] = useState(true);
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        email: '',
    });

    /*=== function === */
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

    const handleHistoryDetailMobile = (data) => {
        dispatch(setHistoryDetail(data));
        router.push('/history/detail');
    };

    const handleVisibleAlert = (text, alertType) => {
        setAlertText(text);
        setAlertType(alertType);
        setVisibleAlert(!visibleAlert);
    };

    const handleHistoryDetail = (history) => {
        setHistoryItem(history);
        console.log('History Detail : ', history);
    };

    const handleUpdatePayment = async (transaction_code) => {
        try {
            const URL_UPDATE_PAYMENT = 'https://kel1airplaneapi-production.up.railway.app/api/v1/transaction/update';
            const res = await axios.put(
                URL_UPDATE_PAYMENT,
                {
                    transaction_code,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('PESAN UPDATE_PAYMENT:', res);
            setFetchStatus(true);
        } catch (error) {
            console.log(error.message);
        }
    };
    /*Effect */
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
        if (fetchStatus) {
            const fetchBooking = async () => {
                try {
                    const URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/getHistoryTransaction';

                    const response = await axios.get(URL, {
                        headers: {
                            Authorization: `Bearer ${session?.user?.token}`,
                        },
                    });

                    const results = response.data.data.reduce((acc, current) => {
                        acc[String(reformatDate(current?.transaction?.transaction_date, { month: 'long', year: 'numeric' }))] =
                            acc[
                                String(
                                    reformatDate(current?.transaction?.transaction_date, {
                                        month: 'long',
                                        year: 'numeric',
                                    })
                                )
                            ] || [];
                        acc[
                            String(reformatDate(current?.transaction?.transaction_date, { month: 'long', year: 'numeric' }))
                        ].push(current);
                        return acc;
                    }, {});

                    let result = Object.keys(results).map((key, index) => {
                        return {
                            id: index + 1,
                            month: key,
                            data: results[key],
                        };
                    });
                    setHistoryData(result);
                    setHistoryItem(result[0]?.data[0]);
                    // console.log('RESPOND DATA', response.data);
                } catch (error) {
                    console.log(error.message.data);
                }
            };
            fetchBooking();
        }
        setFetchStatus(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchStatus, token]);

    console.log('DATA HISTORy', historyData);
    return (
        <>
            <Navbar className={'hidden lg:block'} />
            {/* DESKTOP MODE */}
            <div className='container relative mx-auto hidden max-w-screen-lg grid-cols-12 gap-3 font-poppins lg:grid'>
                <h1 className='col-span-12 mb-[24px] mt-[47px] font-poppins text-head-1 font-bold'>Riwayat Pemesanan</h1>
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

            <div className='container mx-auto mt-[27px] hidden max-w-screen-lg font-poppins lg:block'>
                <div className='grid grid-cols-12 '>
                    {historyData.length > 0 ? (
                        <div className='col-span-12 grid grid-cols-12 gap-10'>
                            <div className='col-span-7'>
                                {historyData.length > 0 &&
                                    historyData?.map((history, index) => {
                                        return (
                                            <div key={index} className='grid grid-cols-12'>
                                                <h1 className='col-span-12 text-title-2 font-bold'>{history.month}</h1>
                                                <div className='col-span-12 mt-3 flex flex-col gap-4'>
                                                    {history?.data?.map((historyItem, index) => {
                                                        return (
                                                            <div
                                                                onClick={() => handleHistoryDetail(historyItem)}
                                                                key={index}
                                                                className='flex cursor-pointer flex-col gap-4 rounded-rad-3 p-4 shadow-low'>
                                                                <h1
                                                                    className={`${historyStatusStyling(
                                                                        historyItem?.transaction?.transaction_status
                                                                    )} w-max rounded-rad-4 px-3 py-1 text-body-6`}>
                                                                    {historyItem?.transaction?.transaction_status}
                                                                </h1>
                                                                {historyItem?.transaction?.Flights &&
                                                                    historyItem?.transaction?.Flights?.map((flight, index) => {
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
                                                                            {historyItem?.transaction?.transaction_code}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <h3 className='text-body-5 font-bold'>Class:</h3>
                                                                        <p className='text-body-5 font-normal'>
                                                                            {historyItem?.transaction?.Flights[0]?.flight_class}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <h3 className='text-body-5 font-bold text-pur-5'>
                                                                            {formatRupiah(
                                                                                historyItem?.transaction?.Flights[0]?.price
                                                                            )}
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
                                {historyItem && (
                                    <div>
                                        <div className='flex justify-between'>
                                            <h1 className='text-title-2 font-bold'>Detail History</h1>
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
                                            <div>
                                                <div className='flex justify-between'>
                                                    <div>
                                                        <h1 className='text-title-2 font-bold'>
                                                            {fixedHour(historyItem?.transaction?.Flights[0]?.departure_time)}
                                                        </h1>
                                                        <h1 className='text-body-6'>
                                                            {reformatDate(historyItem?.transaction?.Flights[0]?.departure_date)}
                                                        </h1>
                                                        <h1 className='text-body-6 font-medium'>
                                                            {historyItem?.transaction?.Flights[0]?.Airport_from?.airport_name}
                                                        </h1>
                                                    </div>
                                                    <h1 className='text-body-3 font-bold text-pur-3'>Keberangkatan</h1>
                                                </div>
                                                <div className='mb-2 mt-4 w-full border text-net-3'></div>
                                                <div className='flex items-center gap-2'>
                                                    <div className='relative h-[24px] w-[24px] '>
                                                        <Image src={'/images/flight_badge.svg'} fill alt='' />
                                                    </div>
                                                    <div className='flex flex-col gap-4'>
                                                        <div>
                                                            <h3 className='text-body-5 font-bold'>
                                                                {historyItem?.transaction?.Flights[0]?.Airline.airline_name} -{' '}
                                                                {historyItem?.transaction?.Flights[0]?.flight_class}
                                                            </h3>
                                                            <h3 className='text-body-5 font-bold'>
                                                                {historyItem?.transaction?.Flights[0]?.Airline.airline_code}
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
                                                            {fixedHour(historyItem?.transaction?.Flights[0]?.arrival_time)}
                                                        </h1>
                                                        <h1 className='text-body-6'>
                                                            {reformatDate(historyItem?.transaction?.Flights[0]?.arrival_date)}
                                                        </h1>
                                                        <h1 className='text-body-6 font-medium'>
                                                            {historyItem?.transaction?.Flights[0]?.Airport_to.airport_name}
                                                        </h1>
                                                    </div>
                                                    <h1 className='text-body-3 font-bold text-pur-3'>Kedatangan</h1>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className='mb-2 mt-4 w-full border text-net-3'></div>
                                <h1 className='text-body-6 font-bold'>Rincian Harga</h1>
                                <div>
                                    {historyItem?.price && (
                                        <div className='flex flex-col gap-1'>
                                            {historyItem?.type_passenger?.adult > 0 && (
                                                <div className='flex justify-between text-body-6'>
                                                    <h1>{historyItem?.type_passenger?.adult} Dewasa</h1>
                                                    <h1>
                                                        {' '}
                                                        {formatRupiah(
                                                            historyItem?.type_passenger?.adult * historyItem?.price?.departure
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
                                                            historyItem?.type_passenger?.child * historyItem?.price?.departure
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
                                            <div className='flex justify-between text-body-6'>
                                                <h1>Tax</h1>
                                                <h1>
                                                    <span>{formatRupiah(historyItem?.price?.tax)}</span>
                                                </h1>
                                            </div>
                                            <div className='mb-3 mt-2 w-full border text-net-3'></div>
                                            <div className='flex justify-between text-title-2 font-bold'>
                                                <h1>Total</h1>
                                                <h1 className='text-pur-4'>
                                                    <span className='ml-1'>{formatRupiah(historyItem?.price?.total)}</span>
                                                </h1>
                                            </div>
                                        </div>
                                    )}

                                    {historyItem?.transaction?.transaction_status.toLowerCase() === 'unpaid' ? (
                                        <Button
                                            onClick={() => handleUpdatePayment(historyItem?.transaction?.transaction_code)}
                                            className='mt-8 w-full rounded-rad-4 bg-alert-3 py-4 text-head-1 font-medium text-white hover:bg-red-500 '>
                                            Lanjut Bayar
                                        </Button>
                                    ) : (
                                        <Button className='mt-8 w-full rounded-rad-4 bg-pur-5 py-4 text-head-1 font-medium text-white hover:bg-purple-400 '>
                                            Cetak Tiket
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='col-span-12 flex h-[500px] items-center justify-center '>
                            <div className='flex flex-col justify-center gap-8'>
                                <div className='flex flex-col items-center justify-center text-center'>
                                    <Image alt='' src={'/images/empty_history.svg'} width={200} height={200} />
                                    <h1 className='mt-4 text-body-6 font-bold text-pur-5'>Oops! Riwayat Pesanan Kosong!</h1>
                                    <h3 className='text-body-6'>Anda belum melakukan penerbangan</h3>
                                </div>
                                <Button>Cari Penerbangan</Button>
                            </div>
                        </div>
                    )}

                    <AlertBottom
                        visibleAlert={visibleAlert}
                        handleVisibleAlert={handleVisibleAlert}
                        text={alertText}
                        type={alertType}
                    />
                </div>
            </div>

            {/* DESKTOP MODE */}

            {/* MOBILE MODE */}
            {/* <div
                className={`${
                    data.length ? ' bg-gradient-to-b from-[#DEC9FF] to-[#FFE9CA00] ' : 'bg-white '
                }  h-screen font-poppins lg:hidden`}>
                <div className='mx-[24px] grid grid-cols-12  pt-[24px] '>
                    <div className='flex items-center justify-between col-span-12'>
                        <h1 className='font-bold text-head-2'>Riwayat Pesanan</h1>
                        <MdSearch className='h-[24px] w-[24px]' />
                    </div>

                    <div className='flex justify-end col-span-12 mt-7'>
                        <Button className='flex items-center gap-2 rounded-rad-4 border border-net-3 px-3 py-[6px] text-body-3 font-medium text-net-3'>
                            <FiFilter />
                            <p className='text-black'>Filter</p>
                        </Button>
                    </div>

                    <div className='col-span-12 mb-[72px]'>
                        <div className='flex flex-col gap-4'>
                            {data.length ? (
                                data.map((history, index) => {
                                    return (
                                        <div key={index}>
                                            <h1 className='font-bold text-title-2'>{history.month}</h1>
                                            <div className='flex flex-col gap-3 mt-4'>
                                                {history?.data?.map((historyItem, index) => {
                                                    return (
                                                        <div
                                                            onClick={() => handleDetailHistory(historyItem)}
                                                            key={index}
                                                            className='flex flex-col  gap-4 rounded-rad-3 bg-white px-[16px] py-[20px] shadow-low'>
                                                            <div className='flex items-center justify-between'>
                                                                <h2
                                                                    className={`${historyStatusStyling(
                                                                        historyItem.transaction_status
                                                                    )} w-max rounded-rad-4 px-3 py-1 text-body-6`}>
                                                                    {historyItem.transaction_status}
                                                                </h2>
                                                                <h2 className='font-bold text-body-6'>
                                                                    {historyItem.flight_type}
                                                                </h2>
                                                            </div>

                                                            <div className='flex justify-between '>
                                                                <div className='flex gap-2'>
                                                                    <IoLocationSharp className='h-[24px] w-[24px] text-net-3' />
                                                                    <div>
                                                                        {historyItem.flight_departure.map(
                                                                            (historyItemFlight, index) => (
                                                                                <div key={index}>
                                                                                    <p className='font-bold text-body-6'>
                                                                                        {historyItemFlight.from}
                                                                                    </p>
                                                                                    <p className='font-medium text-body-3'>
                                                                                        {reformatDate(
                                                                                            historyItemFlight.departure_date
                                                                                        )}
                                                                                    </p>
                                                                                    <p className='font-medium text-body-3'>
                                                                                        {fixedHour(
                                                                                            historyItemFlight.departure_time
                                                                                        )}
                                                                                    </p>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <div className=''>
                                                                    {historyItem.flight_departure.map(
                                                                        (historyItemFlight, index) => (
                                                                            <div key={index}>
                                                                                <p className='text-center text-body-4 text-net-3'>
                                                                                    {reformatDuration(historyItemFlight.duration)}
                                                                                </p>
                                                                                <div className='w-[39px]  border border-net-5'></div>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>

                                                                <div className='flex gap-2'>
                                                                    <IoLocationSharp className='h-[24px] w-[24px] text-net-3' />
                                                                    <div>
                                                                        {historyItem.flight_departure.map(
                                                                            (historyItemFlight, index) => (
                                                                                <div key={index}>
                                                                                    <p className='font-bold text-body-6'>
                                                                                        {historyItemFlight.to}
                                                                                    </p>
                                                                                    <p className='font-medium text-body-3'>
                                                                                        {reformatDate(
                                                                                            historyItemFlight.arrival_date
                                                                                        )}
                                                                                    </p>
                                                                                    <p className='font-medium text-body-3'>
                                                                                        {fixedHour(
                                                                                            historyItemFlight.arrival_time
                                                                                        )}
                                                                                    </p>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {historyItem.flight_type.toLowerCase() === 'two way' && (
                                                                <div className='flex justify-between '>
                                                                    <div className='flex gap-2'>
                                                                        <IoLocationSharp className='h-[24px] w-[24px] text-net-3' />
                                                                        <div>
                                                                            {historyItem.flight_return.map(
                                                                                (historyItemFlight, index) => (
                                                                                    <div key={index}>
                                                                                        <p className='font-bold text-body-6'>
                                                                                            {historyItemFlight.from}
                                                                                        </p>
                                                                                        <p className='font-medium text-body-3'>
                                                                                            {reformatDate(
                                                                                                historyItemFlight.departure_date
                                                                                            )}
                                                                                        </p>
                                                                                        <p className='font-medium text-body-3'>
                                                                                            {fixedHour(
                                                                                                historyItemFlight.departure_time
                                                                                            )}
                                                                                        </p>
                                                                                    </div>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    <div className=''>
                                                                        {historyItem.flight_return.map(
                                                                            (historyItemFlight, index) => (
                                                                                <div key={index}>
                                                                                    <p className='text-center text-body-4 text-net-3'>
                                                                                        {reformatDuration(
                                                                                            historyItemFlight.duration
                                                                                        )}
                                                                                    </p>
                                                                                    <div className='w-[39px]  border border-net-5'></div>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </div>

                                                                    <div className='flex gap-2'>
                                                                        <IoLocationSharp className='h-[24px] w-[24px] text-net-3' />
                                                                        <div>
                                                                            {historyItem.flight_return.map(
                                                                                (historyItemFlight, index) => (
                                                                                    <div key={index}>
                                                                                        <p className='font-bold text-body-6'>
                                                                                            {historyItemFlight.to}
                                                                                        </p>
                                                                                        <p className='font-medium text-body-3'>
                                                                                            {reformatDate(
                                                                                                historyItemFlight.arrival_date
                                                                                            )}
                                                                                        </p>
                                                                                        <p className='font-medium text-body-3'>
                                                                                            {fixedHour(
                                                                                                historyItemFlight.arrival_time
                                                                                            )}
                                                                                        </p>
                                                                                    </div>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <div className='w-full border'></div>
                                                            <div className='flex items-center justify-between'>
                                                                <div className='text-body-3'>
                                                                    <h3 className='font-bold'>Booking Code:</h3>
                                                                    <p>{historyItem.transaction_code}</p>
                                                                </div>
                                                                <div className='text-body-3'>
                                                                    <h3 className='font-bold'>Class:</h3>
                                                                    {historyItem.flight_departure.map(
                                                                        (historyItemFlight, index) => (
                                                                            <p key={index}>{historyItemFlight.flight_class}</p>
                                                                        )
                                                                    )}
                                                                </div>
                                                                <div className='text-body-6'>
                                                                    <p className='font-bold text-pur-5'>
                                                                        IDR {historyItem.amount}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className=' mt-[120px] flex justify-center'>
                                    <Image alt='' src={'/images/empty_history.svg'} width={200} height={200} loading='lazy' />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <BottomNavbar />
            </div> */}
            {/* MOBILE MODE */}
        </>
    );
}

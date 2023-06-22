'use client';
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
import { FiArrowLeft, FiFilter } from 'react-icons/fi';
import { IoSearchSharp, IoLocationSharp } from 'react-icons/io5';
import RiwayatPesananKanan from '@/components/RiwayatPesananKanan';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BottomNavbar from '@/components/BottomNavbar';
import { MdSearch } from 'react-icons/md';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import test from '@/store/test';
import { useSession, signOut } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { historySlice } from '@/store/history';

export default function History() {
    const dispatch = useDispatch();
    const { setHistoryDetail } = historySlice.actions;

    const router = useRouter();
    const [data, setData] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(true);
    const { data: session, status } = useSession();
    let token = session?.user?.token;

    console.log('myToken', token);

    const reformatDate = (date, option = { day: 'numeric', month: 'long', year: 'numeric' }) =>
        new Date(date).toLocaleString('id', option);

    useEffect(() => {
        if (fetchStatus) {
            const fetchBooking = async () => {
                try {
                    const URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/getHistoryTransaction';

                    const response = await axios.get(URL, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const results = response.data.data.reduce((acc, current) => {
                        acc[String(reformatDate(current.transaction_date, { month: 'long', year: 'numeric' }))] =
                            acc[
                                String(
                                    reformatDate(current.transaction_date, {
                                        month: 'long',
                                        year: 'numeric',
                                    })
                                )
                            ] || [];
                        acc[String(reformatDate(current.transaction_date, { month: 'long', year: 'numeric' }))].push(current);
                        return acc;
                    }, {});

                    let result = Object.keys(results).map((key, index) => {
                        return {
                            id: index + 1,
                            month: key,
                            data: results[key],
                        };
                    });
                    setData(result);

                    // console.log(results);
                } catch (error) {
                    console.log(error.message);
                }
            };
            fetchBooking();
        }
        setFetchStatus(false);
    }, [fetchStatus, token]);

    const historyStatusStyling = (historyStatus) => {
        if (historyStatus.toLowerCase() === 'issued') {
            return 'bg-alert-1 text-white';
        }
        if (historyStatus.toLowerCase() === 'unpaid') {
            return 'bg-alert-3 text-white';
        }
        if (historyStatus.toLowerCase() === 'cancelled') {
            return 'bg-net-3 text-white';
        }
    };
    console.log(data);

    const fixedHour = (hours) => {
        let arrOfHours = hours.split(':');
        let arr = [];
        while (arr.length < 2) {
            arr.push(arrOfHours[arr.length]);
        }
        return arr.join(':');
    };

    const reformatDuration = (duration) => {
        let text = String(duration)
            .split('')
            .filter((txt) => txt !== '9');

        return `${text[0]}h ${text[1]}m`;
    };

    const handleDetailHistory = (data) => {
        dispatch(setHistoryDetail(data));
        router.push('/history/detail');
    };

    return (
        <>
            <Navbar className={'hidden lg:block'} />
            {/* DESKTOP MODE */}
            <div className='container mx-auto hidden max-w-screen-lg grid-cols-12 gap-3 font-poppins lg:grid '>
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
            {/* <div className='container mx-auto mt-[27px] hidden max-w-screen-lg font-poppins lg:block'>
                <div className='grid grid-cols-12'>
                    <div className='col-span-7 flex flex-col gap-4'>
                  
                        <div>
                            <h1 className='text-title-2 font-bold'>Februari</h1>
                            {dataShape &&
                                dataShape.map((data, index) => {
                                    if (2 === dayjs(data.booking_date).month() + 1) {
                                        return (
                                            <div
                                                key={index}
                                                className='mt-3 flex w-max cursor-pointer flex-col gap-4 rounded-rad-3 border-2   border-transparent p-4 shadow-low hover:border-2 hover:border-pur-5'>
                                                
                                                <p className='w-max rounded-rad-4 bg-alert-1 px-3 py-1 text-body-6 text-white'>
                                                    {data.status}
                                                </p>
                                                

                                                
                                                <div className=' flex items-center gap-4 '>
                                                    <div className='flex gap-2'>
                                                        <IoLocationSharp className='h-[24px] w-[24px] text-net-3' />
                                                        <div>
                                                            <p className='text-body-6 font-bold'>Jakarta</p>
                                                            <p className='text-body-3 font-medium'>5 Maret 2023</p>
                                                            <p className='text-body-3 font-medium'>19:10</p>
                                                        </div>
                                                    </div>
                                                    <div className=' '>
                                                        <p className='text-center text-body-4 text-net-3'>4h</p>
                                                        <div className='relative h-[8px] w-[233px]'>
                                                            <Image alt='' src={'./images/arrow.svg'} fill />
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-2'>
                                                        <IoLocationSharp className='h-[24px] w-[24px] text-net-3' />
                                                        <div>
                                                            <p className='text-body-6 font-bold'>Melbourne</p>
                                                            <p className='text-body-3 font-medium'>5 Maret 2023</p>
                                                            <p className='text-body-3 font-medium'>19:10</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                

                                               
                                                <div className=' border border-net-2'></div>
                                               

                                                <div className='flex items-center justify-between'>
                                                    <div>
                                                        <h3 className='text-body-5 font-bold'>Booking Code:</h3>
                                                        <p className='text-body-5 font-normal'>6723y2GHK</p>
                                                    </div>
                                                    <div>
                                                        <h3 className='text-body-5 font-bold'>Class:</h3>
                                                        <p className='text-body-5 font-normal'>Economy</p>
                                                    </div>
                                                    <div>
                                                        <h3 className='text-body-5 font-bold text-pur-5'>IDR 9.850.000</h3>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        );
                                    }
                                })}
                        </div>
                      
                        <div>
                            <h1 className='text-title-2 font-bold'>Maret</h1>
                            {dataShape &&
                                dataShape.map((data, index) => {
                                    if (3 === dayjs(data.booking_date).month() + 1) {
                                        return (
                                            <div
                                                key={index}
                                                className='mt-3 flex w-max cursor-pointer flex-col gap-4 rounded-rad-3 border-2   border-transparent p-4 shadow-low hover:border-2 hover:border-pur-5'>
                                                
                                                <p className='w-max rounded-rad-4 bg-alert-1 px-3 py-1 text-body-6 text-white'>
                                                    {data.status}
                                                </p>
                                             

                                              
                                                <div className=' flex items-center gap-4 '>
                                                    <div className='flex gap-2'>
                                                        <IoLocationSharp className='h-[24px] w-[24px] text-net-3' />
                                                        <div>
                                                            <p className='text-body-6 font-bold'>Jakarta</p>
                                                            <p className='text-body-3 font-medium'>5 Maret 2023</p>
                                                            <p className='text-body-3 font-medium'>19:10</p>
                                                        </div>
                                                    </div>
                                                    <div className=' '>
                                                        <p className='text-center text-body-4 text-net-3'>4h</p>
                                                        <div className='relative h-[8px] w-[233px]'>
                                                            <Image alt='' src={'./images/arrow.svg'} fill />
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-2'>
                                                        <IoLocationSharp className='h-[24px] w-[24px] text-net-3' />
                                                        <div>
                                                            <p className='text-body-6 font-bold'>Melbourne</p>
                                                            <p className='text-body-3 font-medium'>5 Maret 2023</p>
                                                            <p className='text-body-3 font-medium'>19:10</p>
                                                        </div>
                                                    </div>
                                                </div>
                                               
                                                <div className=' border border-net-2'></div>
                                               
                                                <div className='flex items-center justify-between'>
                                                    <div>
                                                        <h3 className='text-body-5 font-bold'>Booking Code:</h3>
                                                        <p className='text-body-5 font-normal'>6723y2GHK</p>
                                                    </div>
                                                    <div>
                                                        <h3 className='text-body-5 font-bold'>Class:</h3>
                                                        <p className='text-body-5 font-normal'>Economy</p>
                                                    </div>
                                                    <div>
                                                        <h3 className='text-body-5 font-bold text-pur-5'>IDR 9.850.000</h3>
                                                    </div>
                                                </div>
                                               
                                            </div>
                                        );
                                    }
                                })}
                        </div>
                      
                    </div>
                    <div className='col-span-5'>
                        <div className='flex flex-col gap-3'>
                            <div className='flex items-center justify-between'>
                                <h1 className='text-title-3  font-bold '>Detail Pesanan</h1>
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
                          
                            <div className='mb-2 mt-4 flex justify-center'>
                                <div className='w-1/2 border border-net-2'></div>
                            </div>
                         

                            <div className='flex items-center gap-4'>
                                <div className='relative h-[24px] w-[24px]'>
                                    <Image src={'./images/flight_badge.svg'} fill alt='' />
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
                        
                            <div className='mb-2 mt-4 flex justify-center'>
                                <div className='w-1/2 border-[1px] border-t-net-2'></div>
                            </div>
                     
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
                           
                            <div className='mb-2 mt-4 flex justify-center'>
                                <div className='w-full border-[1px] border-t-net-2'></div>
                            </div>
                         
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
                          
                            <div className='mb-2 mt-4 flex justify-center'>
                                <div className='w-full border-[1px] border-t-net-2'></div>
                            </div>
                           
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
            </div> */}
            {/* DESKTOP MODE */}

            {/* MOBILE MODE */}
            <div
                className={`${
                    data.length ? ' bg-gradient-to-b from-[#DEC9FF] to-[#FFE9CA00] ' : 'bg-white '
                }  h-screen font-poppins lg:hidden`}>
                <div className='mx-[24px] grid grid-cols-12  pt-[24px] '>
                    <div className='col-span-12 flex items-center justify-between'>
                        <h1 className='text-head-2 font-bold'>Riwayat Pesanan</h1>
                        <MdSearch className='h-[24px] w-[24px]' />
                    </div>

                    <div className='col-span-12 mt-7  flex justify-end'>
                        <Button className='flex items-center gap-2 rounded-rad-4 border border-net-3 px-3 py-[6px] text-body-3 font-medium text-net-3'>
                            <FiFilter />
                            <p className='text-black'>Filter</p>
                        </Button>
                    </div>

                    <div className='col-span-12 mb-[72px]'>
                        <div className='flex flex-col  gap-4'>
                            {data.length ? (
                                data.map((history, index) => {
                                    // console.log('this data', history);
                                    return (
                                        <div key={index}>
                                            <h1 className='text-title-2 font-bold'>{history.month}</h1>
                                            <div className='mt-4 flex flex-col  gap-3'>
                                                {history.data.map((historyItem, index) => {
                                                    // console.log(`HistoryItem ke-${index}`, historyItem);
                                                    return (
                                                        <div
                                                            onClick={() => handleDetailHistory(historyItem)}
                                                            key={index}
                                                            className='flex flex-col  gap-4 rounded-rad-3 bg-white px-[16px] py-[20px] shadow-low'>
                                                            {/* header */}
                                                            <div className='flex items-center justify-between'>
                                                                <h2
                                                                    className={`${historyStatusStyling(
                                                                        historyItem.transaction_status
                                                                    )} w-max rounded-rad-4 px-3 py-1 text-body-6`}>
                                                                    {historyItem.transaction_status}
                                                                </h2>
                                                                <h2 className='text-body-6 font-bold'>
                                                                    {historyItem.flight_type}
                                                                </h2>
                                                            </div>
                                                            {/* header */}
                                                            {/* derpature */}
                                                            <div className='flex justify-between '>
                                                                <div className='flex gap-2'>
                                                                    <IoLocationSharp className='h-[24px] w-[24px] text-net-3' />
                                                                    <div>
                                                                        {historyItem.flight_departure.map(
                                                                            (historyItemFlight, index) => (
                                                                                <div key={index}>
                                                                                    <p className='text-body-6 font-bold'>
                                                                                        {historyItemFlight.from}
                                                                                    </p>
                                                                                    <p className='text-body-3 font-medium'>
                                                                                        {reformatDate(
                                                                                            historyItemFlight.departure_date
                                                                                        )}
                                                                                    </p>
                                                                                    <p className='text-body-3 font-medium'>
                                                                                        {fixedHour(
                                                                                            historyItemFlight.departure_time
                                                                                        )}
                                                                                    </p>
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <div className=' '>
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
                                                                                    <p className='text-body-6 font-bold'>
                                                                                        {historyItemFlight.to}
                                                                                    </p>
                                                                                    <p className='text-body-3 font-medium'>
                                                                                        {reformatDate(
                                                                                            historyItemFlight.arrival_date
                                                                                        )}
                                                                                    </p>
                                                                                    <p className='text-body-3 font-medium'>
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
                                                            {/* derpature */}

                                                            {/* return */}
                                                            {historyItem.flight_type.toLowerCase() === 'two way' && (
                                                                <div className='flex justify-between '>
                                                                    <div className='flex gap-2'>
                                                                        <IoLocationSharp className='h-[24px] w-[24px] text-net-3' />
                                                                        <div>
                                                                            {historyItem.flight_return.map(
                                                                                (historyItemFlight, index) => (
                                                                                    <div key={index}>
                                                                                        <p className='text-body-6 font-bold'>
                                                                                            {historyItemFlight.from}
                                                                                        </p>
                                                                                        <p className='text-body-3 font-medium'>
                                                                                            {reformatDate(
                                                                                                historyItemFlight.departure_date
                                                                                            )}
                                                                                        </p>
                                                                                        <p className='text-body-3 font-medium'>
                                                                                            {fixedHour(
                                                                                                historyItemFlight.departure_time
                                                                                            )}
                                                                                        </p>
                                                                                    </div>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    <div className=' '>
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
                                                                                        <p className='text-body-6 font-bold'>
                                                                                            {historyItemFlight.to}
                                                                                        </p>
                                                                                        <p className='text-body-3 font-medium'>
                                                                                            {reformatDate(
                                                                                                historyItemFlight.arrival_date
                                                                                            )}
                                                                                        </p>
                                                                                        <p className='text-body-3 font-medium'>
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
                                                            {/* return */}

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
            </div>
            {/* MOBILE MODE */}
        </>
    );
}

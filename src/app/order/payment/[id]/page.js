'use client';

//core
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

//third parties
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import axios from 'axios';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { getPassengerTypeTotal } from '@/store/flight';

//component
import Navbar from '@/components/Navbar';
import Label from '@/components/Label';
import Input from '@/components/Input';
import Button from '@/components/Button';

// Utils
import { fixedHour } from '@/utils/fixedHour';
import { convertToDate, convertToTime } from '@/utils/converDateTime';
import { reformatDate } from '@/store/reformatDate';
import { extractWord } from '@/utils/extractWord';
import { formatRupiah } from '@/utils/formatRupiah';

export default function OrderPaymentId() {
    //state
    const [transactionHistory, setTransactionHistory] = useState(null);
    const [fetchDataHistory, setFetchDataHistory] = useState(true);

    //next auth
    const { data: session, status } = useSession();
    const token = session?.user?.token;
    const { id } = useParams();
    const router = useRouter();

    // redux
    const passengerType = useSelector(getPassengerTypeTotal); // Get passenger type total

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             async function fetchUserData() {
    //                 try {
    //                     const URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/getTransactionbyId';
    //                     const res = await axios.post(
    //                         URL,
    //                         {
    //                             transaction_id: id,
    //                         },
    //                         {
    //                             headers: {
    //                                 Authorization: `Bearer ${token}`,
    //                             },
    //                         }
    //                     );

    //                     console.log(res);
    //                     setTransactionHistory(res.data.data);
    //                 } catch (error) {
    //                     signOut();
    //                     console.log(error);
    //                 }
    //             }
    //             fetchUserData();
    //         } catch (error) {}
    //     };
    //     fetchData();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    useEffect(() => {
        if (token) {
            if (fetchDataHistory) {
                async function fetchUserData() {
                    try {
                        const URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/getTransactionbyId';
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
                        setTransactionHistory(res.data.data);

                        console.log(res);
                    } catch (error) {
                        signOut();
                        console.log(error);
                    }
                }
                fetchUserData();
            }
            setFetchDataHistory(false);
        }
    }, [fetchDataHistory, session, token, id]);

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

    console.log('DATA', transactionHistory);

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
            <Navbar className={'hidden lg:block'} />

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
                        {/* <div className='flex flex-col gap-3'>
                            <div className='flex items-center justify-between'>
                                <h1 className='font-bold text-title-3 '>Detail Pesanan</h1>
                                <p className='px-3 py-1 text-white w-max rounded-rad-4 bg-alert-1 text-body-6'>Issued</p>
                            </div>
                            <h1 className=' text-title'>
                                Booking Code : <span className='font-bold text-pur-5'>6723y2GHK</span>
                            </h1>
                            <div className='flex justify-between'>
                                <div>
                                    <h2 className='font-bold text-title-2'>19:10</h2>
                                    <p className='font-normal text-body-6'>5 Maret 2023</p>
                                    <p className='font-normal text-body-6'>Soekarno Hatta</p>
                                </div>
                                <div>
                                    <h3 className='font-bold text-pur-3'>Keberangkaran</h3>
                                </div>
                            </div>
                           
                            <div className='flex justify-center mt-4 mb-2'>
                                <div className='w-1/2 border border-net-2'></div>
                            </div>
                            

                            <div className='flex items-center gap-4'>
                                <div className='relative h-[24px] w-[24px]'>
                                    <Image src={'/images/flight_badge.svg'} fill alt='' />
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div>
                                        <h1 className='font-bold text-body-6'>Jet Air - Economy</h1>
                                        <h2 className='font-bold text-body-5'>JT - 203</h2>
                                    </div>
                                    <div>
                                        <h3 className='font-bold text-body-5'>Informasi :</h3>
                                        <p className='font-normal text-body-5'>Penumpang 1: Mr.Arief</p>
                                        <p className='font-normal text-body-5'>ID: 1234567</p>
                                        <p className='font-normal text-body-5'>Penumpang 2: Mr.Alexa</p>
                                        <p className='font-normal text-body-5'>ID: 1234567</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='flex justify-center mt-4 mb-2'>
                                <div className='w-1/2 border-[1px] border-t-net-2'></div>
                            </div>
                            
                            <div className='flex justify-between'>
                                <div>
                                    <h2 className='font-bold text-title-2'>21:10</h2>
                                    <p className='font-normal text-body-6'>Melbourne International Airport</p>
                                    <p className='font-normal text-body-6'>Soekarno Hatta</p>
                                </div>
                                <div>
                                    <h3 className='font-bold text-pur-3'>Kedatangan</h3>
                                </div>
                            </div>
                           
                            <div className='flex justify-center mt-4 mb-2'>
                                <div className='w-full border-[1px] border-t-net-2'></div>
                            </div>
                            
                            <h1 className='font-bold text-body-6'>Rincian Harga : </h1>
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
                           
                            <div className='flex justify-center mt-4 mb-2'>
                                <div className='w-full border-[1px] border-t-net-2'></div>
                            </div>
                            
                            <div className='flex justify-between font-bold text-title-3'>
                                <p>Total</p>
                                <p className='text-pur-5'>IDR 9.850.000</p>
                            </div>
                            <Button className='w-full rounded-rad-3 bg-pur-4 py-[18px] text-head-1 font-medium text-white'>
                                Simpan
                            </Button>
                        </div> */}
                        <div className='col-span-5 font-poppins'>
                            <h1 className='text-title-3 font-bold'>
                                Booking Code: {transactionHistory?.transaction?.transaction_code}
                            </h1>
                            {transactionHistory?.departure && (
                                <div className='mb-2 mt-1'>
                                    <h1 className='w-max rounded-rad-3 bg-alert-1 px-2 py-1 text-title-2 font-bold text-white'>
                                        Keberangkatan
                                    </h1>
                                </div>
                            )}
                            {transactionHistory?.departure && (
                                <div>
                                    <div className='flex justify-between'>
                                        <div>
                                            <h1 className='text-title-2 font-bold'>
                                                {fixedHour(transactionHistory?.departure?.Flight?.departure_time)}
                                            </h1>
                                            <h1 className='text-body-6'>
                                                {reformatDate(transactionHistory?.departure?.Flight?.departure_date)}
                                            </h1>
                                            <h1 className='text-body-6 font-medium'>
                                                {transactionHistory?.departure?.Flight?.Airport_from?.airport_name}
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
                                                    {transactionHistory.departure.Flight.Airline.airline_name} -{' '}
                                                    {transactionHistory.departure.Flight.flight_class}
                                                </h3>
                                                <h3 className='text-body-5 font-bold'>
                                                    {transactionHistory.departure.Flight.Airline.airline_code}
                                                </h3>
                                            </div>
                                            <div>
                                                <h3 className='text-body-5 font-bold'>Informasi : </h3>
                                                <h4 className='text-body-6'>
                                                    {extractWord(transactionHistory.departure.Flight.description)}{' '}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mb-4 mt-2 w-full border text-net-3'></div>
                                    <div className='flex justify-between'>
                                        <div>
                                            <h1 className='text-title-2 font-bold'>
                                                {fixedHour(transactionHistory.departure.Flight.arrival_time)}
                                            </h1>
                                            <h1 className='text-body-6'>
                                                {reformatDate(transactionHistory.departure.Flight.arrival_date)}
                                            </h1>
                                            <h1 className='text-body-6 font-medium'>
                                                {transactionHistory.departure.Flight.Airport_to.airport_name}
                                            </h1>
                                        </div>
                                        <h1 className='text-body-3 font-bold text-pur-3'>Kedatangan</h1>
                                    </div>
                                </div>
                            )}

                            {/* {transactionHistory?.arrival?.departure_date && (
                                <div className='mt-4 mb-2'>
                                    <h1 className='px-2 py-1 font-bold text-white w-max rounded-rad-3 bg-alert-1 text-title-2'>
                                        Kepulangan
                                    </h1>
                                </div>
                            )} */}

                            {/* {detailFlight?.pulang?.departure_date && (
                                <div>
                                    <div className='flex justify-between'>
                                        <div>
                                            <h1 className='font-bold text-title-2'>
                                                {fixedHour(detailFlight.pulang.departure_time)}
                                            </h1>
                                            <h1 className='text-body-6'>{reformatDate(detailFlight.pulang.departure_date)}</h1>
                                            <h1 className='font-medium text-body-6'>
                                                {detailFlight.pulang.Airport_from.airport_name}
                                            </h1>
                                        </div>
                                        <h1 className='font-bold text-body-3 text-pur-3'>Keberangkatan</h1>
                                    </div>
                                    <div className='w-full mt-4 mb-2 border text-net-3'></div>
                                    <div className='flex items-center gap-2'>
                                        <div className='relative h-[24px] w-[24px] '>
                                            <Image src={'./images/flight_badge.svg'} fill alt='' />
                                        </div>
                                        <div className='flex flex-col gap-4'>
                                            <div>
                                                <h3 className='font-bold text-body-5'>
                                                    {detailFlight.pulang.Airline.airline_name} -{' '}
                                                    {detailFlight.pulang.flight_class}
                                                </h3>
                                                <h3 className='font-bold text-body-5'>
                                                    {detailFlight.pulang.Airline.airline_code}
                                                </h3>
                                            </div>
                                            <div>
                                                <h3 className='font-bold text-body-5'>Informasi : </h3>
                                                <h4 className='text-body-6'>{extractWord(detailFlight.pulang.description)} </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full mt-2 mb-4 border text-net-3'></div>
                                    <div className='flex justify-between'>
                                        <div>
                                            <h1 className='font-bold text-title-2'>
                                                {fixedHour(detailFlight.pulang.arrival_time)}
                                            </h1>

                                            <h1 className='text-body-6'>{reformatDate(detailFlight.pulang.arrival_date)}</h1>
                                            <h1 className='font-medium text-body-6'>
                                                {detailFlight.pulang.Airport_to.airport_name}
                                            </h1>
                                        </div>
                                        <h1 className='font-bold text-body-3 text-pur-3'>Kedatangan</h1>
                                    </div>
                                </div>
                            )} */}
                            <div className='mb-2 mt-4 w-full border text-net-3'></div>
                            <h1 className='text-body-6 font-bold'>Rincian Harga</h1>
                            <div>
                                {transactionHistory?.price && (
                                    <div className='flex flex-col gap-1'>
                                        {passengerType.dewasa > 0 && (
                                            <div className='flex justify-between text-body-6'>
                                                <h1>{passengerType.dewasa} Dewasa</h1>
                                                <h1>
                                                    {' '}
                                                    {formatRupiah(
                                                        transactionHistory?.passenger.adult * transactionHistory?.price.departure
                                                    )}
                                                </h1>
                                            </div>
                                        )}
                                        {passengerType.anak > 0 && (
                                            <div className='flex justify-between text-body-6'>
                                                <h1>{passengerType.anak} Anak</h1>
                                                <h1>
                                                    {' '}
                                                    {formatRupiah(
                                                        transactionHistory?.passenger.child * transactionHistory?.price.departure
                                                    )}
                                                </h1>
                                            </div>
                                        )}
                                        {passengerType.bayi > 0 && (
                                            <div className='flex justify-between text-body-6'>
                                                <h1>{passengerType.bayi} Bayi</h1>
                                                <h1> RP 0</h1>
                                            </div>
                                        )}
                                        <div className='flex justify-between text-body-6'>
                                            <h1>Tax</h1>
                                            <h1>
                                                <span>{formatRupiah(transactionHistory?.price.tax)}</span>
                                            </h1>
                                        </div>
                                        <div className='mb-3 mt-2 w-full border text-net-3'></div>
                                        <div className='flex justify-between text-title-2 font-bold'>
                                            <h1>Total</h1>
                                            <h1 className='text-pur-4'>
                                                <span className='ml-1'>{formatRupiah(transactionHistory?.price.totalPrice)}</span>
                                            </h1>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

'use client';

//core
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

//third parties
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
import { FiChevronUp, FiChevronDown, FiArrowLeft } from 'react-icons/fi';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { getPassengerTypeTotal } from '@/store/flight';

//component
import Navbar from '@/components/Navbar';
import Label from '@/components/Label';
import Input from '@/components/Input';
import Button from '@/components/Button';
import AlertTop from '@/components/AlertTop';

// Utils
import { fixedHour } from '@/utils/fixedHour';
import { convertToDate, convertToTime } from '@/utils/converDateTime';
import { reformatDate, reformatDateWithHour } from '@/utils/reformatDate';
import { extractWord } from '@/utils/extractWord';
import { formatRupiah } from '@/utils/formatRupiah';
import { IoLocationSharp } from 'react-icons/io5';
import { reformatDuration } from '@/utils/reformatDuration';
// import { reformatDate } from '@/utils/reformatDate';

export default function OrderPaymentId() {
    //core
    const { id } = useParams();
    const router = useRouter();

    //next auth
    const { data: session, status } = useSession();
    const token = session?.user?.token;

    // redux
    const passengerType = useSelector(getPassengerTypeTotal); // Get passenger type total

    //state
    const [isLoading, setIsLoading] = useState(true);
    const [fetchDataUser, setFetchDataUser] = useState(true);
    const [transactionHistory, setTransactionHistory] = useState(null);
    const [fetchDataHistory, setFetchDataHistory] = useState(true);
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [alertType, setAlertType] = useState('');
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        email: '',
    });
    const [formCreditCardStatus, setFormCreditCardStatus] = useState(false);
    const [creditCardInput, setCreditCardInput] = useState({
        card_number: '',
        card_holder_name: '',
        cvv: '',
        expiry_date: '',
    });

    const [open, setOpen] = useState({
        id: 0,
    });

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

    const handleChangeCreditCard = (event) => {
        setCreditCardInput({ ...creditCardInput, [event.target.name]: event.target.value });
        if (
            creditCardInput.card_number &&
            creditCardInput.card_holder_name &&
            creditCardInput.cvv &&
            creditCardInput.expiry_date
        ) {
            setFormCreditCardStatus(true);
            return;
        }
        setFormCreditCardStatus(false);
    };

    const paymentMenu = {
        1: (
            <div className='mx-16 flex flex-col gap-5 font-poppins'>
                <div className='mt-5 flex gap-8'>
                    <div>
                        <Label className='text-body-6 font-medium'>First Name</Label>
                        <Input
                            className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                            placeholder='Arief Rachman'
                            type='text'
                            // name={`cvv`}
                            // value={creditCardInput.cvv}
                            // onChange={handleChangeCreditCard}
                        />
                    </div>
                    <div>
                        <Label className='text-body-6 font-medium'>Last Name</Label>
                        <Input
                            className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                            placeholder='Hakim'
                            type='text'
                            // name={`expiry_date`}
                            // value={creditCardInput.expiry_date}
                            // onChange={handleChangeCreditCard}
                        />
                    </div>
                </div>
                <div className='mb-5'>
                    <Label className='text-body-6 font-medium'>Gopay Number</Label>
                    <Input
                        className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                        placeholder='+62'
                        type='number'
                        // value={creditCardInput.card_number}
                        // name={'card_number'}
                        // onChange={handleChangeCreditCard}
                    />
                </div>
            </div>
        ),
        2: (
            <div className='mx-16 flex flex-col gap-5 font-poppins'>
                <div className='mt-5 flex gap-8'>
                    <div>
                        <Label className='text-body-6 font-medium'>First Name</Label>
                        <Input
                            className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                            placeholder='Arief Rachman'
                            type='text'
                            // name={`cvv`}
                            // value={creditCardInput.cvv}
                            // onChange={handleChangeCreditCard}
                        />
                    </div>
                    <div>
                        <Label className='text-body-6 font-medium'>Last Name</Label>
                        <Input
                            className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                            placeholder='Hakim'
                            type='text'
                            // name={`expiry_date`}
                            // value={creditCardInput.expiry_date}
                            // onChange={handleChangeCreditCard}
                        />
                    </div>
                </div>
                <div className='mb-5'>
                    <Label className='text-body-6 font-medium'>Email Address</Label>
                    <Input
                        className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                        placeholder='your@gmail.com'
                        type='text'
                        // value={creditCardInput.card_number}
                        // name={'card_number'}
                        // onChange={handleChangeCreditCard}
                    />
                </div>
            </div>
        ),
        3: (
            <div className='mx-16 flex flex-col gap-5 font-poppins'>
                <div className='mt-5 flex justify-center gap-4'>
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
                <div>
                    <Label className='text-body-6 font-medium'>Card number</Label>
                    <Input
                        className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                        placeholder='4480 0000 0000 0000'
                        type='number'
                        value={creditCardInput.card_number}
                        name={'card_number'}
                        onChange={handleChangeCreditCard}
                    />
                </div>
                <div>
                    <Label className='text-body-6 font-medium'>Card holder name</Label>
                    <Input
                        placeholder='John Doe'
                        className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                        name={`card_holder_name`}
                        value={creditCardInput.card_holder_name}
                        onChange={handleChangeCreditCard}
                    />
                </div>

                <div className='mb-5 flex gap-8'>
                    <div>
                        <Label className='text-body-6 font-medium'>CVV</Label>
                        <Input
                            className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                            placeholder='000'
                            type='number'
                            name={`cvv`}
                            value={creditCardInput.cvv}
                            onChange={handleChangeCreditCard}
                        />
                    </div>
                    <div>
                        <Label className='text-body-6 font-medium'>Expiry date</Label>
                        <Input
                            className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                            placeholder='07/24'
                            type='text'
                            name={`expiry_date`}
                            value={creditCardInput.expiry_date}
                            onChange={handleChangeCreditCard}
                        />
                    </div>
                </div>
            </div>
        ),
    };

    const paymentMenuMobile = {
        1: (
            <div className='mx-3 flex flex-col gap-3 font-poppins'>
                <div className='mt-3 flex gap-8'>
                    <div>
                        <Label className='text-body-6 font-medium'>First Name</Label>
                        <Input
                            className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                            placeholder='Arief Rachman'
                            type='text'
                            // name={`cvv`}
                            // value={creditCardInput.cvv}
                            // onChange={handleChangeCreditCard}
                        />
                    </div>
                    <div>
                        <Label className='text-body-6 font-medium'>Last Name</Label>
                        <Input
                            className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                            placeholder='Hakim'
                            type='text'
                            // name={`expiry_date`}
                            // value={creditCardInput.expiry_date}
                            // onChange={handleChangeCreditCard}
                        />
                    </div>
                </div>
                <div className='mb-3'>
                    <Label className='text-body-6 font-medium'>Gopay Number</Label>
                    <Input
                        className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                        placeholder='+62'
                        type='number'
                        // value={creditCardInput.card_number}
                        // name={'card_number'}
                        // onChange={handleChangeCreditCard}
                    />
                </div>
            </div>
        ),
        2: (
            <div className='mx-3 flex flex-col gap-3 font-poppins'>
                <div className='mt-3 flex gap-8'>
                    <div>
                        <Label className='text-body-6 font-medium'>First Name</Label>
                        <Input
                            className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                            placeholder='Arief Rachman'
                            type='text'
                            // name={`cvv`}
                            // value={creditCardInput.cvv}
                            // onChange={handleChangeCreditCard}
                        />
                    </div>
                    <div>
                        <Label className='text-body-6 font-medium'>Last Name</Label>
                        <Input
                            className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                            placeholder='Hakim'
                            type='text'
                            // name={`expiry_date`}
                            // value={creditCardInput.expiry_date}
                            // onChange={handleChangeCreditCard}
                        />
                    </div>
                </div>
                <div className='mb-3'>
                    <Label className='text-body-6 font-medium'>Email Address</Label>
                    <Input
                        className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                        placeholder='your@gmail.com'
                        type='text'
                        // value={creditCardInput.card_number}
                        // name={'card_number'}
                        // onChange={handleChangeCreditCard}
                    />
                </div>
            </div>
        ),
        3: (
            <div className='mx-3 flex flex-col gap-3 font-poppins'>
                <div className=' mt-3'>
                    <Label className='text-body-6 font-medium'>Card number</Label>
                    <Input
                        className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                        placeholder='4480 0000 0000 0000'
                        type='number'
                        value={creditCardInput.card_number}
                        name={'card_number'}
                        onChange={handleChangeCreditCard}
                    />
                </div>
                <div>
                    <Label className='text-body-6 font-medium'>Card holder name</Label>
                    <Input
                        placeholder='John Doe'
                        className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                        name={`card_holder_name`}
                        value={creditCardInput.card_holder_name}
                        onChange={handleChangeCreditCard}
                    />
                </div>

                <div className='flex gap-8'>
                    <div>
                        <Label className='text-body-6 font-medium'>CVV</Label>
                        <Input
                            className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                            placeholder='000'
                            type='number'
                            name={`cvv`}
                            value={creditCardInput.cvv}
                            onChange={handleChangeCreditCard}
                        />
                    </div>
                    <div>
                        <Label className='text-body-6 font-medium'>Expiry date</Label>
                        <Input
                            className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                            placeholder='07/24'
                            type='text'
                            name={`expiry_date`}
                            value={creditCardInput.expiry_date}
                            onChange={handleChangeCreditCard}
                        />
                    </div>
                </div>
                <div className='flex justify-center gap-4'>
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
            </div>
        ),
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

    //function
    const handleVisibleAlert = (text, alertType) => {
        setAlertText(text);
        setAlertType(alertType);
        setVisibleAlert(!visibleAlert);
    };

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

            router.replace(`/order/payment/${id}/payment-success`);
        } catch (error) {
            console.log(error.message);
        }
    };

    /*Effect */
    useEffect(() => {
        if (token) {
            if (fetchDataUser) {
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
            setFetchDataUser(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchDataUser, session, token]);

    useEffect(() => {
        if (token) {
            if (fetchDataHistory) {
                async function fetchUserData() {
                    try {
                        const URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/transaction/getById';
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

                        //Notif
                        if (res?.data?.data?.transaction?.transaction_status?.toLowerCase() === 'unpaid') {
                            const date = dayjs(res.data.data?.transaction?.transaction_date).tz('Asia/Jakarta').format();
                            const nextDate = dayjs(date).add(1, 'day').tz('Asia/Jakarta').format();
                            handleVisibleAlert(`Selesaikan Pembayaran sampai ${reformatDateWithHour(nextDate)}`, 'failed');
                        }
                    } catch (error) {
                        console.log('ERROR detail transasction', error);
                    } finally {
                        setIsLoading(false);
                    }
                }
                fetchUserData();
            }
            setFetchDataHistory(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchDataHistory, session, token, id]);

    console.log('====================================');
    console.log(transactionHistory);
    console.log('====================================');

    if (isLoading) {
        return (
            <div className='overflow-x-hidden'>
                <Navbar className={'hidden lg:block'} />
                {/* header */}
                <div className='hidden w-screen border border-b-net-2 pb-[74px] pt-[47px] lg:block'>
                    <div className='mx-auto hidden max-w-screen-lg grid-cols-12 font-poppins lg:grid'>
                        <div className='col-span-12 flex gap-3 text-head-1 font-bold'>
                            <h1 className='cursor-pointer text-black'>Isi Data Diri</h1>
                            <p>{'>'}</p>
                            <h1 className='text-black'>Bayar</h1>
                            <p>{'>'}</p>
                            <h1 className='text-net-3'>Selesai</h1>
                        </div>
                    </div>
                </div>
                {/* header */}

                {/* DEKSTOP */}
                <div className='mx-auto mt-[19px] hidden   max-w-screen-lg grid-cols-12 font-poppins lg:grid'>
                    <div className='col-span-12 grid grid-cols-12'>
                        <div className='col-span-7'>
                            <div className='flex w-[486px] flex-col gap-[10px]'>
                                {datas &&
                                    datas.map((data, index) => (
                                        <div key={index}>
                                            <div
                                                className={`${
                                                    open.id === data.id ? 'bg-pur-3' : 'bg-net-5'
                                                } flex w-full cursor-pointer items-center justify-between rounded-rad-1  px-4 py-[14px] text-title-1`}
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
                                    disabled={transactionHistory?.transaction?.transaction_status === 'Issued'}
                                    onClick={() => handleUpdatePayment(transactionHistory?.transaction?.transaction_code)}
                                    text={`${
                                        transactionHistory?.transaction?.transaction_status === 'Unpaid'
                                            ? 'Bayar'
                                            : 'Sudah Di Bayar'
                                    } `}
                                    className={`${
                                        formCreditCardStatus ? 'bg-pur-3' : 'bg-pur-3 opacity-60'
                                    } rounded-rad-3   py-[16px] text-head-1 font-medium text-white `}
                                />
                            </div>
                        </div>

                        <div className='col-span-5 flex flex-col items-center justify-center gap-3'>
                            <h1 className='text-title-2 font-bold text-net-3'>Harap menunggu...</h1>
                            <Image
                                alt=''
                                src={'/new_images/loading.svg'}
                                width={160}
                                height={160}
                                priority
                                style={{ width: 'auto' }}
                            />
                        </div>
                    </div>
                </div>
                {/* DEKSTOP */}
                {/* MOBILE */}

                <div className='fixed inset-0 top-0 h-screen overflow-y-scroll bg-white font-poppins lg:hidden'>
                    <div className='px-4'>
                        <div className='fixed inset-x-0 top-0  flex cursor-pointer items-center gap-6 bg-pur-5  px-[16px] py-[10px] text-white '>
                            <FiArrowLeft className='h-[30px] w-[30px]' /> <h1>Proses Pembayaran</h1>
                        </div>

                        <div className=' flex h-screen flex-col items-center justify-center gap-2'>
                            <h1 className='text-title-2 font-bold text-net-3'>Harap menunggu...</h1>
                            <Image
                                alt=''
                                src={'/new_images/loading.svg'}
                                width={80}
                                height={80}
                                priority
                                style={{ width: 'auto' }}
                            />
                        </div>
                    </div>
                </div>

                {/* MOBILE */}
            </div>
        );
    }

    return (
        <div className='overflow-x-hidden'>
            <Navbar className={'hidden lg:block'} />
            <div className='hidden w-screen border border-b-net-2 pb-[74px] pt-[47px] lg:block'>
                <div className='mx-auto hidden max-w-screen-lg grid-cols-12 font-poppins lg:grid'>
                    <div className='col-span-12 flex gap-3 text-head-1 font-bold'>
                        <h1 className='cursor-pointer text-black'>Isi Data Diri</h1>
                        <p>{'>'}</p>
                        <h1 className='text-black'>Bayar</h1>
                        <p>{'>'}</p>
                        <h1 className='text-net-3'>Selesai</h1>
                    </div>
                </div>
            </div>

            <div className='mx-auto mt-[19px] hidden   max-w-screen-lg grid-cols-12 font-poppins lg:grid'>
                <div className='col-span-12 grid grid-cols-12'>
                    <div className='col-span-7'>
                        <div className='flex w-[486px] flex-col gap-[10px]'>
                            {datas &&
                                datas.map((data, index) => (
                                    <div key={index}>
                                        <div
                                            className={`${
                                                open.id === data.id ? 'bg-pur-3' : 'bg-net-5'
                                            } flex w-full cursor-pointer items-center justify-between rounded-rad-1  px-4 py-[14px] text-title-1`}
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
                                disabled={transactionHistory?.transaction?.transaction_status === 'Issued'}
                                onClick={() => handleUpdatePayment(transactionHistory?.transaction?.transaction_code)}
                                text={`${
                                    transactionHistory?.transaction?.transaction_status === 'Unpaid' ? 'Bayar' : 'Sudah Di Bayar'
                                } `}
                                className={`${
                                    formCreditCardStatus ? 'bg-pur-3' : 'bg-pur-3 opacity-60'
                                } rounded-rad-3   py-[16px] text-head-1 font-medium text-white `}
                            />
                        </div>
                    </div>

                    <div className='col-span-5 flex flex-col gap-3'>
                        <div className='flex justify-between'>
                            <h1 className='text-title-3'>
                                Booking Code :
                                <span className='font-bold text-pur-5'>{transactionHistory?.transaction?.transaction_code}</span>
                            </h1>
                            <h1
                                className={`${historyStatusStyling(
                                    transactionHistory?.transaction?.transaction_status
                                )} w-max rounded-rad-4 px-3 py-1 text-body-6`}>
                                {transactionHistory?.transaction?.transaction_status}
                            </h1>
                        </div>

                        {/* depar */}
                        {transactionHistory?.departure && (
                            <div className='flex flex-col gap-4'>
                                {transactionHistory?.arrival?.transaction_type && (
                                    <p className='w-max rounded-rad-4 bg-pur-5 px-2 py-1 text-body-6 text-white'>
                                        Kepergian - Flight 1
                                    </p>
                                )}

                                <div className='flex justify-between'>
                                    <div>
                                        <p className='text-title-1 font-bold'>
                                            {fixedHour(transactionHistory?.departure?.Flight?.departure_time)}
                                        </p>
                                        <p className='text-body-5'>
                                            {reformatDate(transactionHistory?.departure?.Flight?.departure_date)}
                                        </p>
                                        <p className='text-body-5 font-medium'>
                                            {transactionHistory?.departure?.Flight?.Airport_from?.airport_name}
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
                                                {transactionHistory?.departure.Flight.Airline.airline_name} -{' '}
                                                {transactionHistory?.departure.Flight.flight_class}
                                            </h1>
                                            <h2 className='text-body-5 font-bold'>
                                                {transactionHistory?.departure.Flight.Airline.airline_code}
                                            </h2>
                                        </div>
                                        <div>
                                            <h3 className='text-body-5 font-bold'>Informasi :</h3>
                                            <p className='text-body-5 font-normal'>
                                                {extractWord(transactionHistory?.departure.Flight.description)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='w-full border'></div>

                                <div className='flex justify-between'>
                                    <div>
                                        <p className='text-title-1 font-bold'>
                                            {fixedHour(transactionHistory?.departure?.Flight?.arrival_time)}
                                        </p>
                                        <p className='text-body-5'>
                                            {reformatDate(transactionHistory?.departure?.Flight?.arrival_date)}
                                        </p>
                                        <p className='text-body-5 font-medium'>
                                            {transactionHistory?.departure?.Flight?.Airport_to?.airport_name}
                                        </p>
                                    </div>
                                    <p className='text-body-5 font-bold text-pur-3'>Kedatangan</p>
                                </div>
                            </div>
                        )}

                        {/* divider */}
                        {transactionHistory?.arrival?.transaction_type && <div className=' w-full border'></div>}
                        {/* divider */}

                        {/* return */}
                        {transactionHistory?.arrival?.transaction_type && (
                            <div className='flex flex-col gap-4'>
                                {transactionHistory?.arrival?.transaction_type && (
                                    <p className='w-max rounded-rad-4 bg-pur-5 px-2 py-1 text-body-6 text-white'>
                                        Kepulangan - Flight 2
                                    </p>
                                )}

                                <div className='flex justify-between'>
                                    <div>
                                        <p className='text-title-1 font-bold'>
                                            {fixedHour(transactionHistory?.arrival?.Flight?.departure_time)}
                                        </p>
                                        <p className='text-body-5'>
                                            {reformatDate(transactionHistory?.arrival?.Flight?.departure_date)}
                                        </p>
                                        <p className='text-body-5 font-medium'>
                                            {transactionHistory?.arrival?.Flight?.Airport_from?.airport_name}
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
                                                {transactionHistory?.arrival.Flight.Airline.airline_name} -{' '}
                                                {transactionHistory?.arrival.Flight.flight_class}
                                            </h1>
                                            <h2 className='text-body-5 font-bold'>
                                                {transactionHistory?.arrival.Flight.Airline.airline_code}
                                            </h2>
                                        </div>
                                        <div>
                                            <h3 className='text-body-5 font-bold'>Informasi :</h3>
                                            <p className='text-body-5 font-normal'>
                                                {extractWord(transactionHistory?.arrival.Flight.description)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='w-full border'></div>

                                <div className='flex justify-between'>
                                    <div>
                                        <p className='text-title-1 font-bold'>
                                            {fixedHour(transactionHistory?.arrival?.Flight?.arrival_time)}
                                        </p>
                                        <p className='text-body-5'>
                                            {reformatDate(transactionHistory?.arrival.Flight?.arrival_date)}
                                        </p>
                                        <p className='text-body-5 font-medium'>
                                            {transactionHistory?.arrival?.Flight?.Airport_to?.airport_name}
                                        </p>
                                    </div>
                                    <p className='text-body-5 font-bold text-pur-3'>Kedatangan</p>
                                </div>
                            </div>
                        )}
                        {/* return */}

                        {/* price */}
                        <div className='my-3 flex flex-col gap-2 '>
                            <h3 className='text-title-1 font-bold'>Rincian Harga</h3>
                            {transactionHistory?.price?.departure && (
                                <div>
                                    {transactionHistory?.price?.arrival && (
                                        <p className='w-max rounded-rad-4 bg-pur-5 px-2 py-1 text-body-6 text-white'>
                                            {transactionHistory?.departure?.Flight?.Airline?.airline_name} - Kepergian
                                        </p>
                                    )}
                                    {transactionHistory?.passenger?.adult > 0 && (
                                        <div className='flex items-center justify-between'>
                                            <p>{transactionHistory?.passenger.adult} Dewasa</p>
                                            <p>{formatRupiah(transactionHistory?.price.departure)}</p>
                                        </div>
                                    )}

                                    {transactionHistory?.passenger?.adult > 0 && (
                                        <div className='flex items-center justify-between'>
                                            <p>{transactionHistory?.passenger?.adult} Anak</p>
                                            <p>{formatRupiah(transactionHistory?.price?.departure)}</p>
                                        </div>
                                    )}
                                    {transactionHistory?.passenger?.baby > 0 && (
                                        <div className='flex items-center justify-between'>
                                            <p>{transactionHistory?.passenger?.baby} Bayi</p>
                                            <p>{formatRupiah(0)}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                            {transactionHistory?.price?.arrival && <div className=' w-full border'></div>}
                            {transactionHistory?.price?.arrival && (
                                <div>
                                    <p className='w-max rounded-rad-4 bg-pur-5 px-2 py-1 text-body-6 text-white'>
                                        {transactionHistory?.arrival?.Flight?.Airline?.airline_name} - Kepulangan
                                    </p>
                                    {transactionHistory?.passenger?.adult > 0 && (
                                        <div className='flex items-center justify-between'>
                                            <p>{transactionHistory?.passenger?.adult} Dewasa</p>
                                            <p>{formatRupiah(transactionHistory?.price?.arrival)}</p>
                                        </div>
                                    )}

                                    {transactionHistory?.passenger?.adult > 0 && (
                                        <div className='flex items-center justify-between'>
                                            <p>{transactionHistory?.passenger?.adult} Anak</p>
                                            <p>{formatRupiah(transactionHistory?.price?.arrival)}</p>
                                        </div>
                                    )}
                                    {transactionHistory?.passenger?.baby > 0 && (
                                        <div className='flex items-center justify-between'>
                                            <p>{transactionHistory?.passenger?.baby} Bayi</p>
                                            <p>{formatRupiah(0)}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className='my-1 w-full border'></div>
                            <div className='flex flex-col gap-1 '>
                                <div className='flex items-center justify-between'>
                                    <p className='font-bold'>Tax</p>
                                    <p className='font-bold'>{formatRupiah(transactionHistory?.price?.tax)}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <h1 className='text-title-1 font-bold'>Total</h1>
                                    <h1 className='text-head-1 font-bold text-alert-3'>
                                        {formatRupiah(transactionHistory?.price?.totalPrice)}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        {/* price */}
                        {/* trick */}
                        <div className='invisible h-[50px]'></div>
                    </div>
                </div>
            </div>

            {/* MOBILE */}
            {transactionHistory && (
                <div className='fixed inset-0 top-0 h-screen overflow-y-scroll bg-white font-poppins lg:hidden'>
                    <div className='px-4'>
                        <div className='fixed inset-x-0 top-0  flex cursor-pointer items-center gap-6 bg-pur-5  px-[16px] py-[10px] text-white '>
                            <FiArrowLeft className='h-[30px] w-[30px]' /> <h1>Proses Pembayaran</h1>
                        </div>

                        <h1
                            className={`${
                                transactionHistory?.transaction?.transaction_status.toLowerCase() === 'issued'
                                    ? 'bg-alert-1'
                                    : ' bg-alert-3'
                            } mb-2 mt-[64px] w-max rounded-rad-4 px-2 py-1 text-body-6 text-white`}>
                            {transactionHistory?.transaction?.transaction_status}
                        </h1>
                        <div className=' flex flex-col gap-2 rounded-[10px] border p-4 text-net-4'>
                            <h1 className='text-body-6 font-medium'>
                                Passengers :
                                {transactionHistory?.passenger?.adult > 0 && (
                                    <span className='ml-1 font-bold text-pur-5'>
                                        {transactionHistory?.passenger?.adult} Adults
                                    </span>
                                )}
                                {transactionHistory?.passenger?.child > 0 && (
                                    <span className='ml-1 font-bold text-pur-5'>
                                        , {transactionHistory?.passenger?.child} Childs
                                    </span>
                                )}
                                {transactionHistory?.passenger?.baby > 0 && (
                                    <span className='ml-1 font-bold text-pur-5'>
                                        , {transactionHistory?.passenger?.baby} Babies
                                    </span>
                                )}
                            </h1>

                            {transactionHistory?.departure && (
                                <div className='grid w-full grid-cols-12 items-center  gap-3 '>
                                    <div className='col-span-5 flex items-start gap-2'>
                                        <IoLocationSharp className='h-[24px] w-[24px] text-net-3' />
                                        <div className='text-body-4'>
                                            <p className='font-bold'>{transactionHistory?.departure?.Flight?.from}</p>
                                            <p>{reformatDate(transactionHistory?.departure?.Flight?.departure_date)}</p>
                                            <p>{fixedHour(transactionHistory?.departure?.Flight?.departure_time)}</p>
                                        </div>
                                    </div>
                                    <div className='col-span-2 flex flex-col items-center'>
                                        <p className='text-body-4'>
                                            {reformatDuration(transactionHistory?.departure?.Flight?.duration)}
                                        </p>
                                        <div className='w-full border'></div>
                                    </div>
                                    <div className='col-span-5 flex items-start gap-2'>
                                        <IoLocationSharp className='h-[24px] w-[24px] text-net-3' />
                                        <div className='text-body-4'>
                                            <p className='font-bold'>{transactionHistory?.departure?.Flight?.to}</p>
                                            <p>{reformatDate(transactionHistory?.departure?.Flight?.arrival_date)}</p>
                                            <p>{fixedHour(transactionHistory?.departure?.Flight?.arrival_time)}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {transactionHistory?.arrival?.transaction_type && (
                                <div className='grid w-full grid-cols-12 items-center  gap-3 '>
                                    <div className='col-span-5 flex items-start gap-2'>
                                        <IoLocationSharp className='h-[24px] w-[24px] text-net-3' />
                                        <div className='text-body-4'>
                                            <p className='font-bold'>{transactionHistory?.arrival?.Flight?.from}</p>
                                            <p>{reformatDate(transactionHistory?.arrival?.Flight?.departure_date)}</p>
                                            <p>{fixedHour(transactionHistory?.arrival?.Flight?.departure_time)}</p>
                                        </div>
                                    </div>
                                    <div className='col-span-2 flex flex-col items-center'>
                                        <p className='text-body-4'>
                                            {reformatDuration(transactionHistory?.arrival?.Flight?.duration)}
                                        </p>
                                        <div className='w-full border'></div>
                                    </div>
                                    <div className='col-span-5 flex items-start gap-2'>
                                        <IoLocationSharp className='h-[24px] w-[24px] text-net-3' />
                                        <div className='text-body-4'>
                                            <p className='font-bold'>{transactionHistory?.arrival?.Flight?.to}</p>
                                            <p>{reformatDate(transactionHistory?.arrival?.Flight?.arrival_date)}</p>
                                            <p>{fixedHour(transactionHistory?.arrival?.Flight?.arrival_time)}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className='w-full border'></div>

                            <div className='flex items-center justify-between'>
                                <div className='text-body-6'>
                                    <p className='font-bold'>Booking Code:</p>
                                    <p>{transactionHistory?.transaction?.transaction_code}</p>
                                </div>
                                <div className='text-body-6'>
                                    <p className='font-bold'>Class:</p>
                                    <p>{transactionHistory?.departure?.Flight?.flight_class}</p>
                                </div>
                                <div className='text-body-6'>
                                    <p className='font-bold text-pur-5'>
                                        {transactionHistory?.price?.totalPrice
                                            ? formatRupiah(transactionHistory?.price?.totalPrice)
                                            : 'Loading...'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='mt-6 flex flex-col gap-2'>
                            {datas &&
                                datas.map((data, index) => (
                                    <div key={index}>
                                        <div
                                            className={`${
                                                open.id === data.id ? 'bg-pur-3' : 'bg-net-5'
                                            } flex w-full cursor-pointer items-center justify-between  rounded-rad-1 px-4 py-2 text-body-6 `}
                                            onClick={() => handleOpen(data)}>
                                            <p className='text-white'>{data.name}</p>
                                            {open.id === data.id ? (
                                                <FiChevronUp style={{ color: 'white', width: '20px', height: '20px' }} />
                                            ) : (
                                                <FiChevronDown style={{ color: 'white', width: '20px', height: '20px' }} />
                                            )}
                                        </div>

                                        {open.id === data.id && paymentMenuMobile[data.id]}
                                    </div>
                                ))}
                        </div>

                        <div className='invisible h-[110px]'></div>

                        <div className='fixed inset-x-0 bottom-0  flex  h-[100px] flex-col items-center justify-center gap-3  bg-white  px-5 shadow-low'>
                            <Button
                                disabled={transactionHistory?.transaction?.transaction_status === 'Issued'}
                                onClick={() => handleUpdatePayment(transactionHistory?.transaction?.transaction_code)}
                                text={`${
                                    transactionHistory?.transaction?.transaction_status === 'Unpaid' ? 'Bayar' : 'Sudah Di Bayar'
                                } `}
                                className={`${
                                    formCreditCardStatus ? 'bg-pur-3' : 'bg-pur-3 opacity-60'
                                } my-1 w-full rounded-rad-3 bg-pur-3 py-2  text-white`}>
                                Bayar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {/* MOBILE */}

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

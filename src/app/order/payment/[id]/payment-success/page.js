'use client';

//core
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

//third parties
import { useSession } from 'next-auth/react';
import axios from 'axios';

//component
import AlertTop from '@/components/AlertTop';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Label from '@/components/Label';
import Input from '@/components/Input';

export default function PaymentSuccess() {
    /*=== core ===*/
    const { id } = useParams();
    const router = useRouter();

    /*=== next auth ===*/
    const { data: session, status } = useSession();
    let token = session?.user?.token;

    /*=== redux ===*/
    //----

    /*=== state ===*/
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [alertType, setAlertType] = useState('');
    const [visibleAlertError, setVisibleAlertError] = useState(false);
    const [alertTextError, setAlertTextError] = useState('');
    const [alertTypeError, setAlertTypeError] = useState('');

    /*=== function ===*/
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

    const handleSendTicket = async () => {
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

                if (res.status === 201 || res.data.status === 'Ok') {
                    // console.log('SUCCESS');
                    handleVisibleAlert('Tiket sudah dikirim, harap check email Anda');
                    setTimeout(() => {
                        // handleVisibleAlert();
                        router.push('/history');
                    }, 1800);
                }
            } catch (error) {
                handleVisibleAlertError('Kami tidak bisa memproses tiketmu, mohon untuk mencoba dilain waktu', 'failed');
            }
        }
    };

    /*=== effects ===*/
    //----

    return (
        <div className='overflow-x-hidden'>
            <Navbar className={'hidden lg:block'} />
            <div className='mt-[108px] hidden w-screen border-b border-b-net-2 pb-[74px] pt-[47px] lg:block'>
                <div className='mx-auto hidden max-w-screen-lg grid-cols-12 font-poppins lg:grid'>
                    <div className='col-span-12 flex gap-3 text-head-1 font-bold'>
                        <h1 className=' text-black'>Isi Data Diri</h1>
                        <p>{'>'}</p>
                        <h1 className='text-black'>Bayar</h1>
                        <p>{'>'}</p>
                        <h1 className='text-black'>Selesai</h1>
                    </div>
                </div>
            </div>

            <div
                style={{ height: 'calc(100vh - 100px)' }}
                className='mx-auto hidden max-w-screen-lg grid-cols-12 font-poppins lg:grid '>
                <div className='col-span-12 flex items-center justify-center '>
                    <div className='flex flex-col justify-center gap-8'>
                        <div className='flex flex-col items-center justify-center text-center'>
                            <Image alt='' src={'/new_images/empty_list.svg'} width={200} height={200} />
                            <h1 className='mt-2 text-body-6 font-bold text-pur-5'>Selamat!</h1>
                            <h3 className='text-body-6'>Transaksi Pembayaran Tiket success</h3>
                        </div>
                        <div className='flex w-full flex-col gap-3'>
                            <Button
                                onClick={() => handleSendTicket()}
                                className='rounded-rad-3 bg-pur-4 py-3 text-white hover:bg-pur-3'>
                                Terbitkan Tiket
                            </Button>
                            <Button className='rounded-rad-3 bg-pur-2 py-3 text-white hover:bg-pur-3'>
                                Cari Penerbangan Lain
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

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
        </div>
    );
}

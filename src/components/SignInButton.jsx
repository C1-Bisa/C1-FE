'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Button from './Button';
import { FiLogIn, FiList, FiBell, FiUser } from 'react-icons/fi';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { flightSlice, getStatusNotif } from '@/store/flight';

export default function SignInButton() {
    const { data: session, status } = useSession();
    const token = session?.user?.token; //becarefull it has lifecycle too, prevent with checking it first
    const { setStatusNotif } = flightSlice.actions;
    const statusNotif = useSelector(getStatusNotif);
    const dispatch = useDispatch();

    const router = useRouter();
    const pathname = usePathname();

    // const [statusFetchNotif, setStatusFetchNotif] = useState(true);
    const [statusCount, setStatusCount] = useState(0);

    useEffect(() => {
        if (token || statusNotif) {
            const getNotifications = async () => {
                try {
                    const NOTIF_URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/notification';
                    const res = await axios.get(NOTIF_URL, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setStatusCount(res.data.meta.total);
                    console.log('====================================');
                    console.log('TOTAL', res.data);
                    console.log('====================================');
                } catch (error) {
                    console.log('ERROR GET Notif:', error);
                }
            };
            getNotifications();
        }
        dispatch(setStatusNotif(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, statusNotif, dispatch, setStatusNotif]);

    if (status === 'authenticated') {
        return (
            <div className='flex items-center justify-center gap-6'>
                <FiList
                    className={`${
                        pathname === '/history' ? 'text-pur-3' : 'text-net-5'
                    } h-[28px] w-[28px] cursor-pointer hover:text-pur-4`}
                    onClick={() => (pathname === '/history' ? router.refresh() : router.push('/history'))}
                />
                <div className='relative '>
                    <FiBell
                        className={`${
                            pathname === '/notifikasi' ? 'text-pur-3' : 'text-net-5'
                        } h-[28px] w-[28px] cursor-pointer hover:text-pur-3`}
                        onClick={() => (pathname === '/notifikasi' ? router.refresh() : router.push('/notifikasi'))}
                    />
                    <div
                        className={`${
                            statusCount > 0 ? 'flex' : 'hidden'
                        }  absolute bottom-0 right-0 mb-[-10px] mr-[-16px]   h-6  w-6  items-center justify-center rounded-full  border border-alert-3 bg-alert-3 font-poppins text-body-6 font-bold text-white`}>
                        <p>{statusCount}</p>
                    </div>
                </div>
                <FiUser
                    className={`${
                        pathname === '/akun' ? 'text-pur-3' : 'text-net-5'
                    } h-[28px] w-[28px] cursor-pointer hover:text-pur-3`}
                    onClick={() => (pathname === '/akun' ? router.refresh() : router.push('/akun'))}
                />
            </div>
        );
    }

    return (
        <div>
            <Button
                className='flex items-center justify-center gap-3 rounded-rad-3 bg-pur-3 px-4 py-[14px] text-white'
                onClick={() => signIn()}>
                <FiLogIn /> Masuk
            </Button>
        </div>
    );
}

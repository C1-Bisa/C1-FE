'use client';

import { MdNotifications, MdOutlineAccountCircle } from 'react-icons/md';
import { FiHome } from 'react-icons/fi';
import { SlNotebook } from 'react-icons/sl';
import { usePathname, useRouter } from 'next/navigation';

export default function BottomNavbar() {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className='fixed inset-x-0 bottom-0 flex h-[60px] justify-around  bg-white p-2  text-center text-3xl shadow-low '>
            <div
                onClick={() => (pathname === '/' ? router.refresh() : router.push('/'))}
                className={`${
                    pathname === '/' ? 'text-pur-4' : 'text-net-3'
                } flex cursor-pointer flex-col items-center justify-center gap-1`}>
                <FiHome />
                <h1 className='text-body-1 font-bold'>Home</h1>
            </div>
            <div
                onClick={() =>
                    pathname === '/history' || pathname === '/history/detail' ? router.refresh() : router.push('/history')
                }
                className={`${
                    pathname === '/history' || pathname === '/history/detail' ? 'text-pur-4' : 'text-net-3'
                } flex cursor-pointer flex-col items-center justify-center gap-1`}>
                <SlNotebook />
                <h1 className='text-body-1 font-bold'>Riwayat</h1>
            </div>
            <div
                onClick={() => (pathname === '/notifikasi' ? router.refresh() : router.push('/notifikasi'))}
                className={`${
                    pathname === '/notifikasi' ? 'text-pur-4' : 'text-net-3'
                } flex cursor-pointer flex-col items-center justify-center gap-1`}>
                <MdNotifications />
                <h1 className='text-body-1 font-bold'>Notifikasi</h1>
            </div>
            <div
                onClick={() => (pathname === '/akun' ? router.refresh() : router.push('/akun'))}
                className={`${
                    pathname === '/akun' ? 'text-pur-4' : 'text-net-3'
                } flex cursor-pointer flex-col items-center justify-center gap-1`}>
                <MdOutlineAccountCircle />
                <h1 className='text-body-1 font-bold'> Akun</h1>
            </div>
        </div>
    );
}

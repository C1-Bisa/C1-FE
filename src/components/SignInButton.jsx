'use client';

import { useSession, signOut, signIn } from 'next-auth/react';
import Button from './Button';
import { FiLogIn, FiList, FiBell, FiUser } from 'react-icons/fi';
import { useRouter, usePathname } from 'next/navigation';

export default function SignInButton() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    if (status === 'authenticated') {
        return (
            <div className='flex items-center justify-center gap-6'>
                <FiList
                    className={`${
                        pathname === '/history' ? 'text-pur-4' : 'text-net-5'
                    } h-[24px] w-[24px] cursor-pointer hover:text-pur-4`}
                    onClick={() => (pathname === '/history' ? router.refresh() : router.push('/history'))}
                />
                <FiBell
                    className={`${
                        pathname === '/notifikasi' ? 'text-pur-4' : 'text-net-5'
                    } h-[24px] w-[24px] cursor-pointer hover:text-pur-4`}
                    onClick={() => (pathname === '/notifikasi' ? router.refresh() : router.push('/notifikasi'))}
                />
                <FiUser
                    className={`${
                        pathname === '/akun' ? 'text-pur-4' : 'text-net-5'
                    } h-[24px] w-[24px] cursor-pointer hover:text-pur-4`}
                    onClick={() => (pathname === '/akun' ? router.refresh() : router.push('/akun'))}
                />
            </div>
        );
    }

    return (
        <div>
            <Button
                className='flex items-center justify-center gap-3 rounded-rad-3 bg-pur-4 px-4 py-[14px] text-white'
                onClick={() => signIn()}>
                <FiLogIn /> Masuk
            </Button>
        </div>
    );
}

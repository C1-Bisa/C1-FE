'use client';

import SearchBar from './SearchBar';
import { useRouter } from 'next/navigation';
import SignInButton from './SignInButton';
import Image from 'next/image';

import { FiUser, FiList, FiBell } from 'react-icons/fi';
import { FiLogIn } from 'react-icons/fi';

export default function Navbar({ className, isCredential = true, isSearchMode = true }) {
    const router = useRouter();

    return (
        <div className={`${className} w-screen shadow-low`}>
            <div className=' container mx-auto flex max-w-screen-xl justify-between  py-[18px]'>
                <div className='flex items-center gap-9'>
                    <Image
                        src={'/images/logo_tiketku.svg'}
                        width={98}
                        height={53}
                        alt=''
                        onClick={() => router.push('/')}
                        className='cursor-pointer'
                    />
                    {isSearchMode && <SearchBar />}
                </div>

                {isCredential && <SignInButton />}
            </div>
        </div>
    );
}
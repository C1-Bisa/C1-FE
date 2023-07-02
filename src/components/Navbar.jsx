'use client';

// import SearchBar from './SearchBar';
import { useRouter } from 'next/navigation';
import SignInButton from './SignInButton';
import Image from 'next/image';

export default function Navbar({ className, isCredential = true, isSearchMode = true }) {
    const router = useRouter();

    return (
        <div className={`${className} fixed top-0 z-20 w-screen bg-white shadow-low`}>
            <div className=' container mx-auto flex max-w-screen-xl items-center  justify-between py-2'>
                <div>
                    <Image
                        src={'/new_images/logo.svg'}
                        width={150}
                        height={150}
                        alt=''
                        onClick={() => router.push('/')}
                        className='cursor-pointer'
                    />
                </div>

                {isCredential && <SignInButton />}
            </div>
        </div>
    );
}

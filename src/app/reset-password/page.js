'use client';

//core
import { useRouter } from 'next/navigation';
import Image from 'next/image';

//third parties
//----

//redux
//----

//components
import Button from '@/components/Button';

//utils
//----

export default function ResetPassword() {
    /*=== core ===*/
    const router = useRouter();

    /*=== next auth ===*/
    //----

    /*=== redux ===*/
    //----

    /*=== state ===*/
    //----

    /*=== function ===*/
    //----

    /*=== effects ===*/
    //----

    return (
        <div className='flex h-screen flex-col items-center justify-center gap-10 font-poppins'>
            <Image alt='' src={'/new_images/reset_pass.svg'} width={200} height={200} loading='lazy' />
            <div className='flex flex-col gap-4'>
                <h1 className='text-2xl font-bold text-black'>Silahkan Cek Email Anda...</h1>
                <Button onClick={() => router.replace('/')}>Back to Home</Button>
            </div>
        </div>
    );
}

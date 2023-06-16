import Image from 'next/image';

export default function LoadingHome() {
    return (
        <div className='flex h-screen flex-col items-center justify-center gap-3 font-poppins'>
            <h1 className='text-title-2 font-bold text-net-3'>Harap menunggu...</h1>
            <Image alt='' src={'/images/loading_home.svg'} width={200} height={200} loading='lazy' />
        </div>
    );
}

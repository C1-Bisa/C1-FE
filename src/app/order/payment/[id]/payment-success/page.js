'use client';

//core
import { useRouter } from 'next/navigation';

//component
import Navbar from '@/components/Navbar';
import Label from '@/components/Label';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Image from 'next/image';

export default function PaymentSuccess() {
    const router = useRouter();

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
                        <h1 className='text-black'>Selesai</h1>
                    </div>
                </div>
            </div>

            <div
                style={{ height: 'calc(100vh - 242px)' }}
                className='mx-auto hidden max-w-screen-lg grid-cols-12 font-poppins lg:grid '>
                <div className='col-span-12 flex items-center justify-center '>
                    <div className='flex flex-col justify-center gap-8'>
                        <div className='flex flex-col items-center justify-center text-center'>
                            <Image alt='' src={'/new_images/empty_list.svg'} width={200} height={200} />
                            <h1 className='mt-2 text-body-6 font-bold text-pur-5'>Selamat!</h1>
                            <h3 className='text-body-6'>Transaksi Pembayaran Tiket success</h3>
                        </div>
                        <div className='flex w-full flex-col gap-3'>
                            <Button onClick={() => router.replace('/')} className='rounded-rad-3 bg-pur-5 py-3 text-white'>
                                Terbitkan Tiket
                            </Button>
                            <Button className='rounded-rad-3 bg-pur-2 py-3 text-white'>Cari Penerbangan Lain</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

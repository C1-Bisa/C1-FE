'use client';

//core
import Image from 'next/image';
import { useRouter } from 'next/navigation';

//third parties
import { FiArrowLeft } from 'react-icons/fi';

//redux
//----

//components
import Button from '@/components/Button';

//utils
//----

export default function SearchDetail() {
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
        <div className='h-screen font-poppins lg:hidden'>
            <div
                onClick={() => router.push('/search')}
                className='fixed inset-x-0 top-0  flex items-center gap-6 bg-pur-5 px-[16px]  py-2  text-white'>
                <FiArrowLeft className='h-[28px] w-[28px]' /> <p className='text-body-5'>Pilihan Penerbangan</p>
            </div>
            {/* container */}
            <div className='mx-4 mt-[64px] flex flex-col gap-4 rounded-[10px] border border-pur-2 p-4'>
                {/* Booking Code */}
                <h1 className='font-medium'>
                    Booking Code: <span className='font-bold text-pur-3'>453653657</span>
                </h1>
                {/* Booking Code */}

                {/* Keberangkatan */}
                <div className='flex justify-between'>
                    <div>
                        <p className='text-title-1 font-bold'>07:00</p>
                        <p className='text-body-5'>03 Maret 2023</p>
                        <p className='text-body-5 font-medium'>Soekarno Hatta</p>
                    </div>
                    <p className='text-body-5 font-bold text-pur-3'>Keberangkatan</p>
                </div>
                {/* Keberangkatan */}
                <div className='w-full border'></div>
                {/* Desc */}
                <div className='flex items-center gap-4 '>
                    <Image src={'/images/flight_badge.svg'} alt='' width={24} height={24} />

                    <div className='flex flex-col gap-4'>
                        <div>
                            <h1 className='text-body-6 font-bold'>Jet Air - Economy</h1>
                            <h2 className='text-body-5 font-bold'>JT - 203</h2>
                        </div>
                        <div>
                            <h3 className='text-body-5 font-bold'>Informasi :</h3>
                            <p className='text-body-5 font-normal'>Baggage 20 kg Cabin baggage 7 kg In Flight Entertainment</p>
                        </div>
                    </div>
                </div>
                {/* Desc */}
                <div className='w-full border'></div>
                {/* Kedatangan */}
                <div className='flex justify-between'>
                    <div>
                        <p className='text-title-1 font-bold'>11:00</p>
                        <p className='text-body-5'>03 Maret 2023</p>
                        <p className='text-body-5 font-medium'>Soekarno Hatta</p>
                    </div>
                    <p className='text-body-5 font-bold text-pur-3'>Kedatangan</p>
                </div>
                {/* Kedatangan */}
            </div>
            {/* container */}

            {/* Harga */}
            <div className='my-3 flex flex-col gap-2 px-4'>
                <h3 className='text-title-1 font-bold'>Rincian Harga</h3>
                <div>
                    <div className='flex items-center justify-between'>
                        <h1>1 adults</h1>
                        <h1>IDR 9.550.000</h1>
                    </div>
                    <div className='flex items-center justify-between'>
                        <h1>1 adults</h1>
                        <h1>IDR 9.550.000</h1>
                    </div>
                    <div className='flex items-center justify-between'>
                        <h1>1 adults</h1>
                        <h1>IDR 9.550.000</h1>
                    </div>
                </div>
                <div className='my-1 w-full border'></div>
                <div className='flex flex-col gap-1 '>
                    <div className='flex items-center justify-between'>
                        <h1>Tax</h1>
                        <h1>IDR 300.000</h1>
                    </div>
                    <div className='flex items-center justify-between font-bold'>
                        <h1>Total</h1>
                        <h1>IDR 9.850.000</h1>
                    </div>
                </div>
            </div>
            {/* Harga */}

            {/* Button */}
            <div className='fixed inset-x-0 bottom-0  h-[110px]  bg-white px-4 py-4   shadow-low'>
                <div className='flex justify-between'>
                    <h1 className='text-title-1 font-bold'>Total</h1>
                    <h1 className='text-title-3 font-bold text-pur-3'>IDR 4.950.000/pax</h1>
                </div>

                <Button className='mt-3 w-full rounded-rad-3 bg-pur-3 py-2 text-white'>Pilih</Button>
            </div>
            {/* Button */}
        </div>
    );
}


'use client';



import AccordionPay from '@/pages/AccordionPay';
import AskAccountButton from '@/components/AskAccountButton';
import Navbar from '@/components/Navbar';


export default function Payment() {
    return (
        <main>

            <div className=' h-[950px] w-full bg-white font-poppins '>
                <div className='h-[235px]'>
                    <div className='h-[84px]'>
                        <Navbar />
                    </div>
                    <div className='ml-[260px] mt-[47px] flex h-[20px] w-[328px] text-xl font-bold leading-[30px] '>
                        

                        <AskAccountButton suffix={'Isi Data Diri   >'} />
                        <AskAccountButton suffix={'Bayar     > '} />
                        <AskAccountButton suffix={'Selesai'} />
                    </div>
                    <div className='mb-[13px] ml-[276px] mt-[20px] flex h-[50px] w-[936px] flex-row justify-center rounded-[12px] bg-alert-3'>
                        <h1 className='pt-3.5 text-[16px] font-semibold text-white'>
                            Selesaikan Pembayaran Sampai 10 Juli 2023 12:00
                        </h1>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <hr className='mt-[11px] h-[2px] w-full border-0 bg-gray-200 ' />
                </div>
                <div className='absolute flex-row flex ml-[276px] h-[654px] w-[936px] items-start'>
                    <div className='flex h-[654px] w-[550px] flex-row'>
                        <AccordionPay />
                    </div>
                    <div className='h-[548px] w-[370px] shadow-xl'>
                         Ini Deskripsi</div>
                </div>
            </div>

        </main>
    );
}
//items-center justify-center backdrop-blur-sm fixed inset-0 flex
// Ngubah center dari atas ke bawah
// atas: 50% || transform: translateY(-50%)
// kanan: 50% || transform: translateX(-50%)

// Layout
// Component

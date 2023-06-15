'use client';
import Image from 'next/image';
import AskAccountButton from '@/components/AskAccountButton';
import AlertBottom from '@/components/AlertBottom';
import { useState } from 'react';

export default function OTP() {
    const [visibleAlert, setVisibleAlert] = useState(false);
    const handleVisibleAlert = () => setVisibleAlert(!visibleAlert);
    return (
        <section className='h-full w-full bg-white '>
            <nav>
                {/* LOGO NAVBAR */}
            <div className='item-right ml-[128px] flex pt-[15px] font-medium'>
                    <Image src={`./images/logo.svg`} alt='' width={98} height={53} quality={100} />
                </div>
                <div className='flex items-center justify-center pt-1'>
                    <hr className='mt-[16px] h-[2px] w-full border-0 bg-gray-200 ' />
                </div>
            {/* TOMBOL BACK */}
            <button>
            <Image className='ml-[341px] mt-[45px]' src={`./images/backh.svg`} alt='' width={24} height={24} quality={100} />
            </button>
            {/* FORM  */}
            <div className="">   
            </div>
            <div className="relative flex-col justify-center overflow-hidden bg-gray-50 mt-[5px]">
                <div className="relative pt-[1px] ml-[436px] shadow-xl mx-auto w-[568px] max-w-lg rounded-2xl">
                    <div className="mx-auto flex w-full flex-col pt-[2px]  ">
                        <div className="flex flex-col pt-[1px]">
                            <div className="font-bold text-[24px]">
                                <p>Masukkan OTP</p>
                            </div>
                            <div className="flex flex-row justify-center font-normal mt-[40px] text-[14px] text-center">
                                <p>Ketik 6 digit kode yang dikirimkan ke <span className='font-bold '>J*****@gmail.com</span></p>
                            </div>
                        </div>
                        <div className="">
                            <form action="" method='post'>
                                <div className="flex flex-col mt-[44px] justify-center">
                                    <div className="flex flex-row justify-center space-x-[16px] ">
                                        <div className="w-[42px] h-[42px]">
                                            <input className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-[16px] border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-gray-400" type='text' name='' id=''/>
                                        </div>
                                        <div className="w-[42px] h-[42px]">
                                            <input className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-[16px] border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-gray-400" type='text' name='' id=''/>
                                        </div>
                                        <div className="w-[42px] h-[42px]">
                                            <input className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-[16px] border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-gray-400" type='text' name='' id=''/>
                                        </div>
                                        <div className="w-[42px] h-[42px]">
                                            <input className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-[16px] border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-gray-400" type='text' name='' id=''/>
                                        </div>
                                        <div className="w-[42px] h-[42px]">
                                            <input className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-[16px] border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-gray-400" type='text' name='' id=''/>
                                        </div>
                                        <div className="w-[42px] h-[42px]">
                                            <input className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-[16px] border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-gray-400" type='text' name='' id=''/>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center justify-center text-center text-[14px] font-normal mt-[24px] ">
                                        <p>Kirim Ulang OTP dalam 60 detik</p> <a className='flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer'></a>
                                    </div>


                                    <div className="flex flex-col mt-[105px] ">
                                        <div className="">
                                            <button onClick={() => handleVisibleAlert()} className='flex flex-row items-center justify-center text-center font-semibold w-full h-[48px] border rounded-[16px] bg-pur-4 text-white text-[14px] shadow-sm'>
                                                Simpan
                                            </button>

                                        </div>

                                    </div>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>

            </div>
            </nav>
            <AlertBottom
                visibleAlert={visibleAlert}
                handleVisibleAlert={handleVisibleAlert}
                className='bg-alert-1 justify-center'
                text={'Registrasi berhasil'}
            />

        </section>
        
        
    );
}

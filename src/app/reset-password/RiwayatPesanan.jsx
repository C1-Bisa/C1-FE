'use state';

import React from 'react';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import ButtonRiwayatPassword from '../components/ButtonRiwayatPassword';
import Button from '../components/ButtonRiwayatPassword';
// import { FiArrowLeft } from 'react-icons/fa';

function RiwayatPesanan() {
    return (
        <div>
            <div>
                <Navbar />
                <div className='shadow'>
                    <h1 className='mx-[260px] mt-[30px] flex font-poppins text-title-1 font-bold '>Riwayat Pemesanan</h1>
                    <div className='flex items-center justify-center p-4 '>
                        <ButtonRiwayatPassword onClick={() => handleVisibleAlert()}>
                            <div className='ml-4 flex  '>
                                <Image src={'./images/fi_arrow-left.svg'} width={24} height={24} alt='' />
                                <span className='ml-4 flex py-1 font-poppins font-medium text-white'>Beranda</span>
                            </div>
                        </ButtonRiwayatPassword>
                        <div className='ml-4 h-[32px] w-[86px] rounded-rad-4 border-2 border-pur-4  py-[11px] font-poppins text-body-6 font-normal outline-pur-4'>
                            <div className='-m-2 ml-2 flex '>
                                <Image className='' src={'./images/Vector.svg'} width={20} height={20} alt='' />
                                <span className='m-0.5 ml-2 font-poppins text-body-5 font-normal'>Filter</span>
                                <Image className='ml-10' src={'./images/fi_search.svg'} width={24} height={24} alt='' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center  '>
                    <Image
                        className='my-2'
                        src={'./images/illustration _Cart shopping list_.svg'}
                        width={204}
                        height={208}
                        alt=''
                    />
                </div>
                <div className='my-8 flex justify-center text-center'>
                    <h1 className='font-poppins text-body-6 font-normal'>
                        <span className='text-pur-4'>Oops! Riwayat pesanan kosong!</span>{' '}
                        <span className='flex'>Anda belum melakukan pemesanan penerbangan</span>{' '}
                    </h1>
                </div>
                <div className='flex items-center justify-center'>
                    <button className='rounded-rad-4 bg-pur-4 px-[99.5px] py-[12px] text-body-6 font-medium text-white hover:bg-pur-3'>
                        Cari Penerbangan
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RiwayatPesanan;

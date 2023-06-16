'use client'

import React from "react";
import Navbar from "@/components/Navbar";
import SearchHistory from "@/components/SearchHistory";
import Button from "@/components/ButtonRiwayatPassword";
import Image from "next/image";
import { useState } from "react";

export default function Notifikasi (onClick) {

    const [openModal, setOpenModal] = useState(false)

    return (
        <section className="h-full w-full bg-net-1">
            <div>
                <div>
                    <Navbar/>
                    <div className="shadow">
                        <h1 className="mx-[260px] mt-[30px] flex font-poppins text-title-1 font-bold ">Notfikasi</h1>
                        <div className="flex items-center justify-center p-4">
                            <Button onClick={ onClick}>
                                <div className="ml-4 flex">
                                    <Image src={'./images/fi_arrow-left.svg'} width={24} height={24} alt=''/>
                                    <span className='ml-4 flex py-1 font-poppins font-medium text-white'>Beranda</span>
                                </div>    
                            </Button>
                            <div className='ml-4 h-[32px] w-[86px] rounded-rad-4 border-2 border-pur-4  py-[11px] font-poppins text-body-6 font-normal outline-pur-4'>
                            <div className='-m-2 ml-2 flex '>
                                <Image className='cursor-pointer' src={'./images/Vector.svg'} width={20} height={20} alt='' />
                                <span className='m-0.5 ml-2 cursor-pointer font-poppins text-body-5 font-normal'>Filter</span>
                                <Image onClick={() => setOpenModal(true)} className='ml-10 cursor-pointer' src={'./images/fi_search.svg'} width={24} height={24} alt='' />
                            </div>
                            {openModal && <SearchHistory/>}
                        </div> 
                        </div>
                    </div>
                    <div className="font-poppins w-full h-full ">
                        <div className="absolute w-8/12 flex ">
                            <div className=" absolute flex flex-row items-center p-4 gap-x-2 isolate w-8/12 h-14 left-64 top-20">
                                <Image className="text-white bg-purple-3 rounded-full" src={'./images/Notification.svg'} width={20} height={20}/>
                                <div className="max-w-screen h-3.5 font-poppins top-1">
                                    <p className="flex flex-rowfont-normal text-sm leading-4 text-neutral-3">Promosi</p>      
                                    <p className="font-normal text-sm leading-4 "><b>Dapatkan Potongan 50% Tiket!</b></p> 
                                    <p className="font-normal text-sm leading-4 text-neutral-3">Syarat dan Ketentuan berlaku!</p>
                                </div>
                            </div>
                        </div> 
                        <div className="absolute w-8/12 flex flex-row">
                            <div className=" absolute flex flex-row items-center p-4 gap-x-2 isolate w-8/12 h-14 left-64 top-60 ">
                                <Image className="text-white bg-purple-3 rounded-full" src={'./images/Notification.svg'} width={20} height={20}/>
                            <div className="max-w-screen h-4 font-poppins top-1">
                                 <p className="font-normal text-sm leading-4 text-neutral-3 ">Notifikasi</p>   
                                 <p className="font-normal text-sm leading-4"><b>Terdapat perubahan jadwal penerbangan kode booking 45GT6. Cek Jadwal perjalanan anda disini!</b></p> 
                            </div> 
                            </div>
                        </div>
                </div>
            </div>
            </div>
        </section>
    )
}
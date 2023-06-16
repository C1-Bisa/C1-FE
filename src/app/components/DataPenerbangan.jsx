'use state'

import React from 'react'
import Button from './Button'
import ButtonData from './ButtonData'
import Image from 'next/image'
import {} from 'react-icons'

function DataPenerbangan() {
  return (
    
    <div className='flex h-[204px] w-[468px] rounded-rad-4 border-2 border-pur-4 m-4 font-poppins text-body-6 font-normal outline-pur-4'>
        <div className='flex items-start m-4'>
            <ButtonData><span className='font-poppins text-body-6 '> Issued</span></ButtonData>
            <div className='flex items-cente justify-center gap-[335px]'>
                <div className='flex items-start -ml-[109px] mt-10'>
                    <Image className='ml-10' src={'./images/fi_live_area.svg'} width={15} height={20} alt='' />
                    <label htmlFor="kota" className='ml-3 font-poppins font-bold'> Jakarta</label>
                    <div className='-ml-[56px] mt-6'>
                        <label htmlFor="tanggal" className='font-poppins text-body-4 font-medium'>5 Maret 2023</label>
                        
                    </div>
                    <div className='-ml-[78px] mt-11'>
                        <label htmlFor="jam" className='font-poppins text-body-4 font-medium'>19:10</label> 
                    </div>   
                </div>
                
                <div className='flex items-start -ml-[109px] mt-10'>
                    <Image className='ml-10' src={'./images/fi_live_area.svg'} width={15} height={20} alt='' />
                    <label htmlFor="kota" className='ml-3 font-poppins font-bold'> Melbourne</label>
                    <div className='-ml-[78px] mt-6'>
                        <label htmlFor="tanggal" className='font-poppins text-body-4 font-medium'>5 Maret 2023</label>
                        
                    </div>
                    <div className='-ml-[78px] mt-11'>
                        <label htmlFor="jam" className='font-poppins text-body-4 font-medium'>21:10</label> 
                    </div>   
                </div>
            </div>

            <div className='flex -ml-[280px] my-14'>
                <Image className='ml-10' src={'./images/Arrow.svg'} width={164} height={5} alt='' />
            </div>
        </div>
        {/* <div className='flex '>
            <h1 className='text-body-4 font-poppins font-bold'>Booking Code:</h1>
            <label htmlFor="bookingCode">6OIU965667G</label>
        </div> */}
    </div>
  )
}

export default DataPenerbangan
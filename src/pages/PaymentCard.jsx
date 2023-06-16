'use client';

import React from 'react';
import MastercardLogo1 from '../../public/images/mastercard_logo.svg';
import VisaLogo from '../../public/images/visa_logo.svg';
import AmexLogo from '../../public/images/amex_logo.svg';
import Paypal from '../../public/images/paypal_logo.svg';
import Button from '@/components/Button';
import ButtonPayment from '@/components/ButtonPayment';
import { useState } from 'react';
import Image from 'next/image';

export default function PaymentCard() {
    const [activeAccordion, setActiveAccordion] = useState('');

    const handleAccordionToggle = (accordionId) => {
        setActiveAccordion(accordionId === activeAccordion ? '' : accordionId);
    };

    return (
        <div className='flex w-[486px] flex-row items-center justify-center gap-24 px-12 '>
            <div className='max-w-sm overflow-hidden rounded bg-white shadow-lg'>
                <div className='px-6 py-1 '>
                    <div className=' flex flex-row items-center justify-center gap-y-16'>
                        <div className='mb-4 flex items-center justify-center px-3.5'>
                            <Image className='w-6.2 h-5' src={MastercardLogo1} />
                        </div>
                        <div className='mb-4 flex items-center justify-center px-3.5'>
                            <Image className='w-6.2 h-5' src={VisaLogo} />
                        </div>
                        <div className='mb-4 flex items-center justify-center px-3.5'>
                            <Image className='w-6.2 h-5' src={AmexLogo} />
                        </div>
                        <div className='mb-4 flex items-center justify-center px-3.5'>
                            <Image className='h-5 w-7' src={Paypal} />
                        </div>
                    </div>
                    {/* <div className='mb-2 text-xl font-bold'>Payment Card</div> */}
                    <div className='gap-6 text-start'>
                        <label className='mb-2 block py-2.5 text-sm font-bold text-black'>Card Number</label>
                        <input
                            type='text'
                            className='outline:none border-b-210 w-[296px] focus:outline'
                            placeholder='4440 0000 0000 0000'
                        />
                        {/* <input className='focus:outline border-b-2 w-[296px]'  placeholder='4440 0000 0000 0000' ></input> */}
                    </div>
                    <div className='gap-6 text-start'>
                        <label className='mb-2 block py-2.5 text-sm font-bold text-black'>Card holder Name</label>
                        <input
                            type='text'
                            className='py-4.5 flex w-[296px]  flex-row border-b font-light text-gray-700 focus:outline-none'
                            placeholder='Rinaldo'
                        />
                    </div>
                    <div className=' flex flex-row-reverse space-x-8 space-x-reverse'>
                        <div className='w-1/2'>
                            <label className='mb-2 block py-2.5 text-sm font-bold text-gray-700 '>CVV</label>
                            <input
                                type='text'
                                className='flex w-[132px] border-b  text-gray-700 focus:outline-none'
                                placeholder='000'
                            />
                        </div>
                        <div className='w-1/2'>
                            <label className='mb-2 block py-2.5 text-sm font-bold text-gray-700'>Expiry Date</label>
                            <input
                                type='text'
                                className='w-[132px] border-b  text-gray-700 focus:outline-none'
                                placeholder='09/12'
                            />
                        </div>
                    </div>
                </div>
                <div className='j flex flex-row px-6 py-4 '>
                    <ButtonPayment> <label className=''>Bayar</label></ButtonPayment>
                </div>
            </div>
        </div>
    );
}

'use client';

import React from 'react';

import MastercardLogo1 from '../../public/images/mastercard_logo.svg';
import VisaLogo from '../../public/images/visa_logo.svg';
import AmexLogo from '../../public/images/amex_logo.svg';
import Paypal from '../../public/images/paypal_logo.svg';

import ButtonPayment from '@/components/ButtonPayment';

import { Accordion } from 'flowbite';

import Image from 'next/image';

export default function PaymentAccordion() {
    return (
        <div className='h-[654px] w-[550px] items-start px-2.5 font-poppins '>
            <div 
            className='flex w-[217px] h-[30px] font-bold text-xl leading-[30px] my-[16px]'>
                Isi Data Pembayaran
            </div>
            <div
                id='accordion-flush'
                data-accordion='collapse'
                data-active-classes='bg-pur-4 dark:bg-gray-900 text-gray-900 dark:text-white'
                data-inactive-classes='text-gray-500 dark:text-gray-400'>
                <h2 id='accordion-flush-heading-1'>
                    <button
                        type='button'
                        // class='flex w-full items-center justify-between border-b border-gray-200 py-5 text-left font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400'
                        class='my-5 flex w-[486px] items-center justify-between bg-net-4 px-6 py-[14px] text-body-6 font-medium text-white hover:bg-pur-4 rounded-rad-1'
                        data-accordion-target='#accordion-flush-body-1'
                        aria-expanded='false'
                        aria-controls='accordion-flush-body-1'
                        fill='currentColor'>
                        <span className='pl-4 font-medium text-base leading-6'>Gopay</span>
                        <svg
                            data-accordion-icon
                            class='h-6 w-6 shrink-0 rotate-180 '
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                                fill-rule='evenodd'
                                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                clip-rule='evenodd'></path>
                        </svg>
                    </button>
                </h2>
                <div id='accordion-flush-body-1' class='hidden ' aria-labelledby='accordion-flush-heading-1 '>
                    <div className='w-[486px]'>
                        <div className='bg-white'>
                            <div className='flex flex-col items-center justify-center'>
                                <div className='mb-[27px] flex w-[296px] items-center justify-center space-x-[16px]'>
                                    <Image className='h-[20px] w-[30px] object-center ' src={MastercardLogo1} />

                                    <Image className='h-[20px] w-[30px] object-center' src={VisaLogo} />

                                    <Image className='h-[20px] w-[30px] object-center' src={AmexLogo} />

                                    <Image className='h-[20px] w-[35px] object-center' src={Paypal} />
                                </div>
                                {/* <div className='mb-2 text-xl font-bold'>Payment Card</div> */}
                                <div className=' mb-[18px] flex h-[56px] w-[296px] flex-col items-start'>
                                    <label className='mb-2 block py-2.5 text-sm font-bold text-black'>Card Number</label>
                                    <input
                                        type=''
                                        className='py-4.5 flex w-[296px]  flex-row border-b font-light text-gray-700 focus:outline-none '
                                        placeholder='4440 0000 0000 0000'
                                    />
                                </div>
                                <div className=' mb-[18px] flex h-[56px] flex-col items-start'>
                                    <label className='mb-2 block py-2.5 text-sm font-bold text-black'>Card holder Name</label>
                                    <input
                                        type=''
                                        className='py-4.5 flex w-[296px]  flex-row border-b font-light text-gray-700 focus:outline-none'
                                        placeholder='Rinaldo'
                                    />
                                </div>
                                <div className='mb-[18px] flex h-[56px] w-[296px] space-x-8'>
                                    <div className=''>
                                        <label className='block py-2.5 text-sm font-bold text-gray-700 '>CVV</label>
                                        <input
                                            type=''
                                            className='flex w-[132px] border-b  text-gray-700 focus:outline-none'
                                            placeholder='000'
                                        />
                                    </div>
                                    <div className=''>
                                        <label className='block py-2.5 text-sm font-bold text-gray-700'>Expiry Date</label>
                                        <input
                                            type=''
                                            className='w-[132px] border-b  text-gray-700 focus:outline-none'
                                            placeholder='09/12'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 id='accordion-flush-heading-2'>
                    <button
                        type='button'
                        // class='flex w-full items-center justify-between border-b border-gray-200 py-5 text-left font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400'
                        class='my-5 flex w-[486px] items-center justify-between bg-net-4 px-6 py-[14px] text-body-6 font-medium text-white hover:bg-pur-4 rounded-rad-1'
                        data-accordion-target='#accordion-flush-body-2'
                        aria-expanded='false'
                        aria-controls='accordion-flush-body-2'
                        fill='currentColor'>
                        <span className='pl-4 font-medium text-base leading-6'>Virtual Account</span>
                        <svg
                            data-accordion-icon
                            class='h-6 w-6 shrink-0 rotate-180 '
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                                fill-rule='evenodd'
                                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                clip-rule='evenodd'></path>
                        </svg>
                    </button>
                </h2>
                <div id='accordion-flush-body-2' class='hidden ' aria-labelledby='accordion-flush-heading-2 '>
                    <div className='w-[486px]'>
                        <div className='bg-white'>
                            <div className='flex flex-col items-center justify-center'>
                                <div className='mb-[27px] flex w-[296px] items-center justify-center space-x-[16px]'>
                                    <Image className='h-[20px] w-[30px] object-center ' src={MastercardLogo1} />

                                    <Image className='h-[20px] w-[30px] object-center' src={VisaLogo} />

                                    <Image className='h-[20px] w-[30px] object-center' src={AmexLogo} />

                                    <Image className='h-[20px] w-[35px] object-center' src={Paypal} />
                                </div>
                                {/* <div className='mb-2 text-xl font-bold'>Payment Card</div> */}
                                <div className=' mb-[18px] flex h-[56px] w-[296px] flex-col items-start'>
                                    <label className='mb-2 block py-2.5 text-sm font-bold text-black'>Card Number</label>
                                    <input
                                        type=''
                                        className='py-4.5 flex w-[296px]  flex-row border-b font-light text-gray-700 focus:outline-none '
                                        placeholder='4440 0000 0000 0000'
                                    />
                                </div>
                                <div className=' mb-[18px] flex h-[56px] flex-col items-start'>
                                    <label className='mb-2 block py-2.5 text-sm font-bold text-black'>Card holder Name</label>
                                    <input
                                        type=''
                                        className='py-4.5 flex w-[296px]  flex-row border-b font-light text-gray-700 focus:outline-none'
                                        placeholder='Rinaldo'
                                    />
                                </div>
                                <div className='mb-[18px] flex h-[56px] w-[296px] space-x-8'>
                                    <div className=''>
                                        <label className='block py-2.5 text-sm font-bold text-gray-700 '>CVV</label>
                                        <input
                                            type=''
                                            className='flex w-[132px] border-b  text-gray-700 focus:outline-none'
                                            placeholder='000'
                                        />
                                    </div>
                                    <div className=''>
                                        <label className='block py-2.5 text-sm font-bold text-gray-700'>Expiry Date</label>
                                        <input
                                            type=''
                                            className='w-[132px] border-b  text-gray-700 focus:outline-none'
                                            placeholder='09/12'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 id='accordion-flush-heading-3'>
                    <button
                        type='button'
                        // class='flex w-full items-center justify-between border-b border-gray-200 py-5 text-left font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400'
                        class='my-[16px] flex w-[486px] items-center justify-between bg-net-4 px-6 py-[14px] text-body-6 font-medium text-white hover:bg-pur-4 rounded-rad-1'
                        data-accordion-target='#accordion-flush-body-3'
                        aria-expanded='true'
                        aria-controls='accordion-flush-body-3'
                        fill='currentColor'>
                        <span className='pl-4 font-medium text-base leading-6'>Credit Card</span>
                        <svg
                            data-accordion-icon
                            class='h-6 w-6 shrink-0 rotate-180 '
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                                fill-rule='evenodd'
                                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                clip-rule='evenodd'></path>
                        </svg>
                    </button>
                </h2>
                <div id='accordion-flush-body-3' class='hidden ' aria-labelledby='accordion-flush-heading-3 '>
                    <div className='w-[486px]'>
                        <div className='bg-white'>
                            {/* <div className='mb-[27px] flex w-[296px] space-x-[16px] object-center'>
                                <Image className='h-[20px] w-[30px] object-center ' src={MastercardLogo1} />

                                <Image className='h-[20px] w-[30px] object-center' src={VisaLogo} />

                                <Image className='h-[20px] w-[30px] object-center' src={AmexLogo} />

                                <Image className='h-[20px] w-[35px] object-center' src={Paypal} />
                            </div> */}
                            <div className='flex flex-col items-center justify-center'>
                                <div className='mb-[27px] flex w-[296px] items-center justify-center space-x-[16px]'>
                                    <Image className='h-[20px] w-[30px] object-center ' src={MastercardLogo1} />

                                    <Image className='h-[20px] w-[30px] object-center' src={VisaLogo} />

                                    <Image className='h-[20px] w-[30px] object-center' src={AmexLogo} />

                                    <Image className='h-[20px] w-[35px] object-center' src={Paypal} />
                                </div>
                                {/* <div className='mb-2 text-xl font-bold'>Payment Card</div> */}
                                <div className=' mb-[18px] flex h-[56px] w-[296px] flex-col items-start'>
                                    <label className='mb-2 block py-2.5 text-sm font-bold text-black'>Card Number</label>
                                    <input
                                        type=''
                                        className='py-4.5 flex w-[296px]  flex-row border-b font-light text-gray-700 focus:outline-none '
                                        placeholder='4440 0000 0000 0000'
                                    />
                                </div>
                                <div className=' mb-[18px] flex h-[56px] flex-col items-start'>
                                    <label className='mb-2 block py-2.5 text-sm font-bold text-black'>Card holder Name</label>
                                    <input
                                        type=''
                                        className='py-4.5 flex w-[296px]  flex-row border-b font-light text-gray-700 focus:outline-none'
                                        placeholder='Rinaldo'
                                    />
                                </div>
                                <div className='mb-[18px] flex h-[56px] w-[296px] space-x-8'>
                                    <div className=''>
                                        <label className='block py-2.5 text-sm font-bold text-gray-700 '>CVV</label>
                                        <input
                                            type=''
                                            className='flex w-[132px] border-b  text-gray-700 focus:outline-none'
                                            placeholder='000'
                                        />
                                    </div>
                                    <div className=''>
                                        <label className='block py-2.5 text-sm font-bold text-gray-700'>Expiry Date</label>
                                        <input
                                            type=''
                                            className='w-[132px] border-b  text-gray-700 focus:outline-none'
                                            placeholder='09/12'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-[50px]'>
                <ButtonPayment> Bayar</ButtonPayment>
            </div>
        </div>
    );
}

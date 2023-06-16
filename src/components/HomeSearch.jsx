'use client';

import Label from './Label';
import Input from './Input';
import Button from './Button';
import ToggleRotate from './ToggleRotate';
import ToggleSwitch from './ToggleSwitch';

import { MdFlightTakeoff, MdDateRange, MdAirlineSeatReclineNormal } from 'react-icons/md';

export default function HomeSearch({ className }) {
    return (
        <div className={`${className} relative w-full overflow-hidden rounded-rad-3 bg-white shadow-high`}>
            <div className='mx-8 my-6'>
                <h1 className='font-poppins text-head-1 font-bold'>
                    Pilih Jadwal Penerbangan spesial di <span className='text-pur-5'>Tiketku!</span>
                </h1>
                <div className='mt-5 grid grid-cols-12'>
                    <div className='col-span-5 flex flex-col gap-7'>
                        <div className='flex gap-8'>
                            <div className='flex items-center gap-2'>
                                <MdFlightTakeoff className='h-[24px] w-[24px] text-net-3' />
                                <p className='font-poppins text-body-6 font-normal text-net-3'>From</p>
                            </div>
                            <Input
                                className='border-[1px] border-l-0 border-r-0 border-t-0 border-b-net-2  py-3 font-poppins text-title-3 font-medium'
                                value={'Jakarta (JKTA)'}
                            />
                        </div>
                        <div className='flex gap-8'>
                            <div className='flex items-center gap-2'>
                                <MdDateRange className='h-[24px] w-[24px] text-net-3' />
                                <p className='font-poppins text-body-6 font-normal text-net-3'>Date</p>
                            </div>
                            <div className='flex gap-5'>
                                <div className=''>
                                    <Label className='font-poppins  text-title-2 font-medium text-net-3' htmlFor={'derpature'}>
                                        Derpature
                                    </Label>
                                    <Input
                                        id={'derpature'}
                                        className='border-[1px] border-l-0 border-r-0 border-t-0 border-b-net-2  py-2 font-poppins text-title-3 font-medium'
                                        value={'1 Maret 2023'}
                                    />
                                </div>
                                <div>
                                    <div className='relative flex items-center justify-between'>
                                        <Label className='font-poppins text-title-2 font-medium text-net-3' htmlFor={'return'}>
                                            Return
                                        </Label>
                                        <ToggleSwitch id={'toggle'} className={'absolute right-[-36px]'} />
                                    </div>
                                    <Input
                                        id={'return'}
                                        className='border-[1px] border-l-0 border-r-0 border-t-0 border-b-net-2 py-3  font-poppins text-body-6 font-medium text-pur-5'
                                        value={'Pilih Tanggal'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-2 flex items-start justify-center pt-5 '>
                        {/* <h2>Test</h2> */}
                        <ToggleRotate />
                    </div>
                    <div className='col-span-5 flex flex-col gap-7'>
                        <div className='flex gap-8'>
                            <div className='flex items-center gap-3'>
                                <MdFlightTakeoff className='h-[24px] w-[24px] text-net-3' />
                                <p className='font-poppins text-body-6 font-normal text-net-3'>To</p>
                            </div>

                            <Input
                                className='border-[1px] border-l-0 border-r-0 border-t-0 border-b-net-2 px-2 py-3 font-poppins text-title-3 font-medium text-black'
                                value={'Melbourne (MLB)'}
                            />
                        </div>
                        <div className='flex gap-8'>
                            <div className='flex items-center gap-3'>
                                <MdAirlineSeatReclineNormal className='h-[24px] w-[24px] text-net-3' />
                                <p className='font-poppins text-body-6 font-normal text-net-3'>To</p>
                            </div>

                            <div className=''>
                                <Label className='font-poppins  text-title-2 font-medium text-net-3' htmlFor={'passenger'}>
                                    Passengers
                                </Label>
                                <Input
                                    id={'passenger'}
                                    className='border-[1px] border-l-0 border-r-0 border-t-0 border-b-net-2  py-2 font-poppins text-title-3 font-medium'
                                    value={'2 Penumpang'}
                                />
                            </div>
                            <div className=''>
                                <Label className='font-poppins  text-title-2 font-medium text-net-3' htmlFor={'seat'}>
                                    Seat Class
                                </Label>
                                <Input
                                    id={'seat'}
                                    className='border-[1px] border-l-0 border-r-0 border-t-0 border-b-net-2  py-2 font-poppins text-title-3 font-medium'
                                    value={'Business'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Button className='absolute bottom-0 w-full bg-pur-4 py-3 text-title-2 font-bold text-white hover:bg-pur-3'>Cari Penerbangan</Button>
        </div>
    );
}

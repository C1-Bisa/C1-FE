'use client';

//Core
import Image from 'next/image';

//Third Parties
import { FiPlus, FiMinus } from 'react-icons/fi';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { getAnakPassenger, getBayiPassenger, getDewasaPassenger, flightSlice } from '../store/flight';

//Components
import Card from './Card';
import Input from './Input';
import Button from './Button';

//Utils
//---

export default function ChoosePassengerTypeModal({ handleOpenPassengerModal }) {
    //redux
    const dispatch = useDispatch();
    const {
        addAnakPassenger,
        addBayiPassenger,
        addDewasaPassenger,
        minusAnakPassenger,
        minusBayiPassenger,
        minusDewasaPassenger,
    } = flightSlice.actions;
    const dewasaPassenger = useSelector(getDewasaPassenger);
    const anakPassenger = useSelector(getAnakPassenger);
    const bayiPassenger = useSelector(getBayiPassenger);

    const passengerType = [
        {
            id: 1,
            category: 'Dewasa',
            src: './images/male.svg',
            description: '(12 tahun keatas)',
        },
        {
            id: 2,
            category: 'Anak',
            src: './images/female.svg',
            description: '(2 - 11 tahun)',
        },
        {
            id: 3,
            category: 'Bayi',
            src: './images/baby.svg',
            description: '(dibawah 2 tahun)',
        },
    ];

    return (
        <div className='h-[324px] w-[400px]'>
            <Card>
                <Card.Title handleCardShow={() => handleOpenPassengerModal()} className={'border-b-[1px] py-[10px]'} />

                <Card.Body className={'mt-3'}>
                    <div className='flex flex-col gap-2 px-5'>
                        {/* dewasa start */}
                        <div className='flex items-center  justify-between border-b-[1px] border-b-net-2 py-2 font-normal'>
                            <div className='flex items-start gap-3 '>
                                <Image src={'./images/male.svg'} alt='' width={12} height={12} />
                                <div className='p-0'>
                                    <h1 className='font-poppins text-body-6 font-bold'>Dewasa</h1>
                                    <p className='font-poppins text-body-6 font-normal text-net-3'>(12 tahun keatas)</p>
                                </div>
                            </div>
                            <div className='flex h-[40px] items-center gap-1 '>
                                <Button
                                    onClick={() => dispatch(minusDewasaPassenger())}
                                    className='h-full rounded-rad-1 border border-net-2 bg-white px-2 text-net-3 hover:border-pur-4 hover:text-pur-5'>
                                    <FiMinus className='h-6 w-6' />
                                </Button>
                                <div className='h-full w-[60px]'>
                                    <Input
                                        type='number'
                                        readOnly
                                        value={dewasaPassenger}
                                        className=' text-title-a h-full rounded-rad-1 border-[1px] border-net-2 px-2 text-center  focus:border-net-2'
                                    />
                                </div>
                                <Button
                                    onClick={() => dispatch(addDewasaPassenger())}
                                    className='h-full rounded-rad-1 border border-net-2 bg-white px-2 text-net-3 hover:border-pur-4 hover:text-pur-5'>
                                    <FiPlus className='h-6 w-6' />
                                </Button>
                            </div>
                        </div>
                        {/* dewasa end */}
                        {/* anak start */}
                        <div className='flex items-center  justify-between border-b-[1px] border-b-net-2 py-2 font-normal'>
                            <div className='flex items-start gap-3 '>
                                <Image src={'./images/female.svg'} alt='' width={12} height={12} />
                                <div className='p-0'>
                                    <h1 className='font-poppins text-body-6 font-bold'>Anak</h1>
                                    <p className='font-poppins text-body-6 font-normal text-net-3'>(2 - 11 tahun)</p>
                                </div>
                            </div>
                            <div className='flex h-[40px] items-center gap-1 '>
                                <Button
                                    onClick={() => dispatch(minusAnakPassenger())}
                                    className='h-full rounded-rad-1 border border-net-2 bg-white px-2 text-net-3 hover:border-pur-4 hover:text-pur-5'>
                                    <FiMinus className='h-6 w-6' />
                                </Button>
                                <div className='h-full w-[60px]'>
                                    <Input
                                        type='number'
                                        readOnly
                                        value={anakPassenger}
                                        className=' text-title-a h-full rounded-rad-1 border-[1px] border-net-2 px-2 text-center  focus:border-net-2'
                                    />
                                </div>
                                <Button
                                    onClick={() => dispatch(addAnakPassenger())}
                                    className='h-full rounded-rad-1 border border-net-2 bg-white px-2 text-net-3 hover:border-pur-4 hover:text-pur-5'>
                                    <FiPlus className='h-6 w-6' />
                                </Button>
                            </div>
                        </div>
                        {/* anak end */}
                        {/* bayi start */}
                        <div className='flex items-center  justify-between border-b-[1px] border-b-net-2 py-2 font-normal'>
                            <div className='flex items-start gap-3 '>
                                <Image src={'./images/baby.svg'} alt='' width={12} height={12} />
                                <div className='p-0'>
                                    <h1 className='font-poppins text-body-6 font-bold'>Bayi</h1>
                                    <p className='font-poppins text-body-6 font-normal text-net-3'>(dibawah 2 tahun)</p>
                                </div>
                            </div>
                            <div className='flex h-[40px] items-center gap-1 '>
                                <Button
                                    onClick={() => dispatch(minusBayiPassenger())}
                                    className='h-full rounded-rad-1 border border-net-2 bg-white px-2 text-net-3 hover:border-pur-4 hover:text-pur-5'>
                                    <FiMinus className='h-6 w-6' />
                                </Button>
                                <div className='h-full w-[60px]'>
                                    <Input
                                        type='number'
                                        readOnly
                                        value={bayiPassenger}
                                        className=' text-title-a h-full rounded-rad-1 border-[1px] border-net-2 px-2 text-center  focus:border-net-2'
                                    />
                                </div>
                                <Button
                                    onClick={() => dispatch(addBayiPassenger())}
                                    className='h-full rounded-rad-1 border border-net-2 bg-white px-2 text-net-3 hover:border-pur-4 hover:text-pur-5'>
                                    <FiPlus className='h-6 w-6' />
                                </Button>
                            </div>
                        </div>
                        {/* bayi end */}
                    </div>
                </Card.Body>
                <Card.Footer handleCardAction={() => handleOpenPassengerModal()}>Simpan</Card.Footer>
            </Card>
        </div>
    );
}

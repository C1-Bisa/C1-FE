'use client';
// import Card from '@/components/Card';
import Card from './Card';
import { FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getFligthClass } from '../store/flight';

export default function ChooseFlightClassModal({ handleActionFlightClassModal, handleOpenFlightClassModal }) {
    const flightClassRedux = useSelector(getFligthClass);
    const [chooseFlightClass, setChooseFlightClass] = useState(flightClassRedux || 'Economy');

    const handleChosenFlightClass = (flightClass) => setChooseFlightClass(flightClass);

    const flightClass = [
        {
            flight_class: 'Economy',
        },
        {
            flight_class: 'Premium Economy',
        },
        {
            flight_class: 'Bussiness',
        },
        {
            flight_class: 'First Class',
        },
    ];

    return (
        <div className='h-[356px] w-[400px]'>
            <Card>
                <Card.Title handleCardShow={() => handleOpenFlightClassModal()} className={'border-b-[1px] py-[10px]'} />

                <Card.Body>
                    <div className='flex flex-col'>
                        {flightClass &&
                            flightClass.map((classType, index) => (
                                <div
                                    onClick={() => handleChosenFlightClass(classType.flight_class)}
                                    key={index}
                                    className={`${
                                        chooseFlightClass === classType.flight_class ? 'bg-pur-5 text-white' : 'bg-white'
                                    }`}>
                                    <div
                                        className={`mx-5 flex cursor-pointer items-center  justify-between border-b-[1px] border-b-net-2 py-2 font-normal`}>
                                        <div className='flex flex-col gap-1'>
                                            <h1 className='font-poppins text-head-2 font-medium'>{classType.flight_class}</h1>
                                        </div>
                                        {chooseFlightClass === classType.flight_class && (
                                            <FaCheckCircle className='h-5 w-5 text-alert-1' />
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </Card.Body>
                <Card.Footer handleCardAction={() => handleActionFlightClassModal(chooseFlightClass)}>Simpan</Card.Footer>
            </Card>
        </div>
    );
}

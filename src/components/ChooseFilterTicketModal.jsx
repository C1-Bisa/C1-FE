'use client';
import Card from './Card';
import { FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';
import { getFilterTicket, flightSlice } from '@/store/flight';
import { useSelector, useDispatch } from 'react-redux';

export default function ChooseFilterTicketModal({ open, handleOpen, handleChooseFilter }) {
    const dispatch = useDispatch();

    const filterTicketName = useSelector(getFilterTicket);
    const { setFilterTicket } = flightSlice.actions;

    const [chooseFilterTicket, setChooseFilterTicket] = useState({
        id: filterTicketName.id,
        type: filterTicketName.type,
        query: filterTicketName.query,
    });

    const handleChosenFilterTicket = (id, type, query) => {
        dispatch(
            setFilterTicket({
                id,
                type,
                query,
            })
        );
        setChooseFilterTicket({
            id,
            type,
            query,
        });
    };

    const handleFilter = () => {
        handleChooseFilter(chooseFilterTicket.query, chooseFilterTicket.type);
        handleOpen();
    };

    const filterTicket = [
        {
            id: 1,

            type: 'Termurah',
            query: 'tolower',
        },
        {
            id: 2,

            type: 'Keberangkatan Paling Awal',
            query: 'earlydeparture',
        },
        {
            id: 3,

            type: 'Keberangkatan Paling Akhir',
            query: 'lastdeparture',
        },
        {
            id: 4,

            type: 'Kedatangan Paling Awal',
            query: 'earlyarrive',
        },
        {
            id: 5,

            type: 'Kedatangan Paling Akhir',
            query: 'lastarrive',
        },
    ];

    return (
        //items-center justify-center flex
        <>
            {open && (
                <div className='fixed inset-0 bg-black bg-opacity-60 '>
                    <div className='absolute h-[356px] w-[400px] lg:bottom-[124px] lg:right-[175px]'>
                        <Card>
                            <Card.Title handleCardShow={() => handleOpen()} className={'border-b-[1px] py-[10px]'} />

                            <Card.Body>
                                <div className='flex flex-col'>
                                    {filterTicket &&
                                        filterTicket.map((ticket) => (
                                            <div
                                                onClick={() => handleChosenFilterTicket(ticket.id, ticket.type, ticket.query)}
                                                key={ticket.id}
                                                className={`${
                                                    chooseFilterTicket.id === ticket.id ? 'bg-pur-5 text-white' : 'bg-white'
                                                }`}>
                                                <div
                                                    className={`mx-5 flex cursor-pointer items-center  justify-between border-b-[1px] border-b-net-2 py-[10px] font-normal`}>
                                                    <div>
                                                        <h1
                                                            className={`${
                                                                chooseFilterTicket.id === ticket.id ? ' text-white' : 'text-black'
                                                            } font-poppins text-body-6 font-semibold`}>
                                                            <span className='font-poppins font-normal'>{ticket.type}</span>
                                                        </h1>
                                                    </div>
                                                    {chooseFilterTicket.id === ticket.id && (
                                                        <FaCheckCircle className='h-4 w-4 text-alert-1' />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </Card.Body>
                            <Card.Footer handleCardAction={() => handleFilter()}>Simpan</Card.Footer>
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
}

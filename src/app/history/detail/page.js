'use client';

//core
import { useRouter } from 'next/navigation';
import Image from 'next/image';

//third parties
import { FiArrowLeft } from 'react-icons/fi';

//redux
import { useSelector } from 'react-redux';
import { getHistoryDetail } from '@/store/history';

//components
import BottomNavbar from '@/components/BottomNavbar';
import Button from '@/components/Button';

//utils
import { fixedHour } from '@/utils/fixedHour';
import { reformatDate } from '@/utils/reformatDate';
import { reformatDuration } from '@/utils/reformatDuration';

export default function HistoryDetail() {
    /*=== core ===*/
    const router = useRouter();

    /*=== next auth ===*/
    //----

    /*=== redux ===*/
    const historyDetail = useSelector(getHistoryDetail);

    /*=== state ===*/
    //----

    /*=== function ===*/
    const historyStatusStyling = (historyStatus) => {
        if (historyStatus.toLowerCase() === 'issued') {
            return 'bg-alert-1 text-white';
        }
        if (historyStatus.toLowerCase() === 'unpaid') {
            return 'bg-alert-3 text-white';
        }
        if (historyStatus.toLowerCase() === 'cancelled') {
            return 'bg-net-3 text-white';
        }
    };

    /*=== effects ===*/
    //----

    return (
        <>
            {/* MOBILE MODE */}

            <section className='h-screen font-poppins lg:hidden'>
                <div
                    onClick={() => router.push('/history')}
                    className='fixed inset-x-0 top-0  flex items-center gap-6 bg-pur-5 px-[16px]  py-[10px] text-white  '>
                    <FiArrowLeft className='h-[30px] w-[30px]' /> <h1>Rincian Penerbangan</h1>
                </div>

                <div className='mx-[24px] mt-[68px] grid  grid-cols-12 '>
                    <div className='col-span-12 flex justify-between'>
                        <h1
                            className={`${historyStatusStyling(
                                historyDetail.transaction_status
                            )}  w-max rounded-rad-4  px-3 py-1 text-body-6 `}>
                            {historyDetail.transaction_status}
                        </h1>
                        <h1 className='text-body-6 font-bold'>{historyDetail.flight_type}</h1>
                    </div>
                    <div className='col-span-12 mt-4 rounded-rad-2 p-2 shadow-low'>
                        <h1 className='text-title-2 font-medium'>
                            Booking Code {' : '}
                            <span className='font-bold text-pur-5'>{historyDetail.transaction_code}</span>
                        </h1>

                        <div>
                            {historyDetail &&
                                historyDetail.flight_departure.map((historyDetailItem, index) => {
                                    return (
                                        <div key={index}>
                                            <div className='flex items-center justify-between'>
                                                <h2 className='text-title-2 font-bold'>
                                                    {fixedHour(historyDetailItem.departure_time)}
                                                </h2>
                                                <h2 className='text-body-4 font-bold text-pur-4'>Keberangkatan</h2>
                                            </div>
                                            <div>
                                                <h2 className='text-body-6'>{reformatDate(historyDetailItem.departure_date)}</h2>
                                                <h2 className='text-body-6 font-medium'>
                                                    {historyDetailItem.Airport_from.airport_name}
                                                </h2>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className='mb-2 mt-4 w-full border'></div>

                        <div className='flex items-center gap-4'>
                            <div className='relative h-[24px] w-[24px]'>
                                <Image src={'/images/flight_badge.svg'} fill alt='' />
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div>
                                    {historyDetail &&
                                        historyDetail.flight_departure.map((historyDetailItem, index) => {
                                            return (
                                                <div key={index}>
                                                    <h1 className='text-body-6 font-bold'>
                                                        {historyDetailItem.Airline.airline_name} {' - '}
                                                        {historyDetailItem.flight_class}
                                                    </h1>
                                                    <h2 className='text-body-5 font-bold'>
                                                        {historyDetailItem.Airline.airline_code}
                                                    </h2>
                                                </div>
                                            );
                                        })}
                                </div>
                                <div>
                                    {historyDetail &&
                                        historyDetail.passenger.map((historyDetailItem, index) => {
                                            return (
                                                <div key={index}>
                                                    <h3 className='text-body-5 font-bold'>Informasi :</h3>
                                                    <p className='text-body-6 font-medium text-pur-4'>
                                                        Penumpang {index + 1} {' : '} {historyDetailItem.name}
                                                    </p>
                                                    <p className='text-body-6 font-normal'>
                                                        ID {' : '} {historyDetailItem.transactionCode}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                        <div className='mb-2 mt-4 w-full border'></div>
                        <div>
                            {historyDetail &&
                                historyDetail.flight_departure.map((historyDetailItem, index) => {
                                    return (
                                        <div key={index}>
                                            <div className='flex items-center justify-between'>
                                                <h2 className='text-title-2 font-bold'>
                                                    {fixedHour(historyDetailItem.arrival_time)}
                                                </h2>
                                                <h2 className='text-body-4 font-bold text-pur-4'>Kedatangan</h2>
                                            </div>
                                            <div>
                                                <h2 className='text-body-6'>{reformatDate(historyDetailItem.arrival_date)}</h2>
                                                <h2 className='text-body-6 font-medium'>
                                                    {historyDetailItem.Airport_to.airport_name}
                                                </h2>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <h3 className='col-span-12 mt-3 text-body-6 font-bold'>Rincian Harga</h3>
                    <div className='col-span-12 flex justify-between'>
                        <div className='flex flex-col gap-2'>
                            <div>
                                <p className='text-body-6'>1 Adults</p>
                                {/* <p>1 Baby</p> */}
                            </div>
                            <p className='text-body-6'>Tax</p>
                            <p className='text-body-6 font-bold'>Total</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            {historyDetail &&
                                historyDetail.flight_departure.map((historyDetailItem, index) => {
                                    return (
                                        <div key={index}>
                                            <p className='text-body-6'>IDR {historyDetailItem.price}</p>
                                        </div>
                                    );
                                })}
                            <p className='text-body-6'>IDR 300.000</p>
                            <p className='text-body-6 font-bold'>IDR {historyDetail.amount}</p>
                        </div>
                    </div>
                    <div className='col-span-12 mt-5'>
                        <Button className='w-full rounded-rad-4 bg-pur-4 py-3 text-white'> Lanjut Pembayaran</Button>
                    </div>
                </div>
                <BottomNavbar />
            </section>
            {/* MOBILE MODE */}
        </>
    );
}

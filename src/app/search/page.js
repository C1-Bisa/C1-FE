'use client';

//Core
import Image from 'next/image';
import { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

//Third Parties
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
import { FiArrowLeft, FiChevronRight, FiBox, FiHeart, FiDollarSign } from 'react-icons/fi';
import { FiX } from 'react-icons/fi';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';
import { TbCircleNumber1, TbCircleNumber2, TbPlaneInflight } from 'react-icons/tb';
import { BsArrowRight } from 'react-icons/bs';
import { MdDetails, MdFlight, MdFlightLand, MdFlightTakeoff } from 'react-icons/md';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    flightSlice,
    getTotalPassenger,
    getFlightClass,
    getChoosedFlight1,
    getChoosedFlight2,
    getFetchFlightStatus,
    getHomeSearch,
    getSearchPage,
    getSearchPageIsSearchAgain,
    fetchFlight,
    getFlightDatasStatus,
    getFlightDatas,
    getIsReadyToOrder,
    getFlightTitle,
    getPassengerTypeTotal,
    fetchDetailFlight,
    getFlightDetailData,
    getFlightDetailDataStatus,
    getFlightDetailId,
    getFetchFlightStatusNew,
} from '@/store/flight';

//Components
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
import HomeSearch from '@/components/HomeSearch';
import ChooseFilterTicketModal from '@/components/ChooseFilterTicketModal';

//Utils
import { getDateInRange } from '@/utils/getDateInRange';
import { convertToDate, convertToTime } from '@/utils/converDateTime';
import { formatToLocale } from '@/utils/formatToLocale';
import { formatRupiah } from '@/utils/formatRupiah';
import { extractWord } from '@/utils/extractWord';
import { reformatDate } from '@/utils/reformatDate';
import { reformatDuration } from '@/utils/reformatDuration';
import { fixedHour } from '@/utils/fixedHour';

export default function SearchFlight() {
    /*=== router ===*/
    const router = useRouter();

    /*=== next auth ===*/
    //----

    /*=== redux ===*/
    const dispatch = useDispatch();
    const {
        setChoosedFlight,
        setResetChoosedFlight,
        setSearchPageDate,
        setSearchPageIsSearchAgain,
        setFetchFlightAgain,
        setIsReadyToOrder,
        setFetchDetailFlight,
    } = flightSlice.actions;
    const flightTitle = useSelector(getFlightTitle);
    const isReadyToOrder = useSelector(getIsReadyToOrder);
    const statusFetchFlight = useSelector(getFlightDatasStatus);
    // const statusDetaiFlight = useSelector(getFlightDetailDataStatus);
    const statusFetchDetaiFlight = useSelector(getFlightDetailDataStatus);
    const detailFlight = useSelector(getFlightDetailData);
    const homeSearch = useSelector(getHomeSearch);
    const searchPage = useSelector(getSearchPage);
    const searchAgain = useSelector(getSearchPageIsSearchAgain);
    const choosedFlight1 = useSelector(getChoosedFlight1);
    const choosedFlight2 = useSelector(getChoosedFlight2);
    const flightIDs = useSelector(getFlightDetailId);
    const passengerType = useSelector(getPassengerTypeTotal);
    const flightData = useSelector(getFlightDatas);
    const totalPassenger = useSelector(getTotalPassenger); // used in total pass purple
    const flighClass = useSelector(getFlightClass); // used in flight pass purple

    /*=== state ===*/
    // const [values, setValues] = useState([]);
    const [dateOfWeek, setDateOfWeek] = useState([]);
    const [openHomeSearch, setOpenHomeSearch] = useState(false);
    const [openDetailFlight, setOpenDetailFlight] = useState(false);
    const [isDetail, setIsDetail] = useState(false);
    const [chosenDetailFlight, setChosenDetailFlight] = useState(0);
    const [openChooseFilterFlight, setOpenChooseFilterFlight] = useState(false);
    const [selectDate, setSelectDate] = useState(new Date(searchPage.search_date) || '');

    /*=== function ===*/
    const handleDetailFlight = () => setOpenDetailFlight(!openDetailFlight);
    const handleOpenChooseFilterFlight = () => setOpenChooseFilterFlight(!openChooseFilterFlight);
    const handleOpenHomeSearch = () => setOpenHomeSearch(!openHomeSearch);
    const handleChoosedFlight = (data) => {
        dispatch(setChoosedFlight(data));
    };

    const handleResetChooseFlight = () => {
        dispatch(setResetChoosedFlight());
    };

    const handleIsDetail = (id) => {
        setIsDetail(!isDetail);
        setChosenDetailFlight(id);
    };
    const chooseDate = (value) => {
        setSelectDate(value);
        dispatch(setSearchPageDate(dayjs(value).tz('Asia/Jakarta').format()));
        dispatch(setFetchFlightAgain());
    };

    /*=== DEBUG STATE ===*/
    console.log('====================================');
    console.log('DATA HOME', homeSearch);
    console.log('DATA SEARCH', searchPage);
    // console.log('INIIII', flightData);
    // console.log('dayofWeek', values);
    console.log('====================================');

    /*=== effects ===*/
    useEffect(() => {
        const date = getDateInRange(searchPage.search_date || homeSearch.departure_dateTime, searchPage.search_date_return);
        // const date = getDateInRange(searchPage.search_date || homeSearch.departure_dateTime);

        setDateOfWeek(date);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (statusFetchFlight === 'idle') {
            dispatch(
                fetchFlight({
                    from: searchPage.from || homeSearch.from,
                    to: searchPage.to || homeSearch.to,
                    departure_date: convertToDate(searchPage.search_date) || convertToDate(homeSearch.departure_dateTime),
                    departure_time: convertToTime(searchPage.search_date) || convertToTime(homeSearch.departure_dateTime),
                    returnDate: '',
                    flight_class: homeSearch.flight_class,
                })
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusFetchFlight, dispatch]);

    useEffect(() => {
        if (statusFetchDetaiFlight === 'idle') {
            const detailFligt = {
                flight_id: flightIDs,
                dewasa: passengerType.dewasa,
                anak: passengerType.anak,
                bayi: passengerType.bayi,
            };
            console.log('BEFORE ADDING THE DATA', detailFlight);
            dispatch(
                fetchDetailFlight({
                    flight_id: detailFligt.flight_id,
                    dewasa: detailFligt.dewasa,
                    anak: detailFligt.anak,
                    bayi: detailFligt.bayi,
                })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusFetchDetaiFlight, dispatch, fetchDetailFlight]);

    useEffect(() => {
        if (searchAgain) {
            const date = getDateInRange(searchPage.search_date || homeSearch.departure_dateTime, searchPage.search_date_return);
            // const date = getDateInRange(searchPage.search_date || homeSearch.departure_dateTime);
            setDateOfWeek(date); // ketika dia di masukin data ? kalo refresh knapa g ada data
            setSelectDate(new Date(searchPage.search_date || homeSearch.departure_dateTime));
        }
        dispatch(setSearchPageIsSearchAgain(false));
        dispatch(setFetchFlightAgain());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchAgain, dispatch, setSearchPageIsSearchAgain, setFetchFlightAgain]);

    if (statusFetchFlight === 'loading') {
        return (
            <div className='overflow-x-hidden'>
                <Navbar className={'hidden lg:block'} />
                <div className='hidden w-screen border border-b-net-2 pb-4 lg:block'>
                    <div className='container mx-auto grid max-w-screen-lg grid-cols-12 '>
                        {/* search flight menu start */}
                        <h1 className='col-span-12 mb-[24px] mt-[47px] font-poppins text-head-1 font-bold'>Pilih Penerbangan</h1>
                        <div className='frid col-span-12 grid grid-cols-12 gap-4'>
                            <div
                                className='col-span-9 flex cursor-pointer items-center gap-4 rounded-rad-3 bg-pur-3 font-poppins text-title-2 font-medium text-white'
                                onClick={() => router.back()}>
                                <FiArrowLeft className='ml-[21px] h-6 w-6 ' />
                                <p>
                                    {searchPage.from || homeSearch.from} {' > '} {searchPage.to || homeSearch.to} -{' '}
                                    {totalPassenger} Penumpang - {flighClass}
                                </p>
                            </div>
                            <div
                                className=' col-span-3 cursor-pointer rounded-rad-3 bg-alert-1 py-[13px] text-center font-poppins text-title-2 font-bold text-white'
                                onClick={() => handleOpenHomeSearch()}>
                                <p>Ubah Pencarian</p>
                            </div>
                        </div>
                        {/* search flight menu end */}

                        {/* day of week start */}
                        <div className='col-span-12 mt-[27px] grid grid-cols-8 divide-x-2'>
                            {dateOfWeek?.length ? (
                                dateOfWeek?.map((val, index) => (
                                    <div
                                        key={index}
                                        className='col-span-1 cursor-pointer px-2'
                                        onClick={() => chooseDate(val.date)}>
                                        <div
                                            className={`${
                                                new Date(val.date).getDate() === new Date(selectDate).getDate()
                                                    ? 'bg-pur-2 text-white'
                                                    : 'text-[#151515]'
                                            } flex flex-col items-center justify-center rounded-[8px] px-[22px] py-[4px] font-poppins`}>
                                            <h3 className='text-[14px] font-bold'>
                                                {val.date.toLocaleDateString('id-ID', { weekday: 'long' })}
                                            </h3>
                                            <p
                                                className={`${
                                                    new Date(val.date).getDate() === new Date(selectDate).getDate()
                                                        ? 'text-white'
                                                        : 'text-[#8A8A8A]'
                                                } text-[12px] font-normal`}>
                                                {val.date.toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h1>Loadinggg</h1>
                            )}
                        </div>
                        {/* day of week end */}
                    </div>
                </div>
                <div className='container mx-auto grid max-w-screen-lg grid-cols-12 '>
                    <div className='col-span-12  mt-[40px] grid grid-cols-12 gap-10 font-poppins'>
                        <div className='col-span-12 flex items-center justify-end'>
                            <Button
                                onClick={() => handleOpenChooseFilterFlight()}
                                className='flex items-center gap-2 rounded-rad-4 border border-pur-4 px-3 py-2 font-poppins text-body-3 font-medium text-pur-4'>
                                <RiArrowUpDownLine /> Termurah
                            </Button>
                        </div>
                        {/* left flight start */}
                        <div className='col-span-4'>
                            <div className='rounded-rad-4 px-6 py-6 font-poppins shadow-low'>
                                <div className='flex justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <MdFlight className='h-[20px] w-[20px]' /> <h1>Your Flight</h1>
                                    </div>
                                    <h1 className='font-bold'>{homeSearch.flight_type}</h1>
                                </div>
                                <div className='mt-3 flex flex-col gap-3'>
                                    {/* flight 1 */}
                                    <div>
                                        {homeSearch.from && (
                                            <div className='flex flex-col gap-3 border border-net-3 p-2'>
                                                <div className='flex items-center gap-4 '>
                                                    <div className='rounded-rad-2 bg-pur-4 p-2'>
                                                        <TbCircleNumber1 className='h-[24px] w-[24px] text-white' />
                                                    </div>
                                                    <div>
                                                        <h1 className='text-body-3 font-medium'>
                                                            {formatToLocale(homeSearch.departure_dateTime)}
                                                        </h1>
                                                        <div className='flex items-center gap-2 text-body-5 font-bold'>
                                                            <h3>{homeSearch.from}</h3>
                                                            <BsArrowRight />
                                                            <h3>{homeSearch.to}</h3>
                                                        </div>
                                                    </div>
                                                </div>

                                                {choosedFlight1.is_choose && (
                                                    <div className='w-full'>
                                                        <h1 className='text-title-2 font-bold'>{choosedFlight1.airline}</h1>
                                                        <div className='flex items-center gap-4'>
                                                            <div>
                                                                <p className='text-body-6 font-bold'>
                                                                    {fixedHour(choosedFlight1.departure_time)}
                                                                </p>
                                                                <p className='text-body-4 font-medium'>
                                                                    {choosedFlight1.from_airport_code}
                                                                </p>
                                                            </div>
                                                            <TbPlaneInflight />
                                                            <div>
                                                                <p className='text-body-6 font-bold'>
                                                                    {fixedHour(choosedFlight1.arrival_time)}
                                                                </p>
                                                                <p className='text-body-4 font-medium'>
                                                                    {choosedFlight1.to_airport_code}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p>{reformatDuration(choosedFlight1.duration)}</p>
                                                                <p>Direct</p>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            onClick={() => handleResetChooseFlight()}
                                                            className='w-full bg-pur-3 py-2 text-body-6 text-white'>
                                                            Change departure flight
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {/* flight 1 */}

                                    {/* fligth 2 */}
                                    <div>
                                        {homeSearch.return_dateTime && (
                                            <div className='flex flex-col gap-3 border border-net-3 p-2'>
                                                <div className='flex items-center gap-4'>
                                                    <div className='rounded-rad-2 bg-pur-4 p-2'>
                                                        <TbCircleNumber2 className='h-[24px] w-[24px] text-white' />
                                                    </div>
                                                    <div>
                                                        <h1 className='text-body-3 font-medium'>
                                                            {formatToLocale(homeSearch.return_dateTime)}
                                                        </h1>
                                                        <div className='flex items-center gap-2 text-body-5 font-bold'>
                                                            <h3>{homeSearch.to}</h3>
                                                            <BsArrowRight />
                                                            <h3>{homeSearch.from}</h3>
                                                        </div>
                                                    </div>
                                                </div>

                                                {choosedFlight2.is_choose && (
                                                    <div className='w-full'>
                                                        <h1 className='text-title-2 font-bold'>{choosedFlight2.airline}</h1>
                                                        <div className='flex items-center gap-4'>
                                                            <div>
                                                                <p className='text-body-6 font-bold'>
                                                                    {fixedHour(choosedFlight2.departure_time)}
                                                                </p>
                                                                <p className='text-body-4 font-medium'>
                                                                    {choosedFlight2.from_airport_code}
                                                                </p>
                                                            </div>
                                                            <TbPlaneInflight />
                                                            <div>
                                                                <p className='text-body-6 font-bold'>
                                                                    {fixedHour(choosedFlight2.arrival_time)}
                                                                </p>
                                                                <p className='text-body-4 font-medium'>
                                                                    {choosedFlight2.to_airport_code}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p>{reformatDuration(choosedFlight2.duration)}</p>
                                                                <p>Direct</p>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            onClick={() => handleResetChooseFlight()}
                                                            className='w-full bg-pur-3 py-2 text-body-6 text-white'>
                                                            Change departure flight
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {/* fligth 2 */}
                                </div>
                            </div>
                            <div className='mt-4 rounded-rad-4 px-6 py-6 font-poppins shadow-low'>
                                <h3 className='mb-[24px]'>Filter</h3>
                                <div className='flex flex-col gap-1'>
                                    <div className='flex items-center justify-between border border-b-[1px] border-l-0 border-r-0 border-t-0 border-net-2 py-2'>
                                        <p className='flex items-center gap-3'>
                                            <FiBox /> Transit
                                        </p>
                                        <FiChevronRight />
                                    </div>
                                    <div className='flex items-center justify-between border border-b-[1px] border-l-0 border-r-0 border-t-0 border-net-2 py-2'>
                                        <p className='flex items-center gap-3'>
                                            <FiHeart /> Fasilitas
                                        </p>
                                        <FiChevronRight />
                                    </div>
                                    <div className='flex items-center justify-between border border-b-[1px] border-l-0 border-r-0 border-t-0 border-net-2 py-2'>
                                        <p className='flex items-center gap-3'>
                                            <FiDollarSign /> Harga
                                        </p>
                                        <FiChevronRight />
                                    </div>
                                </div>
                            </div>
                            {/* left filter end */}
                        </div>
                        {/* left flight end */}
                        <div className='col-span-8 grid-cols-12 font-poppins'>
                            <h1 className='col-span-12 text-head-2 font-bold'>Pilih {flightTitle}</h1>
                            <div
                                style={{ height: 'calc(100vh - 340px)' }}
                                className='container col-span-12 mx-auto   hidden max-w-screen-lg flex-col items-center  justify-center gap-3  font-poppins lg:flex'>
                                <h1 className='text-title-2 font-bold text-net-3'>Harap menunggu...</h1>
                                <Image
                                    alt=''
                                    src={'/new_images/loading.svg'}
                                    width={160}
                                    height={160}
                                    priority
                                    style={{ width: 'auto' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='overflow-x-hidden'>
            <Navbar className={'hidden lg:block'} />

            <div className='hidden w-screen border border-b-net-2 pb-4 lg:block'>
                <div className='container mx-auto grid max-w-screen-lg grid-cols-12 '>
                    {/* search flight menu start */}
                    <h1 className='col-span-12 mb-[24px] mt-[47px] font-poppins text-head-1 font-bold'>Pilih Penerbangan</h1>
                    <div className='frid col-span-12 grid grid-cols-12 gap-4'>
                        <div
                            className='col-span-9 flex cursor-pointer items-center gap-4 rounded-rad-3 bg-pur-3 font-poppins text-title-2 font-medium text-white'
                            onClick={() => router.back()}>
                            <FiArrowLeft className='ml-[21px] h-6 w-6 ' />
                            <p>
                                {searchPage.from || homeSearch.from} {' > '} {searchPage.to || homeSearch.to} - {totalPassenger}{' '}
                                Penumpang - {flighClass}
                            </p>
                        </div>
                        <div
                            className=' col-span-3 cursor-pointer rounded-rad-3 bg-alert-1 py-[13px] text-center font-poppins text-title-2 font-bold text-white'
                            onClick={() => handleOpenHomeSearch()}>
                            <p>Ubah Pencarian</p>
                        </div>
                    </div>
                    {/* search flight menu end */}

                    {/* day of week start */}
                    <div className='col-span-12 mt-[27px] grid grid-cols-8 divide-x-2'>
                        {dateOfWeek?.length ? (
                            dateOfWeek?.map((val, index) => {
                                console.log('====================================');
                                console.log('DATE', val);
                                console.log('====================================');
                                return (
                                    <div
                                        key={index}
                                        className='col-span-1 cursor-pointer px-2'
                                        onClick={() => chooseDate(val.date)}>
                                        <div
                                            className={`${
                                                new Date(val.date).getDate() === new Date(selectDate).getDate()
                                                    ? 'bg-pur-2 text-white'
                                                    : 'text-[#151515]'
                                            } flex flex-col items-center justify-center rounded-[8px] px-[22px] py-[4px] font-poppins`}>
                                            <h3 className='text-[14px] font-bold'>
                                                {val.date.toLocaleDateString('id-ID', { weekday: 'long' })}
                                            </h3>
                                            <p
                                                className={`${
                                                    new Date(val.date).getDate() === new Date(selectDate).getDate()
                                                        ? 'text-white'
                                                        : 'text-[#8A8A8A]'
                                                } text-[12px] font-normal`}>
                                                {val.date.toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <h1>Loadinggg</h1>
                        )}
                    </div>
                    {/* day of week end */}
                </div>
            </div>

            <div className='container mx-auto grid max-w-screen-lg grid-cols-12 '>
                {/* one way start  & list flight*/}
                <div className='col-span-12  mt-[40px] grid grid-cols-12 gap-10 font-poppins'>
                    <div className='col-span-12 flex items-center justify-end'>
                        <Button
                            onClick={() => handleOpenChooseFilterFlight()}
                            className='flex items-center gap-2 rounded-rad-4 border border-pur-4 px-3 py-2 font-poppins text-body-3 font-medium text-pur-4'>
                            <RiArrowUpDownLine /> Termurah
                        </Button>
                    </div>

                    {/* left flight start */}
                    <div className='col-span-4'>
                        <div className='rounded-rad-4 px-6 py-6 font-poppins shadow-low'>
                            <div className='flex justify-between'>
                                <div className='flex items-center gap-2'>
                                    <MdFlight className='h-[20px] w-[20px]' /> <h1>Your Flight</h1>
                                </div>
                                <h1 className='font-bold'>{homeSearch.flight_type}</h1>
                            </div>
                            <div className='mt-3 flex flex-col gap-3'>
                                {/* flight 1 */}
                                <div>
                                    {homeSearch.from && (
                                        <div className='flex flex-col gap-3 border border-net-3 p-2'>
                                            <div className='flex items-center gap-4 '>
                                                <div className='rounded-rad-2 bg-pur-4 p-2'>
                                                    <TbCircleNumber1 className='h-[24px] w-[24px] text-white' />
                                                </div>
                                                <div>
                                                    <h1 className='text-body-3 font-medium'>
                                                        {formatToLocale(homeSearch.departure_dateTime)}
                                                    </h1>
                                                    <div className='flex items-center gap-2 text-body-5 font-bold'>
                                                        <h3>{homeSearch.from}</h3>
                                                        <BsArrowRight />
                                                        <h3>{homeSearch.to}</h3>
                                                    </div>
                                                </div>
                                            </div>

                                            {choosedFlight1.is_choose && (
                                                <div className='w-full'>
                                                    <h1 className='text-title-2 font-bold'>{choosedFlight1.airline}</h1>
                                                    <div className='flex items-center gap-4'>
                                                        <div>
                                                            <p className='text-body-6 font-bold'>
                                                                {fixedHour(choosedFlight1.departure_time)}
                                                            </p>
                                                            <p className='text-body-4 font-medium'>
                                                                {choosedFlight1.from_airport_code}
                                                            </p>
                                                        </div>
                                                        <TbPlaneInflight />
                                                        <div>
                                                            <p className='text-body-6 font-bold'>
                                                                {fixedHour(choosedFlight1.arrival_time)}
                                                            </p>
                                                            <p className='text-body-4 font-medium'>
                                                                {choosedFlight1.to_airport_code}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p>{reformatDuration(choosedFlight1.duration)}</p>
                                                            <p>Direct</p>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        onClick={() => handleResetChooseFlight()}
                                                        className='w-full bg-pur-3 py-2 text-body-6 text-white'>
                                                        Change departure flight
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {/* flight 1 */}

                                {/* fligth 2 */}
                                <div>
                                    {homeSearch.return_dateTime && (
                                        <div className='flex flex-col gap-3 border border-net-3 p-2'>
                                            <div className='flex items-center gap-4'>
                                                <div className='rounded-rad-2 bg-pur-4 p-2'>
                                                    <TbCircleNumber2 className='h-[24px] w-[24px] text-white' />
                                                </div>
                                                <div>
                                                    <h1 className='text-body-3 font-medium'>
                                                        {formatToLocale(homeSearch.return_dateTime)}
                                                    </h1>
                                                    <div className='flex items-center gap-2 text-body-5 font-bold'>
                                                        <h3>{homeSearch.to}</h3>
                                                        <BsArrowRight />
                                                        <h3>{homeSearch.from}</h3>
                                                    </div>
                                                </div>
                                            </div>

                                            {choosedFlight2.is_choose && (
                                                <div className='w-full'>
                                                    <h1 className='text-title-2 font-bold'>{choosedFlight2.airline}</h1>
                                                    <div className='flex items-center gap-4'>
                                                        <div>
                                                            <p className='text-body-6 font-bold'>
                                                                {fixedHour(choosedFlight2.departure_time)}
                                                            </p>
                                                            <p className='text-body-4 font-medium'>
                                                                {choosedFlight2.from_airport_code}
                                                            </p>
                                                        </div>
                                                        <TbPlaneInflight />
                                                        <div>
                                                            <p className='text-body-6 font-bold'>
                                                                {fixedHour(choosedFlight2.arrival_time)}
                                                            </p>
                                                            <p className='text-body-4 font-medium'>
                                                                {choosedFlight2.to_airport_code}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p>{reformatDuration(choosedFlight2.duration)}</p>
                                                            <p>Direct</p>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        onClick={() => handleResetChooseFlight()}
                                                        className='w-full bg-pur-3 py-2 text-body-6 text-white'>
                                                        Change departure flight
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {/* fligth 2 */}
                            </div>
                        </div>
                        <div className='mt-4 rounded-rad-4 px-6 py-6 font-poppins shadow-low'>
                            <h3 className='mb-[24px]'>Filter</h3>
                            <div className='flex flex-col gap-1'>
                                <div className='flex items-center justify-between border border-b-[1px] border-l-0 border-r-0 border-t-0 border-net-2 py-2'>
                                    <p className='flex items-center gap-3'>
                                        <FiBox /> Transit
                                    </p>
                                    <FiChevronRight />
                                </div>
                                <div className='flex items-center justify-between border border-b-[1px] border-l-0 border-r-0 border-t-0 border-net-2 py-2'>
                                    <p className='flex items-center gap-3'>
                                        <FiHeart /> Fasilitas
                                    </p>
                                    <FiChevronRight />
                                </div>
                                <div className='flex items-center justify-between border border-b-[1px] border-l-0 border-r-0 border-t-0 border-net-2 py-2'>
                                    <p className='flex items-center gap-3'>
                                        <FiDollarSign /> Harga
                                    </p>
                                    <FiChevronRight />
                                </div>
                            </div>
                        </div>
                        {/* left filter end */}
                    </div>
                    {/* left flight end */}

                    {/* right fligth start */}
                    {/* Test */}
                    <div className='col-span-8 font-poppins'>
                        <h1 className='text-head-2 font-bold'>Pilih {flightTitle}</h1>
                        <div className='mt-3 grid grid-cols-12 gap-4'>
                            {flightData?.length ? (
                                flightData?.map((data, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className='col-span-12 flex cursor-pointer flex-col gap-2 rounded-rad-3 border border-transparent p-4 shadow-low hover:border hover:border-pur-1'>
                                            {/* list top start */}
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center gap-2'>
                                                    <div className='relative h-[24px] w-[24px] '>
                                                        <Image src={'./images/flight_badge.svg'} fill alt='' />
                                                    </div>
                                                    <h3 className='text-body-5 font-medium'>
                                                        {data.airline} - {data.flight_class}
                                                    </h3>
                                                </div>
                                                <div onClick={() => handleIsDetail(data.id)}>
                                                    {isDetail && chosenDetailFlight === data.id ? (
                                                        <IoIosArrowDropup className='h-[28px] w-[28px] text-net-3' />
                                                    ) : (
                                                        <IoIosArrowDropdown className='h-[28px] w-[28px] text-net-3' />
                                                    )}
                                                </div>
                                            </div>

                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center gap-4'>
                                                    <div>
                                                        <p className='text-body-6 font-bold'>{fixedHour(data.departure_time)}</p>
                                                        <p className='text-body-3 font-medium'>{data.airport_from_code}</p>
                                                    </div>
                                                    <div className='flex flex-col items-center justify-center'>
                                                        <p className='text-body-4 text-net-3'>
                                                            {reformatDuration(data.duration)}
                                                        </p>
                                                        <div className='relative h-[8px] w-[233px]'>
                                                            <Image alt='' src={'./images/arrow.svg'} fill />
                                                        </div>
                                                        <p className='text-body-4 text-net-3'>Direct</p>
                                                    </div>
                                                    <div>
                                                        <p className='text-body-6 font-bold'>{fixedHour(data.arrival_time)}</p>
                                                        <p className='text-body-3 font-medium'>{data.airport_to_code}</p>
                                                    </div>
                                                    <div>
                                                        <Image
                                                            alt=''
                                                            src={'/new_images/icon_baggage.svg'}
                                                            width={24}
                                                            height={24}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex flex-col gap-[6px] text-title-2'>
                                                    <p className='font-bold text-pur-4'>{formatRupiah(data.price)}</p>
                                                    <Button
                                                        onClick={() => handleChoosedFlight(data)}
                                                        className='rounded-rad-3 bg-pur-3 py-1 font-medium text-white'>
                                                        Pilih
                                                    </Button>
                                                </div>
                                            </div>

                                            {isDetail && chosenDetailFlight === data.id && (
                                                <div className='mt-5 border-[1px] border-b-0 border-l-0 border-r-0 border-t-net-3'>
                                                    <h1 className='mb-1 mt-[22px] text-body-6 font-bold text-pur-5'>
                                                        Detail Penerbangan
                                                    </h1>

                                                    <div className='flex justify-between'>
                                                        <div>
                                                            <h2 className='text-title-2 font-bold'>
                                                                {fixedHour(data.departure_time)}
                                                            </h2>
                                                            <p className='text-body-6 font-normal'>
                                                                {formatToLocale(data.departure_date)}
                                                            </p>
                                                            <p className='text-body-6 font-normal'>{data.airport_from}</p>
                                                        </div>
                                                        <div>
                                                            <h3 className='font-bold text-pur-3'>Keberangkaran</h3>
                                                        </div>
                                                    </div>

                                                    <div className='mb-2 mt-4 flex justify-center'>
                                                        <div className='w-1/2 border-[1px] border-t-net-2'></div>
                                                    </div>

                                                    <div className='flex items-center gap-4'>
                                                        <div className='relative h-[24px] w-[24px]'>
                                                            <Image src={'./images/flight_badge.svg'} fill alt='' />
                                                        </div>
                                                        <div className='flex flex-col gap-4'>
                                                            <div>
                                                                <h1 className='text-body-6 font-bold'>
                                                                    {data.airline} - {data.flight_class}
                                                                </h1>
                                                                <h2 className='text-body-5 font-bold'>{data.airlane_code}</h2>
                                                            </div>
                                                            <div>
                                                                <h3 className='text-body-5 font-bold'>Informasi :</h3>
                                                                <p className='text-body-5 font-normal'>
                                                                    {extractWord(data.description)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='mb-2 mt-4 flex justify-center'>
                                                        <div className='w-1/2 border-[1px] border-t-net-2'></div>
                                                    </div>

                                                    <div className='flex justify-between'>
                                                        <div>
                                                            <h2 className='text-title-2 font-bold'>
                                                                {fixedHour(data.arrival_time)}
                                                            </h2>
                                                            <p className='text-body-6 font-normal'>
                                                                {formatToLocale(data.arrival_date)}
                                                            </p>
                                                            <p className='text-body-6 font-normal'>{data.airport_to}</p>
                                                        </div>
                                                        <div>
                                                            <h3 className='font-bold text-pur-3'>Kedatangan</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <div
                                    style={{ height: 'calc(100vh - 340px)' }}
                                    className='container col-span-12 mx-auto   hidden max-w-screen-lg flex-col items-center  justify-center gap-3  font-poppins lg:flex'>
                                    {/* <h1 className='text-title-2 font-bold text-net-3'>Harap menunggu...</h1> */}
                                    <Image
                                        alt=''
                                        src={'/new_images/empty_flight.svg'}
                                        width={160}
                                        height={160}
                                        priority
                                        style={{ width: 'auto' }}
                                    />
                                </div>
                                // <div className='col-span-12 flex items-center justify-center gap-4 p-4'>
                                //     <Image alt='' src={'/new_images/empty_flight.svg'} height={210} width={210} />
                                // </div>
                            )}
                        </div>
                    </div>
                    {/* Test */}

                    {/* right fligth end */}
                </div>
                {/* one way  end & list flight*/}
            </div>

            {/* ======= Modal and Pop  start ====== */}
            {/* homeSearch  start */}
            <div>
                {openHomeSearch && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 '>
                        <HomeSearch
                            className={'h-[298px] w-[968px]'}
                            buttonAction={
                                <FiX
                                    className='absolute right-0 mr-3 mt-2 h-[28px] w-[28px]'
                                    onClick={() => {
                                        dispatch(setSearchPageIsSearchAgain(true));
                                        dispatch(setResetChoosedFlight());
                                        handleOpenHomeSearch();
                                    }}
                                />
                            }
                            handleActionHomeSearch={() => {
                                dispatch(setSearchPageIsSearchAgain(true));
                                dispatch(setFetchFlightAgain());
                                dispatch(setResetChoosedFlight());
                                handleOpenHomeSearch(); // close modal
                                router.refresh();
                            }}
                        />
                    </div>
                )}
            </div>
            {/* homeSearch  end */}

            {/* filtet flight start */}
            <div>
                {openChooseFilterFlight && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
                        <ChooseFilterTicketModal open={openChooseFilterFlight} handleOpen={handleOpenChooseFilterFlight} />
                    </div>
                )}
            </div>
            {/* filtet flight end */}

            <div>
                {isReadyToOrder && (
                    <div className='fixed inset-0 flex items-center justify-end bg-black bg-opacity-60 font-poppins'>
                        <div className='relative h-screen w-1/2 bg-white font-poppins'>
                            <div className='mx-[16px] flex flex-col gap-3'>
                                <div className='flex items-center '>
                                    <Button
                                        className='rounded-rad-2 bg-white px-2 py-2 shadow-low'
                                        onClick={() => dispatch(setIsReadyToOrder(false))}>
                                        <FiX className='h-[30px] w-[30px]' />
                                    </Button>
                                    <h1 className='m-5 text-3xl font-bold'>Flight Summary</h1>
                                </div>
                                {/* Departure / Keberangkatan */}
                                {choosedFlight1.departure_date && (
                                    <div className='flex flex-col gap-3'>
                                        <div className='flex items-center gap-2'>
                                            <MdFlightTakeoff className='h-[30px] w-[30px] text-net-3' />
                                            <div className='flex items-center gap-2'>
                                                <h1>Keberangkatan</h1>
                                                <h1>{reformatDate(choosedFlight1.departure_date)}</h1>
                                            </div>
                                        </div>
                                        <div className='flex gap-10 rounded-rad-2 p-4 shadow-low'>
                                            <h1 className='font-bold'>{choosedFlight1.airline}</h1>
                                            <div className='flex items-center gap-4'>
                                                <div>
                                                    <h1 className='text-body-6 font-bold'>
                                                        {fixedHour(choosedFlight1.departure_time)}
                                                    </h1>
                                                    <h1 className='text-body-6'>{choosedFlight1.from_airport_code}</h1>
                                                </div>
                                                <div className='flex flex-col items-center '>
                                                    <h1 className='text-body-3 text-net-3'>
                                                        {reformatDuration(choosedFlight1.duration)}
                                                    </h1>
                                                    <div className='relative h-[8px] w-[233px]'>
                                                        <Image alt='' src={'./images/arrow.svg'} fill />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h1 className='text-body-6 font-bold'>
                                                        {fixedHour(choosedFlight1.arrival_time)}
                                                    </h1>
                                                    <h1 className='text-body-6'>{choosedFlight1.to_airport_code}</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* Departure / Keberangkatan */}

                                {/* Arrival / Kepulangan */}
                                {choosedFlight2.departure_date && (
                                    <div className='mt-3 flex flex-col gap-3'>
                                        <div className='flex items-center gap-2'>
                                            <MdFlightLand className='h-[30px] w-[30px] text-net-3' />
                                            <div className='flex items-center gap-2'>
                                                <h1>Kepulangan</h1>
                                                <h1>{reformatDate(choosedFlight2.departure_date)}</h1>
                                            </div>
                                        </div>
                                        <div className='flex gap-10 rounded-rad-2 p-4 shadow-low'>
                                            <h1 className='font-bold'>{choosedFlight2.airline}</h1>
                                            <div className='flex items-center gap-4'>
                                                <div>
                                                    <h1 className='text-body-6 font-bold'>
                                                        {fixedHour(choosedFlight2.departure_time)}
                                                    </h1>
                                                    <h1 className='text-body-6'>{choosedFlight2.from_airport_code}</h1>
                                                </div>
                                                <div className='flex flex-col items-center '>
                                                    <h1 className='text-body-3 text-net-3'>
                                                        {reformatDuration(choosedFlight2.duration)}
                                                    </h1>
                                                    <div className='relative h-[8px] w-[233px]'>
                                                        <Image alt='' src={'./images/arrow.svg'} fill />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h1 className='text-body-6 font-bold'>
                                                        {fixedHour(choosedFlight2.arrival_time)}
                                                    </h1>
                                                    <h1 className='text-body-6'>{choosedFlight2.to_airport_code}</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* Arrival / Kepulangan */}
                            </div>
                            <div className='absolute bottom-5 right-4 w-[80%]'>
                                <div
                                    onClick={() => handleDetailFlight()}
                                    className='flex cursor-pointer flex-col rounded-rad-3 px-5 py-3 shadow-low'>
                                    <div className='flex justify-between gap-10'>
                                        <div className='flex gap-5'>
                                            {openDetailFlight ? (
                                                <FaChevronDown className='h-[24px] w-[24px]' />
                                            ) : (
                                                <FaChevronUp className='h-[24px] w-[24px]' />
                                            )}

                                            <div className='flex flex-col gap-1'>
                                                <h1 className='text-title-1 font-medium'>Total</h1>
                                                <h1 className='text-head-2 font-bold'>
                                                    <span>{formatRupiah(detailFlight.totalPrice) || 'Loading...'}</span>
                                                    {/* IDR <span>{detailFlight.totalPrice}</span> */}
                                                </h1>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => {
                                                router.replace('/order');
                                                router.refresh();
                                                dispatch(setFetchDetailFlight());
                                                dispatch(setIsReadyToOrder(false));
                                            }}
                                            className='h-max w-max rounded-rad-3 bg-pur-3 px-5 py-3 text-title-2 text-white'>
                                            Continue to Order
                                        </Button>
                                    </div>
                                    <div className='my-3 w-full border'></div>
                                    <div>
                                        {!openDetailFlight && <h1 className='mb-2 font-medium'>Open Detail</h1>}
                                        {openDetailFlight && (
                                            <div>
                                                <h1 className='mb-2 font-medium'>Detail {' : '}</h1>

                                                {choosedFlight1.airline && (
                                                    <div className='flex justify-between'>
                                                        <div className='flex gap-3'>
                                                            <h1 className='text-body-5 font-bold'>{choosedFlight1.airline}</h1>
                                                            {passengerType.dewasa > 0 && (
                                                                <h1 className='text-body-5'>Dewasa ({passengerType.dewasa}x)</h1>
                                                            )}
                                                            {passengerType.anak > 0 && (
                                                                <h1 className='text-body-5'>Anak ({passengerType.anak}x)</h1>
                                                            )}
                                                            {passengerType.bayi > 0 && (
                                                                <h1 className='text-body-5'>Bayi ({passengerType.bayi}x)</h1>
                                                            )}
                                                        </div>
                                                        <h1>
                                                            <span className='ml-1'>
                                                                {formatRupiah(
                                                                    detailFlight.berangkat.price *
                                                                        (passengerType.dewasa + passengerType.anak)
                                                                )}
                                                            </span>
                                                        </h1>
                                                    </div>
                                                )}
                                                {choosedFlight2.airline && (
                                                    <div className='flex justify-between'>
                                                        <div className='flex gap-3'>
                                                            <h1 className='text-body-5 font-bold'>{choosedFlight2.airline}</h1>
                                                            {passengerType.dewasa > 0 && (
                                                                <h1 className='text-body-5'>Dewasa ({passengerType.dewasa}x)</h1>
                                                            )}
                                                            {passengerType.anak > 0 && (
                                                                <h1 className='text-body-5'>Anak ({passengerType.anak}x)</h1>
                                                            )}
                                                            {passengerType.bayi > 0 && (
                                                                <h1 className='text-body-5'>Bayi ({passengerType.bayi}x)</h1>
                                                            )}
                                                        </div>
                                                        <h1>
                                                            <span className='ml-1'>
                                                                {formatRupiah(
                                                                    detailFlight.pulang.price *
                                                                        (passengerType.dewasa + passengerType.anak)
                                                                )}
                                                            </span>
                                                        </h1>
                                                    </div>
                                                )}
                                                <div className='flex justify-between '>
                                                    <h1 className='text-body-5 font-bold'>Tax</h1>
                                                    <h1>
                                                        <span className='ml-1'>{formatRupiah(detailFlight.tax)}</span>
                                                    </h1>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* ======= Modal and Pop  end ====== */}
        </div>
    );
}

'use client';

import axios from 'axios';
import { Fragment } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiChevronRight, FiBox, FiHeart, FiDollarSign } from 'react-icons/fi';
import { FiX } from 'react-icons/fi';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';
import { TbCircleNumber1, TbCircleNumber2, TbPlaneInflight } from 'react-icons/tb';
import { BsArrowRight } from 'react-icons/bs';
import { MdFlight } from 'react-icons/md';
import Image from 'next/image';
// import { FiArrowLeft, FiChevronRight, FiBox, FiHeart, FiDollarSign } from 'react-icons/fi';
// import { FiX } from 'react-icons/fi';
// import { RiArrowUpDownLine } from 'react-icons/ri';
// import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';

// dayjs
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
// dayjs

import { convertToDate, convertToTime } from '@/utils/converDateTime';
import { formatToLocale } from '@/utils/formatToLocale';
import { formatRupiah } from '@/utils/formatRupiah';

import { getDateInRange } from '@/utils/getDateInRange';
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
import HomeSearch from '@/components/HomeSearch';
import ChooseFilterTicketModal from '@/components/ChooseFilterTicketModal';
import {
    // getOneWay,
    // getTwoWay,
    // getDisplayDerpatureDatetime,
    // getFlights,
    // fetchFlight,
    // getFlightFetchStatus,
    // getTest,
    // getFirstSearch,
    // getSecondSearch,
    // getDisplayArrivalDatetime,
    // getDisplayFlightType,
    // getChoosedFligth1,
    // getChoosedFligth2,
    // getDisplayFligth1,
    // getDisplayFligth,
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
} from '@/store/flight';
// import { MdFlight } from 'react-icons/md';

const extractWord = (words) => {
    const text = words
        .split(/((?:\w+ ){3})/g)
        .filter(Boolean)
        .join('\n');
    const lines = text.split(/\n/);

    // console.log('ini', text);
    const withBreaks = lines.flatMap((line, index) =>
        index > 0 ? [<br key={`br-${index}`} />, <Fragment key={index}>{line}</Fragment>] : [line]
    );

    return withBreaks;
};

export default function SearchFlight() {
    const router = useRouter();
    const dispatch = useDispatch();

    const statusFetch = useSelector(getFlightDatasStatus);

    const homeSearch = useSelector(getHomeSearch);
    const searchPage = useSelector(getSearchPage);
    const searchAgain = useSelector(getSearchPageIsSearchAgain);

    console.log('SERR', searchPage);

    const fetchFlightStatus = useSelector(getFetchFlightStatus);

    console.log('fetchFlightStatus', fetchFlightStatus);
    const choosedFlight1 = useSelector(getChoosedFlight1);
    const choosedFlight2 = useSelector(getChoosedFlight2);

    // list of flight data
    const flightData = useSelector(getFlightDatas);
    // list of flight data

    // detail of list data
    const [isDetail, setIsDetail] = useState(false);
    const [chosenDetailFlight, setChosenDetailFlight] = useState(0);
    const handleIsDetail = (id) => {
        setIsDetail(!isDetail);
        setChosenDetailFlight(id);
    };
    // detail of list data

    // modal filter ticket start
    const [openChooseFilterFlight, setOpenChooseFilterFlight] = useState(false);
    const handleOpenChooseFilterFlight = () => setOpenChooseFilterFlight(!openChooseFilterFlight);
    // modal filter ticket end

    const totalPassenger = useSelector(getTotalPassenger); // used in total pass purple
    const flighClass = useSelector(getFlightClass); // used in flight pass purple

    // handling derpature date
    const {
        // setDerpatureDateTime,
        setChoosedFlight,
        setFetchFlightStatus,
        setResetChoosedFlight,
        setSearchPageDate,
        setSearchPageIsSearchAgain,
        setFetchTerbaru,
    } = flightSlice.actions;

    // dateInAWeek
    const [values, setValues] = useState([]);

    console.log('dayofWeek', values);
    const [selectDate, setSelectDate] = useState(new Date(searchPage.search_date) || '');
    const [selectOffsetDate, setSelectOffsetDate] = useState(
        new Date(searchPage.search_date_return || homeSearch.return_dateTime) || ''
    );
    // dateInAWeek
    // handling derpature date

    // open homesearch
    const [openHomeSearch, setOpenHomeSearch] = useState(false);
    const handleOpenHomeSearch = () => setOpenHomeSearch(!openHomeSearch);
    const [isSearchAgain, setIsSearchAgain] = useState(false);
    // open homesearch

    useEffect(() => {
        if (searchAgain === false) {
            dispatch(setSearchPageIsSearchAgain(true));
        }

        // const date = getDateInRange(new Date(searchPage.search_date || homeSearch.departure_dateTime), selectOffsetDate);
        // // console.log('generated date: ', date);
        // setValues(date);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchAgain]);

    useEffect(() => {
        const SEARCH_URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/flight/searchflight';

        if (statusFetch === 'idle') {
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

        // if (fetchFlightStatus) {
        //     const fetchFlight = async ({ from, to, departure_date, departure_time, returnDate, flight_class }) => {
        //         try {
        //             const objectTemplate = {
        //                 from,
        //                 to,
        //                 departure_date,
        //                 departure_time,
        //                 returnDate,
        //                 flight_class,
        //             };
        //             const response = await axios.post(SEARCH_URL, objectTemplate);
        //             setFlightData(response.data.data.flight);
        //         } catch (error) {
        //             console.log('hehee', error);
        //             return error.message;
        //         }
        //     };
        //     fetchFlight({
        //         from: searchPage.from || homeSearch.from,
        //         to: searchPage.to || homeSearch.to,
        //         departure_date: convertToDate(selectDate) || convertToDate(homeSearch.departure_dateTime),
        //         departure_time: convertToTime(selectDate) || convertToTime(homeSearch.departure_dateTime),
        //         returnDate: '',
        //         flight_class: homeSearch.flight_class,
        //     });
        //     // fetchFlight({
        //     //     from: searchPage.from,
        //     //     to: searchPage.to,
        //     //     departure_date: convertToDate(selectDate),
        //     //     departure_time: convertToTime(selectDate),
        //     //     returnDate: '',
        //     //     flight_class: homeSearch.flight_class,
        //     // });
        // }
        // dispatch(setFetchFlightStatus(false));
        // setFetchDataStatus(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusFetch, dispatch]);
    // flight end

    useEffect(() => {
        if (searchAgain) {
            const date = getDateInRange(
                searchPage.search_date || homeSearch.departure_dateTime,
                searchPage.search_date_return || homeSearch.return_dateTime
            );
            setValues(date);
            setSelectDate(new Date(searchPage.search_date || homeSearch.departure_dateTime));
        }
        dispatch(setSearchPageIsSearchAgain(false));
        dispatch(setFetchTerbaru());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchAgain, dispatch, setSearchPageIsSearchAgain]);

    const chooseDate = (value) => {
        setSelectDate(value);
        dispatch(setSearchPageDate(dayjs(value).tz('Asia/Jakarta').format()));
        dispatch(setFetchTerbaru());
    };

    console.log('====================================');
    const fixedHour = (hours) => {
        let arrOfHours = hours.split(':');
        let arr = [];
        while (arr.length < 2) {
            arr.push(arrOfHours[arr.length]);
        }
        return arr.join(':');
    };

    console.log('====================================');

    const handleChoosedFlight = (data) => {
        dispatch(setChoosedFlight(data));
        // console.log('Choosed data', data);
    };

    const handleResetChooseFlight = () => {
        dispatch(setResetChoosedFlight());
    };

    return (
        <>
            <Navbar className={'hidden lg:block'} />
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
                    {values.length ? (
                        values.map((val, index) => (
                            <div key={index} className='col-span-1 cursor-pointer px-2' onClick={() => chooseDate(val.date)}>
                                <div
                                    className={`${
                                        new Date(val.date).getDate() === new Date(selectDate).getDate()
                                            ? 'bg-[#A06ECE] text-white'
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

                {/* one way start  & list flight*/}
                <div className='col-span-12  mt-[40px] grid grid-cols-12 gap-10 font-poppins'>
                    <div className='col-span-12 flex justify-end'>
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
                                                            <p>{choosedFlight1.duration}h</p>
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
                                                            <p>{choosedFlight2.duration}h</p>
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
                        <div className='rounded-rad-4 px-6 py-6 font-poppins shadow-low'>
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
                        <div className='grid grid-cols-12 gap-4'>
                            {flightData.length ? (
                                flightData.map((data, index) => (
                                    <div key={index} className='col-span-12 flex flex-col gap-2 rounded-rad-3 p-4 shadow-low'>
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
                                                    <p className='text-body-4 text-net-3'>{data.duration}h</p>
                                                    <div className='relative h-[8px] w-[233px]'>
                                                        <Image alt='' src={'./images/arrow.svg'} fill />
                                                    </div>
                                                    <p className='text-body-4 text-net-3'>Direct</p>
                                                </div>
                                                <div>
                                                    <p className='text-body-6 font-bold'>{fixedHour(data.arrival_time)}</p>
                                                    <p className='text-body-3 font-medium'>{data.airport_to_code}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-[6px] text-title-2'>
                                                <p className='font-bold text-pur-4'>IDR {formatRupiah(data.price)}</p>
                                                <Button
                                                    onClick={() => handleChoosedFlight(data)}
                                                    className='rounded-rad-3 bg-pur-4 py-1 font-medium text-white'>
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
                                                        <h2 className='text-title-2 font-bold'>{fixedHour(data.arrival_time)}</h2>
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
                                ))
                            ) : (
                                <div className='col-span-12 flex items-center justify-center gap-4 p-4'>
                                    <Image alt='' src={'/images/not_found_flight.svg'} height={210} width={210} />
                                </div>
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
                                        handleOpenHomeSearch();
                                        setIsSearchAgain(!isSearchAgain);
                                    }}
                                />
                            }
                            handleActionHomeSearch={() => {
                                dispatch(setSearchPageIsSearchAgain(true));
                                // setIsSearchAgain(true)
                                handleOpenHomeSearch(); // close modal
                                dispatch(setFetchFlightStatus(true));
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
            {/* ======= Modal and Pop  end ====== */}
        </>
    );
}

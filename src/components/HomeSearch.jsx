'use client';

//core
import { useState, useEffect } from 'react';
import Image from 'next/image';

//third parties
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
import { MdFlightTakeoff, MdDateRange, MdAirlineSeatReclineNormal } from 'react-icons/md';
import { FiX } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';

//redux
import { useDispatch, useSelector } from 'react-redux';
import {
    flightSlice,
    fetchAirport,
    getAirportFetchStatus,
    getFilteredFromAirport,
    getFilteredToAirport,
    getIsTwoWay,
    getFlightClass,
    getTotalPassenger,
    getHomeSearch,
} from '@/store/flight';

//components
import CalendarPicker from './CalendarPicker';
import CalendarRangePicker from './CalendarRangePicker';
import Label from './Label';
import Input from './Input';
import Button from './Button';
import ToggleRotate from './ToggleRotate';
import ToggleSwitch from './ToggleSwitch';
import ChoosePassengerTypeModal from './ChoosePassengerModal';
import ChooseFlightClassModal from './ChooseFlightClassModal';
import BottomNavbar from './BottomNavbar';

//utils
import { formatToLocale } from '@/utils/formatToLocale';
import { menuDataShape, destinationDataShape } from '@/utils/dummyData';

export default function HomeSearch({ className, buttonAction, handleActionHomeSearch }) {
    /*=== core ===*/
    //----

    /*=== next auth ===*/
    //----

    /*=== redux ===*/
    const dispatch = useDispatch();
    const {
        filteredFromAirport,
        filteredToAirport,
        setOneWaySwitch,
        setIsTwoWay,
        setHomePageSearchDeparture,
        setHomePageSearchReturn,
        setHomePageSearchFrom,
        setHomePageSearchTo,
    } = flightSlice.actions;

    const fromAirports = useSelector(getFilteredFromAirport); // list of filtered airport
    const toAirports = useSelector(getFilteredToAirport); // list of filtered airport
    const totalPassenger = useSelector(getTotalPassenger); // total the passenger
    const flightClass = useSelector(getFlightClass); // flight class
    const loading = useSelector(getAirportFetchStatus); //loading getc airport
    const homeSearch = useSelector(getHomeSearch); //
    const isTwoWay = useSelector(getIsTwoWay); // state two way

    /*=== state ===*/
    // MOBILE VERSION
    const [isDekstop, setIsDesktop] = useState(true);
    const [mobileFocusFromInput, setMobileFocusFromInput] = useState(false);
    const [mobileFocusToInput, setMobileFocusToInput] = useState(false);
    // MOBILE VERSION

    const [focusFromInput, setFocusFromInput] = useState(false);
    const [focusToInput, setFocusToInput] = useState(false);
    //AIRPORT
    const [chosenFromAirport, setChosenFromAirport] = useState(homeSearch.from || '');
    const [chosenToAirport, setChosenToAirport] = useState(homeSearch.to || '');
    //OPEN MODAL
    const [isToggle, setIsToggle] = useState(false);
    const [openPassengerModal, setOpenPassengerModal] = useState(false);
    const [openFlightClassModal, setOpenFlightClassModal] = useState(false);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [openCalendarRange, setOpenCalendarRange] = useState(false);
    // DATE
    const [pickedDate, setPickedDate] = useState(homeSearch.departure_dateTime && new Date(homeSearch.departure_dateTime));
    const [pickedRangeDate, setPickedRangeDate] = useState(
        (homeSearch.return_dateTime && [new Date(homeSearch.departure_dateTime), new Date(homeSearch.return_dateTime)]) ||
            new Date(homeSearch.departure_dateTime)
    );

    /*=== function ===*/
    //MODAL HANDLER
    const handleOpenPassengerModal = () => setOpenPassengerModal(!openPassengerModal);
    const handleOpenFlightClassModal = () => setOpenFlightClassModal(!openFlightClassModal);
    const handleOpenCalendar = () => setOpenCalendar(!openCalendar);
    const handleOpenCalendarRange = () => setOpenCalendarRange(!openCalendarRange);
    const handleCloseAllCalendar = () => {
        setOpenCalendar(false);
        setOpenCalendarRange(false);
    };

    //AIRPORT HANDLER
    const handleChosenFromAirport = (chosenFromAirport) => setChosenFromAirport(chosenFromAirport);
    const handleChosenToAirport = (chosenFromAirport) => setChosenToAirport(chosenFromAirport);

    //AIRPORT ON CHANGE
    const handleFromInputChange = (event) => {
        setChosenFromAirport(event.target.value);
        dispatch(filteredFromAirport(event.target.value));
    };
    const handleToInputChange = (event) => {
        setChosenToAirport(event.target.value);
        dispatch(filteredToAirport(event.target.value));
    };

    //AIRPORT ON CLICK
    const handleChooseFromAirport = (value) => {
        dispatch(setHomePageSearchFrom(value));
        setFocusFromInput(false);
        setMobileFocusFromInput(false);
    };
    const handleChooseToAirport = (value) => {
        dispatch(setHomePageSearchTo(value));
        setFocusToInput(false);
        setMobileFocusToInput(false);
    };

    //CALENDAR HANDLER
    const handlePickedDate = (date) => {
        setPickedDate(date);
        dispatch(setHomePageSearchDeparture(dayjs(date).tz('Asia/Jakarta').format()));
        setPickedRangeDate((prev) => {
            if (prev === date) {
                return [date];
            } else if (Array.isArray(pickedRangeDate)) {
                return [date, pickedRangeDate[1]];
            } else {
                return date;
            }
        });
        handleOpenCalendar();
    };

    const handlePickedRangeDate = (date) => {
        dispatch(setHomePageSearchReturn(dayjs(date).tz('Asia/Jakarta').format()));
        setPickedRangeDate((prev) => {
            if (prev[0] !== pickedDate) {
                return [pickedDate, date];
            }
            return [pickedDate, date];
        });
        handleOpenCalendarRange();
    };

    //OPEN CALENDAR RANGE
    const handleCalendarToggleAction = () => {
        dispatch(setIsTwoWay(!isTwoWay));
    };

    const handleToggleAction = () => {
        dispatch(setOneWaySwitch());
        setChosenFromAirport(homeSearch.to);
        setChosenToAirport(homeSearch.from);
        setIsToggle(!isToggle);
    };

    /*=== effects ===*/
    useEffect(() => {
        if (loading === 'idle') {
            dispatch(fetchAirport());
        }
    }, [loading, dispatch]);

    // effect for reformat from redux
    useEffect(() => {
        if (pickedDate) {
            dispatch(setHomePageSearchDeparture(dayjs(pickedDate).tz('Asia/Jakarta').format()));
        }
    }, [pickedDate, dispatch, setHomePageSearchDeparture]);

    useEffect(() => {
        if (pickedRangeDate && Array.isArray(pickedRangeDate && isTwoWay)) {
            dispatch(setHomePageSearchReturn(dayjs(pickedRangeDate[1]).tz('Asia/Jakarta').format()));
        }
    }, [pickedRangeDate, dispatch, setHomePageSearchReturn, isTwoWay]);

    return (
        <>
            {/* DEKSTOP MODE */}
            {/* {openCalendar && (
                <div
                    onClick={() => setOpenCalendar(!openCalendar)}
                    className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'></div>
            )}
            {openCalendarRange && (
                <div
                    onClick={() => setOpenCalendarRange(!openCalendarRange)}
                    className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'></div>
            )}
            {focusFromInput && (
                <div
                    onClick={() => setFocusFromInput(!focusFromInput)}
                    className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'></div>
            )} */}
            <div className='container  mx-auto mt-[-50px] hidden  h-[292px]  max-w-screen-lg lg:block'>
                <div
                    // onClick={() => handleCloseAllCalendar()}
                    className={` relative h-full w-full rounded-rad-3 bg-white shadow-high `}>
                    {buttonAction || null}
                    <div className='mx-8 my-6'>
                        {/* home search title start */}
                        <h1 className='pt-5 font-poppins text-head-1 font-bold'>
                            Pilih Jadwal Penerbangan spesial di{' '}
                            <span className='text-pur-5'>
                                FLY<span className='text-[14px]'>ID</span>!
                            </span>
                        </h1>
                        {/* home search title end */}

                        {/* home search menu start */}
                        <div className='mt-5 grid grid-cols-12'>
                            {/* menu left start */}
                            <div className='col-span-5 flex flex-col gap-7'>
                                {/* from start */}
                                <div className='relative'>
                                    <div className='flex gap-8'>
                                        <div className=' flex items-center gap-2'>
                                            <MdFlightTakeoff className='h-[24px] w-[24px] text-net-3' />
                                            <p className='font-poppins text-body-6 font-normal text-net-3'>From</p>
                                        </div>
                                        <Input
                                            className='border-[1px] border-l-0 border-r-0 border-t-0 border-b-net-2  py-3 font-poppins text-title-3 font-medium'
                                            placeholder={'Silahkan pilih lokasi...'}
                                            value={chosenFromAirport}
                                            readOnly
                                            onFocus={() => {
                                                setFocusFromInput(true);
                                                setFocusToInput(false);
                                                setOpenCalendar(false);
                                                setOpenCalendarRange(false);
                                            }}
                                        />
                                    </div>
                                    {focusFromInput && (
                                        <div className='absolute left-0 top-12 z-10 mt-3 h-[300px] w-[668px] rounded-rad-3 bg-white px-4 shadow-low'>
                                            <div className='flex items-center gap-2 pt-3'>
                                                <Input
                                                    className='w-full appearance-none  px-4 py-2 font-poppins outline-none'
                                                    onChange={handleFromInputChange}
                                                    value={chosenFromAirport}
                                                />
                                                <div>
                                                    <Button
                                                        className='bg-white'
                                                        onClick={() => setFocusFromInput(!focusFromInput)}>
                                                        <FiX className='h-[32px] w-[32px]' />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div style={{ height: 'calc(300px - 62px)' }} className='overflow-y-scroll pt-3'>
                                                {fromAirports.length ? (
                                                    fromAirports.map((data, index) => (
                                                        <div
                                                            onClick={() => {
                                                                handleChooseFromAirport(data.airport_code);
                                                                handleChosenFromAirport(
                                                                    `${data.airport_location} (${data.airport_code})`
                                                                );
                                                            }}
                                                            key={index}
                                                            className={`${
                                                                chosenFromAirport.toLowerCase() ===
                                                                `${data.airport_location} (${data.airport_code})`.toLowerCase()
                                                                    ? 'bg-pur-3 text-white'
                                                                    : ''
                                                            } cursor-pointer border-b p-3 font-poppins hover:bg-pur-3 hover:text-white`}>
                                                            {data.airport_location} ({data.airport_code})
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className='text-head-1-5 mb-2 pt-2 font-poppins font-semibold'>
                                                        <h1>Lokasi tidak Ditemukan...</h1>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* from end*/}

                                <div className='flex gap-8'>
                                    <div className='flex items-center gap-2'>
                                        <MdDateRange className='h-[24px] w-[24px] text-net-3' />
                                        <p className='font-poppins text-body-6 font-normal text-net-3'>Date</p>
                                    </div>
                                    <div className='flex gap-5'>
                                        <div className=''>
                                            <Label
                                                className='font-poppins text-title-2 font-medium text-net-3'
                                                htmlFor={'departure'}>
                                                Departure
                                            </Label>

                                            <div className='relative '>
                                                <Input
                                                    id={'departure'}
                                                    readOnly
                                                    value={formatToLocale(homeSearch.departure_dateTime)}
                                                    onClick={() => {
                                                        handleOpenCalendar();
                                                        setIsDesktop(true);
                                                        setFocusToInput(false);
                                                        setFocusFromInput(false);
                                                    }}
                                                    className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-2 font-poppins text-title-3 font-medium'
                                                />
                                                {openCalendar && (
                                                    <div
                                                        onClick={() => setOpenCalendar(!openCalendar)}
                                                        className='absolute top-0 z-10'>
                                                        <CalendarPicker
                                                            isDesktop={isDekstop}
                                                            initialDate={pickedDate}
                                                            handlePickedDate={handlePickedDate}
                                                            open={openCalendar}
                                                            handleOpen={handleOpenCalendar}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div className='relative flex items-center justify-between'>
                                                <Label
                                                    className='font-poppins text-title-2 font-medium text-net-3'
                                                    htmlFor={'return'}>
                                                    Return
                                                </Label>
                                                <ToggleSwitch
                                                    isToggle={isTwoWay}
                                                    handleToggleAction={handleCalendarToggleAction}
                                                    id={'toggle_calendar'}
                                                    className={'absolute right-[-36px]'}
                                                />
                                            </div>
                                            <div className='relative'>
                                                <Input
                                                    id={'return'}
                                                    readOnly
                                                    value={
                                                        !homeSearch.return_dateTime
                                                            ? 'Pilih Tanggal'
                                                            : formatToLocale(homeSearch.return_dateTime)
                                                    }
                                                    onClick={() => {
                                                        handleOpenCalendarRange();
                                                        setIsDesktop(true);
                                                        setFocusToInput(false);
                                                        setFocusFromInput(false);
                                                    }}
                                                    className={`${isTwoWay ? 'visible' : 'invisible'} 
                        ${
                            !homeSearch.return_dateTime
                                ? 'py-2 text-title-3 font-medium text-pur-3'
                                : 'py-2 text-title-3 font-medium text-black'
                        } cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0 border-b-net-2   font-poppins  font-medium`}
                                                    // value={'Pilih Tanggal'}
                                                />
                                                {openCalendarRange && (
                                                    <div
                                                        onClick={() => setOpenCalendarRange(!openCalendarRange)}
                                                        className='absolute top-0 z-10'>
                                                        <div className='relative '>
                                                            <CalendarRangePicker
                                                                isDesktop={isDekstop}
                                                                initialRangeDate={pickedRangeDate}
                                                                handlePickedRangeDate={handlePickedRangeDate}
                                                                open={openCalendarRange}
                                                                handleOpen={handleOpenCalendarRange}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* menu left end */}

                            {/* toggleRotate start */}
                            <div className='col-span-2 flex items-start justify-center pt-5 '>
                                <ToggleRotate isToggle={isToggle} handleToggleAction={handleToggleAction} />
                            </div>
                            {/* toggleRotate start */}

                            {/* menu right start */}
                            <div className='col-span-5 flex flex-col gap-7'>
                                <div className='relative'>
                                    <div className='flex gap-8'>
                                        <div className=' flex items-center gap-2'>
                                            <MdFlightTakeoff className='h-[24px] w-[24px] text-net-3' />
                                            <p className='font-poppins text-body-6 font-normal text-net-3'>Dari</p>
                                        </div>
                                        <Input
                                            className='border-[1px] border-l-0 border-r-0 border-t-0 border-b-net-2  py-3 font-poppins text-title-3 font-medium'
                                            placeholder={'Silahkan pilih lokasi...'}
                                            value={chosenToAirport}
                                            readOnly
                                            onFocus={() => {
                                                setFocusToInput(true);
                                                setFocusFromInput(false);
                                                setOpenCalendar(false);
                                                setOpenCalendarRange(false);
                                            }}
                                        />
                                    </div>
                                    {focusToInput && (
                                        <div className='absolute right-0 top-12 z-10 mt-3 h-[300px] w-[668px] rounded-rad-3 bg-white px-4 shadow-low'>
                                            <div className='flex items-center gap-2 pt-3'>
                                                <Input
                                                    className='w-full appearance-none  px-4 py-2 font-poppins outline-none'
                                                    onChange={handleToInputChange}
                                                    value={chosenToAirport}
                                                />
                                                <div>
                                                    <Button className='bg-white' onClick={() => setFocusToInput(!focusToInput)}>
                                                        <FiX className='h-[32px] w-[32px]' />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div style={{ height: 'calc(300px - 62px)' }} className='overflow-y-scroll pt-3'>
                                                {toAirports.length ? (
                                                    toAirports.map((data, index) => (
                                                        <div
                                                            onClick={() => {
                                                                handleChooseToAirport(data.airport_code);
                                                                handleChosenToAirport(
                                                                    `${data.airport_location} (${data.airport_code})`
                                                                );
                                                            }}
                                                            key={index}
                                                            className={`${
                                                                chosenToAirport.toLowerCase() ===
                                                                `${data.airport_location} (${data.airport_code})`.toLowerCase()
                                                                    ? 'bg-pur-3 text-white'
                                                                    : ''
                                                            } cursor-pointer border-b p-3 font-poppins hover:bg-pur-3 hover:text-white`}>
                                                            {data.airport_location} ({data.airport_code})
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className='text-head-1-5 mb-2 pt-2 font-poppins font-semibold'>
                                                        <h1>Lokasi tidak Ditemukan...</h1>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className='flex gap-8'>
                                    <div className='relative'>
                                        <div className='flex gap-10'>
                                            <div className='flex items-center gap-3'>
                                                <MdAirlineSeatReclineNormal className='h-[24px] w-[24px] text-net-3' />
                                                <p className='font-poppins text-body-6 font-normal text-net-3'>To</p>
                                            </div>

                                            <div className=''>
                                                <Label
                                                    className='font-poppins text-title-2 font-medium text-net-3'
                                                    htmlFor={'passenger'}>
                                                    Passengers
                                                </Label>
                                                <Input
                                                    id={'passenger'}
                                                    readOnly
                                                    onClick={handleOpenPassengerModal}
                                                    className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-2 font-poppins text-title-3 font-medium'
                                                    value={`${totalPassenger} penumpang`}
                                                />
                                            </div>
                                        </div>
                                        {openPassengerModal && (
                                            <div className='top-18 absolute right-0 z-10'>
                                                <ChoosePassengerTypeModal handleOpenPassengerModal={handleOpenPassengerModal} />
                                            </div>
                                        )}
                                    </div>

                                    <div className='relative'>
                                        <div>
                                            <div className=''>
                                                <Label
                                                    className='font-poppins text-title-2 font-medium text-net-3'
                                                    htmlFor={'seat'}>
                                                    Seat Class
                                                </Label>
                                                <Input
                                                    id={'seat'}
                                                    readOnly
                                                    onClick={handleOpenFlightClassModal}
                                                    className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-2 font-poppins text-title-3 font-medium'
                                                    value={flightClass}
                                                    placeholder={'Pilih kelas pesawat'}
                                                />
                                            </div>
                                        </div>
                                        {openFlightClassModal && (
                                            <div className='top-18 absolute right-0 z-10'>
                                                <ChooseFlightClassModal handleOpenFlightClassModal={handleOpenFlightClassModal} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* menu right end */}
                        </div>
                        {/* home search menu end */}
                    </div>
                    <Button
                        className='absolute bottom-0 w-full rounded-b-rad-3 bg-pur-4 py-3 text-title-2 font-bold text-white hover:bg-pur-3'
                        onClick={handleActionHomeSearch}>
                        Cari Penerbangan
                    </Button>
                </div>
            </div>

            {/* RESPONSIVE MODE */}
            <div className=' font-poppins lg:hidden '>
                <div style={{ height: 'calc(100vh - 40vh)' }} className='bg-pur-3 px-4 '>
                    <h1 className='pt-[32px] text-head-2 font-bold text-white'>Hei, Mau Kemana</h1>
                    <div className='mt-2 grid grid-cols-12 rounded-rad-2 bg-white shadow-low'>
                        <div className='col-span-12 m-5 border px-1'>
                            <div>
                                {/* Choose Airport From */}
                                <div className='grid grid-cols-12'>
                                    <div className='col-span-3 flex items-center gap-2 text-net-3'>
                                        <MdFlightTakeoff />
                                        <p className='text-body-4'>From</p>
                                    </div>
                                    <div className='relative col-span-9'>
                                        <Input
                                            className=' border-b-0 border-l-0 border-r-0 border-t-0 py-3 font-poppins text-title-1 font-medium'
                                            placeholder={'Silahkan pilih lokasi...'}
                                            value={chosenFromAirport}
                                            onFocus={() => setMobileFocusFromInput(true)}
                                            onChange={handleFromInputChange}
                                        />
                                        {mobileFocusFromInput && (
                                            <div className='absolute z-10 flex h-[100px] w-full flex-col  gap-2 overflow-y-scroll bg-white'>
                                                {fromAirports.length ? (
                                                    fromAirports.map((data, index) => (
                                                        <div
                                                            onClick={() => {
                                                                handleChooseFromAirport(data.airport_code);
                                                                handleChosenFromAirport(
                                                                    `${data.airport_location} (${data.airport_code})`
                                                                );
                                                            }}
                                                            key={index}
                                                            className=' cursor-pointer bg-pur-3 p-3 font-poppins text-white'>
                                                            {data.airport_location} ({data.airport_code})
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className='text-head-1-5 pt-2 font-poppins font-semibold'>
                                                        <h1>Inputkan Lokasi...</h1>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* Choose Airport From */}

                                {/* Toggle Rotate */}
                                <div className='flex items-center gap-2'>
                                    <div className='w-full border'></div>
                                    <ToggleRotate isToggle={isToggle} handleToggleAction={handleToggleAction} />
                                </div>
                                {/* Toggle Rotate */}

                                {/* Choose Airport To*/}
                                <div className='grid grid-cols-12'>
                                    <div className='col-span-3 flex items-center gap-2 text-net-3'>
                                        <MdFlightTakeoff />
                                        <p className='text-body-4'>to</p>
                                    </div>
                                    <div className='relative col-span-9'>
                                        <Input
                                            className=' border-b-0 border-l-0 border-r-0 border-t-0 py-3 font-poppins text-title-1 font-medium'
                                            placeholder={'Silahkan pilih lokasi...'}
                                            onFocus={() => setMobileFocusToInput(true)}
                                            value={chosenToAirport}
                                            onChange={handleToInputChange}
                                        />
                                        {mobileFocusToInput && (
                                            <div className='absolute z-10 flex h-[100px] w-full flex-col  gap-2 overflow-y-scroll bg-white'>
                                                {toAirports.length ? (
                                                    toAirports.map((data, index) => (
                                                        <div
                                                            onClick={() => {
                                                                handleChooseToAirport(data.airport_code);
                                                                handleChosenToAirport(
                                                                    `${data.airport_location} (${data.airport_code})`
                                                                );
                                                            }}
                                                            key={index}
                                                            className='cursor-pointer bg-pur-3 p-3 font-poppins text-white'>
                                                            {data.airport_location} ({data.airport_code})
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className='text-head-1-5 pt-2 font-poppins font-semibold'>
                                                        <h1>Inputkan Lokasi...</h1>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* Choose Airport */}
                            </div>
                        </div>

                        {/* Toggle Switch */}
                        <div className='col-span-12 flex items-center justify-between px-4'>
                            <h1 className='text-body-6 font-medium'>Pulang Pergi</h1>
                            <ToggleSwitch
                                id={'toggle_calendar'}
                                isToggle={isTwoWay}
                                handleToggleAction={handleCalendarToggleAction}
                            />
                        </div>
                        {/* Toggle Switch */}

                        <div className='col-span-12 my-4 grid grid-cols-12 gap-2 px-4'>
                            {/* Choose Departure */}
                            <div className='col-span-6 flex items-center gap-3'>
                                <MdDateRange className='h-[40px] w-[40px] text-net-4' />
                                <div>
                                    <Label className='font-poppins text-body-6 font-medium text-net-3' htmlFor={'departure2'}>
                                        Departure
                                    </Label>

                                    <Input
                                        id={'departure2'}
                                        readOnly
                                        value={formatToLocale(homeSearch.departure_dateTime)}
                                        onClick={() => {
                                            handleOpenCalendar();
                                            setIsDesktop(false);
                                        }}
                                        className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                                    />
                                </div>
                            </div>
                            {/* Choose Departure */}

                            {/* Choose Return */}
                            <div className='col-span-6 flex items-center gap-3'>
                                <MdDateRange className='h-[40px] w-[40px] text-net-4' />
                                <div>
                                    <Label className='font-poppins text-body-6 font-medium text-net-3' htmlFor={'return2'}>
                                        Return
                                    </Label>

                                    <Input
                                        // id={'return'}
                                        // readOnly
                                        // className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                                        id={'return2'}
                                        readOnly
                                        value={
                                            !homeSearch.return_dateTime
                                                ? 'Pilih Tanggal'
                                                : formatToLocale(homeSearch.return_dateTime)
                                        }
                                        onClick={() => {
                                            handleOpenCalendarRange();
                                            setIsDesktop(false);
                                        }}
                                        className={`${isTwoWay ? 'visible' : 'invisible'} 
                        ${
                            !homeSearch.return_dateTime
                                ? 'text-[14px] font-normal text-pur-3'
                                : 'text-body-6 font-medium text-black'
                        } cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium`}
                                    />
                                </div>
                            </div>
                            {/* Choose Return */}

                            {/* Choose Passenger */}
                            <div className='col-span-6 flex items-center gap-3'>
                                <FaUser className='h-[36px] w-[36px] text-net-4' />
                                <div>
                                    <Label className='font-poppins text-body-6 font-medium text-net-3' htmlFor={'passenger2'}>
                                        Passengers
                                    </Label>
                                    <Input
                                        id={'passenger2'}
                                        readOnly
                                        onClick={handleOpenPassengerModal}
                                        className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                                        value={`${totalPassenger} penumpang`}
                                    />
                                </div>
                            </div>
                            {/* Choose Passenger */}

                            {/* Choose Seat */}
                            <div className='col-span-6 flex items-center gap-3'>
                                <MdAirlineSeatReclineNormal className='h-[44px] w-[44px] text-net-4' />
                                <div>
                                    <Label className='font-poppins text-body-6 font-medium text-net-3' htmlFor={'seat2'}>
                                        Seat Class
                                    </Label>
                                    <Input
                                        // id={'seat2'}
                                        // readOnly
                                        // className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                                        // placeholder={'Pilih kelas pesawat'}

                                        id={'seat2'}
                                        readOnly
                                        onClick={handleOpenFlightClassModal}
                                        className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-1 font-poppins text-body-6 font-medium'
                                        value={flightClass}
                                        placeholder={'Pilih kelas pesawat'}
                                    />
                                </div>
                            </div>
                            {/* Choose Seat */}

                            {/* Button */}
                            <div className='col-span-12 mt-6'>
                                <Button
                                    onClick={handleActionHomeSearch}
                                    className='font-body-6 w-full rounded-rad-2 bg-pur-3 py-3 text-white'>
                                    Cari Penerbangan
                                </Button>
                            </div>
                            {/* Button */}
                        </div>
                    </div>
                </div>
            </div>
            {/* RESPONSIVE MODE*/}

            {/* ======= Modal and Pop Up DEKSTOP start ====== */}
            {/* handling open passenger modal start */}
            {/* <div>
                {openPassengerModal && (
                    <div className='fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-60'>
                        <ChoosePassengerTypeModal handleOpenPassengerModal={handleOpenPassengerModal} />
                    </div>
                )}
            </div> */}
            {/* handling open passenger modal end */}

            {/* handling open flight class modal start */}
            {/* <div>
                {openFlightClassModal && (
                    <div className='fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-60'>
                        <ChooseFlightClassModal handleOpenFlightClassModal={handleOpenFlightClassModal} />
                    </div>
                )}
            </div> */}

            {/* handling open flight class modal end */}

            {/* ======= Modal and Pop Up DEKSTOP end ====== */}
        </>
    );
}

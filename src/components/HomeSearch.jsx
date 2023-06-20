'use client';

import { useState, useEffect } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
    flightSlice,
    fetchAirport,
    getAirportFetchStatus,
    // getDisplayFromAirport,
    // getDisplayToAirport,
    getFilteredFromAirport,
    getFilteredToAirport,
    getIsTwoWay,
    // getArrivalDateTime,
    // getDerpatureDateTime,
    getFlightClass,
    getTotalPassenger,
    // getFirstSearch,
    // getSecondSearch,
    getHomeSearch,
} from '@/store/flight';

// redux

// dayjs
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
// dayjs

// custom func
import { formatToLocale } from '@/utils/formatToLocale';
// custom func

// custom comp
import CalendarPicker from './CalendarPicker';
import CalendarRangePicker from './CalendarRangePicker';
import Label from './Label';
import Input from './Input';
import Button from './Button';
import ToggleRotate from './ToggleRotate';
import ToggleSwitch from './ToggleSwitch';
import { MdFlightTakeoff, MdDateRange, MdAirlineSeatReclineNormal } from 'react-icons/md';
import ChoosePassengerTypeModal from './ChoosePassengerModal';
import ChooseFlightClassModal from './ChooseFlightClassModal';
import { FiX } from 'react-icons/fi';
// custom comp

export default function HomeSearch({ className, buttonAction, handleActionHomeSearch }) {
    // redux setup
    const dispatch = useDispatch();

    const homeSearch = useSelector(getHomeSearch);
    // about search
    // const firstSearch = useSelector(getFirstSearch);
    // const secondSearch = useSelector(getSecondSearch);

    // console.log('HomeSearch', homeSearch);

    // console.log('Data first search home:', firstSearch);
    // console.log('Data second search home:', secondSearch);
    // about search

    // airport actions
    const fromAirports = useSelector(getFilteredFromAirport); // list of filtered airport
    const toAirports = useSelector(getFilteredToAirport); // list of filtered airport
    // const fromAirportDisplay = useSelector(getDisplayFromAirport); // selected airport
    // const toAirportDisplay = useSelector(getDisplayToAirport); // selected airport
    // airport actions

    // for total passenger actions
    const totalPassenger = useSelector(getTotalPassenger);
    // for total  passenger actions

    // for flight class action
    const flightClass = useSelector(getFlightClass);
    // for flight class action

    // for derpature & arrival date
    // const derpatureDateTime = useSelector(getDerpatureDateTime);
    // const arrivalDateTime = useSelector(getArrivalDateTime);
    // for derpature & arrival date

    // for loading status fetch flight
    const loading = useSelector(getAirportFetchStatus);
    // for loading status fetch flight

    const {
        filteredFromAirport,
        filteredToAirport,
        // setOneWayFrom,
        // setOneWayTo,
        setOneWaySwitch,
        setIsTwoWay,
        // setArrivalDateTime,
        // setDerpatureDateTime,
        setHomePageSearchDeparture,
        setHomePageSearchReturn,
        setHomePageSearchFrom,
        setHomePageSearchTo,
    } = flightSlice.actions;
    const isTwoWay = useSelector(getIsTwoWay);
    // redux flight setup

    // dispatch for getting airport start
    useEffect(() => {
        if (loading === 'idle') {
            dispatch(fetchAirport());
        }
    }, [loading, dispatch]);
    // dispatch for getting airport end

    // passenger modal start
    const [openPassengerModal, setOpenPassengerModal] = useState(false);
    const handleOpenPassengerModal = () => setOpenPassengerModal(!openPassengerModal);
    // passenger modal end

    // flight class start
    const [openFlightClassModal, setOpenFlightClassModal] = useState(false);
    const handleOpenFlightClassModal = () => setOpenFlightClassModal(!openFlightClassModal);
    // flight class end

    // calendar modal show up start
    const [openCalendar, setOpenCalendar] = useState(false);
    const [openCalendarRange, setOpenCalendarRange] = useState(false);
    const handleOpenCalendar = () => setOpenCalendar(!openCalendar);
    const handleOpenCalendarRange = () => setOpenCalendarRange(!openCalendarRange);
    // calendar modal show up end

    // console.log({
    //     TEST_derpa: derpatureDateTime,
    //     TEST_return: arrivalDateTime,
    // });
    //calendar local state start
    const [pickedDate, setPickedDate] = useState(homeSearch.departure_dateTime && new Date(homeSearch.departure_dateTime));
    const [pickedRangeDate, setPickedRangeDate] = useState(
        (homeSearch.return_dateTime && [new Date(homeSearch.departure_dateTime), new Date(homeSearch.return_dateTime)]) ||
            new Date(homeSearch.departure_dateTime)
    );
    //calendar local state end
    // useEffect(() => {
    //     if (!homeSearch.return_dateTime) {
    //         setPickedRangeDate([new Date(homeSearch.derpature_dateTime)]);
    //     }
    // }, [homeSearch.return_dateTime, homeSearch.derpature_dateTime]);

    // effect for reformat from redux
    useEffect(() => {
        // if (pickedDate) {
        //     dispatch(setDerpatureDateTime(dayjs(pickedDate).tz('Asia/Jakarta').format()));
        // }
        if (pickedDate) {
            dispatch(setHomePageSearchDeparture(dayjs(pickedDate).tz('Asia/Jakarta').format()));
        }
    }, [pickedDate, dispatch, setHomePageSearchDeparture]);

    useEffect(() => {
        if (pickedRangeDate && Array.isArray(pickedRangeDate)) {
            dispatch(setHomePageSearchReturn(dayjs(pickedRangeDate[1]).tz('Asia/Jakarta').format()));
        }
    }, [pickedRangeDate, dispatch, setHomePageSearchReturn]);
    // effect for reformat from redux

    // handle picked data from calendar modal start
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
        setPickedRangeDate((prev) => {
            dispatch(setHomePageSearchReturn(dayjs(date).tz('Asia/Jakarta').format()));
            if (prev[0] !== pickedDate) {
                return [pickedDate, date];
            }
            // return [pickedRangeDate[0], date];
            return [pickedDate, date];
        });
        handleOpenCalendarRange();
    };
    const handleCalendarToggleAction = () => {
        dispatch(setIsTwoWay(!isTwoWay));
    };
    // handle picked data from calendar modal end

    // handling focusing airport input start
    const [focusFromInput, setFocusFromInput] = useState(false);
    const [focusToInput, setFocusToInput] = useState(false);
    const [chosenFromAirport, setChosenFromAirport] = useState(homeSearch.from || '');
    const handleChosenFromAirport = (chosenFromAirport) => setChosenFromAirport(chosenFromAirport);
    const [chosenToAirport, setChosenToAirport] = useState(homeSearch.to || '');
    const handleChosenToAirport = (chosenFromAirport) => setChosenToAirport(chosenFromAirport);
    // handling focusing airport input end

    // toggle rotate for switching airport start
    const [isToggle, setIsToggle] = useState(false);
    const handleToggleAction = () => {
        dispatch(setOneWaySwitch());
        // setChosenFromAirport(toAirportDisplay);
        // setChosenToAirport(fromAirportDisplay);
        setChosenFromAirport(homeSearch.to);
        setChosenToAirport(homeSearch.from);
        setIsToggle(!isToggle);
    };
    // toggle rotate for switching airport end

    // handling flitering airport input start
    const handleFromInputChange = (event) => {
        setChosenFromAirport(event.target.value);
        dispatch(filteredFromAirport(event.target.value));
    };
    const handleToInputChange = (event) => {
        setChosenToAirport(event.target.value);
        dispatch(filteredToAirport(event.target.value));
    };
    // handling flitering airport input end

    // handling choosing one of from/to airport start
    const handleChooseFromAirport = (value) => {
        // dispatch(setOneWayFrom(value));
        dispatch(setHomePageSearchFrom(value));
        setFocusFromInput(false);
    };
    const handleChooseToAirport = (value) => {
        // dispatch(setOneWayTo(value));
        dispatch(setHomePageSearchTo(value));
        setFocusToInput(false);
    };
    // handling choosing one of from/to airport end

    return (
        <>
            {/* home search desktop start */}
            <div className='container  mx-auto mt-[-50px] hidden  h-[292px]  max-w-screen-lg lg:block'>
                <div className={` relative h-full w-full overflow-hidden rounded-rad-3 bg-white shadow-high`}>
                    {buttonAction || null}
                    <div className='mx-8 my-6'>
                        {/* home search title start */}
                        <h1 className='font-poppins text-head-1 font-bold'>
                            Pilih Jadwal Penerbangan spesial di <span className='text-pur-5'>Tiketku!</span>
                        </h1>
                        {/* home search title end */}

                        {/* home search menu start */}
                        <div className='mt-5 grid grid-cols-12'>
                            {/* menu left start */}
                            <div className='col-span-5 flex flex-col gap-7'>
                                <div className='flex gap-8'>
                                    {/* from start */}
                                    <div className='flex items-center gap-2'>
                                        <MdFlightTakeoff className='h-[24px] w-[24px] text-net-3' />
                                        <p className='font-poppins text-body-6 font-normal text-net-3'>From</p>
                                    </div>
                                    <div className='relative'>
                                        <Input
                                            className='border-[1px] border-l-0 border-r-0 border-t-0 border-b-net-2  py-3 font-poppins text-title-3 font-medium'
                                            placeholder={'Silahkan pilih lokasi...'}
                                            value={chosenFromAirport}
                                            onFocus={() => setFocusFromInput(true)}
                                            onChange={handleFromInputChange}
                                        />
                                        {focusFromInput && (
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

                                    {/* from end*/}
                                </div>
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

                                            <Input
                                                id={'departure'}
                                                readOnly
                                                value={formatToLocale(homeSearch.departure_dateTime)}
                                                onClick={handleOpenCalendar}
                                                className='cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0  border-b-net-2 py-2 font-poppins text-title-3 font-medium'
                                            />
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
                                            <Input
                                                id={'return'}
                                                readOnly
                                                value={
                                                    !homeSearch.return_dateTime
                                                        ? 'Pilih Tanggal'
                                                        : formatToLocale(homeSearch.return_dateTime)
                                                }
                                                onClick={handleOpenCalendarRange}
                                                className={`${!isTwoWay ? 'invisible' : 'visible'} 
                        ${
                            !homeSearch.return_dateTime
                                ? 'text-[14px] font-normal text-pur-5'
                                : 'text-body-6 font-medium text-black'
                        } cursor-pointer border-[1px] border-l-0 border-r-0 border-t-0 border-b-net-2  py-3 font-poppins  font-medium`}
                                                // value={'Pilih Tanggal'}
                                            />
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
                                <div className='flex gap-8'>
                                    {/* to start */}
                                    <div className='flex items-center gap-3'>
                                        <MdFlightTakeoff className='h-[24px] w-[24px] text-net-3' />
                                        <p className='font-poppins text-body-6 font-normal text-net-3'>To</p>
                                    </div>

                                    <div className='relative'>
                                        <Input
                                            className='border-[1px] border-l-0 border-r-0 border-t-0 border-b-net-2 px-2 py-3 font-poppins text-title-3 font-medium text-black'
                                            // value={'Melbourne (MLB)'}
                                            placeholder={'Silahkan pilih lokasi...'}
                                            onFocus={() => setFocusToInput(true)}
                                            value={chosenToAirport}
                                            onChange={handleToInputChange}
                                        />
                                        {focusToInput && (
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

                                    {/* to end */}
                                </div>
                                <div className='flex gap-8'>
                                    <div className='flex items-center gap-3'>
                                        <MdAirlineSeatReclineNormal className='h-[24px] w-[24px] text-net-3' />
                                        <p className='font-poppins text-body-6 font-normal text-net-3'>To</p>
                                    </div>

                                    <div className=''>
                                        <Label className='font-poppins text-title-2 font-medium text-net-3' htmlFor={'passenger'}>
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
                                    <div className=''>
                                        <Label className='font-poppins text-title-2 font-medium text-net-3' htmlFor={'seat'}>
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
                            </div>
                            {/* menu right end */}
                        </div>
                        {/* home search menu end */}
                    </div>
                    <Button
                        className='absolute bottom-0 w-full bg-pur-4 py-3 text-title-2 font-bold text-white hover:bg-pur-3'
                        onClick={handleActionHomeSearch}>
                        Cari Penerbangan
                    </Button>
                </div>
            </div>

            {/* ======= Modal and Pop Up Calendar start ====== */}
            {/* handling open passenger modal start */}
            <div>
                {openPassengerModal && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
                        <ChoosePassengerTypeModal handleOpenPassengerModal={handleOpenPassengerModal} />
                    </div>
                )}
            </div>
            {/* handling open passenger modal end */}

            {/* handling open flight class modal start */}
            <div>
                {openFlightClassModal && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
                        <ChooseFlightClassModal handleOpenFlightClassModal={handleOpenFlightClassModal} />
                    </div>
                )}
            </div>

            {/* handling open flight class modal end */}

            {/* handling open calendar start */}
            <div>
                {openCalendar && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
                        <CalendarPicker
                            initialDate={pickedDate}
                            handlePickedDate={handlePickedDate}
                            open={openCalendar}
                            handleOpen={handleOpenCalendar}
                        />
                    </div>
                )}
            </div>

            <div>
                {openCalendarRange && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
                        <div className='relative h-screen w-screen'>
                            <CalendarRangePicker
                                initialRangeDate={pickedRangeDate}
                                handlePickedRangeDate={handlePickedRangeDate}
                                open={openCalendarRange}
                                handleOpen={handleOpenCalendarRange}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* ======= Modal and Pop Up Calendar end ====== */}
        </>
    );
}

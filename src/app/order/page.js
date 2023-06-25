'use client';

// Core
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

// Third Parties
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import axios from 'axios';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    getPassengerTypeTotal,
    fetchDetailFlight,
    getFlightDetailId,
    getFlightDetailData,
    getFlightDetailDataStatus,
    getChoosedFlight1,
    getChoosedFlight2,
    getPassengerForm,
    flightSlice,
} from '@/store/flight';

// Component
import AlertBottom from '@/components/AlertBottom';
import Navbar from '@/components/Navbar';
import Label from '@/components/Label';
import Input from '@/components/Input';
import Button from '@/components/Button';
import CalendarPicker from '@/components/CalendarPicker';
import ToggleSwitch from '@/components/ToggleSwitch';
import styles from '../../style/SeatSelect.module.css';

//Utils
import { formatToLocale } from '@/utils/formatToLocale';
import { convertToDate } from '@/utils/converDateTime';
import { formatRupiah } from '@/utils/formatRupiah';
import { flightSeat } from '@/utils/flightSeat';
import { fixedHour } from '@/utils/fixedHour';
import { extractWord } from '@/utils/extractWord';
import { reformatDate } from '@/store/reformatDate';

export default function Order() {
    //router
    const router = useRouter();

    //next auth
    const { data: session, status } = useSession();
    const token = session?.user?.token;

    //redux
    const dispatch = useDispatch();
    const { setFetchDetailFlight, setPassengerForm } = flightSlice.actions;
    const statusDetaiFlight = useSelector(getFlightDetailDataStatus); // Status for fething detail
    const detailFlight = useSelector(getFlightDetailData); // detail flight data
    const choosedFlight1 = useSelector(getChoosedFlight1);
    const choosedFlight2 = useSelector(getChoosedFlight2);
    const flightIDs = useSelector(getFlightDetailId); // Get Flight IDs
    const passengerType = useSelector(getPassengerTypeTotal); // Get passenger type total
    const passengerForm = useSelector(getPassengerForm); // generated form based passenger type total

    //state
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [alertType, setAlertType] = useState('');
    const [toggleUser, setToggleUser] = useState(false);
    const [elements, setElements] = useState([]);
    const [flights, setFlights] = useState([]);
    const [dateId, setDateId] = useState({
        field_id: '',
        form_id: '',
    });
    const [openCalendar, setOpenCalendar] = useState(false);
    const [pickedDate, setPickedDate] = useState(new Date());
    const [seat, setSeat] = useState([]);
    const [fetchDataUser, setFetchDataUser] = useState(true);
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        email: '',
    });

    /*=== function === */
    const handleVisibleAlert = (text, alertType) => {
        setAlertText(text);
        setAlertType(alertType);
        setVisibleAlert(!visibleAlert);
    };

    const handleToggleUser = () => setToggleUser(!toggleUser);

    const handleSeat = (value) => {
        if (seat.length === elements.length) {
            setSeat([]);
            return;
        }

        const newArr = seat.filter((data) => data !== value);
        setSeat((prev) => (prev.find((data) => data === value) ? [...newArr] : [...seat, value]));
    };

    const handleOpenCalendar = (field_id = null, form_id = null) => {
        setDateId({
            field_id,
            form_id,
        });
        setOpenCalendar(!openCalendar);
    };

    const handlePickedDate = (date) => {
        setPickedDate(date);

        let newForm = [...elements];
        newForm?.forEach((subForm, index) => {
            if (subForm?.form_id === dateId.form_id) {
                subForm?.fields?.forEach((formField) => {
                    if (formField?.field_id === dateId.field_id) {
                        formField['field_value'] = date;
                    }
                });
            }
        });

        setElements(newForm);
        setOpenCalendar(!openCalendar);
    };

    const handleChange = (field_id, event, form_id) => {
        let newForm = [...elements];
        newForm?.forEach((subForm, index) => {
            if (subForm?.form_id === form_id) {
                subForm?.fields?.forEach((formField) => {
                    if (formField?.field_id === field_id) {
                        formField['field_value'] = event.target.value;
                    }
                });
            }
        });
        setElements(newForm);
    };

    const handleSubmit = async () => {
        try {
            const finalBlow = elements.map((element, indexForm) => {
                let elementType = element.type;
                let idx = indexForm;

                return {
                    type: elementType,
                    title: element.fields.find((test) => test.field_category === `title`).field_value,
                    name: element.fields.find((test) => test.field_category === `name`).field_value,
                    family_name: element.fields.find((test) => test.field_category === `family_name`).field_value,
                    birthday: convertToDate(
                        new Date(element.fields.find((test) => test.field_category === `birthday`).field_value)
                    ),
                    nationality: element.fields.find((test) => test.field_category === `kewarganegaraan`).field_value,
                    nik: element.fields.find((test) => test.field_category === `ktp_paspor`).field_value,
                    issued_country: element.fields.find((test) => test.field_category === `negara_penerbit`).field_value,
                    expired: convertToDate(
                        new Date(element.fields.find((test) => test.field_category === `expired`).field_value)
                    ),
                    seat: seat[idx].code,
                };
            });
            const URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/transaction';
            if (finalBlow) {
                const res = await axios.post(
                    URL,
                    {
                        flights,
                        amount: detailFlight.totalPrice,
                        passenger: finalBlow,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (res.status === 201 || res.data.status === 'Ok') {
                    router.push(`/order/payment/${res?.data?.data?.transaction?.id}`);
                }
            }
        } catch (error) {
            // return error.message.data;
            console.log('ERROR', error.message);
        }
    };

    /*Effect */
    useEffect(() => {
        if (token) {
            if (fetchDataUser) {
                async function fetchUserData() {
                    try {
                        const URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/user/getProfile';
                        const res = await axios.get(URL, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });

                        setUserData({
                            name: res.data.data.nama,
                            email: res.data.data.email,
                            phone: res.data.data.phone,
                        });

                        console.log('CURRENT USER:', res.data);
                    } catch (error) {
                        handleVisibleAlert('Sesi Anda telah Berakhir!', 'failed');
                        setTimeout(() => {
                            signOut();
                        }, 2500);
                    }
                }
                fetchUserData();
            }
            setFetchDataUser(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchDataUser, session, token]);

    useEffect(() => {
        if (choosedFlight1?.flight_id) {
            setFlights([
                {
                    flight_id: choosedFlight1.flight_id,
                    flight_type: 'Departure',
                },
            ]);
        }
        if (choosedFlight2?.flight_id) {
            setFlights([
                ...flights,
                {
                    flight_id: choosedFlight2.flight_id,
                    flight_type: 'Arrival',
                },
            ]);
        }

        /* eslint-disable react-hooks/exhaustive-deps */
    }, []);

    useEffect(() => {
        if (statusDetaiFlight === 'idle') {
            const detailFligt = {
                flight_id: flightIDs,
                dewasa: passengerType.dewasa,
                anak: passengerType.anak,
                bayi: passengerType.bayi,
            };

            dispatch(
                fetchDetailFlight({
                    flight_id: detailFligt.flight_id,
                    dewasa: detailFligt.dewasa,
                    anak: detailFligt.anak,
                    bayi: detailFligt.bayi,
                })
            );
        }

        /* eslint-disable react-hooks/exhaustive-deps */
    }, [statusDetaiFlight, dispatch, fetchDetailFlight]);

    useEffect(() => {
        //extract generated form from redux to locale state
        setElements(JSON.parse(JSON.stringify(passengerForm)));

        /* eslint-disable react-hooks/exhaustive-deps */
    }, []);

    return (
        <>
            <Navbar className={'hidden lg:block'} />

            {/* DEKSTOP MODE */}
            <div className='mx-auto mt-[47px] hidden max-w-screen-lg grid-cols-12  font-poppins lg:grid'>
                {/* header order */}
                <div className='col-span-12 flex gap-3 text-head-1 font-bold'>
                    <h1 className='cursor-pointer text-black'>Isi Data Diri</h1>
                    <p>{'>'}</p>
                    <h1 className='text-net-3'>Bayar</h1>
                    <p>{'>'}</p>
                    <h1 className='text-net-3'>Selesai</h1>
                </div>
                {/* header order */}
                <div className='col-span-12 mt-[100px] grid grid-cols-12 gap-14 font-poppins'>
                    <div className='col-span-7 flex flex-col gap-6'>
                        {/* INPUT USER */}
                        <div className='flex flex-col gap-4 rounded-rad-2 px-[16px] py-[24px] shadow-low'>
                            <h1 className='text-head-1 font-bold'>Data Diri Pemesan</h1>
                            <div className='rounded-t-rad-2 bg-net-4 px-4 py-2 text-white'>
                                <h2 className='text-title-2'>Data Diri Pemesan</h2>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <Label className='text-body-6 font-bold text-pur-5'>Nama Lengkap</Label>
                                <Input
                                    readOnly
                                    disabled
                                    value={userData.name}
                                    className='w-full appearance-none border px-4 py-2 font-poppins outline-none'
                                />
                            </div>

                            <div className='flex items-center justify-between'>
                                <p>Punya Nama Keluarga?</p>
                                <ToggleSwitch isToggle={toggleUser} handleToggleAction={handleToggleUser} />
                            </div>
                            <div className={`${toggleUser ? 'visible' : 'hidden'} flex flex-col gap-1 `}>
                                <Label className='text-body-6 font-bold text-pur-5'>Nama Keluarga</Label>
                                <Input className={` w-full appearance-none border px-4 py-2 font-poppins outline-none`} />
                            </div>
                            <div>
                                <Label className='text-body-6 font-bold text-pur-5'>Nomor Telepon</Label>
                                <Input
                                    disabled
                                    readOnly
                                    value={userData.phone}
                                    className='w-full appearance-none border px-4 py-2 font-poppins outline-none'
                                />
                            </div>
                            <div>
                                <Label className='text-body-6 font-bold text-pur-5'>Email</Label>
                                <Input
                                    disabled
                                    readOnly
                                    value={userData.email}
                                    className='w-full appearance-none border px-4 py-2 font-poppins outline-none'
                                />
                            </div>
                        </div>
                        {/* INPUT USER */}

                        {/* FORM  */}
                        <div className='rounded-rad-2 px-[16px] py-[24px] shadow-low'>
                            {elements &&
                                elements.map((form, index) => {
                                    // let formId = form.id;
                                    // console.log('Isi Form ', form);
                                    return (
                                        <div key={index}>
                                            <div className='rounded-t-rad-2 bg-net-4 px-4 py-2 text-white'>
                                                <h2 className='text-title-2'>
                                                    Data Diri Penumpang {index + 1} {' - '}
                                                    {form.type}
                                                </h2>
                                            </div>
                                            {form &&
                                                form.fields.map((formElement, index) => {
                                                    // console.log('Form Element', formElement);
                                                    return (
                                                        <div key={index} className='mt-4'>
                                                            {formElement.field_type === 'text' && (
                                                                <div className='flex flex-col gap-1'>
                                                                    <Label
                                                                        className='text-body-6 font-bold text-pur-5'
                                                                        htmlFor={formElement.field_id}>
                                                                        {formElement.field_label}
                                                                    </Label>
                                                                    <Input
                                                                        className='w-full appearance-none border px-4 py-2 font-poppins outline-none'
                                                                        id={formElement.field_id}
                                                                        onChange={(event) =>
                                                                            handleChange(
                                                                                formElement.field_id,
                                                                                event,
                                                                                form.form_id
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                            {formElement.field_type === 'date' && (
                                                                <div className='flex flex-col gap-1'>
                                                                    <Label
                                                                        className='text-body-6 font-bold text-pur-5'
                                                                        htmlFor={formElement.field_id}>
                                                                        {formElement.field_label}
                                                                    </Label>
                                                                    <Input
                                                                        className='w-full appearance-none border px-4 py-2 font-poppins outline-none'
                                                                        readOnly
                                                                        id={formElement.field_id}
                                                                        value={
                                                                            formElement.field_value &&
                                                                            formatToLocale(formElement.field_value)
                                                                        }
                                                                        // placeholder={formElement.placeholder}
                                                                        onClick={() =>
                                                                            handleOpenCalendar(formElement.field_id, form.form_id)
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                            {formElement.field_type === 'select' && (
                                                                <div className='flex flex-col gap-1 '>
                                                                    <Label className='text-body-6 font-bold text-pur-5'>
                                                                        {formElement.field_label}
                                                                    </Label>
                                                                    <select
                                                                        onChange={(event) =>
                                                                            handleChange(
                                                                                formElement.field_id,
                                                                                event,
                                                                                form.form_id
                                                                            )
                                                                        }
                                                                        className='w-full cursor-pointer appearance-none border px-4 py-2 font-poppins outline-none'
                                                                        aria-label='Default select example'>
                                                                        {formElement.field_options.length > 0 &&
                                                                            formElement.field_options.map((option, i) => (
                                                                                <option value={option.option_label} key={i}>
                                                                                    {option.option_label}
                                                                                </option>
                                                                            ))}
                                                                    </select>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    );
                                })}
                        </div>
                        {/* FORM */}

                        {/* SEAT */}
                        <div>
                            <div className={styles.container}>
                                <div className={styles.header}>
                                    <div className={styles.choose__seat__title}>
                                        <h1>Pilih Kursi</h1>
                                    </div>
                                    <div className={styles.choose__seat__header}>
                                        <h1>Economy - 64 Seats Available</h1>
                                    </div>
                                </div>
                                <div className={styles.choose__seat__body}>
                                    <div className={styles.choose__seat__body__header}>
                                        {/* Grouping for A  B  C */}
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            {/* A */}
                                            <div>
                                                <h1 className={styles.choose__seat__title__code}>A</h1>
                                                {flightSeat &&
                                                    flightSeat.map((seats, index) => (
                                                        <div key={index} className={styles.choose__seat__btn__box}>
                                                            {seats.type === 'A' &&
                                                                seats.seat.map((data, index) => (
                                                                    <div key={index}>
                                                                        <button
                                                                            disabled={!data.available}
                                                                            onClick={() => handleSeat(data)}
                                                                            style={{
                                                                                background: !data.available
                                                                                    ? '#73CA5C'
                                                                                    : seat.find((d) => d.code === data.code)
                                                                                    ? '#7126B5'
                                                                                    : '#d0d0d0',
                                                                            }}
                                                                            className={styles.choose__seat__btn}>
                                                                            {seat.find((d) => d.code === data.code)
                                                                                ? `P${seat.indexOf(data) + 1}`
                                                                                : data.code}
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    ))}
                                            </div>

                                            {/* B */}
                                            <div>
                                                <h1 className={styles.choose__seat__title__code}>B</h1>
                                                {flightSeat &&
                                                    flightSeat.map((seats, index) => (
                                                        <div key={index} className={styles.choose__seat__btn__box}>
                                                            {seats.type === 'B' &&
                                                                seats.seat.map((data, index) => (
                                                                    <div key={index}>
                                                                        <button
                                                                            disabled={!data.available}
                                                                            onClick={() => handleSeat(data)}
                                                                            style={{
                                                                                background: !data.available
                                                                                    ? '#73CA5C'
                                                                                    : seat.find((d) => d.code === data.code)
                                                                                    ? '#7126B5'
                                                                                    : '#d0d0d0',
                                                                            }}
                                                                            className={styles.choose__seat__btn}>
                                                                            {seat.find((d) => d.code === data.code)
                                                                                ? `P${seat.indexOf(data) + 1}`
                                                                                : data.code}
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    ))}
                                            </div>
                                            {/* B */}
                                            <div>
                                                <h1 className={styles.choose__seat__title__code}>C</h1>
                                                {flightSeat &&
                                                    flightSeat.map((seats, index) => (
                                                        <div key={index} className={styles.choose__seat__btn__box}>
                                                            {seats.type === 'C' &&
                                                                seats.seat.map((data, index) => (
                                                                    <div key={index}>
                                                                        <button
                                                                            disabled={!data.available}
                                                                            onClick={() => handleSeat(data)}
                                                                            style={{
                                                                                background: !data.available
                                                                                    ? '#73CA5C'
                                                                                    : seat.find((d) => d.code === data.code)
                                                                                    ? '#7126B5'
                                                                                    : '#d0d0d0',
                                                                            }}
                                                                            className={styles.choose__seat__btn}>
                                                                            {seat.find((d) => d.code === data.code)
                                                                                ? `P${seat.indexOf(data) + 1}`
                                                                                : data.code}
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                        {/* Divider */}
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <h1 style={{ visibility: 'hidden' }} className={styles.choose__seat__title__code}>
                                                .
                                            </h1>
                                            {flightSeat && (
                                                <div className={styles.choose__seat__divider__box}>
                                                    {Array.from({ length: 12 }, (_, i) => {
                                                        return (
                                                            <div key={i}>
                                                                <div className={styles.choose__divider__btn}>
                                                                    <p>{i + 1}</p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                        {/* Grouping for D  E  F */}
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            {/* D */}
                                            <div>
                                                <h1 className={styles.choose__seat__title__code}>D</h1>
                                                {flightSeat &&
                                                    flightSeat.map((seats, index) => (
                                                        <div key={index} className={styles.choose__seat__btn__box}>
                                                            {seats.type === 'D' &&
                                                                seats.seat.map((data, index) => (
                                                                    <div key={index}>
                                                                        <button
                                                                            disabled={!data.available}
                                                                            onClick={() => handleSeat(data)}
                                                                            style={{
                                                                                background: !data.available
                                                                                    ? '#73CA5C'
                                                                                    : seat.find((d) => d.code === data.code)
                                                                                    ? '#7126B5'
                                                                                    : '#d0d0d0',
                                                                            }}
                                                                            className={styles.choose__seat__btn}>
                                                                            {seat.find((d) => d.code === data.code)
                                                                                ? `P${seat.indexOf(data) + 1}`
                                                                                : data.code}
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    ))}
                                            </div>
                                            {/* E */}
                                            <div>
                                                <h1 className={styles.choose__seat__title__code}>E</h1>
                                                {flightSeat &&
                                                    flightSeat.map((seats, index) => (
                                                        <div key={index} className={styles.choose__seat__btn__box}>
                                                            {seats.type === 'E' &&
                                                                seats.seat.map((data, index) => (
                                                                    <div key={index}>
                                                                        <button
                                                                            disabled={!data.available}
                                                                            onClick={() => handleSeat(data)}
                                                                            style={{
                                                                                background: !data.available
                                                                                    ? '#73CA5C'
                                                                                    : seat.find((d) => d.code === data.code)
                                                                                    ? '#7126B5'
                                                                                    : '#d0d0d0',
                                                                            }}
                                                                            className={styles.choose__seat__btn}>
                                                                            {seat.find((d) => d.code === data.code)
                                                                                ? `P${seat.indexOf(data) + 1}`
                                                                                : data.code}
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    ))}
                                            </div>
                                            {/* F */}
                                            <div>
                                                <h1 className={styles.choose__seat__title__code}>F</h1>
                                                {flightSeat &&
                                                    flightSeat.map((seats, index) => (
                                                        <div key={index} className={styles.choose__seat__btn__box}>
                                                            {seats.type === 'F' &&
                                                                seats.seat.map((data, index) => (
                                                                    <div key={index}>
                                                                        <button
                                                                            disabled={!data.available}
                                                                            onClick={() => handleSeat(data)}
                                                                            style={{
                                                                                background: !data.available
                                                                                    ? '#73CA5C'
                                                                                    : seat.find((d) => d.code === data.code)
                                                                                    ? '#7126B5'
                                                                                    : '#d0d0d0',
                                                                            }}
                                                                            className={styles.choose__seat__btn}>
                                                                            {seat.find((d) => d.code === data.code)
                                                                                ? `P${seat.indexOf(data) + 1}`
                                                                                : data.code}
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* SEAT */}
                        <Button onClick={() => handleSubmit()}>Tambah</Button>
                    </div>
                    <div className='relative col-span-5 font-poppins'>
                        <h1 className='text-title-3 font-bold'>Detail Penerbangan</h1>
                        {detailFlight.berangkat && (
                            <div className='mb-2 mt-1'>
                                <h1 className='w-max rounded-rad-3 bg-alert-1 px-2 py-1 text-title-2 font-bold text-white'>
                                    Keberangkatan
                                </h1>
                            </div>
                        )}
                        {detailFlight.berangkat && (
                            <div>
                                <div className='flex justify-between'>
                                    <div>
                                        <h1 className='text-title-2 font-bold'>
                                            {fixedHour(detailFlight.berangkat.departure_time)}
                                        </h1>
                                        <h1 className='text-body-6'>{reformatDate(detailFlight.berangkat.departure_date)}</h1>
                                        <h1 className='text-body-6 font-medium'>
                                            {detailFlight.berangkat.Airport_from.airport_name}
                                        </h1>
                                    </div>
                                    <h1 className='text-body-3 font-bold text-pur-3'>Keberangkatan</h1>
                                </div>
                                <div className='mb-2 mt-4 w-full border text-net-3'></div>
                                <div className='flex items-center gap-2'>
                                    <div className='relative h-[24px] w-[24px] '>
                                        <Image src={'./images/flight_badge.svg'} fill alt='' />
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <div>
                                            <h3 className='text-body-5 font-bold'>
                                                {detailFlight.berangkat.Airline.airline_name} -{' '}
                                                {detailFlight.berangkat.flight_class}
                                            </h3>
                                            <h3 className='text-body-5 font-bold'>
                                                {detailFlight.berangkat.Airline.airline_code}
                                            </h3>
                                        </div>
                                        <div>
                                            <h3 className='text-body-5 font-bold'>Informasi : </h3>
                                            <h4 className='text-body-6'>{extractWord(detailFlight.berangkat.description)} </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-4 mt-2 w-full border text-net-3'></div>
                                <div className='flex justify-between'>
                                    <div>
                                        <h1 className='text-title-2 font-bold'>
                                            {fixedHour(detailFlight.berangkat.arrival_time)}
                                        </h1>
                                        <h1 className='text-body-6'>{reformatDate(detailFlight.berangkat.arrival_date)}</h1>
                                        <h1 className='text-body-6 font-medium'>
                                            {detailFlight.berangkat.Airport_to.airport_name}
                                        </h1>
                                    </div>
                                    <h1 className='text-body-3 font-bold text-pur-3'>Kedatangan</h1>
                                </div>
                            </div>
                        )}

                        {detailFlight?.pulang?.departure_date && (
                            <div className='mb-2 mt-4'>
                                <h1 className='w-max rounded-rad-3 bg-alert-1 px-2 py-1 text-title-2 font-bold text-white'>
                                    Kepulangan
                                </h1>
                            </div>
                        )}

                        {detailFlight?.pulang?.departure_date && (
                            <div>
                                <div className='flex justify-between'>
                                    <div>
                                        <h1 className='text-title-2 font-bold'>
                                            {fixedHour(detailFlight.pulang.departure_time)}
                                        </h1>
                                        <h1 className='text-body-6'>{reformatDate(detailFlight.pulang.departure_date)}</h1>
                                        <h1 className='text-body-6 font-medium'>
                                            {detailFlight.pulang.Airport_from.airport_name}
                                        </h1>
                                    </div>
                                    <h1 className='text-body-3 font-bold text-pur-3'>Keberangkatan</h1>
                                </div>
                                <div className='mb-2 mt-4 w-full border text-net-3'></div>
                                <div className='flex items-center gap-2'>
                                    <div className='relative h-[24px] w-[24px] '>
                                        <Image src={'./images/flight_badge.svg'} fill alt='' />
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <div>
                                            <h3 className='text-body-5 font-bold'>
                                                {detailFlight.pulang.Airline.airline_name} - {detailFlight.pulang.flight_class}
                                            </h3>
                                            <h3 className='text-body-5 font-bold'>{detailFlight.pulang.Airline.airline_code}</h3>
                                        </div>
                                        <div>
                                            <h3 className='text-body-5 font-bold'>Informasi : </h3>
                                            <h4 className='text-body-6'>{extractWord(detailFlight.pulang.description)} </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className='mb-4 mt-2 w-full border text-net-3'></div>
                                <div className='flex justify-between'>
                                    <div>
                                        <h1 className='text-title-2 font-bold'>{fixedHour(detailFlight.pulang.arrival_time)}</h1>

                                        <h1 className='text-body-6'>{reformatDate(detailFlight.pulang.arrival_date)}</h1>
                                        <h1 className='text-body-6 font-medium'>{detailFlight.pulang.Airport_to.airport_name}</h1>
                                    </div>
                                    <h1 className='text-body-3 font-bold text-pur-3'>Kedatangan</h1>
                                </div>
                            </div>
                        )}
                        <div className='mb-2 mt-4 w-full border text-net-3'></div>
                        <h1 className='text-body-6 font-bold'>Rincian Harga</h1>
                        <div>
                            {detailFlight.totalPrice && (
                                <div className='flex flex-col gap-1'>
                                    {passengerType.dewasa > 0 && (
                                        <div className='flex justify-between text-body-6'>
                                            <h1>{passengerType.dewasa} Dewasa</h1>
                                            <h1> {formatRupiah(detailFlight.totalAdults)}</h1>
                                        </div>
                                    )}
                                    {passengerType.anak > 0 && (
                                        <div className='flex justify-between text-body-6'>
                                            <h1>{passengerType.anak} Anak</h1>
                                            <h1> {formatRupiah(detailFlight.totalChild)}</h1>
                                        </div>
                                    )}
                                    {passengerType.bayi > 0 && (
                                        <div className='flex justify-between text-body-6'>
                                            <h1>{passengerType.bayi} Bayi</h1>
                                            <h1> {formatRupiah(detailFlight.totalBaby)}</h1>
                                        </div>
                                    )}
                                    <div className='flex justify-between text-body-6'>
                                        <h1>Tax</h1>
                                        <h1>
                                            <span>{formatRupiah(detailFlight.tax)}</span>
                                        </h1>
                                    </div>
                                    <div className='mb-3 mt-2 w-full border text-net-3'></div>
                                    <div className='flex justify-between text-title-2 font-bold'>
                                        <h1>Total</h1>
                                        <h1 className='text-pur-4'>
                                            <span className='ml-1'>{formatRupiah(detailFlight.totalPrice)}</span>
                                        </h1>
                                    </div>
                                </div>
                            )}
                        </div>

                        <AlertBottom
                            visibleAlert={visibleAlert}
                            handleVisibleAlert={handleVisibleAlert}
                            text={alertText}
                            type={alertType}
                        />
                    </div>
                </div>
            </div>

            <div>
                {openCalendar && (
                    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60'>
                        <CalendarPicker
                            initialDate={pickedDate}
                            handlePickedDate={handlePickedDate}
                            open={openCalendar}
                            minDate={null}
                            handleOpen={() => setOpenCalendar(!openCalendar)}
                        />
                    </div>
                )}
            </div>
            {/* DEKSTOP MODE */}
        </>
    );
}

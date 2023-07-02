'use client';

// Core
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

// Third Parties
import axios from 'axios';
import { FiChevronUp, FiChevronDown, FiArrowLeft } from 'react-icons/fi';
import { BsFillCheckCircleFill } from 'react-icons/bs';

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
    getIsTwoWay,
} from '@/store/flight';

// Component
import AlertBottom from '@/components/AlertBottom';
import Navbar from '@/components/Navbar';
import Label from '@/components/Label';
import Input from '@/components/Input';
import Button from '@/components/Button';
import CalendarPicker from '@/components/CalendarPicker';
import ToggleSwitch from '@/components/ToggleSwitch';
import AlertTop from '@/components/AlertTop';
import styles from '../../style/SeatSelect.module.css';
import Seat from '@/components/Seat';

//Utils
import { formatToLocale } from '@/utils/formatToLocale';
import { convertToDate } from '@/utils/converDateTime';
import { formatRupiah } from '@/utils/formatRupiah';
import { flightSeat, flightSeatDepart, flightSeatReturn } from '@/utils/flightSeat';
import { fixedHour } from '@/utils/fixedHour';
import { extractWord } from '@/utils/extractWord';
import { reformatDate } from '@/utils/reformatDate';

export default function Order() {
    /*=== core ===*/
    const router = useRouter();

    /*=== next auth ===*/
    const { data: session, status } = useSession();
    const token = session?.user?.token; //loading

    /*=== redux ===*/
    const dispatch = useDispatch();
    const { setFetchDetailFlight, setPassengerForm } = flightSlice.actions;
    const statusDetaiFlight = useSelector(getFlightDetailDataStatus); // Status for fething detail
    const detailFlight = useSelector(getFlightDetailData); // detail flight data
    const choosedFlight1 = useSelector(getChoosedFlight1);
    const choosedFlight2 = useSelector(getChoosedFlight2);
    const flightIDs = useSelector(getFlightDetailId); // Get Flight IDs
    const passengerType = useSelector(getPassengerTypeTotal); // Get passenger type total
    const passengerForm = useSelector(getPassengerForm); // generated form based passenger type total
    const isTwoWay = useSelector(getIsTwoWay);

    /*=== state ===*/
    const [isSuccessForm, setIsSuccessForm] = useState(false);
    const [isDekstop, setIsDesktop] = useState(true);
    const [formData, setFormData] = useState(null);
    const [formInputError, setFormInputError] = useState(false);
    const [formStatus, setFormStatus] = useState(false);
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [alertType, setAlertType] = useState('');
    const [visibleAlertError, setVisibleAlertError] = useState(false);
    const [alertTextError, setAlertTextError] = useState('');
    const [alertTypeError, setAlertTypeError] = useState('');
    const [toggleUser, setToggleUser] = useState(false);
    const [elements, setElements] = useState([]);
    const [flights, setFlights] = useState([
        {
            flight_id: choosedFlight1.flight_id,
            flight_type: 'Departure',
        },
    ]);
    const [dateId, setDateId] = useState({
        field_id: '',
        form_id: '',
    });
    const [openCalendar, setOpenCalendar] = useState(false);
    const [pickedDate, setPickedDate] = useState(new Date());
    const [seatDepart, setSeatDepart] = useState([]);
    const [seatReturn, setSeatReturn] = useState([]);
    const [fetchDataUser, setFetchDataUser] = useState(true);
    const [userData, setUserData] = useState({
        name: '',
        phone: '',
        email: '',
    });

    /*=== function ===*/
    const handleFormStatus = () => {
        if (seatDepart.length !== elements.length && isTwoWay) {
            handleVisibleAlert('Mohon untuk memilih kursi sesuai jumlah penumpang', 'failed');
            return;
        }
        if (seatReturn.length !== elements.length && isTwoWay) {
            handleVisibleAlert('Mohon untuk memilih kursi sesuai jumlah penumpang', 'failed');
            return;
        }
        if (seatDepart.length !== elements.length) {
            handleVisibleAlert('Mohon untuk memilih kursi sesuai jumlah penumpang', 'failed');
            return;
        }

        if (flights) {
            if (flights.length === 2) {
                if (flights[0].flight_type !== 'Departure' || !flights[0].flight_id) {
                    handleVisibleAlert('Departure Flight are not complete yet!', 'failed');
                    return;
                }
                if (flights[1].flight_type !== 'Arrival' || !flights[0].flight_id) {
                    handleVisibleAlert('Arrival Flight are not complete yet!', 'failed');
                    return;
                }
            }
            if (flights[0].flight_type !== 'Departure' || !flights[0].flight_id) {
                handleVisibleAlert('Departure Flight are not complete yet!', 'failed');
                return;
            }
        }

        if (!detailFlight.totalPrice) {
            handleVisibleAlert('Amount is not set!', 'failed');
            return;
        }

        const inputPassengerCheck = elements.every((elementForm) => {
            return elementForm.fields.every((formInput, index) => {
                if (
                    (formInput['field_label'] === 'Nama Lengkap' && !formInput['field_value']) ||
                    (formInput['field_label'] === 'Tanggal Lahir' && !formInput['field_value']) ||
                    (formInput['field_label'] === 'Kewarganegaraan' && !formInput['field_value']) ||
                    (formInput['field_label'] === 'KTP/Paspor' && !formInput['field_value']) ||
                    (formInput['field_label'] === 'Negara Penerbit' && !formInput['field_value'])
                ) {
                    handleVisibleAlert('Data tidak boleh ada yang kosong!', 'failed');
                    setFormInputError(true);
                    return false;
                }

                setFormInputError(false);
                return true;
            });
        });

        if (!inputPassengerCheck) {
            setFormStatus(false);
            return;
        }
        setFormStatus(true);

        const passengerDataShape = elements.map((element, indexForm) => {
            let elementType = element.type;
            let idx = indexForm;

            return {
                type: elementType,
                title: element.fields.find((test) => test.field_category === `title`).field_value,
                name: element.fields.find((test) => test.field_category === `name`).field_value,
                family_name: element.fields.find((test) => test.field_category === `family_name`).field_value,
                birthday: convertToDate(new Date(element.fields.find((test) => test.field_category === `birthday`).field_value)),
                nationality: element.fields.find((test) => test.field_category === `kewarganegaraan`).field_value,
                nik: element.fields.find((test) => test.field_category === `ktp_paspor`).field_value,
                issued_country: element.fields.find((test) => test.field_category === `negara_penerbit`).field_value,
                expired: convertToDate(new Date(element.fields.find((test) => test.field_category === `expired`).field_value)),
                seatDeparture: seatDepart[idx].code,
                seatReturn: isTwoWay ? seatReturn[idx].code : '',
            };
        });

        const templateObj = {
            flights,
            amount: detailFlight.totalPrice,
            passenger: passengerDataShape,
        };

        handleVisibleAlert('Data Anda berhasil tersimpan!', 'success');
        setFormData(templateObj);
    };

    const handleMobileFormStatus = () => {
        if (seatDepart.length !== elements.length && isTwoWay) {
            handleVisibleAlert('Mohon untuk memilih kursi sesuai jumlah penumpang', 'failed');
            return;
        }
        if (seatReturn.length !== elements.length && isTwoWay) {
            handleVisibleAlert('Mohon untuk memilih kursi sesuai jumlah penumpang', 'failed');
            return;
        }
        if (seatDepart.length !== elements.length) {
            handleVisibleAlert('Mohon untuk memilih kursi sesuai jumlah penumpang', 'failed');
            return;
        }

        if (flights) {
            if (flights.length === 2) {
                if (flights[0].flight_type !== 'Departure' || !flights[0].flight_id) {
                    handleVisibleAlert('Departure Flight are not complete yet!', 'failed');
                    return;
                }
                if (flights[1].flight_type !== 'Arrival' || !flights[0].flight_id) {
                    handleVisibleAlert('Arrival Flight are not complete yet!', 'failed');
                    return;
                }
            }
            if (flights[0].flight_type !== 'Departure' || !flights[0].flight_id) {
                handleVisibleAlert('Departure Flight are not complete yet!', 'failed');
                return;
            }
        }

        if (!detailFlight.totalPrice) {
            handleVisibleAlert('Amount is not set!', 'failed');
            return;
        }

        const inputPassengerCheck = elements.every((elementForm) => {
            return elementForm.fields.every((formInput, index) => {
                if (
                    (formInput['field_label'] === 'Nama Lengkap' && !formInput['field_value']) ||
                    (formInput['field_label'] === 'Tanggal Lahir' && !formInput['field_value']) ||
                    (formInput['field_label'] === 'Kewarganegaraan' && !formInput['field_value']) ||
                    (formInput['field_label'] === 'KTP/Paspor' && !formInput['field_value']) ||
                    (formInput['field_label'] === 'Negara Penerbit' && !formInput['field_value'])
                ) {
                    handleVisibleAlert('Data tidak boleh ada yang kosong!', 'failed');
                    setFormInputError(true);
                    return false;
                }

                setFormInputError(false);
                return true;
            });
        });

        if (!inputPassengerCheck) {
            setFormStatus(false);
            return;
        }
        setFormStatus(true);

        const passengerDataShape = elements.map((element, indexForm) => {
            let elementType = element.type;
            let idx = indexForm;

            return {
                type: elementType,
                title: element.fields.find((test) => test.field_category === `title`).field_value,
                name: element.fields.find((test) => test.field_category === `name`).field_value,
                family_name: element.fields.find((test) => test.field_category === `family_name`).field_value,
                birthday: convertToDate(new Date(element.fields.find((test) => test.field_category === `birthday`).field_value)),
                nationality: element.fields.find((test) => test.field_category === `kewarganegaraan`).field_value,
                nik: element.fields.find((test) => test.field_category === `ktp_paspor`).field_value,
                issued_country: element.fields.find((test) => test.field_category === `negara_penerbit`).field_value,
                expired: convertToDate(new Date(element.fields.find((test) => test.field_category === `expired`).field_value)),
                seatDeparture: seatDepart[idx].code,
                seatReturn: isTwoWay ? seatReturn[idx].code : '',
            };
        });

        const templateObj = {
            flights,
            amount: detailFlight.totalPrice,
            passenger: passengerDataShape,
        };

        handleVisibleAlert('Data Anda berhasil tersimpan!', 'success');
        setFormData(templateObj);
        setIsSuccessForm(true);
    };

    const handleVisibleAlert = (text, alertType) => {
        setAlertText(text);
        setAlertType(alertType);
        setVisibleAlert(!visibleAlert);
    };

    const handleVisibleAlertError = (text, alertType) => {
        setAlertTextError(text);
        setAlertTypeError(alertType);
        setVisibleAlertError(!visibleAlertError);
    };

    const handleToggleUser = () => setToggleUser(!toggleUser);

    // Handling Seat
    const handleSeatDepart = (value) => {
        if (seatDepart.length === elements.length) {
            setSeatDepart([]);
            return;
        }

        const newSeatDepartDatas = seatDepart.filter((data) => data !== value);
        setSeatDepart((prev) => (prev.find((data) => data === value) ? [...newSeatDepartDatas] : [...seatDepart, value]));
    };
    const handleSeatReturn = (value) => {
        if (seatReturn.length === elements.length) {
            setSeatReturn([]);
            return;
        }

        const newSeatReturnDatas = seatReturn.filter((data) => data !== value);
        setSeatReturn((prev) => (prev.find((data) => data === value) ? [...newSeatReturnDatas] : [...seatReturn, value]));
    };
    // Handling Seat

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
            const URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/transaction';
            if (formData) {
                const res = await axios.post(URL, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.status === 201 || res.data.status === 'Ok') {
                    router.replace(`/order/payment/${res?.data?.data?.transaction?.id}`);
                    console.log(res.data);
                }
            }
        } catch (error) {
            console.log('ERROR', error);
        }
    };

    /*=== effects ===*/
    useEffect(() => {
        //extract generated form from redux to locale state
        setElements(JSON.parse(JSON.stringify(passengerForm)));

        /* eslint-disable react-hooks/exhaustive-deps */
    }, []);

    useEffect(() => {
        if (token || status === 'unauthenticated') {
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
                        handleVisibleAlertError('Anda Harus Login Terlebih Dahulu!', 'failed');
                        setTimeout(() => {
                            router.replace('/');
                        }, 2500);
                    }
                }
                fetchUserData();
            }
            setFetchDataUser(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchDataUser, status, token]);

    useEffect(() => {
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

    console.log('====================================');
    console.log('DETAIL FLIGHT', detailFlight);
    console.log('====================================');
    console.log('====================================');
    console.log('FORM DATA', formData);
    console.log('====================================');

    return (
        <div className='overflow-x-hidden'>
            <Navbar className={'hidden lg:block'} />

            {/* DEKSTOP MODE */}
            <div className='mt-[108px] hidden w-screen border-b border-b-net-2 pb-[74px] pt-[47px] lg:block'>
                <div className='mx-auto hidden max-w-screen-lg grid-cols-12 font-poppins lg:grid'>
                    {/* header order */}
                    <div className='col-span-12 flex gap-3 text-head-1 font-bold'>
                        <h1 className='cursor-pointer text-black'>Isi Data Diri</h1>
                        <p>{'>'}</p>
                        <h1 className='text-net-3'>Bayar</h1>
                        <p>{'>'}</p>
                        <h1 className='text-net-3'>Selesai</h1>
                    </div>
                    {/* header order */}
                </div>
            </div>
            <div className='mx-auto mt-[19px] hidden max-w-screen-lg grid-cols-12  font-poppins lg:grid'>
                <div className='col-span-12 grid grid-cols-12 gap-14 font-poppins'>
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
                        <div className='flex flex-col gap-8 rounded-rad-2 px-[16px] py-[24px] shadow-low'>
                            {elements &&
                                elements.map((form, index) => {
                                    return (
                                        <div key={index}>
                                            <div className='flex items-center justify-between rounded-t-rad-2 bg-net-4 px-4 py-2 text-white'>
                                                <h2 className='text-title-2'>
                                                    P{index + 1} {' - '} Data Diri Penumpang {index + 1} {' - '}
                                                    {form.type}
                                                </h2>
                                                {formStatus && (
                                                    <BsFillCheckCircleFill className='h-[24px] w-[24px] text-alert-1' />
                                                )}
                                            </div>
                                            {form &&
                                                form.fields.map((formElement, index) => {
                                                    //formInputError
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
                                                                        className={`${
                                                                            formInputError ? 'border-red-500' : 'border'
                                                                        } w-full appearance-none  px-4 py-2 font-poppins outline-none`}
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
                                                                        className={`${
                                                                            formInputError ? 'border-red-500' : 'border'
                                                                        } w-full appearance-none  px-4 py-2 font-poppins outline-none`}
                                                                        readOnly
                                                                        id={formElement.field_id}
                                                                        value={
                                                                            formElement.field_value &&
                                                                            formatToLocale(formElement.field_value)
                                                                        }
                                                                        onClick={() => {
                                                                            handleOpenCalendar(
                                                                                formElement.field_id,
                                                                                form.form_id
                                                                            );
                                                                            setIsDesktop(true);
                                                                        }}
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
                                                                        className={`${
                                                                            formInputError ? 'border-red-500' : 'border'
                                                                        } w-full cursor-pointer appearance-none border px-4 py-2 font-poppins outline-none`}
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

                        {/* SEAT_FORM */}

                        <Seat
                            flightSeat={flightSeatDepart}
                            handleSeat={handleSeatDepart}
                            seat={seatDepart}
                            type={isTwoWay ? 'Kepergian' : ''}
                            flight_class={detailFlight?.berangkat?.flight_class}
                            flight_airline={detailFlight?.berangkat?.Airline?.airline_name}
                            flight_from={detailFlight?.berangkat?.from}
                            flight_to={detailFlight?.berangkat?.to}
                        />

                        {isTwoWay && (
                            <Seat
                                flightSeat={flightSeatReturn}
                                handleSeat={handleSeatReturn}
                                seat={seatReturn}
                                type={isTwoWay && 'Kepulangan'}
                                flight_class={detailFlight?.pulang?.flight_class}
                                flight_airline={detailFlight?.pulang?.Airline?.airline_name}
                                flight_from={detailFlight?.pulang?.from}
                                flight_to={detailFlight?.pulang?.to}
                            />
                        )}

                        {/* SEAT */}
                        <Button
                            onClick={() => handleFormStatus()}
                            className={` ${
                                formData ? 'bg-pur-3' : 'bg-pur-5'
                            } mb-[50px]  w-full rounded-rad-3  py-4 text-head-1 text-white`}>
                            Simpan
                        </Button>
                    </div>
                    <div className='relative col-span-5 font-poppins'>
                        <h1 className='text-title-3 font-bold'>Detail Penerbangan</h1>
                        {detailFlight?.pulang?.departure_date && (
                            <div className='mb-2 mt-1'>
                                <p className='w-max rounded-rad-4 bg-pur-5 px-2 py-1 text-body-6 text-white'>
                                    Kepergian - Flight 1
                                </p>
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
                                <p className='w-max rounded-rad-4 bg-pur-5 px-2 py-1 text-body-6 text-white'>
                                    Kepulangan - Flight 2
                                </p>
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
                        <h1 className='mb-2 text-body-6 font-bold'>Rincian Harga</h1>
                        <div className='flex flex-col gap-2'>
                            {detailFlight?.berangkat?.departure_date && (
                                <div className='flex flex-col gap-1'>
                                    {detailFlight?.pulang?.departure_date && (
                                        <p className='w-max rounded-rad-4 bg-pur-5 px-2 py-1 text-body-6 text-white'>
                                            {detailFlight?.berangkat?.Airline?.airline_name} - Kepergian
                                        </p>
                                    )}
                                    {passengerType.dewasa > 0 && (
                                        <div className='flex justify-between text-body-6'>
                                            <h1>{passengerType.dewasa} Dewasa</h1>
                                            <h1> {formatRupiah(detailFlight?.berangkat?.price)}</h1>
                                        </div>
                                    )}
                                    {passengerType.anak > 0 && (
                                        <div className='flex justify-between text-body-6'>
                                            <h1>{passengerType.anak} Anak</h1>
                                            <h1> {formatRupiah(detailFlight?.berangkat?.price)}</h1>
                                        </div>
                                    )}
                                    {passengerType.bayi > 0 && (
                                        <div className='flex justify-between text-body-6'>
                                            <h1>{passengerType.bayi} Bayi</h1>
                                            <h1> {formatRupiah(0)}</h1>
                                        </div>
                                    )}
                                </div>
                            )}
                            {detailFlight?.pulang?.departure_date && <div className='w-full border '></div>}
                            {detailFlight?.pulang?.departure_date && (
                                <div className='flex flex-col gap-1'>
                                    {detailFlight?.pulang?.departure_date && (
                                        <p className='w-max rounded-rad-4 bg-pur-5 px-2 py-1 text-body-6 text-white'>
                                            {detailFlight?.pulang?.Airline?.airline_name} - Kepulangan
                                        </p>
                                    )}
                                    {passengerType.dewasa > 0 && (
                                        <div className='flex justify-between text-body-6'>
                                            <h1>{passengerType.dewasa} Dewasa</h1>
                                            <h1> {formatRupiah(detailFlight?.pulang?.price)}</h1>
                                        </div>
                                    )}
                                    {passengerType.anak > 0 && (
                                        <div className='flex justify-between text-body-6'>
                                            <h1>{passengerType.anak} Anak</h1>
                                            <h1> {formatRupiah(detailFlight?.pulang?.price)}</h1>
                                        </div>
                                    )}
                                    {passengerType.bayi > 0 && (
                                        <div className='flex justify-between text-body-6'>
                                            <h1>{passengerType.bayi} Bayi</h1>
                                            <h1> {formatRupiah(0)}</h1>
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className='mb-3 mt-2 w-full border text-net-3'></div>
                            <div className='flex justify-between text-body-6'>
                                <h1>Tax</h1>
                                <h1>
                                    <span>{formatRupiah(detailFlight.tax)}</span>
                                </h1>
                            </div>

                            <div className='flex justify-between text-title-2 font-bold'>
                                <h1>Total</h1>
                                <h1 className='text-pur-4'>
                                    <span className='ml-1'>{formatRupiah(detailFlight.totalPrice)}</span>
                                </h1>
                            </div>
                            {/* {detailFlight?.pulang?.departure_date} */}
                        </div>
                        {formData && (
                            <Button
                                onClick={() => handleSubmit()}
                                className='mt-[32px] w-full rounded-rad-3 bg-alert-3 py-4 text-head-1 text-white'>
                                Lanjut Bayar
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* POP UP */}
            <div>
                {openCalendar && (
                    <div className='fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-60'>
                        <CalendarPicker
                            isDesktop={isDekstop}
                            initialDate={pickedDate}
                            handlePickedDate={handlePickedDate}
                            open={openCalendar}
                            minDate={null}
                            handleOpen={() => setOpenCalendar(!openCalendar)}
                        />
                    </div>
                )}
            </div>

            <AlertTop
                visibleAlert={visibleAlert}
                handleVisibleAlert={handleVisibleAlert}
                text={alertText}
                type={alertType}
                bgType='none'
            />
            <AlertTop
                visibleAlert={visibleAlertError}
                handleVisibleAlert={handleVisibleAlertError}
                text={alertTextError}
                type={alertTypeError}
                // bgType='none'
            />
            {/* DEKSTOP MODE */}

            {/* MOBILE MODE */}
            <div className='h-screen font-poppins lg:hidden'>
                <div
                    onClick={() => router.push('/')}
                    className='fixed inset-x-0 top-0 z-10 flex items-center gap-6 bg-pur-5 px-[16px]  py-2  text-white'>
                    <FiArrowLeft className='h-[28px] w-[28px]' /> <p>Halaman Booking</p>
                </div>
                <div className='mt-[64px]'>
                    {/* INPUT USER */}
                    <div className='mx-4 rounded-t-rad-2 border border-pur-3'>
                        {/* <h1 className='font-bold text-head-1'>Data Diri Pemesan</h1> */}
                        <div className='rounded-t-rad-2 bg-pur-5 px-4 py-2 text-white'>
                            <h2 className='text-title-2'>Data Diri Pemesan</h2>
                        </div>
                        <div className='flex flex-col gap-4 p-4'>
                            <div className='flex flex-col gap-1 '>
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
                    </div>
                    {/* INPUT USER */}
                </div>

                <div className='mt-[32px] flex flex-col gap-4 '>
                    {elements &&
                        elements.map((form, index) => {
                            return (
                                <div key={index} className='mx-4 rounded-t-rad-2 border border-pur-3'>
                                    <div className='rounded-t-rad-2 bg-pur-5 px-4 py-2 text-white'>
                                        <h2 className='text-title-2'>
                                            Data Diri Penumpang {index + 1} {' - '}
                                            {form.type}
                                        </h2>
                                        {formStatus && <BsFillCheckCircleFill className='h-[24px] w-[24px] text-alert-1' />}
                                    </div>
                                    {form &&
                                        form.fields.map((formElement, index) => {
                                            //formInputError
                                            // console.log('Form Element', formElement);
                                            return (
                                                <div key={index} className='mt-4 p-4'>
                                                    {formElement.field_type === 'text' && (
                                                        <div className='flex flex-col gap-1'>
                                                            <Label
                                                                className='text-body-6 font-bold text-pur-5'
                                                                htmlFor={formElement.field_id}>
                                                                {formElement.field_label}
                                                            </Label>
                                                            <Input
                                                                className={`${
                                                                    formInputError ? 'border-red-500' : 'border'
                                                                } w-full appearance-none  px-4 py-2 font-poppins outline-none`}
                                                                id={formElement.field_id}
                                                                onChange={(event) =>
                                                                    handleChange(formElement.field_id, event, form.form_id)
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
                                                                className={`${
                                                                    formInputError ? 'border-red-500' : 'border'
                                                                } w-full appearance-none  px-4 py-2 font-poppins outline-none`}
                                                                readOnly
                                                                id={formElement.field_id}
                                                                value={
                                                                    formElement.field_value &&
                                                                    formatToLocale(formElement.field_value)
                                                                }
                                                                onClick={() => {
                                                                    setIsDesktop(false);
                                                                    handleOpenCalendar(formElement.field_id, form.form_id);
                                                                }}
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
                                                                    handleChange(formElement.field_id, event, form.form_id)
                                                                }
                                                                className={`${
                                                                    formInputError ? 'border-red-500' : 'border'
                                                                } w-full cursor-pointer appearance-none px-4 py-2 font-poppins outline-none`}
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

                {/* SEAT DISINI */}
                {/* SEAT DISINI */}
                <div className='invisible h-[110px] '></div>

                <div className='fixed inset-x-0 bottom-0  flex  h-[100px] flex-col items-center justify-center gap-3  bg-white  px-5 shadow-low'>
                    <Button
                        onClick={() => handleMobileFormStatus()}
                        className={` ${formData ? 'bg-pur-2' : 'bg-pur-5'}  my-1 w-full rounded-rad-3 py-2 text-white`}>
                        Simpan
                    </Button>
                </div>
            </div>
            {/* MOBILE MODE*/}

            {isSuccessForm && (
                <div className='fixed inset-0 top-0 z-20 h-screen overflow-y-scroll bg-white font-poppins'>
                    <div className='px-4'>
                        <div
                            onClick={() => setIsSuccessForm(!isSuccessForm)}
                            className='fixed inset-x-0 top-0 z-20 flex items-center gap-6 bg-pur-5 px-[16px]  py-2  text-white'>
                            <FiArrowLeft className='h-[28px] w-[28px]' /> <p>Detail Penerbangan</p>
                        </div>
                        <h1 className='mt-[64px] text-title-3 font-bold'>Detail Penerbangan</h1>
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
                        <div className='invisible h-[110px] '></div>
                        {formData && (
                            <div className='fixed inset-x-0 bottom-0  flex  h-[100px] flex-col items-center justify-center gap-3  bg-white  px-5 shadow-low'>
                                <Button
                                    onClick={() => handleSubmit()}
                                    className='my-1 w-full rounded-rad-3 bg-alert-3 py-2 text-white'>
                                    Lanjut Bayar
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

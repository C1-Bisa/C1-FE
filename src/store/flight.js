'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { convertToDate, convertToTime } from '@/utils/converDateTime';
import axios from 'axios';

const URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/airport';
// const SEARCH_URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/flight/searchflight';
const DETAIL_FLIGHT = 'https://kel1airplaneapi-production.up.railway.app/api/v1/flight/getDetail';

function genId() {
    return (Math.random() + 1).toString(36).substring(7);
}

export const fetchAirport = createAsyncThunk('flight/fetchAirport', async () => {
    try {
        const response = await axios.get(URL);
        return response.data.data.airport;
    } catch (error) {
        console.log('ERRROR AIRPORT', error.message);
    }
});

export const fetchFlight = createAsyncThunk(
    'flight/fetchFlight',
    async ({ from, to, departure_date, departure_time, returnDate, flight_class, query = null }) => {
        try {
            let SEARCH_URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/flight/searchflight';

            if (query.toLowerCase() === 'tolower') {
                SEARCH_URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/flight/searchflight?toLower=true';
            } else if (query.toLowerCase() === 'earlydeparture') {
                SEARCH_URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/flight/searchflight?earlyDeparture=true';
            } else if (query.toLowerCase() === 'lastdeparture') {
                SEARCH_URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/flight/searchflight?lastDeparture=true';
            } else if (query.toLowerCase() === 'earlyarrive') {
                SEARCH_URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/flight/searchflight?earlyArrive=true';
            } else if (query.toLowerCase() === 'lastarrive') {
                SEARCH_URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/flight/searchflight?lastArrive=true';
            } else {
                SEARCH_URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/flight/searchflight';
            }

            const objectTemplate = {
                from,
                to,
                departure_date,
                departure_time,
                returnDate,
                flight_class,
            };

            const response = await axios.post(SEARCH_URL, objectTemplate);
            // console.log('FLIGHT DATAS', response);
            return response.data.data.flight;
        } catch (error) {
            console.log('ERRROR FLIGHT', error.message);
            // return error.message;
        }
    }
);

export const fetchDetailFlight = createAsyncThunk('flight/fetchDetailFlight', async ({ flight_id, dewasa, anak, bayi }) => {
    try {
        const objectTemplate = {
            flight_id,
            dewasa,
            anak,
            bayi,
        };

        const response = await axios.post(DETAIL_FLIGHT, objectTemplate);
        console.log('FLIGHT DATAS', response);
        return response.data.data;
    } catch (error) {
        console.log('ERRROR DETAIL_FLIGHT', error.message);
        // return error.message;
    }
});

const initialState = {
    // USED STATE
    statusNotif: true,
    fetchDetailFlight: 'sans', //'idle' | 'loading' | 'succeeded' | 'failed' | sans
    flightDetailData: {},
    flightDetailId: [],
    airports: [], // initial airport
    flightDatas: [],
    filteredFromAirport: [], // list of filtered from  airport
    filteredToAirport: [], // list of filtered to airport
    fetchAirportStatus: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    fetchAirportError: null,
    fetchFlightStatusTwo: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    flight_title: 'Keberangkatan',
    isTwoWay: false,
    isReadyToOrder: false,
    passengerType: {
        dewasa: 1, //
        anak: 0,
        bayi: 0,
    },
    filterTicket: {
        id: 1,
        type: 'Termurah',
        query: 'tolower',
    },
    totalPassenger: 1,

    homeSearch: {
        flight_type: 'One Trip',
        from: '',
        to: '',
        departure_dateTime: new Date(),
        return_dateTime: '',
        flight_class: 'Economy',
    },

    searchPage: {
        isSearchAgain: true,
        from: '', //from
        to: '', //to
        search_date: '',
        search_date_return: '',
        departure_date: '',
        departure_time: '',
        return_date: '', //swithced derpature_date
        return_time: '', //switched derpature_time
    },

    choosedFlight: {
        flight_1: {
            departure_datetime: '',
            is_data: false,
            is_choose: false,
            flight_id: '',
            airline: '',
            from: '',
            from_airport_name: '',
            from_airport_code: '',
            to: '',
            to_airport_name: '',
            to_airport_code: '',
            departure_date: '',
            departure_time: '',
            arrival_date: '',
            arrival_time: '',
            duration: 0,
        },
        flight_2: {
            departure_datetime: '',
            is_data: false,
            is_choose: false,
            flight_id: '',
            airline: '',
            from: '',
            from_airport_name: '',
            from_airport_code: '',
            to: '',
            to_airport_name: '',
            to_airport_code: '',
            departure_date: '',
            departure_time: '',
            arrival_date: '',
            arrival_time: '',
            duration: 0,
        },
    },

    passengerForm: [
        {
            form_id: `1`,
            label_form: 1,
            type: 'Adult',
            fields: [
                {
                    field_category: 'title',
                    field_id: `title1`,
                    field_label: 'Title',
                    field_value: 'Mr.',
                    field_options: [
                        {
                            option_label: 'Mr.',
                        },
                        {
                            option_label: 'Ms.',
                        },
                    ],
                    field_type: 'select',
                },
                {
                    field_category: 'name',
                    field_id: `name1`,
                    field_label: 'Nama Lengkap',
                    field_value: '',
                    field_type: 'text',
                },
                {
                    field_category: 'family_name',
                    field_id: `family_name1`,
                    field_label: 'Nama Keluarga',
                    field_value: '',
                    field_type: 'text',
                },
                {
                    field_category: 'birthday',
                    field_id: `birthday1`,
                    field_label: 'Tanggal Lahir',
                    field_value: '',
                    field_type: 'date',
                },
                {
                    field_category: 'kewarganegaraan',
                    field_id: `kewarganegaraan1`,
                    field_label: 'Kewarganegaraan',
                    field_value: '',
                    field_type: 'text',
                },
                {
                    field_category: 'ktp_paspor',
                    field_id: `ktp_paspor1`,
                    field_label: 'KTP/Paspor',
                    field_value: '',
                    field_type: 'text',
                },
                {
                    field_category: 'negara_penerbit',
                    field_id: `negara_penerbit1`,
                    field_label: 'Negara Penerbit',
                    field_value: '',
                    field_type: 'text',
                },
                {
                    field_category: 'expired',
                    field_id: `expired1`,
                    field_label: 'Berlaku Sampai',
                    field_value: '',
                    field_type: 'date',
                },
            ],
        },
    ],
    // airport start
    // fetchFlightStatus: true,
    // fetchFlightStatusNew: true,
};

export const flightSlice = createSlice({
    name: 'flight',
    initialState,
    reducers: {
        //  list of filtered airport
        filteredFromAirport: (state, action) => {
            const searchFromAirport = state.airports.filter((airport) =>
                airport.airport_location.toLowerCase().includes(action.payload.toLowerCase())
            );

            state.filteredFromAirport = searchFromAirport;
        },

        filteredToAirport: (state, action) => {
            const searchToAirport = state.airports.filter((airport) =>
                airport.airport_location.toLowerCase().includes(action.payload.toLowerCase())
            );
            state.filteredToAirport = searchToAirport;
        },

        setOneWaySwitch: (state) => {
            if (state.isTwoWay) {
                state.choosedFlight.flight_1.is_choose = false;
                state.choosedFlight.flight_1.flight_id = '';
                state.choosedFlight.flight_1.airline = '';
                state.choosedFlight.flight_1.from = '';
                state.choosedFlight.flight_1.from_airport_name = '';
                state.choosedFlight.flight_1.from_airport_code = '';
                state.choosedFlight.flight_1.to = '';
                state.choosedFlight.flight_1.to_airport_name = '';
                state.choosedFlight.flight_1.to_airport_code = '';
                state.choosedFlight.flight_1.departure_date = '';
                state.choosedFlight.flight_1.departure_time = '';
                state.choosedFlight.flight_1.arrival_date = '';
                state.choosedFlight.flight_1.arrival_time = '';
                state.choosedFlight.flight_1.duration = '';

                state.choosedFlight.flight_2.is_choose = false;
                state.choosedFlight.flight_2.flight_id = '';
                state.choosedFlight.flight_2.airline = '';
                state.choosedFlight.flight_2.from = '';
                state.choosedFlight.flight_2.from_airport_name = '';
                state.choosedFlight.flight_2.from_airport_code = '';
                state.choosedFlight.flight_2.to = '';
                state.choosedFlight.flight_2.to_airport_name = '';
                state.choosedFlight.flight_2.to_airport_code = '';
                state.choosedFlight.flight_2.departure_date = '';
                state.choosedFlight.flight_2.departure_time = '';
                state.choosedFlight.flight_2.arrival_date = '';
                state.choosedFlight.flight_2.arrival_time = '';
                state.choosedFlight.flight_2.duration = '';

                const tempHomeSearch = state.homeSearch.from;
                state.homeSearch.from = state.homeSearch.to;
                state.homeSearch.to = tempHomeSearch;
                state.flight_title = 'Keberangkatan';
                state.searchPage.from = state.homeSearch.from;
                state.searchPage.to = state.homeSearch.to;
                state.searchPage.search_date = state.homeSearch.departure_dateTime;
                state.searchPage.isSearchAgain = true;
                state.fetchFlightStatusTwo = 'idle';
                // state.fetchFlightStatusNew = true;
                return;
            }

            const tempHomeSearch = state.homeSearch.from;
            state.homeSearch.from = state.homeSearch.to;
            state.homeSearch.to = tempHomeSearch;
            state.flight_title = 'Keberangkatan';
            state.searchPage.from = state.homeSearch.from;
            state.searchPage.to = state.homeSearch.to;
            state.searchPage.search_date = state.homeSearch.departure_dateTime;
            state.searchPage.isSearchAgain = true;
            state.fetchFlightStatusTwo = 'idle';
            // state.fetchFlightStatusNew = true;
        },

        // SWITCHING TO TWAY
        setIsTwoWay: (state, action) => {
            if (action.payload === false && state.choosedFlight.flight_1.is_choose && state.choosedFlight.flight_2.is_choose) {
                state.flightDetailId = [];
                state.choosedFlight.flight_1.is_choose = false;
                state.choosedFlight.flight_1.flight_id = '';
                state.choosedFlight.flight_1.airline = '';
                state.choosedFlight.flight_1.from = '';
                state.choosedFlight.flight_1.from_airport_name = '';
                state.choosedFlight.flight_1.from_airport_code = '';
                state.choosedFlight.flight_1.to = '';
                state.choosedFlight.flight_1.to_airport_name = '';
                state.choosedFlight.flight_1.to_airport_code = '';
                state.choosedFlight.flight_1.departure_date = '';
                state.choosedFlight.flight_1.departure_time = '';
                state.choosedFlight.flight_1.arrival_date = '';
                state.choosedFlight.flight_1.arrival_time = '';
                state.choosedFlight.flight_1.duration = '';

                state.choosedFlight.flight_2.is_choose = false;
                state.choosedFlight.flight_2.flight_id = '';
                state.choosedFlight.flight_2.airline = '';
                state.choosedFlight.flight_2.from = '';
                state.choosedFlight.flight_2.from_airport_name = '';
                state.choosedFlight.flight_2.from_airport_code = '';
                state.choosedFlight.flight_2.to = '';
                state.choosedFlight.flight_2.to_airport_name = '';
                state.choosedFlight.flight_2.to_airport_code = '';
                state.choosedFlight.flight_2.departure_date = '';
                state.choosedFlight.flight_2.departure_time = '';
                state.choosedFlight.flight_2.arrival_date = '';
                state.choosedFlight.flight_2.arrival_time = '';
                state.choosedFlight.flight_2.duration = '';

                state.searchPage.search_date = state.homeSearch.departure_dateTime;
                state.searchPage.search_date_return = '';
                state.searchPage.from = state.homeSearch.from;
                state.searchPage.to = state.homeSearch.to;
                state.homeSearch.return_dateTime = '';
                state.homeSearch.flight_type = 'One Trip';
                // state.flight_title = 'Keberangkatan';
                // state.searchPage.isSearchAgain = true;
                // state.fetchFlightStatusTwo = 'idle';
                state.isTwoWay = action.payload;
                return;
            }

            if (action.payload === false && state.choosedFlight.flight_1.is_choose) {
                state.choosedFlight.flight_1.is_choose = false;
                state.flightDetailId = [];
                state.choosedFlight.flight_1.flight_id = '';
                state.choosedFlight.flight_1.airline = '';
                state.choosedFlight.flight_1.from = '';
                state.choosedFlight.flight_1.from_airport_name = '';
                state.choosedFlight.flight_1.from_airport_code = '';
                state.choosedFlight.flight_1.to = '';
                state.choosedFlight.flight_1.to_airport_name = '';
                state.choosedFlight.flight_1.to_airport_code = '';
                state.choosedFlight.flight_1.departure_date = '';
                state.choosedFlight.flight_1.departure_time = '';
                state.choosedFlight.flight_1.arrival_date = '';
                state.choosedFlight.flight_1.arrival_time = '';
                state.choosedFlight.flight_1.duration = '';

                state.choosedFlight.flight_2.is_choose = false;
                state.choosedFlight.flight_2.flight_id = '';
                state.choosedFlight.flight_2.airline = '';
                state.choosedFlight.flight_2.from = '';
                state.choosedFlight.flight_2.from_airport_name = '';
                state.choosedFlight.flight_2.from_airport_code = '';
                state.choosedFlight.flight_2.to = '';
                state.choosedFlight.flight_2.to_airport_name = '';
                state.choosedFlight.flight_2.to_airport_code = '';
                state.choosedFlight.flight_2.departure_date = '';
                state.choosedFlight.flight_2.departure_time = '';
                state.choosedFlight.flight_2.arrival_date = '';
                state.choosedFlight.flight_2.arrival_time = '';
                state.choosedFlight.flight_2.duration = '';

                state.searchPage.search_date = state.homeSearch.departure_dateTime;
                state.searchPage.search_date_return = '';
                state.searchPage.from = state.homeSearch.from;
                state.searchPage.to = state.homeSearch.to;
                state.homeSearch.return_dateTime = '';
                state.homeSearch.flight_type = 'One Trip';
                // state.flight_title = 'Keberangkatan';
                // state.searchPage.isSearchAgain = true;
                // state.fetchFlightStatusTwo = 'idle';
                state.isTwoWay = action.payload;
                return;
            }

            if (action.payload === false) {
                state.choosedFlight.flight_1.is_choose = false;
                state.choosedFlight.flight_1.flight_id = '';
                state.choosedFlight.flight_1.airline = '';
                state.choosedFlight.flight_1.from = '';
                state.choosedFlight.flight_1.from_airport_name = '';
                state.choosedFlight.flight_1.from_airport_code = '';
                state.choosedFlight.flight_1.to = '';
                state.choosedFlight.flight_1.to_airport_name = '';
                state.choosedFlight.flight_1.to_airport_code = '';
                state.choosedFlight.flight_1.departure_date = '';
                state.choosedFlight.flight_1.departure_time = '';
                state.choosedFlight.flight_1.arrival_date = '';
                state.choosedFlight.flight_1.arrival_time = '';
                state.choosedFlight.flight_1.duration = '';

                state.choosedFlight.flight_2.is_choose = false;
                state.choosedFlight.flight_2.flight_id = '';
                state.choosedFlight.flight_2.airline = '';
                state.choosedFlight.flight_2.from = '';
                state.choosedFlight.flight_2.from_airport_name = '';
                state.choosedFlight.flight_2.from_airport_code = '';
                state.choosedFlight.flight_2.to = '';
                state.choosedFlight.flight_2.to_airport_name = '';
                state.choosedFlight.flight_2.to_airport_code = '';
                state.choosedFlight.flight_2.departure_date = '';
                state.choosedFlight.flight_2.departure_time = '';
                state.choosedFlight.flight_2.arrival_date = '';
                state.choosedFlight.flight_2.arrival_time = '';
                state.choosedFlight.flight_2.duration = '';

                state.searchPage.search_date = state.homeSearch.departure_dateTime;
                state.searchPage.search_date_return = '';
                state.homeSearch.return_dateTime = '';
                state.homeSearch.flight_type = 'One Trip';
                state.flight_title = 'Keberangkatan';
                // state.searchPage.isSearchAgain = true;
                // state.fetchFlightStatusTwo = 'idle';
                state.isTwoWay = action.payload;
                return;
            }

            // state.searchPage.search_date_return = '';
            state.homeSearch.flight_type = 'Round Trip';
            state.isTwoWay = action.payload;
        },

        // define of flight Class

        // Passenger Type & Total Passenger
        addDewasaPassenger: (state) => {
            state.passengerType.dewasa += 1;
            state.totalPassenger += 1;
            state.passengerForm = [
                ...state.passengerForm,
                {
                    form_id: genId(),
                    label_form: 1,
                    type: 'Adult',
                    fields: [
                        {
                            field_category: 'title',
                            field_id: `title_${genId()}`,
                            field_label: 'Title',
                            field_value: 'Mr.',
                            field_options: [
                                {
                                    option_label: 'Mr.',
                                },
                                {
                                    option_label: 'Ms.',
                                },
                            ],
                            field_type: 'select',
                        },
                        {
                            field_category: 'name',
                            field_id: `name_${genId()}`,
                            field_label: 'Nama Lengkap',
                            field_value: '',
                            field_type: 'text',
                        },
                        {
                            field_category: 'family_name',
                            field_id: `family_name_${genId()}`,
                            field_label: 'Nama Keluarga',
                            field_value: '',
                            field_type: 'text',
                        },
                        {
                            field_category: 'birthday',
                            field_id: `birthday_${genId()}`,
                            field_label: 'Tanggal Lahir',
                            field_value: '',
                            field_type: 'date',
                        },
                        {
                            field_category: 'kewarganegaraan',
                            field_id: `kewarganegaraan_${genId()}`,
                            field_label: 'Kewarganegaraan',
                            field_value: '',
                            field_type: 'text',
                        },
                        {
                            field_category: 'ktp_paspor',
                            field_id: `ktp_paspor_${genId()}`,
                            field_label: 'KTP/Paspor',
                            field_value: '',
                            field_type: 'text',
                        },
                        {
                            field_category: 'negara_penerbit',
                            field_id: `negara_penerbit_${genId()}`,
                            field_label: 'Negara Penerbit',
                            field_value: '',
                            field_type: 'text',
                        },
                        {
                            field_category: 'expired',
                            field_id: `expired_${genId()}`,
                            field_label: 'Berlaku Sampai',
                            field_value: '',
                            field_type: 'date',
                        },
                    ],
                },
            ];

            state.passengerForm = state.passengerForm.sort((a, b) => a.label_form - b.label_form);
        },
        addAnakPassenger: (state) => {
            state.passengerType.anak += 1;
            state.totalPassenger += 1; //index terakhirnya == Dewasa
            state.passengerForm = [
                ...state.passengerForm,
                {
                    form_id: genId(),
                    label_form: 2,
                    type: 'Child',
                    fields: [
                        {
                            field_category: 'title',
                            field_id: `title_${genId()}`,
                            field_label: 'Title',
                            field_value: 'Mr.',
                            field_options: [
                                {
                                    option_label: 'Mr.',
                                },
                                {
                                    option_label: 'Ms.',
                                },
                            ],
                            field_type: 'select',
                        },
                        {
                            field_category: 'name',
                            field_id: `name_${genId()}`,
                            field_label: 'Nama Lengkap',
                            field_value: '',
                            field_type: 'text',
                        },
                        {
                            field_category: 'family_name',
                            field_id: `family_name_${genId()}`,
                            field_label: 'Nama Keluarga',
                            field_value: '',
                            field_type: 'text',
                        },
                        {
                            field_category: 'birthday',
                            field_id: `birthday_${genId()}`,
                            field_label: 'Tanggal Lahir',
                            field_value: '',
                            field_type: 'date',
                        },
                        {
                            field_category: 'kewarganegaraan',
                            field_id: `kewarganegaraan_${genId()}`,
                            field_label: 'Kewarganegaraan',
                            field_value: '',
                            field_type: 'text',
                        },
                        {
                            field_category: 'ktp_paspor',
                            field_id: `ktp_paspor_${genId()}`,
                            field_label: 'KTP/Paspor',
                            field_value: '',
                            field_type: 'text',
                        },
                        {
                            field_category: 'negara_penerbit',
                            field_id: `negara_penerbit_${genId()}`,
                            field_label: 'Negara Penerbit',
                            field_value: '',
                            field_type: 'text',
                        },
                        {
                            field_category: 'expired',
                            field_id: `expired_${genId()}`,
                            field_label: 'Berlaku Sampai',
                            field_value: '',
                            field_type: 'date',
                        },
                    ],
                },
            ];

            state.passengerForm = state.passengerForm.sort((a, b) => a.label_form - b.label_form);
        },
        addBayiPassenger: (state) => {
            state.passengerType.bayi += 1;
            state.totalPassenger += 1;
            state.passengerForm = [
                ...state.passengerForm,
                {
                    form_id: genId(),
                    label_form: 3,
                    type: 'Baby',
                    fields: [
                        {
                            field_category: 'title',
                            field_id: `title_${genId()}`,
                            field_label: 'Title',
                            field_value: 'Mr.',
                            field_options: [
                                {
                                    option_label: 'Mr.',
                                },
                                {
                                    option_label: 'Ms.',
                                },
                            ],
                            field_type: 'select',
                        },
                        {
                            field_category: 'name',
                            field_id: `name_${genId()}`,
                            field_label: 'Nama Lengkap',
                            field_value: '',
                            field_type: 'text',
                        },
                        {
                            field_category: 'family_name',
                            field_id: `family_name_${genId()}`,
                            field_label: 'Nama Keluarga',
                            field_value: '',
                            field_type: 'text',
                        },
                        {
                            field_category: 'birthday',
                            field_id: `birthday_${genId()}`,
                            field_label: 'Tanggal Lahir',
                            field_value: '',
                            field_type: 'date',
                        },
                        {
                            field_category: 'kewarganegaraan',
                            field_id: `kewarganegaraan_${genId()}`,
                            field_label: 'Kewarganegaraan',
                            field_value: '',
                            field_type: 'text',
                        },
                        {
                            field_category: 'ktp_paspor',
                            field_id: `ktp_paspor_${genId()}`,
                            field_label: 'KTP/Paspor',
                            field_value: '',
                            field_type: 'text',
                        },
                        {
                            field_category: 'negara_penerbit',
                            field_id: `negara_penerbit_${genId()}`,
                            field_label: 'Negara Penerbit',
                            field_value: '',
                            field_type: 'text',
                        },
                        {
                            field_category: 'expired',
                            field_id: `expired_${genId()}`,
                            field_label: 'Berlaku Sampai',
                            field_value: '',
                            field_type: 'date',
                        },
                    ],
                },
            ];

            state.passengerForm = state.passengerForm.sort((a, b) => a.label_form - b.label_form);
        },

        minusDewasaPassenger: (state) => {
            if (state.passengerType.dewasa > 1) {
                state.passengerType.dewasa -= 1;
                state.totalPassenger -= 1;
                const idxDewasa = state.passengerForm.findIndex((item) => item.type == 'Adult');
                state.passengerForm = state.passengerForm.filter((pass, index) => index !== idxDewasa);
            }
        },
        minusAnakPassenger: (state) => {
            if (state.passengerType.anak > 0) {
                state.passengerType.anak -= 1;
                state.totalPassenger -= 1;
                const idxAnak = state.passengerForm.findIndex((item) => item.type == 'Child');
                state.passengerForm = state.passengerForm.filter((pass, index) => index !== idxAnak);
            }
        },
        minusBayiPassenger: (state) => {
            if (state.passengerType.bayi > 0) {
                state.passengerType.bayi -= 1;
                state.totalPassenger -= 1;
                const idxBayi = state.passengerForm.findIndex((item) => item.type == 'Baby');
                state.passengerForm = state.passengerForm.filter((pass, index) => index !== idxBayi);
            }
        },

        setChoosedFlight: (state, action) => {
            //ketika fligt 1 belom ada data dan dia bukan two way
            if (
                (!state.choosedFlight.flight_1.is_choose && !state.isTwoWay) ||
                (state.choosedFlight.flight_1.is_choose && !state.isTwoWay)
            ) {
                state.flightDetailId = [action.payload.id];
                state.choosedFlight.flight_1.flight_id = action.payload.id;
                state.choosedFlight.flight_1.airline = action.payload.airline;
                state.choosedFlight.flight_1.from = action.payload.from;
                state.choosedFlight.flight_1.from_airport_name = action.payload.airport_from;
                state.choosedFlight.flight_1.from_airport_code = action.payload.airport_from_code;
                state.choosedFlight.flight_1.to = action.payload.to;
                state.choosedFlight.flight_1.to_airport_name = action.payload.airport_to;
                state.choosedFlight.flight_1.to_airport_code = action.payload.airport_to_code;
                state.choosedFlight.flight_1.departure_date = action.payload.departure_date;
                state.choosedFlight.flight_1.departure_time = action.payload.departure_time;
                state.choosedFlight.flight_1.arrival_date = action.payload.arrival_date;
                state.choosedFlight.flight_1.arrival_time = action.payload.arrival_time;
                state.choosedFlight.flight_1.duration = action.payload.duration;
                state.choosedFlight.flight_1.is_choose = true;
                state.isReadyToOrder = true;
                state.fetchDetailFlight = 'idle';
                //  state.fetchFlightStatusNew = true;
                return;
            }

            //ketika fligt 1 belom ada data dan dia two way
            if (!state.choosedFlight.flight_1.is_choose && state.isTwoWay) {
                state.flightDetailId = [action.payload.id];
                state.choosedFlight.flight_1.flight_id = action.payload.id;
                state.choosedFlight.flight_1.airline = action.payload.airline;
                state.choosedFlight.flight_1.from = action.payload.from;
                state.choosedFlight.flight_1.from_airport_name = action.payload.airport_from;
                state.choosedFlight.flight_1.from_airport_code = action.payload.airport_from_code;
                state.choosedFlight.flight_1.to = action.payload.to;
                state.choosedFlight.flight_1.to_airport_name = action.payload.airport_to;
                state.choosedFlight.flight_1.to_airport_code = action.payload.airport_to_code;
                state.choosedFlight.flight_1.departure_date = action.payload.departure_date;
                state.choosedFlight.flight_1.departure_time = action.payload.departure_time;
                state.choosedFlight.flight_1.arrival_date = action.payload.arrival_date;
                state.choosedFlight.flight_1.arrival_time = action.payload.arrival_time;
                state.choosedFlight.flight_1.duration = action.payload.duration;
                state.choosedFlight.flight_1.is_choose = true;

                state.flight_title = 'Kepulangan';
                state.searchPage.from = state.homeSearch.to;
                state.searchPage.to = state.homeSearch.from;
                state.searchPage.search_date = state.homeSearch.return_dateTime;
                state.searchPage.search_date_return = '';
                state.searchPage.isSearchAgain = true;
                // state.fetchFlightStatus = true;
                return;
            }

            //ketika fligt 1  ada data dan dia  two way
            if (state.choosedFlight.flight_1.is_choose && state.isTwoWay) {
                state.flightDetailId = [...state.flightDetailId, action.payload.id];
                state.choosedFlight.flight_2.flight_id = action.payload.id;
                state.choosedFlight.flight_2.airline = action.payload.airline;
                state.choosedFlight.flight_2.from = action.payload.from;
                state.choosedFlight.flight_2.from_airport_name = action.payload.airport_from;
                state.choosedFlight.flight_2.from_airport_code = action.payload.airport_from_code;
                state.choosedFlight.flight_2.to = action.payload.to;
                state.choosedFlight.flight_2.to_airport_name = action.payload.airport_to;
                state.choosedFlight.flight_2.to_airport_code = action.payload.airport_to_code;
                state.choosedFlight.flight_2.departure_date = action.payload.departure_date;
                state.choosedFlight.flight_2.departure_time = action.payload.departure_time;
                state.choosedFlight.flight_2.arrival_date = action.payload.arrival_date;
                state.choosedFlight.flight_2.arrival_time = action.payload.arrival_time;
                state.choosedFlight.flight_2.duration = action.payload.duration;
                // state.flight_title = 'Kepulangan';
                state.choosedFlight.flight_2.is_choose = true;
                state.isReadyToOrder = true;
                state.fetchDetailFlight = 'idle';
                return;
            }

            if (state.choosedFlight.flight_2.is_choose) {
                console.log('udehh');
                return;
            }

            state.flightDetailId = [action.payload.id];
            state.choosedFlight.flight_1.flight_id = action.payload.id;
            state.choosedFlight.flight_1.airline = action.payload.airline;
            state.choosedFlight.flight_1.from = action.payload.from;
            state.choosedFlight.flight_1.from_airport_name = action.payload.airport_from;
            state.choosedFlight.flight_1.from_airport_code = action.payload.airport_from_code;
            state.choosedFlight.flight_1.to = action.payload.to;
            state.choosedFlight.flight_1.to_airport_name = action.payload.airport_to;
            state.choosedFlight.flight_1.to_airport_code = action.payload.airport_to_code;
            state.choosedFlight.flight_1.departure_date = action.payload.departure_date;
            state.choosedFlight.flight_1.departure_time = action.payload.departure_time;
            state.choosedFlight.flight_1.arrival_date = action.payload.arrival_date;
            state.choosedFlight.flight_1.arrival_time = action.payload.arrival_time;
            state.choosedFlight.flight_1.duration = action.payload.duration;
            state.choosedFlight.flight_1.is_choose = true;
        },

        setResetChoosedFlight: (state) => {
            if (state.choosedFlight.flight_1.is_choose && state.choosedFlight.flight_2.is_choose && state.isTwoWay) {
                state.flight_title = 'Keberangkatan';
                state.flightDetailId = [];
                state.choosedFlight.flight_1.is_choose = false;
                state.choosedFlight.flight_1.flight_id = '';
                state.choosedFlight.flight_1.airline = '';
                state.choosedFlight.flight_1.from = '';
                state.choosedFlight.flight_1.from_airport_name = '';
                state.choosedFlight.flight_1.from_airport_code = '';
                state.choosedFlight.flight_1.to = '';
                state.choosedFlight.flight_1.to_airport_name = '';
                state.choosedFlight.flight_1.to_airport_code = '';
                state.choosedFlight.flight_1.departure_date = '';
                state.choosedFlight.flight_1.departure_time = '';
                state.choosedFlight.flight_1.arrival_date = '';
                state.choosedFlight.flight_1.arrival_time = '';
                state.choosedFlight.flight_1.duration = '';

                state.choosedFlight.flight_2.is_choose = false;
                state.choosedFlight.flight_2.flight_id = '';
                state.choosedFlight.flight_2.airline = '';
                state.choosedFlight.flight_2.from = '';
                state.choosedFlight.flight_2.from_airport_name = '';
                state.choosedFlight.flight_2.from_airport_code = '';
                state.choosedFlight.flight_2.to = '';
                state.choosedFlight.flight_2.to_airport_name = '';
                state.choosedFlight.flight_2.to_airport_code = '';
                state.choosedFlight.flight_2.departure_date = '';
                state.choosedFlight.flight_2.departure_time = '';
                state.choosedFlight.flight_2.arrival_date = '';
                state.choosedFlight.flight_2.arrival_time = '';
                state.choosedFlight.flight_2.duration = '';
                state.searchPage.from = state.homeSearch.from; //initial state
                state.searchPage.to = state.homeSearch.to;
                state.searchPage.search_date = state.homeSearch.departure_dateTime;
                state.searchPage.search_date_return = state.homeSearch.return_dateTime;

                state.searchPage.isSearchAgain = true;
                state.fetchFlightStatusTwo = 'idle';
                // state.fetchFlightStatusNew = true;
                return;
            }

            if (state.choosedFlight.flight_1.is_choose && state.isTwoWay && !state.choosedFlight.flight_2.is_choose) {
                state.flight_title = 'Keberangkatan';
                state.flightDetailId = [];
                state.choosedFlight.flight_1.is_choose = false;
                state.choosedFlight.flight_1.flight_id = '';
                state.choosedFlight.flight_1.airline = '';
                state.choosedFlight.flight_1.from = '';
                state.choosedFlight.flight_1.from_airport_name = '';
                state.choosedFlight.flight_1.from_airport_code = '';
                state.choosedFlight.flight_1.to = '';
                state.choosedFlight.flight_1.to_airport_name = '';
                state.choosedFlight.flight_1.to_airport_code = '';
                state.choosedFlight.flight_1.departure_date = '';
                state.choosedFlight.flight_1.departure_time = '';
                state.choosedFlight.flight_1.arrival_date = '';
                state.choosedFlight.flight_1.arrival_time = '';
                state.choosedFlight.flight_1.duration = '';

                state.searchPage.from = state.homeSearch.from;
                state.searchPage.to = state.homeSearch.to;
                state.searchPage.search_date = state.homeSearch.departure_dateTime;
                state.searchPage.search_date_return = state.homeSearch.return_dateTime;
                state.searchPage.isSearchAgain = true;

                state.fetchFlightStatusTwo = 'idle';
                // state.fetchFlightStatusNew = true;
                return;
            }

            if (state.choosedFlight.flight_1.is_choose && !state.isTwoWay) {
                state.flight_title = 'Keberangkatan';
                state.flightDetailId = [];
                state.choosedFlight.flight_1.is_choose = false;
                state.choosedFlight.flight_1.flight_id = '';
                state.choosedFlight.flight_1.airline = '';
                state.choosedFlight.flight_1.from = '';
                state.choosedFlight.flight_1.from_airport_name = '';
                state.choosedFlight.flight_1.from_airport_code = '';
                state.choosedFlight.flight_1.to = '';
                state.choosedFlight.flight_1.to_airport_name = '';
                state.choosedFlight.flight_1.to_airport_code = '';
                state.choosedFlight.flight_1.departure_date = '';
                state.choosedFlight.flight_1.departure_time = '';
                state.choosedFlight.flight_1.arrival_date = '';
                state.choosedFlight.flight_1.arrival_time = '';
                state.choosedFlight.flight_1.duration = '';

                state.choosedFlight.flight_2.is_choose = false;
                state.choosedFlight.flight_2.flight_id = '';
                state.choosedFlight.flight_2.airline = '';
                state.choosedFlight.flight_2.from = '';
                state.choosedFlight.flight_2.from_airport_name = '';
                state.choosedFlight.flight_2.from_airport_code = '';
                state.choosedFlight.flight_2.to = '';
                state.choosedFlight.flight_2.to_airport_name = '';
                state.choosedFlight.flight_2.to_airport_code = '';
                state.choosedFlight.flight_2.departure_date = '';
                state.choosedFlight.flight_2.departure_time = '';
                state.choosedFlight.flight_2.arrival_date = '';
                state.choosedFlight.flight_2.arrival_time = '';
                state.choosedFlight.flight_2.duration = '';

                state.searchPage.from = state.homeSearch.from;
                state.searchPage.to = state.homeSearch.to;
                state.searchPage.search_date = state.homeSearch.departure_dateTime;
                state.searchPage.search_date_return = '';
                state.searchPage.isSearchAgain = true;

                state.fetchFlightStatusTwo = 'idle';
                return;
            }
            state.flight_title = 'Keberangkatan';
            state.flightDetailId = [];
            state.choosedFlight.flight_1.is_choose = false;
            state.choosedFlight.flight_1.flight_id = '';
            state.choosedFlight.flight_1.airline = '';
            state.choosedFlight.flight_1.from = '';
            state.choosedFlight.flight_1.from_airport_name = '';
            state.choosedFlight.flight_1.from_airport_code = '';
            state.choosedFlight.flight_1.to = '';
            state.choosedFlight.flight_1.to_airport_name = '';
            state.choosedFlight.flight_1.to_airport_code = '';
            state.choosedFlight.flight_1.departure_date = '';
            state.choosedFlight.flight_1.departure_time = '';
            state.choosedFlight.flight_1.arrival_date = '';
            state.choosedFlight.flight_1.arrival_time = '';
            state.choosedFlight.flight_1.duration = '';

            state.choosedFlight.flight_2.is_choose = false;
            state.choosedFlight.flight_2.flight_id = '';
            state.choosedFlight.flight_2.airline = '';
            state.choosedFlight.flight_2.from = '';
            state.choosedFlight.flight_2.from_airport_name = '';
            state.choosedFlight.flight_2.from_airport_code = '';
            state.choosedFlight.flight_2.to = '';
            state.choosedFlight.flight_2.to_airport_name = '';
            state.choosedFlight.flight_2.to_airport_code = '';
            state.choosedFlight.flight_2.departure_date = '';
            state.choosedFlight.flight_2.departure_time = '';
            state.choosedFlight.flight_2.arrival_date = '';
            state.choosedFlight.flight_2.arrival_time = '';
            state.choosedFlight.flight_2.duration = '';

            state.fetchFlightStatusTwo = 'idle';
            // state.fetchFlightStatusNew = true;
        },

        setHomePageFlightClass: (state, action) => {
            state.homeSearch.flight_class = action.payload;
        },

        setHomePageSearchDeparture: (state, action) => {
            state.homeSearch.departure_dateTime = action.payload;
            state.searchPage.search_date = action.payload;
        },

        setHomePageSearchReturn: (state, action) => {
            state.homeSearch.return_dateTime = action.payload;
            if (state.isTwoWay) {
                state.searchPage.search_date_return = action.payload;
                state.choosedFlight.flight_2.departure_datetime = action.payload;
            }
        },

        setHomePageSearchFrom: (state, action) => {
            const fromAirport = state.airports.filter((airport) => airport.airport_code === action.payload);

            state.homeSearch.from = fromAirport[0].airport_location;

            state.searchPage.from = fromAirport[0].airport_location;
        },
        setHomePageSearchTo: (state, action) => {
            const toAirport = state.airports.filter((airport) => airport.airport_code === action.payload);
            state.homeSearch.to = toAirport[0].airport_location;

            state.searchPage.to = toAirport[0].airport_location;
        },

        setSearchPageDate: (state, action) => {
            //for one way only
            if (action.payload !== state.homeSearch.departure_dateTime && !state.isTwoWay) {
                state.homeSearch.departure_dateTime = action.payload;
                state.searchPage.search_date = action.payload;
                return;
            }
            // two way : while we choosing first flight
            if (
                action.payload !== state.homeSearch.departure_dateTime &&
                state.isTwoWay &&
                !state.choosedFlight.flight_1.is_choose
            ) {
                state.homeSearch.departure_dateTime = action.payload;
                state.searchPage.search_date = action.payload;
                return;
            }
            // two way : while we choosing second flight
            // if (action.payload !== state.homeSearch.return_dateTime && state.isTwoWay && state.choosedFlight.flight_1.is_choose) {
            //     if (new Date(action.payload) < new Date(state.homeSearch.departure_dateTime)) {
            //         console.log('====================================');
            //         console.log('STATE OUTPUT LU LEBIH KECIL');
            //         console.log('====================================');
            //     }
            //     state.homeSearch.return_dateTime = action.payload;
            //     state.searchPage.search_date = action.payload;
            //     return;
            // }
            state.searchPage.search_date = action.payload;
        },

        setSearchPageIsSearchAgain: (state, action) => {
            state.searchPage.isSearchAgain = action.payload;
        },

        setFetchFlightAgain: (state) => {
            state.fetchFlightStatusTwo = 'idle';
        },
        // setResetAll: (state) => {},
        setIsReadyToOrder: (state, action) => {
            if (!action.payload && state.isTwoWay && state.choosedFlight.flight_1.is_choose) {
                state.fetchDetailFlight = 'sans';
                state.flight_title = 'Kepulangan';
                state.flightDetailId = [state.flightDetailId[0]];
                state.choosedFlight.flight_2.is_choose = false;
                // state.choosedFlight.flight_2.flight_id = '';
                state.choosedFlight.flight_2.airline = '';
                state.choosedFlight.flight_2.from = '';
                state.choosedFlight.flight_2.from_airport_name = '';
                state.choosedFlight.flight_2.from_airport_code = '';
                state.choosedFlight.flight_2.to = '';
                state.choosedFlight.flight_2.to_airport_name = '';
                state.choosedFlight.flight_2.to_airport_code = '';
                state.choosedFlight.flight_2.departure_date = '';
                state.choosedFlight.flight_2.departure_time = '';
                state.choosedFlight.flight_2.arrival_date = '';
                state.choosedFlight.flight_2.arrival_time = '';
                state.choosedFlight.flight_2.duration = '';

                state.searchPage.from = state.homeSearch.to;
                state.searchPage.to = state.homeSearch.from;
                state.searchPage.search_date = state.homeSearch.return_dateTime;
                state.searchPage.search_date_return = '';
                state.searchPage.isSearchAgain = true;
                state.fetchFlightStatusTwo = 'idle';
                state.isReadyToOrder = action.payload;
                return;
            }
            if (!action.payload && state.isTwoWay && !state.choosedFlight.flight_1.is_choose) {
                state.fetchDetailFlight = 'sans';
                state.flightDetailId = [];
                state.flight_title = 'Keberangkatan';
                state.choosedFlight.flight_1.is_choose = false;
                // state.choosedFlight.flight_1.flight_id = '';
                state.choosedFlight.flight_1.airline = '';
                state.choosedFlight.flight_1.from = '';
                state.choosedFlight.flight_1.from_airport_name = '';
                state.choosedFlight.flight_1.from_airport_code = '';
                state.choosedFlight.flight_1.to = '';
                state.choosedFlight.flight_1.to_airport_name = '';
                state.choosedFlight.flight_1.to_airport_code = '';
                state.choosedFlight.flight_1.departure_date = '';
                state.choosedFlight.flight_1.departure_time = '';
                state.choosedFlight.flight_1.arrival_date = '';
                state.choosedFlight.flight_1.arrival_time = '';
                state.choosedFlight.flight_1.duration = '';

                state.choosedFlight.flight_2.is_choose = false;
                // state.choosedFlight.flight_2.flight_id = '';
                state.choosedFlight.flight_2.airline = '';
                state.choosedFlight.flight_2.from = '';
                state.choosedFlight.flight_2.from_airport_name = '';
                state.choosedFlight.flight_2.from_airport_code = '';
                state.choosedFlight.flight_2.to = '';
                state.choosedFlight.flight_2.to_airport_name = '';
                state.choosedFlight.flight_2.to_airport_code = '';
                state.choosedFlight.flight_2.departure_date = '';
                state.choosedFlight.flight_2.departure_time = '';
                state.choosedFlight.flight_2.arrival_date = '';
                state.choosedFlight.flight_2.arrival_time = '';
                state.choosedFlight.flight_2.duration = '';

                state.searchPage.from = state.homeSearch.from;
                state.searchPage.to = state.homeSearch.to;
                state.searchPage.search_date = state.homeSearch.departure_dateTime;
                state.searchPage.search_date_return = state.homeSearch.return_dateTime;
                state.searchPage.isSearchAgain = true;
                state.fetchFlightStatusTwo = 'idle';
                state.isReadyToOrder = action.payload;
                return;
            }
            if (!action.payload && !state.isTwoWay) {
                state.fetchDetailFlight = 'sans';
                state.flightDetailId = [];
                state.flight_title = 'Keberangkatan';
                state.choosedFlight.flight_1.is_choose = false;
                // state.choosedFlight.flight_1.flight_id = '';
                state.choosedFlight.flight_1.airline = '';
                state.choosedFlight.flight_1.from = '';
                state.choosedFlight.flight_1.from_airport_name = '';
                state.choosedFlight.flight_1.from_airport_code = '';
                state.choosedFlight.flight_1.to = '';
                state.choosedFlight.flight_1.to_airport_name = '';
                state.choosedFlight.flight_1.to_airport_code = '';
                state.choosedFlight.flight_1.departure_date = '';
                state.choosedFlight.flight_1.departure_time = '';
                state.choosedFlight.flight_1.arrival_date = '';
                state.choosedFlight.flight_1.arrival_time = '';
                state.choosedFlight.flight_1.duration = '';

                state.choosedFlight.flight_2.is_choose = false;
                // state.choosedFlight.flight_2.flight_id = '';
                state.choosedFlight.flight_2.airline = '';
                state.choosedFlight.flight_2.from = '';
                state.choosedFlight.flight_2.from_airport_name = '';
                state.choosedFlight.flight_2.from_airport_code = '';
                state.choosedFlight.flight_2.to = '';
                state.choosedFlight.flight_2.to_airport_name = '';
                state.choosedFlight.flight_2.to_airport_code = '';
                state.choosedFlight.flight_2.departure_date = '';
                state.choosedFlight.flight_2.departure_time = '';
                state.choosedFlight.flight_2.arrival_date = '';
                state.choosedFlight.flight_2.arrival_time = '';
                state.choosedFlight.flight_2.duration = '';
                state.fetchFlightStatusTwo = 'idle';
                state.isReadyToOrder = action.payload;
                return;
            }
            state.isReadyToOrder = action.payload;
        },

        setFetchDetailFlight: (state) => {
            state.fetchFlightStatusTwo = 'idle';
        },

        setPassengerForm: (state, action) => {
            state.passengerForm = action.payload;
        },

        // setFetchFlightStatusNew: (state, action) => {
        //     state.fetchFlightStatusNew = action.payload;
        // },
        setStatusNotif: (state, action) => {
            state.statusNotif = action.payload;
        },

        setFilterTicket: (state, action) => {
            state.filterTicket = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchAirport.pending, (state) => {
            state.fetchAirportStatus = 'loading';
        });
        builder.addCase(fetchAirport.fulfilled, (state, action) => {
            state.fetchAirportStatus = 'succeeded';
            state.airports = [...state.airports, ...action.payload];
        });
        builder.addCase(fetchAirport.rejected, (state, action) => {
            state.fetchAirportStatus = 'failed';
        });
        builder.addCase(fetchFlight.pending, (state) => {
            state.fetchFlightStatusTwo = 'loading';
        });
        builder.addCase(fetchFlight.fulfilled, (state, action) => {
            state.fetchFlightStatusTwo = 'succeeded';
            state.flightDatas = action.payload;
        });
        builder.addCase(fetchFlight.rejected, (state, action) => {
            state.fetchFlightStatusTwo = 'failed';
        });
        builder.addCase(fetchDetailFlight.pending, (state) => {
            state.fetchDetailFlight = 'loading';
        });
        builder.addCase(fetchDetailFlight.fulfilled, (state, action) => {
            state.fetchDetailFlight = 'succeeded';
            state.flightDetailData = action.payload;
        });
        builder.addCase(fetchDetailFlight.rejected, (state, action) => {
            state.fetchDetailFlight = 'failed';
        });
    },
});

export const getStatusNotif = (state) => state.flight.statusNotif;
export const getFilterTicket = (state) => state.flight.filterTicket;

// export const getFetchFlightStatusNew = (state) => state.flight.fetchFlightStatusNew;
export const getPassengerForm = (state) => state.flight.passengerForm; //detail flight status
export const getFlightDetailDataStatus = (state) => state.flight.fetchDetailFlight; //detail flight status
export const getFlightDetailData = (state) => state.flight.flightDetailData; //detail flight
//test
export const getPassengerTypeTotal = (state) => state.flight.passengerType;
export const getFlightDetailId = (state) => state.flight.flightDetailId;
export const getFlightDatas = (state) => state.flight.flightDatas;
export const getFlightTitle = (state) => state.flight.flight_title;
export const getFlightDatasStatus = (state) => state.flight.fetchFlightStatusTwo;
export const getIsReadyToOrder = (state) => state.flight.isReadyToOrder;

export const getSearchPageIsSearchAgain = (state) => state.flight.searchPage.isSearchAgain;
export const getHomeSearch = (state) => state.flight.homeSearch;
export const getSearchPage = (state) => state.flight.searchPage;
export const getChoosedFlight1 = (state) => state.flight.choosedFlight.flight_1;
export const getChoosedFlight2 = (state) => state.flight.choosedFlight.flight_2;
export const getFetchFlightStatus = (state) => state.flight.fetchFlightStatus;
export const getFlightClass = (state) => state.flight.homeSearch.flight_class; // used flight class homesearch
export const getIsTwoWay = (state) => state.flight.isTwoWay; // used switched two way homesearch
export const getAirportFetchStatus = (state) => state.flight.fetchAirportStatus; // used loading homesearch
export const getFilteredFromAirport = (state) => state.flight.filteredFromAirport; //used list filtered from homesearch
export const getFilteredToAirport = (state) => state.flight.filteredToAirport; //used list filtered to homesearch
export const getTotalPassenger = (state) => state.flight.totalPassenger; // used total passenger homesearch
export const getDewasaPassenger = (state) => state.flight.passengerType.dewasa; // used in choosepassengermodal
export const getAnakPassenger = (state) => state.flight.passengerType.anak; // used in choosepassengermodal
export const getBayiPassenger = (state) => state.flight.passengerType.bayi; // used in choosepassengermodal

export default flightSlice.reducer;

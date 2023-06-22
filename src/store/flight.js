'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { convertToDate, convertToTime } from '@/utils/converDateTime';
import axios from 'axios';

const URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/airport';
const SEARCH_URL = 'https://kel1airplaneapi-production.up.railway.app/api/v1/flight/searchflight';
const DETAIL_FLIGHT = 'https://kel1airplaneapi-production.up.railway.app/api/v1/flight/getDetail';

export const fetchAirport = createAsyncThunk('flight/fetchAirport', async () => {
    try {
        const response = await axios.get(URL);
        return response.data.data.airport;
    } catch (error) {
        console.log('ERRROR AIRPORT', error.message);
        // return error.message;
    }
});

export const fetchFlight = createAsyncThunk(
    'flight/fetchFlight',
    async ({ from, to, departure_date, departure_time, returnDate, flight_class }) => {
        try {
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
    // airport start
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
    fetchFlightStatus: true,
    flight_title: 'Keberangkatan',
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

    passengerType: {
        dewasa: 1, //
        anak: 0,
        bayi: 0,
    },
    totalPassenger: 1,

    isTwoWay: false,

    isReadyToOrder: false,
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
        },

        // SWITCHING TO TWAY
        setIsTwoWay: (state, action) => {
            if (action.payload === false && state.choosedFlight.flight_1.is_choose && state.choosedFlight.flight_2.is_choose) {
                state.searchPage.from = state.homeSearch.from;
                state.searchPage.to = state.homeSearch.to;
                state.homeSearch.return_dateTime = '';
                state.homeSearch.flight_type = 'One Trip';
                // state.flight_title = 'Keberangkatan';
                state.isTwoWay = action.payload;
                return;
            }

            if (action.payload === false && state.choosedFlight.flight_1.is_choose) {
                state.searchPage.from = state.homeSearch.from;
                state.searchPage.to = state.homeSearch.to;
                state.homeSearch.return_dateTime = '';
                state.homeSearch.flight_type = 'One Trip';
                // state.flight_title = 'Keberangkatan';
                state.isTwoWay = action.payload;
                return;
            }

            if (action.payload === false) {
                state.homeSearch.return_dateTime = '';
                state.homeSearch.flight_type = 'One Trip';
                state.flight_title = 'Keberangkatan';
                state.isTwoWay = action.payload;
                return;
            }

            state.homeSearch.flight_type = 'Round Trip';
            state.isTwoWay = action.payload;
        },

        // define of flight Class

        // Passenger Type & Total Passenger
        addDewasaPassenger: (state) => {
            state.passengerType.dewasa += 1;
            state.totalPassenger += 1;
        },
        addAnakPassenger: (state) => {
            state.passengerType.anak += 1;
            state.totalPassenger += 1;
        },
        addBayiPassenger: (state) => {
            state.passengerType.bayi += 1;
            state.totalPassenger += 1;
        },

        minusDewasaPassenger: (state) => {
            if (state.passengerType.dewasa > 1) {
                state.passengerType.dewasa -= 1;
                state.totalPassenger -= 1;
            }
        },
        minusAnakPassenger: (state) => {
            if (state.passengerType.anak > 0) {
                state.passengerType.anak -= 1;
                state.totalPassenger -= 1;
            }
        },
        minusBayiPassenger: (state) => {
            if (state.passengerType.bayi > 0) {
                state.passengerType.bayi -= 1;
                state.totalPassenger -= 1;
            }
        },

        setChoosedFlight: (state, action) => {
            if (!state.choosedFlight.flight_1.is_choose && !state.isTwoWay) {
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
                return;
            }

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
                state.searchPage.isSearchAgain = true;
                // state.fetchFlightStatus = true;
                return;
            }

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
        setFetchFlightStatus: (state, action) => {
            state.fetchFlightStatus = action.payload;
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
                state.searchPage.from = state.homeSearch.from;
                state.searchPage.to = state.homeSearch.to;
                state.searchPage.search_date = state.homeSearch.departure_dateTime;

                state.searchPage.isSearchAgain = true;
                state.fetchFlightStatusTwo = 'idle';
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
        },

        setHomePageFlightClass: (state, action) => {
            state.homeSearch.flight_class = action.payload;
        },

        setHomePageSearchDeparture: (state, action) => {
            state.homeSearch.departure_dateTime = action.payload;
            state.searchPage.search_date = action.payload;
            if (!state.searchPage.departure_date || !state.searchPage.departure_time) {
                state.searchPage.departure_date = convertToDate(action.payload);
                state.searchPage.departure_time = convertToTime(action.payload);
            }
        },

        setHomePageSearchReturn: (state, action) => {
            state.homeSearch.return_dateTime = action.payload;
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
            if (action.payload !== state.homeSearch.departure_dateTime && !state.isTwoWay) {
                state.homeSearch.departure_dateTime = action.payload;
                state.searchPage.search_date = action.payload;
                return;
            }
            if (action.payload !== state.homeSearch.departure_dateTime && state.isTwoWay) {
                state.homeSearch.departure_dateTime = action.payload;
                state.searchPage.search_date = action.payload;
                return;
            }
            if (action.payload !== state.homeSearch.return_dateTime && state.isTwoWay && state.choosedFlight.flight_1.is_choose) {
                state.homeSearch.return_dateTime = action.payload;
                state.searchPage.search_date = action.payload;
                return;
            }
            state.searchPage.search_date = action.payload;
        },

        setSearchPageIsSearchAgain: (state, action) => {
            state.searchPage.isSearchAgain = action.payload;
        },

        setFetchTerbaru: (state) => {
            state.fetchFlightStatusTwo = 'idle';
        },
        // setResetAll: (state) => {},
        setIsReadyToOrder: (state, action) => {
            if (!action.payload && state.isTwoWay) {
                state.fetchDetailFlight = 'sans';
                state.flightDetailId = [];
                state.flight_title = 'Keberangkatan';
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
                state.searchPage.isSearchAgain = true;
                state.fetchFlightStatusTwo = 'idle';
                state.isReadyToOrder = action.payload;
                return;
            }
            if (!action.payload) {
                state.fetchDetailFlight = 'sans';
                state.flightDetailId = [];
                state.flight_title = 'Keberangkatan';
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
                state.isReadyToOrder = action.payload;
                return;
            }
            state.isReadyToOrder = action.payload;
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
            state.fetchFlightStatusTwo = 'loading';
        });
        builder.addCase(fetchDetailFlight.fulfilled, (state, action) => {
            state.fetchFlightStatusTwo = 'succeeded';
            state.flightDetailData = action.payload;
        });
        builder.addCase(fetchDetailFlight.rejected, (state, action) => {
            state.fetchFlightStatusTwo = 'failed';
        });
    },
});

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

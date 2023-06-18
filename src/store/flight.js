'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { convertToDate, convertToTime } from '@/utils/converDateTime';
import axios from 'axios';

const URL = 'https://airplaneapikel1-production.up.railway.app/api/v1/airport';

export const fetchAirport = createAsyncThunk('flight/fetchAirport', async () => {
    try {
        const response = await axios.get(URL);
        return response.data.data.airport;
    } catch (error) {
        return error.message;
    }
});

const initialState = {
    // airport start
    airports: [], // initial airport
    filteredFromAirport: [], // list of filtered from  airport
    filteredToAirport: [], // list of filtered to airport
    displayFromAirport: '', // display from airport in homesearch comp
    displayToAirport: '', // display to airport in homesearch comp
    fetchAirportStatus: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    fetchAirportError: null,

    // passenger start
    passengerType: {
        dewasa: 1, //
        anak: 0,
        bayi: 0,
    },
    totalPassenger: 1,
    // passenger end

    // flight class start
    flightClass: 'Economy',
    // flight class end

    //one way/two way mode start
    isTwoWay: false, // one way two way swithhed
    one_way: {
        from: '',
        to: '',
        departure_date: '',
        departure_time: '',
        arrival_date: '',
        arrival_time: '',
        departureDateTime: '',
        arrivalDateTime: '',
    },
    two_way: {
        from: '',
        to: '',
        departure_date: '',
        departure_time: '',
        departureDateTime: '',
    },
    //one way/two way mode end

    // display ui prototype start
    displayDepartureDateTime: '',
    // display ui prototype end
};

export const flightSlice = createSlice({
    name: 'flight',
    initialState,
    reducers: {
        // airport reducer start
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

        setOneWayFrom: (state, action) => {
            const fromAirport = state.airports.filter((airport) => airport.airport_code === action.payload);

            if (state.isTwoWay) {
                state.two_way.to = fromAirport[0].airport_location;
            }

            state.displayFromAirport = `${fromAirport[0].airport_location} (${fromAirport[0].airport_code})`;
            state.one_way.from = fromAirport[0].airport_location;
        },
        setOneWayTo: (state, action) => {
            const toAirport = state.airports.filter((airport) => airport.airport_code === action.payload);

            if (state.isTwoWay) {
                state.two_way.from = toAirport[0].airport_location;
            }

            state.displayToAirport = `${toAirport[0].airport_location} (${toAirport[0].airport_code})`;
            state.one_way.to = toAirport[0].airport_location;
        },
        setOneWaySwitch: (state) => {
            const tempDisplay = state.displayFromAirport;
            state.displayFromAirport = state.displayToAirport;
            state.displayToAirport = tempDisplay;

            const temp = state.one_way.from;
            state.one_way.from = state.one_way.to;
            state.one_way.to = temp;

            if (state.isTwoWay) {
                const temp = state.two_way.from;
                state.two_way.from = state.two_way.to;
                state.two_way.to = temp;
            }
        },

        setIsTwoWay: (state, action) => {
            if (!action.payload) {
                state.two_way.from = '';
                state.two_way.to = '';
                state.two_way.departureDateTime = '';
                state.two_way.departure_date = '';
                state.two_way.departure_time = '';
                state.isTwoWay = action.payload;
                return;
            }

            state.two_way.from = state.one_way.to;
            state.two_way.to = state.one_way.from;
            state.two_way.departure_date = state.one_way.arrival_date;
            state.two_way.departure_time = state.one_way.arrival_time;
            state.two_way.departureDateTime = state.one_way.arrivalDateTime;
            state.isTwoWay = action.payload;
        },

        //define datePickerCalenda || used in search page
        setDerpatureDateTime: (state, action) => {
            state.one_way.departure_date = convertToDate(action.payload);
            state.one_way.departure_time = convertToTime(action.payload);
            state.one_way.departureDateTime = action.payload;
            state.displayDepartureDateTime = action.payload;
        },

        //define datePickerCalenda
        setArrivalDateTime: (state, action) => {
            if (state.isTwoWay) {
                state.two_way.departure_date = convertToDate(action.payload);
                state.two_way.departure_time = convertToTime(action.payload);
                state.two_way.departureDateTime = action.payload;
            }
            state.one_way.arrival_date = convertToDate(action.payload);
            state.one_way.arrival_time = convertToTime(action.payload);
            state.one_way.arrivalDateTime = action.payload;
        },
        // define of flight Class
        setFlightClass: (state, action) => {
            state.flightClass = action.payload;
        },
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

        // commented
        // setFetchFlightStatus: (state) => {
        //     state.fetchFlightStatus = 'idle';
        // },
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
            state.fetchAirportError = action.error.message;
        });
    },
});

//export const getAllAirport = (state) => state.flight.airports;
//export const getAirportFetchError = (state) => state.flight.fetchAirportError;
export const getAirportFetchStatus = (state) => state.flight.fetchAirportStatus; // used loading homesearch
export const getFilteredFromAirport = (state) => state.flight.filteredFromAirport; //used list filtered from homesearch
export const getFilteredToAirport = (state) => state.flight.filteredToAirport; //used list filtered to homesearch
export const getDisplayFromAirport = (state) => state.flight.displayFromAirport; // used from homesearch
export const getDisplayToAirport = (state) => state.flight.displayToAirport; // used to homesearch
//export const getLocationFromAirport = (state) => state.flight.fromAirport; //not used
//export const getLocationToAirport = (state) => state.flight.toAirport; //not used
export const getOneWay = (state) => state.flight.one_way; // used in fetch search-page
export const getTwoWay = (state) => state.flight.two_way; // used in fetch search-page
export const getIsTwoWay = (state) => state.flight.isTwoWay; // used switched two way homesearch
export const getDerpatureDateTime = (state) => state.flight.one_way.departureDateTime; // used departure date homesearch
export const getArrivalDateTime = (state) => state.flight.one_way.arrivalDateTime; // used arrivdal date homesearch
export const getFlightClass = (state) => state.flight.flightClass; // used flight class homesearch
export const getTotalPassenger = (state) => state.flight.totalPassenger; // used total passenger homesearch
export const getDewasaPassenger = (state) => state.flight.passengerType.dewasa; // used in choosepassengermodal
export const getAnakPassenger = (state) => state.flight.passengerType.anak; // used in choosepassengermodal
export const getBayiPassenger = (state) => state.flight.passengerType.bayi; // used in choosepassengermodal
export const getDisplayDerpatureDatetime = (state) => state.flight.displayDepartureDateTime; // used searchpage
//export const getFlights = (state) => state.flight.flights; //commented
//export const getFlightFetchStatus = (state) => state.flight.fetchFlightStatus; //commented

export default flightSlice.reducer;

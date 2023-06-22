import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import flightSlice from './flight';
import ticketSlice from './ticket';
import scheduleSlice from './schedule';
import airportSlice from './airport';
import passengerSlice from './passenger';
import historySlice from './history';
import testSlice from './test';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== 'undefined' ? createWebStorage('session') : createNoopStorage();

const persistConfig = {
    key: 'flight',
    storage,
};

// ngide 1 jam :'(
// const combineSlices = {
//     flight: flightSlice,
//     passenger: passengerSlice,
// };

// yg bener
const rootReducer = combineReducers({
    flight: flightSlice,
    passenger: passengerSlice,
    airport: airportSlice,
    schedule: scheduleSlice,
    ticket: ticketSlice,
    test: testSlice,
    history: historySlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: persistedReducer,
    middleware: [thunk],
});

export const persistor = persistStore(store);

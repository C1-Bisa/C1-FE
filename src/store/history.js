'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    historyDetail: {},
};

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setHistoryDetail: (state, action) => {
            state.historyDetail = action.payload;
        },
    },
});

export const getHistoryDetail = (state) => state.history.historyDetail;

export default historySlice.reducer;

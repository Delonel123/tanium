import {dataModelInfoSlice} from './dataModelInfoSlice';
import {dataTableModelSlice} from './dataTableModelSlice';
import {configureStore} from '@reduxjs/toolkit';
export const store = configureStore({
    reducer: {
        dataModelInfo: dataModelInfoSlice.reducer,
        dataTableModal: dataTableModelSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

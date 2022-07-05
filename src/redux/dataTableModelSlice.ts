import {fetchDataTableAPI} from './../utils/api/dataModelAPI';
import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
    data: [],
    isLoading: false,
};

export const dataTableModelSlice = createSlice({
    name: 'dataTableModal',
    initialState,
    reducers: {
        setDataModelTable: (state, action) => {
            state.data = action.payload;
        },
        toggleIsLoading: (state) => {
            state.isLoading = !state.isLoading;
        },
    },
});

export const fetchDataTableModel = createAsyncThunk(
    'dataTableModal',
    /* eslint-disable */
    async (body: any, thunkAPI) => {
        const properties = body;
        thunkAPI.dispatch(toggleIsLoading());
        const data = await fetchDataTableAPI(properties);
        thunkAPI.dispatch(setDataModelTable(data));
        thunkAPI.dispatch(toggleIsLoading());
    },
);

export const {setDataModelTable} = dataTableModelSlice.actions;
export const {toggleIsLoading} = dataTableModelSlice.actions;
export default dataTableModelSlice.reducer;


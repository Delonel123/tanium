import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {dataModel} from '../types/dataModelInfo';
import {fetchDataModelAPI} from '../utils/api/dataModelAPI';

// type dataModelInfoState = dataModelInfo[];

interface dataModelInfoState {
    data: dataModel;
}

const initialState: dataModelInfoState = {
    data: {
        guid: '',
        name: '',
        description: '',
        createdAt: '',
        updatedAt: '',
        revision: 0,
        objects: [],
    },
};
export const dataModelInfoSlice = createSlice({
    name: 'dataModelInfo',
    initialState,
    reducers: {
        setDataModelInfo: (state, action: PayloadAction<dataModel>) => {
            state.data = action.payload;
        },
    },
});

export const fetchDataModelInfo = createAsyncThunk(
    'dataModelInfo',
    async (_, thunkAPI) => {
        const data = await fetchDataModelAPI();
        thunkAPI.dispatch(setDataModelInfo(data));
    },
);

export const {setDataModelInfo} = dataModelInfoSlice.actions;
export default dataModelInfoSlice.reducer;

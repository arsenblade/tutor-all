import {createSlice} from '@reduxjs/toolkit';
import {asyncActionHomeworks} from '../actions';
import {IHomework} from '../../types/Homework.types';

interface IInitialStateSetHomework {
    homeworks: IHomework[],
    isLoading: boolean,
    error: boolean,
}

const initialState: IInitialStateSetHomework = {
    homeworks: [],
    isLoading: false,
    error: false,
};

export const setHomeworkSlice = createSlice({
    name: 'setHomework',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncActionHomeworks.getHomeworks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncActionHomeworks.getHomeworks.fulfilled, (state, {payload}) => {
                state.homeworks = payload;
                state.isLoading = false;
            })
            .addCase(asyncActionHomeworks.getHomeworks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const { reducer } = setHomeworkSlice;
export const actionsHomeworks = {
    ...setHomeworkSlice.actions,
};

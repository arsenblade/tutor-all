import {createSlice} from '@reduxjs/toolkit';
import {asyncActionHomeworks} from '../actions';
import {IHomework} from '../../types/Homework.types';

interface IInitialStateStudents {
    homeworks: IHomework[],
    isLoading: boolean,
    error: boolean,
}

const initialState: IInitialStateStudents = {
    homeworks: [],
    isLoading: false,
    error: false,
};

export const homeworksSlice = createSlice({
    name: 'homeworks',
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

export const { reducer } = homeworksSlice;
export const actionsHomeworks = {
    ...homeworksSlice.actions,
};

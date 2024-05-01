import {createSlice} from '@reduxjs/toolkit';
import {asyncActionHomeworks} from '../actions';
import {IStudentHomework} from '../../types/Homework.types';

interface IInitialStateStudentHomeworks {
    homeworks: IStudentHomework[],
    isLoading: boolean,
    error: boolean,
}

const initialState: IInitialStateStudentHomeworks = {
    homeworks: [],
    isLoading: false,
    error: false,
};

export const studentHomeworkSlice = createSlice({
    name: 'doingHomework',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncActionHomeworks.getStudentHomeworks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncActionHomeworks.getStudentHomeworks.fulfilled, (state, {payload}) => {
                state.homeworks = payload;
                state.isLoading = false;
            })
            .addCase(asyncActionHomeworks.getStudentHomeworks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const { reducer } = studentHomeworkSlice;
export const actionsHomeworks = {
    ...studentHomeworkSlice.actions,
};

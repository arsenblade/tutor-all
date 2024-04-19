import {createSlice} from '@reduxjs/toolkit';
import {asyncActionTeacher} from '../actions';
import {ITeacher} from '../../types/Teacher.types';

interface IInitialStateTeacher {
    teachers: ITeacher[],
    isLoading: boolean,
    error: boolean,
}

const initialState: IInitialStateTeacher = {
    teachers: [],
    isLoading: false,
    error: false,
};

export const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(asyncActionTeacher.getTeachers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncActionTeacher.getTeachers.fulfilled, (state, {payload}) => {
                state.teachers = payload;
                state.isLoading = false;
            })
            .addCase(asyncActionTeacher.getTeachers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const { reducer } = teacherSlice;
export const actionsTeacher = {
    ...teacherSlice.actions,
};

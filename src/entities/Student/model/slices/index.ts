import {createSlice} from '@reduxjs/toolkit';
import {asyncActionStudents} from '../actions';
import {IStudent} from '../../types/Student.types';

interface IInitialStateStudents {
    students: IStudent[],
    isLoadingSetHomework: boolean
    isLoading: boolean,
    error: boolean,
}

const initialState: IInitialStateStudents = {
    students: [],
    isLoadingSetHomework: false,
    isLoading: false,
    error: false,
};

export const studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncActionStudents.getStudents.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncActionStudents.getStudents.fulfilled, (state, {payload}) => {
                state.students = payload;
                state.isLoading = false;
            })
            .addCase(asyncActionStudents.getStudents.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(asyncActionStudents.setHomework.pending, (state) => {
                state.isLoadingSetHomework = true;
            })
            .addCase(asyncActionStudents.setHomework.fulfilled, (state, {payload}) => {
                state.students = state.students.map((student) => {
                    if (payload.id === student.id) {
                        return {
                            ...student,
                            setHomeworks: payload.setHomeworks,
                        };
                    }
                    
                    return student;
                });
                state.isLoadingSetHomework = false;
            })
            .addCase(asyncActionStudents.setHomework.rejected, (state, action) => {
                state.isLoadingSetHomework = false;
                state.error = true;
            });
    },
});

export const { reducer } = studentsSlice;
export const actionsNotification = {
    ...studentsSlice.actions,
};

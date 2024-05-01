import {createSlice} from '@reduxjs/toolkit';
import {asyncActionHomeworks} from '../actions';
import {IHomework} from '../../types/Homework.types';

interface IInitialStateDoingHomework {
    homework: IHomework,
    isLoading: boolean,
    error: boolean,
}

const initialState: IInitialStateDoingHomework = {
    homework: {
        id: '',
        idTeacher: '',
        name: '',
        questions: [],
    },
    isLoading: false,
    error: false,
};

export const doingHomeworkSlice = createSlice({
    name: 'doingHomework',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncActionHomeworks.getHomework.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncActionHomeworks.getHomework.fulfilled, (state, {payload}) => {
                state.homework = payload;
                state.isLoading = false;
            })
            .addCase(asyncActionHomeworks.getHomework.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const { reducer } = doingHomeworkSlice;
export const actionsHomeworks = {
    ...doingHomeworkSlice.actions,
};

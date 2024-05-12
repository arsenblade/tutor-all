import {createSlice} from '@reduxjs/toolkit';
import {IFillingTeacherTypes} from '../../types/FillingTeacher.types';
import {asyncActionFillingTeacher} from '../actions';

interface IInitialStateFillingTeacher {
    teacher: IFillingTeacherTypes,
    isLoading: boolean,
    isLoadingFillingTeacher: boolean,
    isEmptyInfo: boolean,
    error: boolean,
}

const initialState: IInitialStateFillingTeacher = {
    teacher: {
        name: '',
        description: '',
        education: '',
        experience: '',
        photo: '',
        price: '',
    },
    isLoading: false,
    isLoadingFillingTeacher: false,
    isEmptyInfo: false,
    error: false,
};

export const fillingTeacherSlice = createSlice({
    name: 'fillingTeacher',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(asyncActionFillingTeacher.getTeacherInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncActionFillingTeacher.getTeacherInfo.fulfilled, (state, {payload}) => {
                state.teacher = payload;
                state.isLoading = false;
            })
            .addCase(asyncActionFillingTeacher.getTeacherInfo.rejected, (state, action) => {
                if (action.payload?.response?.status === 404) {
                    state.isEmptyInfo = true;
                }
                state.isLoading = false;
                state.error = true;
            })
            .addCase(asyncActionFillingTeacher.fillingTeacherInfo.pending, (state) => {
                state.isLoadingFillingTeacher = true;
            })
            .addCase(asyncActionFillingTeacher.fillingTeacherInfo.fulfilled, (state, {payload}) => {
                state.teacher = payload;
                state.isLoadingFillingTeacher = false;
            })
            .addCase(asyncActionFillingTeacher.fillingTeacherInfo.rejected, (state) => {
                state.isLoadingFillingTeacher = false;
                state.error = true;
            })
            .addCase(asyncActionFillingTeacher.createTeacherInfo.fulfilled, (state) => {
                state.isEmptyInfo = false;
            })
            .addCase(asyncActionFillingTeacher.createTeacherInfo.rejected, (state) => {
                state.error = true;
            });
    },
});

export const { reducer } = fillingTeacherSlice;
export const actionsFillingTeacher = {
    ...fillingTeacherSlice.actions,
};

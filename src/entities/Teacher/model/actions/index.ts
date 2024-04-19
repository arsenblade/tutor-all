import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {axiosPrivate} from 'shared/api/axios';
import {ITeacher} from '../../types/Teacher.types';

const getTeachers = createAsyncThunk<ITeacher[], void, {
    rejectValue: AxiosError,
}>(
    'teachers',
    async (_, thunkApi) => {
        try {
            const response = await axiosPrivate.get<ITeacher[]>('teachers-info');

            return response.data;
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

const getTeacher = createAsyncThunk<ITeacher, {idTeacher: string}, {
    rejectValue: AxiosError,
}>(
    'teacher',
    async ({idTeacher}, thunkApi) => {
        try {
            const response = await axiosPrivate.get<ITeacher>(`teachers-info/${idTeacher}`);

            return response.data;
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

export const asyncActionTeacher = {
    getTeachers,
    getTeacher,
};

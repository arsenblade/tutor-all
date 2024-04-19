import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {axiosPrivate} from 'shared/api/axios';
import {IHomework} from '../../types/Homework.types';

const getHomeworks = createAsyncThunk<IHomework[], {idTeacher: string}, {
    rejectValue: AxiosError,
}>(
    'getHomeworks',
    async ({idTeacher}, thunkApi) => {
        try {
            const response = await axiosPrivate.get<IHomework[]>(`homeworks?idTeachers=${idTeacher}`);

            return response.data;
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

export const asyncActionHomeworks = {
    getHomeworks,
};

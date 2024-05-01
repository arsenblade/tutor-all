import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {axiosPrivate} from 'shared/api/axios';
import {IHomework, ISignUp, IStudentHomework} from '../../types/Homework.types';

const getHomeworks = createAsyncThunk<IHomework[], {idTeacher: string}, {
    rejectValue: AxiosError,
}>(
    'getHomeworks',
    async ({idTeacher}, thunkApi) => {
        try {
            const response = await axiosPrivate.get<IHomework[]>(`homeworks?idTeacher=${idTeacher}`);

            return response.data;
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

const getHomework = createAsyncThunk<IHomework, {idHomework: string}, {
    rejectValue: AxiosError,
}>(
    'getHomework',
    async ({idHomework}, thunkApi) => {
        try {
            const response = await axiosPrivate.get<IHomework>(`homeworks/${idHomework}`);

            return response.data;
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

const getStudentHomeworks = createAsyncThunk<IStudentHomework[], {idStudent: string}, {
    rejectValue: AxiosError,
}>(
    'getStudentHomeworks',
    async ({idStudent}, thunkApi) => {
        try {
            const response = await axiosPrivate.get<ISignUp[]>(`sign-up?idStudent=${idStudent}`);

            const defaultHomeworks = response.data.flatMap((homework) => {
                return homework.setHomeworks;
            });

            return defaultHomeworks;
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

export const asyncActionHomeworks = {
    getHomeworks,
    getHomework,
    getStudentHomeworks,
};

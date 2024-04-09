import {createAsyncThunk, AsyncThunkOptions} from '@reduxjs/toolkit';
import {axiosPrivate} from 'shared/api/axios';
import {IFillingTeacherTypes, IFillingTeacherInfoParams, IGetTeacherInfoParams} from '../../types/FillingTeacher.types';
import {AxiosError} from 'axios';
import type {Dispatch} from 'redux';

// eslint-disable-next-line no-undef
const getTeacherInfo = createAsyncThunk<IFillingTeacherTypes, IGetTeacherInfoParams, {
    rejectValue: AxiosError,
}>(
    'getTeacherInfo',
    async ({idUser}, thunkApi) => {
        try {
            const response = await axiosPrivate.get<IFillingTeacherTypes>(`teachers-info/${idUser}`);
            return response.data;
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

const createTeacherInfo = createAsyncThunk<boolean, IGetTeacherInfoParams, {
    rejectValue: AxiosError,
}>(
    'createTeacherInfo',
    async ({idUser}, thunkApi) => {
        try {
            const defaultTeacherInfo = {
                name: '',
                description: '',
                education: '',
                experience: '',
                photo: '',
            };

            await axiosPrivate.post('teachers-info', {
                id: idUser,
                ...defaultTeacherInfo,
            });

            return true;
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

const fillingTeacherInfo = createAsyncThunk<IFillingTeacherTypes, IFillingTeacherInfoParams, {
    rejectValue: AxiosError,
}>(
    'fillingTeacherInfo',
    async ({idUser, teacher}, thunkApi) => {
        try {
            const response = await axiosPrivate.put(`teachers-info/${idUser}`, {
                id: idUser,
                ...teacher,
            });

            return response.data;
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

export const asyncActionFillingTeacher = {
    getTeacherInfo,
    fillingTeacherInfo,
    createTeacherInfo,
};

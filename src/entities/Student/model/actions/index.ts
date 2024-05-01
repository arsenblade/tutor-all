import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {axiosPrivate} from 'shared/api/axios';
import {IStudent} from '../../types/Student.types';

const getStudents = createAsyncThunk<IStudent[], {idTeacher: string}, {
    rejectValue: AxiosError,
}>(
    'getStudents',
    async ({idTeacher}, thunkApi) => {
        try {
            const response = await axiosPrivate.get<IStudent[]>(`sign-up?idTeacher=${idTeacher}`);

            return response.data;
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

const setHomework = createAsyncThunk<{setHomeworks: {id: string, name: string}[], id: number}, {selectedHomework: {id: string, name: string}[], id: number}, {
    rejectValue: AxiosError,
}>(
    'setHomework',
    async ({selectedHomework, id}, thunkApi) => {
        try {
            await axiosPrivate.patch(`sign-up/${id}`, {setHomeworks: selectedHomework});

            return {setHomeworks: selectedHomework, id};
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

export const asyncActionStudents = {
    getStudents,
    setHomework,
};

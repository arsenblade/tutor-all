import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {axiosPrivate} from 'shared/api/axios';
import {IGradeStudents} from '../../types/GradeStudent';

const getStudentStatistics = createAsyncThunk<IGradeStudents[], {idStudent: string}, {
    rejectValue: AxiosError,
}>(
    'getStudentStatistics',
    async ({idStudent}, thunkApi) => {
        try {
            const response = await axiosPrivate.get<IGradeStudents[]>(`grades-students?idStudent=${idStudent}`);

            return response.data;
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

export const asyncActionStudentStatistics = {
    getStudentStatistics,
};

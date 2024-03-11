import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosPrivate} from 'shared/api/axios';
import {ICreateHomework} from '../../types/Homework.types';

const createHomework = createAsyncThunk<boolean, ICreateHomework>(
    'createHomework',
    async ({homework, idUser}, thunkApi) => {
        try {
            await axiosPrivate.post(`/homeworks-teachers/${idUser}`, homework);

            return true;
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    },
);
export const asyncActionCreateHomework = {
    createHomework,
};

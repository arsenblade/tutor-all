import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {axiosPrivate} from 'shared/api/axios';
import {INotification} from '../../types/Notification.types';

const getNotification = createAsyncThunk<INotification[], {idUser: string}, {
    rejectValue: AxiosError,
}>(
    'notification',
    async ({idUser}, thunkApi) => {
        try {
            const response = await axiosPrivate.get<INotification[]>(`notifications?idTo=${idUser}`);

            return response.data;
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

const removeNotification = createAsyncThunk<{idNotification: string}, {idNotification: string}, {
    rejectValue: AxiosError,
}>(
    'removeNotification',
    async ({idNotification}, thunkApi) => {
        try {
            await axiosPrivate.delete(`notifications/${idNotification}`);

            return {idNotification};
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

export const asyncActionNotifications = {
    getNotification,
    removeNotification,
};

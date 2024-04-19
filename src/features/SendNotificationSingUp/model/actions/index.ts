import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {axiosPrivate} from 'shared/api/axios';
import {INotification} from 'entities/Notification';

const sendNotificationSingUp = createAsyncThunk<boolean, INotification, {
    rejectValue: AxiosError,
}>(
    'sendNotificationSingUp',
    async (notification, thunkApi) => {
        try {
            await axiosPrivate.post('notifications', notification);

            return true;
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

export const asyncActionSendNotificationSingUp = {
    sendNotificationSingUp,
};

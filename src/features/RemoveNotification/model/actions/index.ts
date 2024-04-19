import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {axiosPrivate} from 'shared/api/axios';

const removeNotification = createAsyncThunk<boolean, {idNotification: string}, {
    rejectValue: AxiosError,
}>(
    'removeNotification',
    async ({idNotification}, thunkApi) => {
        try {
            await axiosPrivate.delete(`sign-up/${idNotification}`);

            return true;
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

export const asyncActionRemoveNotification = {
    removeNotification,
};

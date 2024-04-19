import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {axiosPrivate} from 'shared/api/axios';
import {ISignUpTeacher} from '../../types/SignUpTeacher';

const signUpTeacher = createAsyncThunk<boolean, ISignUpTeacher, {
    rejectValue: AxiosError,
}>(
    'sendNotificationSingUp',
    async (signUpTeacher, thunkApi) => {
        try {
            await axiosPrivate.post('sign-up', signUpTeacher);

            return true;
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

export const asyncActionSingUpTeacher = {
    signUpTeacher,
};

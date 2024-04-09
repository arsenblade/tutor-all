import { createAsyncThunk } from '@reduxjs/toolkit';
import {axiosPrivate, axiosPublic} from 'shared/api/axios';
import {
    IUserLogin,
    IUserLoginResponse,
    IUserRegistrationParams,
    IUserRegistrationResponse,
    IUserState,
} from '../../types/User';
import {AxiosError} from 'axios';

export const registration = createAsyncThunk<IUserState, IUserRegistrationParams, {
    rejectValue: AxiosError,
}>(
    'registration',
    async (user, thunkApi) => {
    try {
        const response = await axiosPublic.post<IUserRegistrationResponse>('/registration', user);

        const registrationUser = response.data.user;

        await axiosPublic.post('/users', registrationUser);

        localStorage.setItem('token', response.data.token);

        return {
            id: registrationUser.id,
            email: registrationUser.email,
            roles: registrationUser.roles,
            name: registrationUser.name,
            avatar: registrationUser.avatar,
            isBanned: registrationUser.isBanned,
            regDate: registrationUser.regDate,
        };
    } catch (error) {
        const errorTyped = error as AxiosError;
        return thunkApi.rejectWithValue(errorTyped);
    }
},
);

export const login = createAsyncThunk<IUserState, IUserLogin, {
    rejectValue: AxiosError,
}>(
    'login',
    async (user, thunkApi) => {
        try {
            const response = await axiosPublic.post<IUserLoginResponse>('/login', user);

            const loginUser = response.data.user;

            localStorage.setItem('token', response.data.token);

            return {
                id: loginUser.id,
                email: loginUser.email,
                roles: loginUser.roles,
                name: loginUser.name,
                avatar: loginUser.avatar,
                isBanned: loginUser.isBanned,
                regDate: loginUser.regDate,
            };
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

export const logout = createAsyncThunk<null, void, {
    rejectValue: AxiosError,
}>(
    'logout',
    async (_, thunkApi) => {
        try {
            localStorage.removeItem('token');

            return null;
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

export const checkAuth = createAsyncThunk<IUserState, void, {
    rejectValue: AxiosError,
}>(
    'checkAuth',
    async (_, thunkApi) => {
        try {
            const response = await axiosPrivate.get<IUserLoginResponse>('/check-auth');

            const loginUser = response.data.user;

            return {
                id: loginUser.id,
                email: loginUser.email,
                roles: loginUser.roles,
                name: loginUser.name,
                avatar: loginUser.avatar,
                isBanned: loginUser.isBanned,
                regDate: loginUser.regDate,
            };
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

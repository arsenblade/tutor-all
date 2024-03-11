import { createAsyncThunk } from '@reduxjs/toolkit';
import {axiosPrivate, axiosPublic} from 'shared/api/axios';
import {
    IUserLogin,
    IUserLoginResponse,
    IUserRegistrationParams,
    IUserRegistrationResponse,
    IUserState,
} from '../../types/User';

export const registration = createAsyncThunk<IUserState, IUserRegistrationParams>(
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
    } catch (e) {
        return thunkApi.rejectWithValue(e);
    }
},
);

export const login = createAsyncThunk<IUserState, IUserLogin>(
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
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    },
);

export const logout = createAsyncThunk<null, void>(
    'logout',
    async (_, thunkApi) => {
        try {
            localStorage.removeItem('token');

            return null;
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    },
);

export const checkAuth = createAsyncThunk<IUserState, void>(
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
        } catch (e) {
            return thunkApi.rejectWithValue(e);
        }
    },
);

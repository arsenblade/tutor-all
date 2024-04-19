import { createSlice } from '@reduxjs/toolkit';
import {checkAuth, login, logout, registration, updateNotification} from '../actions';
import {
    IInitialStateAuth,
} from '../../types/User';

const initialState: IInitialStateAuth = {
    isLoading: false,
    error: '',
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registration.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(registration.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                state.user = {
                    id: payload.id,
                    email: payload.email,
                    roles: payload.roles,
                    name: payload.name,
                    avatar: payload.avatar,
                    regDate: payload.regDate,
                    isBanned: payload.isBanned,
                    notificationNumbers: payload.notificationNumbers,
                };
            })
            .addCase(registration.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                state.user = {
                    id: payload.id,
                    email: payload.email,
                    roles: payload.roles,
                    name: payload.name,
                    avatar: payload.avatar,
                    regDate: payload.regDate,
                    isBanned: payload.isBanned,
                    notificationNumbers: payload.notificationNumbers,
                };
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                state.user = {
                    id: payload.id,
                    email: payload.email,
                    roles: payload.roles,
                    name: payload.name,
                    avatar: payload.avatar,
                    regDate: payload.regDate,
                    isBanned: payload.isBanned,
                    notificationNumbers: payload.notificationNumbers,
                };
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state, { payload }) => {
                state.user = payload;
            })
            .addCase(updateNotification.fulfilled, (state, { payload }) => {
                if (state.user) {
                    state.user.notificationNumbers = payload.notificationNumbers;
                }
            });
    },
});

export const { reducer } = authSlice;

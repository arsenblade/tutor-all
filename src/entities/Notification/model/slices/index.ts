import {createSlice} from '@reduxjs/toolkit';
import {asyncActionNotifications} from '../actions';
import {INotification} from '../../types/Notification.types';

interface IInitialStateNotification {
    notifications: INotification[],
    isLoading: boolean,
    error: boolean,
}

const initialState: IInitialStateNotification = {
    notifications: [],
    isLoading: false,
    error: false,
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncActionNotifications.getNotification.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncActionNotifications.getNotification.fulfilled, (state, {payload}) => {
                state.notifications = payload;
                state.isLoading = false;
            })
            .addCase(asyncActionNotifications.getNotification.rejected, (state, action) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(asyncActionNotifications.removeNotification.fulfilled, (state, {payload}) => {
                state.notifications = state.notifications.filter((notification) => notification.id !== payload.idNotification);
            });
    },
});

export const { reducer } = notificationSlice;
export const actionsNotification = {
    ...notificationSlice.actions,
};

import {logout, registration, login, checkAuth, updateNotification} from './model/actions';
import { reducer as authReducer } from './model/slices';

const authActions = {
    logout,
    registration,
    login,
    checkAuth,
    updateNotification,
};

export {
    authActions,
    authReducer,
};

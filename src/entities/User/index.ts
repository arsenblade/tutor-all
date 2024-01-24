import {logout, registration, login, checkAuth} from './model/actions';
import { reducer as authReducer } from './model/slices';

const authActions = {
    logout,
    registration,
    login,
    checkAuth,
};

export {
    authActions,
    authReducer,
};

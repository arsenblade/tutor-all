import { combineReducers } from 'redux';
import {authReducer} from 'entities/User';

export const rootReducers = combineReducers({
    authReducer,
});

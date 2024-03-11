import { combineReducers } from 'redux';
import {authReducer} from 'entities/User';
import {createHomeworkReducer} from 'features/CreateHomework';

export const rootReducers = combineReducers({
    authReducer,
    createHomeworkReducer,
});

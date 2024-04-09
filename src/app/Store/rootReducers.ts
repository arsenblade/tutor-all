import { combineReducers } from 'redux';
import {authReducer} from 'entities/User';
import {createHomeworkReducer} from 'features/CreateHomework';
import {fillingTeacherSlice} from 'features/FillingTeacher';

export const rootReducers = combineReducers({
    authReducer,
    createHomeworkReducer,
    fillingTeacherSlice,
});

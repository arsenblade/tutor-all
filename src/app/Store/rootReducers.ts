import { combineReducers } from 'redux';
import {authReducer} from 'entities/User';
import {createHomeworkReducer} from 'features/CreateHomework';
import {fillingTeacherSlice} from 'features/FillingTeacher';
import {teacherSlice} from 'entities/Teacher';
import {notificationSlice} from 'entities/Notification';
import {studentsSlice} from 'entities/Student';
import {setHomeworkSlice, doingHomeworkSlice, studentHomeworkSlice} from 'entities/Homework';

export const rootReducers = combineReducers({
    authReducer,
    createHomeworkReducer,
    fillingTeacherSlice,
    teacherSlice,
    notificationSlice,
    studentsSlice,
    setHomeworkSlice,
    doingHomeworkSlice,
    studentHomeworkSlice,
});

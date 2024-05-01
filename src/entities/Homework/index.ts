import { reducer as setHomeworkSlice } from './model/slices/setHomework';
import { reducer as doingHomeworkSlice } from './model/slices/doingHomework';
import { reducer as studentHomeworkSlice } from './model/slices/studentHomeworks';

export {
    setHomeworkSlice,
    doingHomeworkSlice,
    studentHomeworkSlice,
};

export {default as SelectHomework} from './ui/SelectHomework';

export type {IHomework} from './types/Homework.types';

export {asyncActionHomeworks} from './model/actions';

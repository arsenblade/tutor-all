import { reducer as studentsSlice } from './model/slices';

export {
    studentsSlice,
};

export {default as SelectStudent} from './ui/SelectStudent';

export type {IStudent} from './types/Student.types';

export {asyncActionStudents} from './model/actions';

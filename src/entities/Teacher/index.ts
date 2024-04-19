import { reducer as teacherSlice } from './model/slices';

export {default as TeacherCard} from './ui/TeacherCard';
export {default as MostPopularTeacher} from './ui/MostPopularTeacher/MostPopularTeacher';

export {asyncActionTeacher} from './model/actions';

export {
    teacherSlice,
};

export type {ITeacher} from './types/Teacher.types';

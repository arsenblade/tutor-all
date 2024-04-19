import { reducer as homeworksSlice } from './model/slices';

export {
    homeworksSlice,
};

export {default as SelectHomework} from './ui/SelectHomework';

export type {IHomework} from './types/Homework.types';

export {asyncActionHomeworks} from './model/actions';

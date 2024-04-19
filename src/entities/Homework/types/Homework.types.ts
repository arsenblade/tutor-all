import {IQuestion} from 'entities/Question';

export interface IHomework {
    id: string,
    name: string,
    idTeacher: string,
    questions: IQuestion[],
    isAssigned?: boolean
}

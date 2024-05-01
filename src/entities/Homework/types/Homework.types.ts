import {IQuestion} from 'entities/Question';

export interface IHomework {
    id: string,
    name: string,
    idTeacher: string,
    questions: IQuestion[],
    isAssigned?: boolean
}

export interface ISignUp {
    idTeacher: string,
    nameTeacher: string,
    idStudent: string,
    nameStudent: string,
    setHomeworks: IStudentHomework[],
    id: number
}

export interface IStudentHomework {
    id: string,
    name: string,
    lengthQuestions: number
}

import {IQuestion} from 'entities/Question/types/Question.types';

export interface ICreateHomework {
    homework: IHomework,
    idUser: string,
}

export interface IHomework {
    id: string,
    name: string,
    idTeacher: string,
    questions: IQuestion[],
}

export interface ICorrectAnswer {
    id: string,
    correctAnswerIds: string[],
    idHomework: string,
    idQuestion: string,
}

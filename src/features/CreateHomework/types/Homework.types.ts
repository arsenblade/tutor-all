import {IHomework} from 'entities/Homework';

export interface ICreateHomework {
    homework: IHomework,
    idUser: string,
}

export interface ICorrectAnswer {
    id: string,
    correctAnswerIds: string[],
    idHomework: string,
    idQuestion: string,
}

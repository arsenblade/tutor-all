import {IAnswer} from './Answer.types';

export interface IQuestion {
    id: string,
    text: string,
    type: 'checkbox' | 'radio' | 'text',
    answers: IAnswer[],
}

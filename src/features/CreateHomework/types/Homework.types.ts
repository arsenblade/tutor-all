import {IHomework} from 'entities/Homework';

export interface ICreateHomework {
    homework: IHomework,
    idUser: string,
}

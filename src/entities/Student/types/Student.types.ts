export interface IStudent {
    idTeacher: string,
    nameTeacher: string,
    idStudent: string,
    nameStudent: string,
    setHomeworks: {id: string, name: string}[];
    id: number
}

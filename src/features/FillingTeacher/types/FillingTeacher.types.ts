export interface IFillingTeacherTypes {
    name: string,
    description: string,
    photo: string,
    experience: string,
    education: string,
    price: string,
}

export interface IGetTeacherInfoParams {
    idUser: string
}

export interface IFillingTeacherInfoParams {
    idUser: string,
    teacher: IFillingTeacherTypes,
}

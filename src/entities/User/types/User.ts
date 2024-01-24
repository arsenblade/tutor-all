export interface IUser {
    id: string;
    email: string;
    password: string;
    roles: string[];
    name: string;
    avatar: string;
    regDate: string;
    isBanned: boolean;
}

export interface IUserRegistrationParams extends Omit<IUser, 'id' | 'pointTests' | 'regDate' | 'isBanned'> {}

export interface IUserRegistrationResponse {
    token: string;
    user: IUser;
}

export interface IUserLogin extends Omit<IUser, 'id' | 'name' | 'avatar' | 'pointTests' | 'regDate' | 'isBanned' | 'roles'> {}

export interface IUserLoginResponse {
    token: string;
    user: IUser;
}

export interface IUserState extends Omit<IUser, 'id' | 'email' | 'password'> {}

export interface IInitialStateAuth {
    isLoading: boolean;
    error: string;
    user: IUserState | null
}

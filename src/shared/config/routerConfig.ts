import { ComponentType } from 'react';
import {HomePage} from 'pages/Home';
import {ErrorPage} from 'pages/Error';
import {LoginPage, RegistrationPage} from 'pages/Auth';
import {TeachersPage} from 'pages/Teachers';
import {ProfilePage} from '../../pages/Profile';
import {CreateTeacher} from '../../pages/CreateTeacher';
import {TeacherPage} from '../../pages/Teacher';

interface IRoute {
    path: string,
    Component: ComponentType
}

export enum Routes {
    HOME_ROUTE = '/',
    REGISTER_ROUTE = '/register',
    LOGIN_ROUTE = '/login',
    TEACHERS_ROUTE = '/teachers',
    TEACHER_ROUTE = '/teachers/:id',
    PROFILE_ROUTE = '/profile',
    CREATE_TEACHER_ROUTE = '/profile/create-teacher',
    PAGE_404 = '*',
}

export const publicRoutes: IRoute[] = [
    {
        path: Routes.HOME_ROUTE,
        Component: HomePage,
    },
    {
        path: Routes.PAGE_404,
        Component: ErrorPage,
    },
    {
        path: Routes.TEACHERS_ROUTE,
        Component: TeachersPage,
    },
    {
        path: Routes.TEACHER_ROUTE,
        Component: TeacherPage,
    },
];

export const notAuthRoutes: IRoute[] = [
    {
        path: Routes.LOGIN_ROUTE,
        Component: LoginPage,
    },
    {
        path: Routes.REGISTER_ROUTE,
        Component: RegistrationPage,
    },
];

export const studentRoutes: IRoute[] = [
    {
        path: Routes.PROFILE_ROUTE,
        Component: ProfilePage,
    },
];

export const teacherRoutes: IRoute[] = [
    {
        path: Routes.PROFILE_ROUTE,
        Component: ProfilePage,
    },
    {
        path: Routes.CREATE_TEACHER_ROUTE,
        Component: CreateTeacher,
    },
];

export const adminRoutes: IRoute[] = [

];

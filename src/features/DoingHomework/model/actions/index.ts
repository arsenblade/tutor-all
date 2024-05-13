import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {axiosPrivate} from 'shared/api/axios';
import {IGradeStudents} from '../../types/GradeStudents';
import {ISignUp} from 'entities/Homework/types/Homework.types';

const submitHomework = createAsyncThunk<boolean, IGradeStudents, {
    rejectValue: AxiosError,
}>(
    'submitHomework',
    async (gradeStudents, thunkApi) => {
        try {
            await axiosPrivate.post('grades-students', gradeStudents);

            return true;
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

const removeFillingHomework = createAsyncThunk<boolean, {idTeacher: string, idStudent: string, idHomework: string}, {
    rejectValue: AxiosError,
}>(
    'removeFillingHomework',
    async ({idTeacher, idStudent, idHomework}, thunkApi) => {
        try {
            const response = await axiosPrivate.get<ISignUp[]>(`sign-up?idTeacher${idTeacher}&idStudent=${idStudent}`);
            const data = response.data[0];

            const setHomeworks = data.setHomeworks.filter((setHomework) => setHomework.id !== idHomework);
            data.setHomeworks = setHomeworks;

            await axiosPrivate.put<ISignUp>(`sign-up/${data.id}`, data);
            
            return true;
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);

export const asyncActionDoingHomework = {
    submitHomework,
    removeFillingHomework,
};

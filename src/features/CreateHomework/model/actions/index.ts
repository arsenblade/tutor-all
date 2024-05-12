import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosPrivate} from 'shared/api/axios';
import {ICreateHomework} from '../../types/Homework.types';
import {AxiosError} from 'axios';
import {ICorrectAnswer} from 'entities/Homework';

const uuid = require('uuid');

const createHomework = createAsyncThunk<boolean, ICreateHomework, {
    rejectValue: AxiosError,
}>(
    'createHomework',
    async ({homework, idUser}, thunkApi) => {
        try {
            const correctAnswers: ICorrectAnswer[] = [];
            const createHomework = {
                id: homework.id,
                name: homework.name,
                idTeacher: homework.idTeacher,
                questions: homework.questions.map((question) => {
                    const correctAnswersIds: string[] = [];
                    const answers = question.answers.map((answer) => {
                        if (answer.isCorrect) {
                            correctAnswersIds.push(answer.id);
                        }

                        return {
                            id: answer.id,
                            text: answer.text,
                        };
                    });

                    correctAnswers.push({
                        id: uuid.v4(),
                        correctAnswerIds: correctAnswersIds,
                        idHomework: homework.id,
                        idQuestion: question.id,
                        allAnswers: question.answers.length,
                    });

                    return {
                        ...question,
                        answers,
                    };
                }),

            };
            createHomework.idTeacher = idUser;

            Promise.all([
                await axiosPrivate.post('/homeworks/', createHomework),
                await axiosPrivate.post('/correct-answers/', {
                    idHomework: homework.id,
                    answers: correctAnswers,
                }),
            ]).then((responses) => {
                console.log(responses);
            });

            return true;
        } catch (error) {
            const errorTyped = error as AxiosError;
            return thunkApi.rejectWithValue(errorTyped);
        }
    },
);
export const asyncActionCreateHomework = {
    createHomework,
};

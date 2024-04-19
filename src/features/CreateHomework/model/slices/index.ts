import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {asyncActionCreateHomework} from '../actions';
import {IQuestion} from 'entities/Question';
import {IHomework} from 'entities/Homework';

interface IInitialStateAuth {
    homework: IHomework,
    isLoading: boolean,
    error: boolean,
}

const uuid = require('uuid');

const initialState: IInitialStateAuth = {
    homework: {
        id: uuid.v4(),
        name: '',
        idTeacher: '',
        questions: [
            {
                id: uuid.v4(),
                text: '',
                type: 'radio',
                answers: [
                    {
                        id: uuid.v4(),
                        text: '',
                        isCorrect: false,
                    },
                    {
                        id: uuid.v4(),
                        text: '',
                        isCorrect: false,
                    },
                ],
            },
        ],
    },
    isLoading: false,
    error: false,
};

export const authSlice = createSlice({
    name: 'createHomework',
    initialState,
    reducers: {
        addQuestion(state) {
            state.homework.questions.push({
                id: uuid.v4(),
                text: '',
                type: 'radio',
                answers: [
                    {
                        id: uuid.v4(),
                        text: '',
                        isCorrect: false,
                    },
                    {
                        id: uuid.v4(),
                        text: '',
                        isCorrect: false,
                    },
                ],
            });
        },
        changeQuestion(state, action: PayloadAction<IQuestion>) {
            state.homework.questions = state.homework.questions.map((question) => {
                if (question.id === action.payload.id) {
                    return action.payload;
                }

                return question;
            });
        },
        changeNameHomework(state, action: PayloadAction<string>) {
            state.homework.name = action.payload;
        },
        addAnswer(state, action: PayloadAction<{idQuestion: string}>) {
            state.homework.questions = state.homework.questions.map((question) => {
                if (question.id === action.payload.idQuestion) {
                    const answers = [...question.answers, {
                        id: uuid.v4(),
                        text: '',
                        isCorrect: false,
                    }];

                    return {
                        ...question,
                        answers,
                    };
                }

                return question;
            });
        },
        removeAnswer(state, action: PayloadAction<{indexQuestion: number, indexAnswer: number}>) {
            const answer = state.homework.questions[action.payload.indexQuestion].answers;
            answer.splice(action.payload.indexAnswer, 1);
            state.homework.questions[action.payload.indexQuestion].answers = answer;
        },
        removeQuestion(state, action: PayloadAction<{questionId: string}>) {
            state.homework.questions = state.homework.questions.filter((question) => question.id !== action.payload.questionId);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncActionCreateHomework.createHomework.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(asyncActionCreateHomework.createHomework.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(asyncActionCreateHomework.createHomework.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const { reducer } = authSlice;
export const actionsCreateHomework = {
    ...authSlice.actions,
};

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IHomework} from '../../types/Homework.types';
import {asyncActionCreateHomework} from '../actions';
import {IQuestion} from 'entities/Question';

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
        questions: [
            {
                id: uuid.v4(),
                text: '',
                type: 'radio',
                answers: [
                    {
                        id: uuid.v4(),
                        text: '',
                    },
                    {
                        id: uuid.v4(),
                        text: '',
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
                    }];
                    console.log(answers);

                    return {
                        ...question,
                        answers,
                    };
                }

                return question;
            });
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

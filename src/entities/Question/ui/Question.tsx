import {ChangeEvent, memo, useCallback, useState} from 'react';
import CustomInput from 'shared/ui/CustomInput/CustomInput';
import {IQuestion} from '../types/Question.types';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import Button from 'shared/ui/Button/Button';
import AnswerItem from './components/AnswerItem';
import styles from './Question.module.scss';

const tabs = [
    {
        name: 'Несколько ответов',
        value: 'maneAnswer',
    },
    {
        name: 'Текстовый ответ',
        value: 'textAnswer',
    },
];

interface QuestionsPropsInterface {
    question: IQuestion,
    onChange: ActionCreatorWithPayload<IQuestion, 'createHomework/changeQuestion'>
    onClickAddAnswer: (idQuestion: string) => void
    onClickRemoveAnswer: (indexQuestion: number, indexAnswer: number) => void
    onClickRemoveQuestion: (questionId: string) => void
    index: number,
}

function Question({question, onChange, index, onClickAddAnswer, onClickRemoveAnswer, onClickRemoveQuestion}: QuestionsPropsInterface) {
    const [activeTab, setActiveTab] = useState(tabs[0].value);

    const handleChangeTab = (tab: string) => {
        setActiveTab(tab);
    };

    const handleChangeTextQuestion = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...question,
            text: event.target.value,
        });
    }, [question]);

    const handleChangeTextAnswer = useCallback((textAnswer: string, idAnswer: string) => {
        onChange({
            ...question,
            answers: question.answers.map((answer) => {
                if (answer.id === idAnswer) {
                    return {
                        id: answer.id,
                        text: textAnswer,
                        isCorrect: answer.isCorrect,
                    };
                }

                return answer;
            }),
        });
    }, [question]);

    const handleChangeIsCorrectAnswer = useCallback((isCorrect: boolean, idAnswer: string) => {
        onChange({
            ...question,
            answers: question.answers.map((answer) => {
                if (answer.id === idAnswer) {
                    return {
                        id: answer.id,
                        text: answer.text,
                        isCorrect,
                    };
                }

                return answer;
            }),
        });
    }, [question]);

    const handleClickAddAnswer = () => {
        onClickAddAnswer(question.id);
    };

    const handleClickRemoveAnswer = (indexAnswer: number) => {
        onClickRemoveAnswer(index, indexAnswer);
    };

    const handleClickRemoveQuestion = () => {
        onClickRemoveQuestion(question.id);
    };

    return (
      <div className={styles.question}>
        <div className={styles.fieldQuestionContainer}>
          <h3 className={styles.numberQuestion}>{index + 1} Вопрос</h3>
          {index !== 0 ? (
            <button
              className={styles.questionRemove}
              onClick={handleClickRemoveQuestion}
            >
              <svg
                className={styles.answerIconRemove}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </button>
            ) : null}
          <CustomInput
            className={styles.fieldQuestion}
            value={question.text}
            onChange={handleChangeTextQuestion}
            type="text"
            placeholder="Введите текст вопроса"
          />
        </div>
        <h3 className={styles.title}>
          Ответы к вопросу
        </h3>
        <div className={styles.answers}>

          <div className={styles.answersList}>
            {question.answers.map((answer, index) => (
              <AnswerItem
                key={answer.id}
                answer={answer}
                indexAnswer={index}
                onChange={handleChangeTextAnswer}
                onChangeCorrectAnswer={handleChangeIsCorrectAnswer}
                onClickRemoveAnswer={handleClickRemoveAnswer}
              />
                ))}
            <Button color="Blue" onClick={handleClickAddAnswer}>Добавить ответ</Button>
          </div>
        </div>
      </div>
    );
}

export default memo(Question);

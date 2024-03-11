import {ChangeEvent, memo, useCallback} from 'react';
import CustomInput from 'shared/ui/CustomInput/CustomInput';
import {IQuestion} from '../types/Question.types';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';
import Button from 'shared/ui/Button/Button';
import AnswerItem from './components/AnswerItem';

interface QuestionsPropsInterface {
    question: IQuestion,
    onChange: ActionCreatorWithPayload<IQuestion, 'createHomework/changeQuestion'>
    onClickAddAnswer: (idQuestion: string) => void
    index: number,
}

function Question({question, onChange, index, onClickAddAnswer}: QuestionsPropsInterface) {
    const handleChangeTextQuestion = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...question,
            text: event.target.value,
        });
    }, [question.text]);

    const handleChangeTextAnswer = useCallback((textAnswer: string, idAnswer: string) => {
        onChange({
            ...question,
            answers: [
                ...question.answers,
                {
                    id: idAnswer,
                    text: textAnswer,
                },
            ],
        });
    }, []);

    const handleClickAddAnswer = () => {
        onClickAddAnswer(question.id);
    };

    return (
      <div>
        <div>
          <span>{index}</span>
          <CustomInput
            value={question.text}
            onChange={handleChangeTextQuestion}
            type="text"
            placeholder="Введите текст вопроса"
          />
        </div>
        <h3>
          Ответы к вопросу
        </h3>
        <div>
          {question.answers.map((answer) => (
            <AnswerItem
              key={answer.id}
              answer={answer}
              onChange={handleChangeTextAnswer}
            />
            ))}
          <Button color="Green" onClick={handleClickAddAnswer}>Добавить ответ</Button>
        </div>
      </div>
    );
}

export default memo(Question);

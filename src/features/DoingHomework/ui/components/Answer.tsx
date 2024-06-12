import styles from '../DoingHomework.module.scss';
import {IAnswer, IQuestion} from 'entities/Question';
import Checkbox from 'shared/ui/Checkbox/Checkbox';
import {Fragment} from 'react';
import Radio from 'shared/ui/Radio/Radio';
import CustomInput from '../../../../shared/ui/CustomInput/CustomInput';

interface IAnswerItem {
    answer: IAnswer
    question: IQuestion
    idQuestion: string
    onChange: (idQuestion: string, idAnswer: string, checked: boolean, type: string) => void
    isSubmit: boolean
}

export default function AnswerItem({answer, question, idQuestion, onChange, isSubmit}: IAnswerItem) {
    return (
      <>
        {question.type === 'radio' ? (
          <Radio
            type={idQuestion}
            className={styles.answerRadio}
            onChange={(event) => onChange(idQuestion, answer.id, event, question.type)}
            checked={answer.isCorrect}
            disabled={isSubmit}
          >
            {answer.text}
          </Radio>
          ) : null}

        {question.type === 'checkbox' ? (
          <Checkbox
            className={styles.answerCheckbox}
            onChange={(event) => onChange(idQuestion, answer.id, event, question.type)}
            checked={answer.isCorrect}
            disabled={isSubmit}
          >
            {answer.text}
          </Checkbox>
            ) : null}
      </>
    );
}

import CustomInput from 'shared/ui/CustomInput/CustomInput';
import {ChangeEvent, memo} from 'react';
import {IAnswer} from '../../types/Answer.types';
import Checkbox from 'shared/ui/Checkbox/Checkbox';
import styles from '../Question.module.scss';
import Radio from 'shared/ui/Radio/Radio';

interface AnswerItemPropsInterface {
    answer: IAnswer,
    idQuestion: string,
    activeTab: string,
    indexAnswer: number
    onChange: (textAnswer: string, idAnswer: string) => void
    onChangeCorrectAnswer: (isCorrect: boolean, idAnswer: string) => void
    onClickRemoveAnswer: (indexAnswer: number) => void
}

function AnswerItem({answer, indexAnswer, idQuestion, activeTab, onChange, onChangeCorrectAnswer, onClickRemoveAnswer}: AnswerItemPropsInterface) {
    const handleChangeAnswer = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value, answer.id);
    };

    const handleChangeCorrectAnswer = (isCorrect: boolean) => {
        onChangeCorrectAnswer(isCorrect, answer.id);
    };

    const handleClickRemoveAnswer = () => {
        onClickRemoveAnswer(indexAnswer);
    };

    return (
      <div className={styles.answerItem}>
        <CustomInput
          className={styles.answerField}
          value={answer.text}
          key={answer.id}
          type="text"
          placeholder="Введите текст ответа"
          onChange={handleChangeAnswer}
        />
        {activeTab === 'radio' ? (
          <Radio
            className={styles.answerCheckbox}
            onChange={handleChangeCorrectAnswer}
            checked={answer.isCorrect}
            type={idQuestion}
          />
          ) : null}
        {activeTab === 'checkbox' ? (
          <Checkbox
            className={styles.answerCheckbox}
            onChange={handleChangeCorrectAnswer}
            checked={answer.isCorrect}
          />
          ) : null}
        {indexAnswer > 1 ? (
          <button
            className={styles.answerRemove}
            onClick={handleClickRemoveAnswer}
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
      </div>
    );
}

export default memo(AnswerItem);

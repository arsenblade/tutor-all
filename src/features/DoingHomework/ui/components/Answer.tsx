import styles from '../DoingHomework.module.scss';
import {IAnswer} from 'entities/Question';
import Checkbox from 'shared/ui/Checkbox/Checkbox';

interface IAnswerItem {
    answer: IAnswer
    idQuestion: string
    onChange: (idQuestion: string, idAnswer: string, checked: boolean) => void
    isSubmit: boolean
}

export default function AnswerItem({answer, idQuestion, onChange, isSubmit}: IAnswerItem) {
    return (
      <Checkbox
        className={styles.answerCheckbox}
        onChange={(event) => onChange(idQuestion, answer.id, event)}
        checked={answer.isCorrect}
        disabled={isSubmit}
      >
        {answer.text}
      </Checkbox>
    );
}

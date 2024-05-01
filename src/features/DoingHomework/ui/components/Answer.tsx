import styles from '../DoingHomework.module.scss';
import {IAnswer} from 'entities/Question';
import Checkbox from 'shared/ui/Checkbox/Checkbox';

interface IAnswerItem {
    answer: IAnswer
    idQuestion: string
    onChange: (idQuestion: string, idAnswer: string, checked: boolean) => void
}

export default function AnswerItem({answer, idQuestion, onChange}: IAnswerItem) {
    return (
      <Checkbox
        className={styles.answerCheckbox}
        onChange={(event) => onChange(idQuestion, answer.id, event)}
        checked={answer.isCorrect}
      >
        {answer.text}
      </Checkbox>
    );
}

import styles from '../DoingHomework.module.scss';
import {IQuestion} from 'entities/Question';
import AnswerItem from './Answer';
import {useEffect, useState} from 'react';

interface IQuestionItem {
    question: IQuestion
    index: number
    onChange: (idQuestion: string, idAnswer: string, checked: boolean) => void
}

export default function QuestionItem({question, index, onChange}: IQuestionItem) {
    const [isColumn, setIsColumn] = useState(false);

    useEffect(() => {
        question.answers.forEach((answer) => {
            if (answer.text.split(' ').length > 6) {
                setIsColumn(true);
            }
        });
    }, [question]);

    return (
      <div className={styles.questionItem}>
        <h3 className={styles.questionTitle}>{index}. {question.text}</h3>
        <div className={styles.answerList} style={{gridTemplateColumns: isColumn ? '1fr' : '400px 400px'}}>
          {question.answers.map((answer) => (
            <AnswerItem
              answer={answer}
              idQuestion={question.id}
              key={answer.id}
              onChange={onChange}
            />
            ))}
        </div>
      </div>
    );
}

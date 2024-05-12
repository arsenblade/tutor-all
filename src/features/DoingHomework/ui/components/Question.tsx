import styles from '../DoingHomework.module.scss';
import {IQuestion} from 'entities/Question';
import AnswerItem from './Answer';
import {Fragment, useEffect} from 'react';

interface IQuestionItem {
    question: IQuestion
    index: number
    onChange: (idQuestion: string, idAnswer: string, checked: boolean) => void
    isColumn: boolean
    correctAnswersIds: string[]
    isSubmit: boolean
}

export default function QuestionItem({question, index, onChange, isColumn, correctAnswersIds, isSubmit}: IQuestionItem) {
    return (
      <div className={styles.questionItem}>
        <h3 className={styles.questionTitle}>{index}. {question.text}</h3>
        <div className={styles.answerList} style={{gridTemplateColumns: isColumn ? '1fr' : '400px 400px'}}>
          {question.answers.map((answer) => (
            <div className={styles.questionItemAnswer}>
              {isSubmit ? (
                <>
                  {!correctAnswersIds.includes(answer.id) ? (
                    <svg
                      className={styles.questionItemCloseIcon}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FF0000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    ) : (
                      <svg
                        className={styles.questionItemArrow}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#00FF00"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                </>
              ) : null}
              <AnswerItem
                answer={answer}
                idQuestion={question.id}
                key={answer.id}
                onChange={onChange}
                isSubmit={isSubmit}
              />
            </div>
          ))}
        </div>
      </div>
    );
}

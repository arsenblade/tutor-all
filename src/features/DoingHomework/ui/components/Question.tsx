import styles from '../DoingHomework.module.scss';
import {IQuestion} from 'entities/Question';
import AnswerItem from './Answer';
import CustomInput from 'shared/ui/CustomInput/CustomInput';
import {ChangeEvent, useState} from 'react';
import classNames from 'classnames';

interface IQuestionItem {
    question: IQuestion
    index: number
    onChange: (idQuestion: string, idAnswer: string, checked: boolean, type: string) => void
    onChangeText: (idQuestion: string, textAnswer: string) => void
    isColumn: boolean
    correctAnswersIds: string[]
    isSubmit: boolean
}

export default function QuestionItem({question, index, onChange, onChangeText, isColumn, correctAnswersIds, isSubmit}: IQuestionItem) {
    const [value, setValue] = useState('');

    const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        onChangeText(question.id, event.target.value);
    };

    return (
      <div className={styles.questionItem}>
        <h3 className={styles.questionTitle}>{index}. {question.text}</h3>
        <div className={styles.answerList} style={{gridTemplateColumns: isColumn ? '1fr' : '400px 400px'}}>
          {question.type === 'text' ? (
            <div className={styles.answerText}>
              {isSubmit ? (
                <div>
                  {!correctAnswersIds.includes(value) ? (
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
                </div>
                ) : null}
              <CustomInput
                className={classNames(styles.fieldHomeworkName, {
                        [styles.fieldHomeworkNameDisabled]: isSubmit,
                    })}
                value={value}
                onChange={handleChangeValue}
                type="text"
                placeholder="Введите ответ"
                readOnly={isSubmit}
              />
            </div>
          ) : null}

          {question.type !== 'text' && question.answers.map((answer) => (
            <div className={styles.questionItemAnswer} key={answer.id}>
              {isSubmit ? (
                <div>
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
                </div>
              ) : null}
              <AnswerItem
                question={question}
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

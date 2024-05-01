import styles from './DoingHomework.module.scss';
import {useAppSelector} from 'shared/hooks/useAppSelector';
import {useActionCreatorsTyped} from 'shared/hooks/useActionsCreators';
import {asyncActionHomeworks} from 'entities/Homework';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import QuestionItem from './components/Question';
import {ICorrectAnswer} from '../types/CorrectAnswers';

export default function DoingHomework() {
    const {homework} = useAppSelector((state) => state.doingHomeworkSlice);
    const asyncActionCreatorsHomeworks = useActionCreatorsTyped(asyncActionHomeworks);
    const params = useParams<{id: string}>();
    const [correctAnswers, setCorrectAnswers] = useState<ICorrectAnswer[]>([]);

    useEffect(() => {
        asyncActionCreatorsHomeworks.getHomework({idHomework: params?.id || ''});
    }, []);

    const addCorrectAnswers = (idQuestion: string, idAnswer: string) => {
        const indexCurrentAnswer = correctAnswers.findIndex((correctAnswer) => correctAnswer.idQuestion === idQuestion);

        if (correctAnswers[indexCurrentAnswer]) {
            setCorrectAnswers((prevState) => prevState.map((correctAnswer) => {
                if (correctAnswer.idQuestion === idQuestion) {
                    return {
                        idQuestion: correctAnswer.idQuestion,
                        idsAnswer: [...correctAnswer.idsAnswer, idAnswer],
                    };
                }

                return correctAnswer;
            }));
        } else {
            setCorrectAnswers((prevState) => {
                return [...prevState, {idQuestion, idsAnswer: [idAnswer]}];
            });
        }
    };

    const deleteCorrectAnswers = (idQuestion: string, idAnswer: string) => {
        const indexCurrentAnswer = correctAnswers.findIndex((correctAnswer) => correctAnswer.idQuestion === idQuestion);

        if (correctAnswers[indexCurrentAnswer]) {
            const currentAnswer = correctAnswers[indexCurrentAnswer];

            if (currentAnswer.idsAnswer.length === 1) {
                setCorrectAnswers((prevState) => {
                    return prevState.filter((correctAnswer) => correctAnswer.idQuestion !== idQuestion);
                });
            } else {
                setCorrectAnswers((prevState) => prevState.map((correctAnswer, index) => {
                    if (index === indexCurrentAnswer) {
                        return {
                            idsAnswer: correctAnswer.idsAnswer.filter((id) => id !== idAnswer),
                            idQuestion: correctAnswer.idQuestion,
                        };
                    }

                    return correctAnswer;
                }));
            }
        }
    };

    const handleChangeCorrectAnswer = (idQuestion: string, idAnswer: string, checked: boolean) => {
        if (checked) {
            addCorrectAnswers(idQuestion, idAnswer);
        } else {
            deleteCorrectAnswers(idQuestion, idAnswer);
        }
    };

    return (
      <div className={styles.doingHomework}>
        <h1 className={styles.doingHomeworkTitle}>{homework.name}</h1>
        {homework.questions.map((question, index) => (
          <QuestionItem
            question={question}
            key={question.id}
            index={index + 1}
            onChange={handleChangeCorrectAnswer}
          />
          ))}
      </div>
    );
}

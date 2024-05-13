import styles from './DoingHomework.module.scss';
import {useAppSelector} from 'shared/hooks/useAppSelector';
import {useActionCreatorsTyped} from 'shared/hooks/useActionsCreators';
import {asyncActionHomeworks, ICorrectAnswer, IHomework} from 'entities/Homework';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import QuestionItem from './components/Question';
import {IUserCorrectAnswer} from '../types/CorrectAnswers';
import Loader from 'shared/ui/Loader/Loader';
import Button from 'shared/ui/Button/Button';
import {asyncActionDoingHomework} from '../model/actions';
import {IGradeStudents} from '../types/GradeStudents';
import {useAuth} from 'shared/hooks/useAuth';
import {useNavigate} from 'react-router-dom';

export default function DoingHomework() {
    const {homework, isLoading} = useAppSelector((state) => state.doingHomeworkSlice);
    const asyncActionCreatorsHomeworks = useActionCreatorsTyped(asyncActionHomeworks);
    const asyncActionCreatorsDoingHomework = useActionCreatorsTyped(asyncActionDoingHomework);
    const params = useParams<{id: string}>();
    const [userSelectedAnswers, setUserSelectedAnswers] = useState<IUserCorrectAnswer[]>([]);
    const [isColumn, setIsColumn] = useState(false);
    const auth = useAuth();
    const [isSubmit, setIsSubmit] = useState(false);
    const [points, setPoints] = useState(0);
    const [correctAnswersIds, setCorrectAnswersIds] = useState<string[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        asyncActionCreatorsHomeworks.getHomework({idHomework: params?.id || ''}).then((response) => {
            const currentHomework = response.payload as IHomework;

            if (currentHomework.questions.length > 0) {
                currentHomework.questions.forEach((question) => {
                    question.answers.forEach((answer) => {
                        if (answer.text.split(' ').length > 6) {
                            setIsColumn(true);
                        }
                    });
                });
            }
        });
    }, []);

    const addSelectedAnswers = (idQuestion: string, idAnswer: string) => {
        const indexCurrentAnswer = userSelectedAnswers.findIndex((correctAnswer) => correctAnswer.idQuestion === idQuestion);

        if (userSelectedAnswers[indexCurrentAnswer]) {
            setUserSelectedAnswers((prevState) => prevState.map((correctAnswer) => {
                if (correctAnswer.idQuestion === idQuestion) {
                    return {
                        idQuestion: correctAnswer.idQuestion,
                        idsAnswer: [...correctAnswer.idsAnswer, idAnswer],
                    };
                }

                return correctAnswer;
            }));
        } else {
            setUserSelectedAnswers((prevState) => {
                return [...prevState, {idQuestion, idsAnswer: [idAnswer]}];
            });
        }
    };

    const deleteSelectedAnswers = (idQuestion: string, idAnswer: string) => {
        const indexCurrentAnswer = userSelectedAnswers.findIndex((correctAnswer) => correctAnswer.idQuestion === idQuestion);

        if (userSelectedAnswers[indexCurrentAnswer]) {
            const currentAnswer = userSelectedAnswers[indexCurrentAnswer];

            if (currentAnswer.idsAnswer.length === 1) {
                setUserSelectedAnswers((prevState) => {
                    return prevState.filter((correctAnswer) => correctAnswer.idQuestion !== idQuestion);
                });
            } else {
                setUserSelectedAnswers((prevState) => prevState.map((correctAnswer, index) => {
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
            addSelectedAnswers(idQuestion, idAnswer);
        } else {
            deleteSelectedAnswers(idQuestion, idAnswer);
        }
    };

    const checkCorrectAnswer = (correctAnswersIds: string[], userSelectedAnswersIds: string[], allAnswers: number) => {
        let numberRightAnswers = 0;
        const minPenaltyPoint = 0.1;

        correctAnswersIds.forEach((correctAnswersId) => {
            if (userSelectedAnswersIds.includes(correctAnswersId)) {
                numberRightAnswers += 1;
            }
        });

        if (numberRightAnswers === 0) {
            return 0;
        }

        const penaltyPoint = (userSelectedAnswersIds.length - numberRightAnswers) / allAnswers;

        let point = Number((numberRightAnswers / correctAnswersIds.length).toFixed(2));

        for (let index = 0; index < (userSelectedAnswersIds.length - numberRightAnswers); index++) {
            const diffPenaltyPoint = point - penaltyPoint;

            if (diffPenaltyPoint >= minPenaltyPoint) {
                point -= penaltyPoint;
            }
        }

        return Number(point.toFixed(2));
    };

    const handleSubmitHomework = async () => {
        const response = await asyncActionCreatorsHomeworks.getCorrectAnswers({idHomework: homework.id});
        const correctAnswers = response.payload as ICorrectAnswer[];

        const points = userSelectedAnswers.reduce((prevPoints, userCorrectAnswer) => {
            const needCorrectAnswer = correctAnswers?.find((correctAnswer) => correctAnswer.idQuestion === userCorrectAnswer.idQuestion);

            if (needCorrectAnswer) {
                const grade = checkCorrectAnswer(needCorrectAnswer.correctAnswerIds, userCorrectAnswer.idsAnswer, needCorrectAnswer.allAnswers);

                return prevPoints + grade;
            }

            return prevPoints;
        }, 0);

        const allQuestionLength = homework.questions.length;
        const valuePercent = Math.ceil((points / allQuestionLength) * 100);

        const defaultGrade: IGradeStudents = {
            idTeacher: homework.idTeacher,
            idStudent: auth?.user?.id || '',
            idHomework: homework?.id,
            allQuestionLength,
            points,
            nameHomework: homework.name,
            valuePercent,
        };

        await asyncActionCreatorsDoingHomework.submitHomework(defaultGrade);
        await asyncActionCreatorsDoingHomework.removeFillingHomework({idStudent: auth?.user?.id || '', idTeacher: homework.idTeacher, idHomework: homework.id});
        setCorrectAnswersIds(correctAnswers.flatMap((correctAnswer) => correctAnswer.correctAnswerIds));
        setIsSubmit(true);
        setPoints(points);
    };
    const backToHomework = () => {
        navigate('/homework');
    };

    return (
      <div className={styles.doingHomework}>
        {isLoading ? (
          <div className={styles.loader}>
            <Loader />
          </div>
            ) : null}
        {!isLoading ? (
          <>
            {isSubmit ? (
              <div className={styles.doingHomeworkPoints}>
                {points} баллов из {homework.questions.length}
              </div>
              ) : null}
            <h1 className={styles.doingHomeworkTitle}>{homework.name}</h1>
            <div className={styles.doingHomeworkWrapper}>
              {homework.questions.map((question, index) => (
                <QuestionItem
                  question={question}
                  key={question.id}
                  index={index + 1}
                  isColumn={isColumn}
                  onChange={handleChangeCorrectAnswer}
                  isSubmit={isSubmit}
                  correctAnswersIds={correctAnswersIds}
                />
              ))}
            </div>
            {!isSubmit ? (
              <div className={styles.doingHomeworkAction}>
                <Button
                  onClick={handleSubmitHomework}
                  color="Violet"
                >
                  Отправить
                </Button>
              </div>
              ) : null}

            {isSubmit ? (
              <div className={styles.doingHomeworkAction}>
                <Button
                  onClick={backToHomework}
                  color="Blue"
                >
                  К домашним заданиям
                </Button>
              </div>
              ) : null}
          </>
        ) : null}
      </div>
    );
}

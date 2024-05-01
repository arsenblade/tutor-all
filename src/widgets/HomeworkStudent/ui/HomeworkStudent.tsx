import styles from './HomeworkStudent.module.scss';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../../shared/hooks/useAppSelector';
import {useEffect} from 'react';
import {useActionCreatorsTyped} from '../../../shared/hooks/useActionsCreators';
import {asyncActionHomeworks} from '../../../entities/Homework';
import {useAuth} from '../../../shared/hooks/useAuth';
import {pluralizeRu} from '../../../shared/lib/plural';

interface HomeworkStudentPropsInterface {

}

export default function HomeworkStudent({}: HomeworkStudentPropsInterface) {
    const {homeworks} = useAppSelector((state) => state.studentHomeworkSlice);
    const asyncActionCreatorsHomeworks = useActionCreatorsTyped(asyncActionHomeworks);
    const auth = useAuth();

    useEffect(() => {
        asyncActionCreatorsHomeworks.getStudentHomeworks({idStudent: auth.user?.id || ''});
    }, []);

    return (
      <div className={styles.homeworkStudent}>
        <h1 className={styles.title}>Ваше домашнее задание</h1>
        <div className={styles.homeworkStudentList}>
          {homeworks.map((homework) => (
            <Link
              to={`/homework/${homework.id}`}
              className={styles.homeworkLink}
            >
              <h3 className={styles.homeworkStudentTitle}>{homework.name}</h3>
              <span className={styles.homeworkStudentQuestions}>{pluralizeRu(homework.lengthQuestions, ['вопрос', 'вопроса', 'вопросов'], true)}</span>
            </Link>
            ))}
        </div>
      </div>
    );
}

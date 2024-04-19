import {asyncActionTeacher, TeacherCard} from 'entities/Teacher';
import styles from './TeacherList.module.scss';
import {useActionCreatorsTyped} from '../../../shared/hooks/useActionsCreators';
import {useEffect} from 'react';
import {useAppSelector} from '../../../shared/hooks/useAppSelector';

export default function TeachersList() {
    const asyncActionCreatorsTeacher = useActionCreatorsTyped(asyncActionTeacher);
    const { isLoading, teachers} = useAppSelector((state) => state.teacherSlice);

    useEffect(() => {
        asyncActionCreatorsTeacher.getTeachers();
    }, []);

    return (
      <div className={styles.teacherList}>
        {teachers.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
          />
          ))}
      </div>
    );
}

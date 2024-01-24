import {TeacherCard} from 'entities/Teacher';
import styles from './TeacherList.module.scss';

interface TeachersListPropsInterface {

}

export default function TeachersList() {
    return (
      <div className={styles.teacherList}>
        <TeacherCard />
        <TeacherCard />
        <TeacherCard />
        <TeacherCard />
      </div>
    );
}

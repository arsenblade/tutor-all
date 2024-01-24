import {TeachersList} from 'widgets/TeachersList';
import styles from './Teachers.module.scss';

export default function Teachers() {
    return (
      <div>
        <div className={styles.teacherList}>
          <TeachersList />
        </div>
      </div>
    );
}

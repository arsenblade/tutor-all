import styles from './HomeworkTeacher.module.scss';
import {Link} from 'react-router-dom';

interface HomeworkTeacherPropsInterface {

}

export default function HomeworkTeacher({}: HomeworkTeacherPropsInterface) {
    return (
      <div className={styles.homeworkTeacher}>
        <Link
          to="/homework/create"
          className={styles.createHomework}
        >
          Создать домашнее задание
        </Link>

        <Link
          to="/homework/set"
          className={styles.setHomework}
        >
          Задать домашнее задание
        </Link>
      </div>
    );
}

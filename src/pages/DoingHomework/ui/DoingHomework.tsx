import styles from './DoingHomework.module.scss';
import {DoingHomework} from 'features/DoingHomework';

export default function DoingHomeworkPage() {
    return (
      <div className={styles.doingHomeworkPage}>
        <DoingHomework />
      </div>
    );
}

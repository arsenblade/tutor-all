import {SetHomework} from 'features/SetHomework';
import styles from './SetHomework.module.scss';

export default function SetHomeworkPage() {
    return (
      <div className={styles.setHomework}>
        <h1 className={styles.title}>Выберите ученика и задавайте домашнее задание</h1>
          
        <SetHomework />
      </div>
    );
}

import {CreateHomework} from 'features/CreateHomework';
import styles from './CreateHomework.module.scss';

interface CreateHomeworkPropsInterface {

}

export default function CreateHomeworkPage({}: CreateHomeworkPropsInterface) {
    return (
      <div className={styles.createHomework}>
        <h1 className={styles.title}>Создайте домашнее задание</h1>
        <CreateHomework />
      </div>
    );
}

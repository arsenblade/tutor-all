import styles from './MostPopularTeacher.module.scss';
import {Link} from 'react-router-dom';
import Status from 'shared/ui/Status/Status';

interface MostPopularTeacherPropsInterface {

}

export default function MostPopularTeacher({}: MostPopularTeacherPropsInterface) {
    return (
      <article className={styles.mostPopularTeacher}>
        <div
          className={styles.containerImage}
        >
          <div className={styles.statuses}>
            <Status
              text="ОГЭ"
              color="violet"
            />
            <Status
              text="ЕГЭ"
              color="green"
            />
          </div>
          <img
            className={styles.image}
            src="/images/teacher.jpg"
            alt="Фото автора."
          />
        </div>
        <h3 className={styles.title}>Диана Асадова</h3>
        <p className={styles.description}>Привет! Меня зовут Диана Асадова, и я — твой проводник в прекрасный мир истории. Профессионально конвертирую мемы про Петра III в баллы на ЕГЭ.</p>
        <Link
          className={styles.link}
          to="/"
        >
          подробнее
        </Link>
      </article>
    );
}

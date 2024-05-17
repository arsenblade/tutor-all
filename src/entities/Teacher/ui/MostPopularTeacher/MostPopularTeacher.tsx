import styles from './MostPopularTeacher.module.scss';
import {Link} from 'react-router-dom';
import Status from 'shared/ui/Status/Status';

interface MostPopularTeacherPropsInterface {
    image: string,
    name: string
    description: string
    link: string
}

export default function MostPopularTeacher({image, name, description, link}: MostPopularTeacherPropsInterface) {
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
            src={image}
            alt="Фото автора."
          />
        </div>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{description}</p>
        <Link
          className={styles.link}
          to={link}
        >
          подробнее
        </Link>
      </article>
    );
}

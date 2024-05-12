import styles from './TeacherCard.module.scss';
import Button from 'shared/ui/Button/Button';
import Status from 'shared/ui/Status/Status';
import {ITeacher} from '../types/Teacher.types';

interface TeacherCardPropsInterface {
  teacher: ITeacher
}

export default function TeacherCard({teacher}: TeacherCardPropsInterface) {
    return (
      <div className={styles.teacherCard}>
        <div className={styles.imgContainer}>
          <img
            className={styles.teacherImg}
            src={teacher.photo}
            alt="Фото автора."
          />
          <div className={styles.statusOGE}>
            <Status
              color="green"
              text="ОГЭ"
            />
          </div>
          <div className={styles.statusEGE}>
            <Status
              color="violet"
              text="ЕГЭ"
            />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.info}>
            <h3 className={styles.title}>{teacher.name}</h3>

            <p className={styles.description}>
              {teacher.description}
            </p>

            <div className={styles.conditions}>
              Предметы: <span className={styles.conditionsItem}>русский язык, литература</span>
            </div>
          </div>
          <div className={styles.details}>
            <div className={styles.priceContainer}>
              <span>за 1 час</span>
              <span className={styles.priceValue}>
                {teacher.price} ₽
              </span>
            </div>
            <div
              className={styles.button}
            >
              <Button
                color="Violet"
                to={`/teachers/${teacher.id}`}
              >
                Выбрать
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
}

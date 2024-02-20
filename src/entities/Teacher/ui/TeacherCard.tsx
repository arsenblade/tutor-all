import styles from './TeacherCard.module.scss';
import TextTruncate from 'react-text-truncate';
import {Link} from 'react-router-dom';
import Button from 'shared/ui/Button/Button';
import Status from 'shared/ui/Status/Status';

interface TeacherCardPropsInterface {

}

export default function TeacherCard({}: TeacherCardPropsInterface) {
    return (
      <div className={styles.teacherCard}>
        <div className={styles.imgContainer}>
          <img
            className={styles.teacherImg}
            src="/images/teacher.jpg"
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
            <h3 className={styles.title}>Тимофеева Анастасия</h3>

            <p className={styles.description}>
              Привет, дорогие ученики! За последние 5 лет я страстно занимаюсь преподаванием русского языка. Мое вдохновение - видеть, как вы раскрываете красоту языка. Также я углубляюсь в исследования лингвистики, чтобы делиться с вами самым интересным и актуальным. Давайте вместе погрузимся в мир слов!
            </p>

            <div className={styles.conditions}>
              Предметы: <span className={styles.conditionsItem}>русский язык, литература</span>
            </div>
          </div>
          <div className={styles.details}>
            <div className={styles.priceContainer}>
              <span>за 1 час</span>
              <span className={styles.priceValue}>
                1600 ₽
              </span>
            </div>
            <div
              className={styles.button}
            >
              <Button
                color="Violet"
                to="/teachers/1"
              >
                Выбрать
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
}

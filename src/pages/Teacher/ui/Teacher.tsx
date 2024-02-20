import styles from './Teacher.module.scss';
import {CustomImage} from 'shared/ui/CustomImage/CustomImage';
import AboutCard from 'shared/ui/AboutCard/AboutCard';
import TextArea from 'shared/ui/TextArea/TextArea';
import Button from 'shared/ui/Button/Button';
import {ReactComponent as ExperienceIcon} from '../../../assets/svg/experience.svg';
import {ReactComponent as EducationIcon} from '../../../assets/svg/education.svg';

interface TeacherPropsInterface {

}

export default function Teacher({}: TeacherPropsInterface) {
    return (
      <div className={styles.createTeacher}>
        <h1 className={styles.title}>Анастасия Тимофеева</h1>
        <div className={styles.content}>
          <div className={styles.containerImage}>
            <CustomImage
              className={styles.photoImage}
              src="https://sun3-24.userapi.com/impg/k-Qt_pyAn--8rwMfugVpumJnbu4QXK4GwyfK3g/nfZ4NOyAwYw.jpg?size=1709x2160&quality=95&sign=1688b197a682d531ac91141bd8b31a34&type=album"
              alt=""
              fallback={(
                <div className={styles.backgroundPhoto}>
                  <span className={styles.photoTitle}>Ваше фото</span>
                </div>
                  )}
            />
          </div>
          <div className={styles.details}>
            <div className={styles.aboutBlock}>
              <AboutCard
                value="4 года занимаюсь преподаванием"
                title="Ваш опыт"
                icon={<ExperienceIcon className={styles.experienceIcon} />}
              />

              <AboutCard
                value="Высший педагогический университет"
                title="Ваше образование"
                icon={<EducationIcon className={styles.educationIcon} />}
              />
            </div>

            <p className={styles.description}>
              Обладаю хорошими знаниями JS, React, TS, Redux, умею верстать адаптивные макеты, умею писать Unit Test. Имею опыт создания проектов по техническому заданию. Высокий уровень активности в выполнении задач, люблю и умею налаживать эффективные коммуникации с людьми. Моя цель - достичь уровня middle как можно быстрее. На данный момент обучаюсь на 3 курсе вуза, обучение в основном онлайн, поэтому готов совмещать учебу и работу.
            </p>

            <Button color="Violet">
              Записаться на урок
            </Button>
          </div>
        </div>
      </div>
    );
}

import CustomInput from 'shared/ui/CustomInput/CustomInput';
import {useState} from 'react';
import styles from './CreateTeacher.module.scss';
import Button from 'shared/ui/Button/Button';
import AboutCard from 'shared/ui/AboutCard/AboutCard';
import {ReactComponent as ExperienceIcon} from '../../../assets/svg/experience.svg';
import {ReactComponent as EducationIcon} from '../../../assets/svg/education.svg';
import TextArea from 'shared/ui/TextArea/TextArea';
import {CustomImage} from 'shared/ui/CustomImage/CustomImage';

export default function CreateTeacher() {
    const [imageValue, setImageValue] = useState('https://dubna-uszn.ru/wp-ontent/uploads/2023/04/sa2.jpg');
    const [experienceValue, setExperienceValue] = useState('');
    const [educationValue, setEducationValue] = useState('');

    return (
      <div className={styles.createTeacher}>
        <h1 className={styles.title}>Заполните свой профиль</h1>
        <CustomInput
          className={styles.nameField}
          placeholder="Введите свое имя и фамилию"
          type="text"
        />
        <div className={styles.content}>
          <div className={styles.containerImage}>
            <CustomInput
              type="text"
              placeholder="Введите ссылку на фото"
              value={imageValue}
              onChange={(event) => setImageValue(event.target.value)}
            />

            <div className={styles.containerPhoto}>
              <CustomImage
                className={styles.photoImage}
                src={imageValue}
                alt=""
                fallback={(
                  <div className={styles.backgroundPhoto}>
                    <span className={styles.photoTitle}>Ваше фото</span>
                  </div>
                    )}
              />
            </div>
          </div>
          <div className={styles.details}>
            <div className={styles.aboutBlock}>
              <AboutCard
                value={experienceValue}
                onChange={(value) => setExperienceValue(value)}
                title="Ваш опыт"
                readonly={false}
                icon={<ExperienceIcon className={styles.experienceIcon} />}
              />

              <AboutCard
                value={educationValue}
                onChange={(value) => setEducationValue(value)}
                title="Ваше образование"
                readonly={false}
                icon={<EducationIcon className={styles.educationIcon} />}
              />
            </div>

            <TextArea
              className={styles.description}
              placeholder="Расскажите о себе"
            />
            <Button color="Violet">
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    );
}

import CustomInput from 'shared/ui/CustomInput/CustomInput';
import {useEffect, useState} from 'react';
import styles from './FillingTeacher.module.scss';
import Button from 'shared/ui/Button/Button';
import AboutCard from 'shared/ui/AboutCard/AboutCard';
import {ReactComponent as ExperienceIcon} from '../../../assets/svg/experience.svg';
import {ReactComponent as EducationIcon} from '../../../assets/svg/education.svg';
import TextArea from 'shared/ui/TextArea/TextArea';
import {CustomImage} from 'shared/ui/CustomImage/CustomImage';
import {useAppSelector} from 'shared/hooks/useAppSelector';
import {useActionCreatorsTyped} from 'shared/hooks/useActionsCreators';
import {asyncActionFillingTeacher} from '../model/actions';
import {useAuth} from 'shared/hooks/useAuth';
import {IFillingTeacherTypes} from '../types/FillingTeacher.types';

export default function FillingTeacher() {
    const {isLoadingFillingTeacher, teacher, isEmptyInfo} = useAppSelector((state) => state.fillingTeacherSlice);
    const actionsCreatorsFillingTeacher = useActionCreatorsTyped(asyncActionFillingTeacher);

    const auth = useAuth();

    const [priceValue, setPriceValue] = useState(teacher.price);
    const [photoValue, setPhotoValue] = useState(teacher.photo);
    const [experienceValue, setExperienceValue] = useState(teacher.experience);
    const [educationValue, setEducationValue] = useState(teacher.education);
    const [nameValue, setNameValue] = useState(teacher.name);
    const [descriptionValue, setDescriptionValue] = useState(teacher.description);

    useEffect(() => {
        if (auth.user) {
            actionsCreatorsFillingTeacher.getTeacherInfo({idUser: auth.user.id}).then((response) => {
                const currentTeacher = response.payload as IFillingTeacherTypes;
                setPriceValue(currentTeacher.price);
                setPhotoValue(currentTeacher.photo);
                setExperienceValue(currentTeacher.experience);
                setEducationValue(currentTeacher.education);
                setNameValue(currentTeacher.name);
                setDescriptionValue(currentTeacher.description);
            });
        }
    }, []);

    useEffect(() => {
        if (isEmptyInfo && auth.user) {
            actionsCreatorsFillingTeacher.createTeacherInfo({idUser: auth.user.id});
        }
    }, [isEmptyInfo]);

    const handleClickSubmit = () => {
        if (auth.user) {
            actionsCreatorsFillingTeacher.fillingTeacherInfo({
                idUser: auth.user.id,
                teacher: {
                    photo: photoValue,
                    experience: experienceValue,
                    education: educationValue,
                    name: nameValue,
                    description: descriptionValue,
                    price: priceValue,
                },
            });
        }
    };

    return (
      <div className={styles.createTeacher}>
        <h1 className={styles.title}>Заполните свой профиль</h1>
        <CustomInput
          value={nameValue}
          onChange={(event) => setNameValue(event.target.value)}
          className={styles.nameField}
          placeholder="Введите свое имя и фамилию"
          type="text"
        />
        <div className={styles.content}>
          <div className={styles.containerImage}>
            <CustomInput
              type="text"
              placeholder="Введите ссылку на фото"
              value={photoValue}
              onChange={(event) => setPhotoValue(event.target.value)}
            />

            <div className={styles.containerPhoto}>
              <CustomImage
                className={styles.photoImage}
                src={photoValue}
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
              value={descriptionValue}
              onChange={(event) => setDescriptionValue(event.target.value)}
              placeholder="Расскажите о себе"
            />

            <CustomInput
              type="text"
              placeholder="Цена за ваши услуги"
              value={priceValue}
              onChange={(event) => setPriceValue(event.target.value)}
            />

            <Button
              color="Violet"
              onClick={handleClickSubmit}
              isLoading={isLoadingFillingTeacher}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    );
}

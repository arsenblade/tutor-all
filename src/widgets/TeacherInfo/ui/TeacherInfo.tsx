import styles from './TeacherInfo.module.scss';
import {CustomImage} from 'shared/ui/CustomImage/CustomImage';
import AboutCard from 'shared/ui/AboutCard/AboutCard';
import {ReactComponent as ExperienceIcon} from '../../../assets/svg/experience.svg';
import {ReactComponent as EducationIcon} from '../../../assets/svg/education.svg';
import {useActionCreatorsTyped} from 'shared/hooks/useActionsCreators';
import {asyncActionTeacher, ITeacher} from 'entities/Teacher';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {useAuth} from 'shared/hooks/useAuth';
import {SendNotificationSingUp} from 'features/SendNotificationSingUp';

export default function TeacherInfo() {
    const asyncActionCreatorsTeacher = useActionCreatorsTyped(asyncActionTeacher);

    const [teacher, setTeacher] = useState<ITeacher | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const auth = useAuth();

    const params = useParams();

    useEffect(() => {
        if (params?.id) {
            setIsLoading(true);
            asyncActionCreatorsTeacher.getTeacher({idTeacher: params.id}).then((response) => {
                setTeacher(response.payload as ITeacher);
                setIsLoading(false);
            });
        }
    }, []);

    return (
      <div className={styles.createTeacher}>
        {!isLoading && teacher ? (
          <>
            <h1 className={styles.title}>{teacher.name}</h1>
            <div className={styles.content}>
              <div className={styles.containerImage}>
                <CustomImage
                  className={styles.photoImage}
                  src={teacher.photo}
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
                    value={teacher.experience}
                    title="Ваш опыт"
                    icon={<ExperienceIcon className={styles.experienceIcon} />}
                  />

                  <AboutCard
                    value={teacher.education}
                    title="Ваше образование"
                    icon={<EducationIcon className={styles.educationIcon} />}
                  />
                </div>

                <p className={styles.description}>
                  {teacher.description}
                </p>

                {auth.user?.roles.includes('student') ? (
                  <SendNotificationSingUp
                    idTeacher={teacher.id}
                  />
                  ) : null}
              </div>
            </div>
          </>
          ) : null}
      </div>
    );
}

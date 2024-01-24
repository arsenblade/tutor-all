import {Link} from 'react-router-dom';
import LinkPanel from '../../../shared/ui/LinkPanel/LinkPanel';
import styles from './Profile.module.scss';
import {useAuth} from '../../../shared/hooks/useAuth';

interface ProfilePropsInterface {

}

export default function Profile({}: ProfilePropsInterface) {
    const auth = useAuth();

    return (
      <div className={styles.profile}>
        <h1 className={styles.title}>Мой профиль</h1>

        <div className={styles.profileMyPage}>
          <LinkPanel
            imgPath="/images/teacher@2x.jpg"
            link="#"
            title="Тимофеева Анастасия"
            description="Моя страница"
            isBorderImg
          />
        </div>

        {auth?.user?.roles.includes('teacher') ? (
          <div className={styles.profileMyPage}>
            <LinkPanel
              imgPath="/images/statistics.png"
              link="#"
              title="Статистика"
              description="Посмотреть успеваемость учеников"
            />
          </div>
          ) : null}

        {auth?.user?.roles.includes('student') ? (
          <div className={styles.profileMyPage}>
            <LinkPanel
              imgPath="/images/statistics.png"
              link="#"
              title="Статистика"
              description="Посмотреть мою успеваемость"
            />
          </div>
          ) : null}
      </div>
    );
}

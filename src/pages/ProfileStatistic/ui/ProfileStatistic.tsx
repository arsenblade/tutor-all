import styles from './ProfileStatistic.module.scss';
import {StatisticStudent} from 'widgets/StatisticStudent';
import {useAuth} from '../../../shared/hooks/useAuth';
import {StatisticTeacher} from '../../../widgets/StatisticTeacher';

export default function ProfileStatisticPage() {
    const auth = useAuth();

    return (
      <div className={styles.statisticStudent}>
        {auth.user?.roles.includes('student') ? (
          <StatisticStudent />
          ) : null}

        {auth.user?.roles.includes('teacher') ? (
          <StatisticTeacher />
          ) : null}
      </div>
    );
}

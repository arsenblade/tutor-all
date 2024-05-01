import styles from './ProfileStatistic.module.scss';
import {StatisticStudent} from 'widgets/StatisticStudent';

export default function ProfileStatisticPage() {
    return (
      <div className={styles.statisticStudent}>
        <StatisticStudent />
      </div>
    );
}

import styles from './StatisticStudent.module.scss';
import StatisticsTable from 'shared/ui/StatisticTable/StatisticTable';
import {useState} from 'react';

export interface IStatUser {
    value: number;
    isFilled: boolean;
}

const test: IStatUser[] = [{value: 45, isFilled: true}, {value: 100, isFilled: true}];

export default function StatisticStudent() {
    const [selectedHomework, setSelectedHomework] = useState(1);

    const handleChangeHomework = (value: number) => {
        setSelectedHomework(value);
    };

    return (
      <div className={styles.statisticStudent}>
        <h1 className={styles.title}>Ваша статистика по домашним заданиям</h1>

        <div className={styles.statisticTable}>
          <StatisticsTable
            data={test}
            color="purple"
            percent
            value={selectedHomework}
            onChange={handleChangeHomework}
          />
        </div>
        <div className={styles.selectStatistic}>
          <div className={styles.selectStatisticNumber}>#1</div>
          <div className={styles.selectStatisticTable}>
            <div className={styles.selectStatisticColumn}>Название домашнего задания</div>
            <div className={styles.selectStatisticColumn}>Правильные ответы</div>
            <div className={styles.selectStatisticColumn}>Всего вопросов</div>
            <h3 className={styles.selectStatisticTitle}>Все правила русского языка</h3>
            <div className={styles.selectStatisticPoints}>2</div>
            <div className={styles.selectStatisticPoints}>6</div>
          </div>
        </div>
      </div>
    );
}

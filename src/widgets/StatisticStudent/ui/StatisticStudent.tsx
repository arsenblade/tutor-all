import styles from './StatisticStudent.module.scss';
import StatisticsTable from 'shared/ui/StatisticTable/StatisticTable';
import {useEffect, useState} from 'react';
import {useActionCreatorsTyped} from 'shared/hooks/useActionsCreators';
import {asyncActionStudentStatistics} from 'entities/Statistic';
import {useAuth} from 'shared/hooks/useAuth';
import {IGradeStudents} from 'entities/Statistic/types/GradeStudent';

interface IStatisticStudent {
    idTeacher: string,
    idStudent: string,
    idHomework: string,
    allQuestionLength: number
    points: number
    nameHomework: string
    valuePercent: number,
    index: number,
}

export default function StatisticStudent() {
    const [selectedHomework, setSelectedHomework] = useState<IStatisticStudent | null>(null);
    const [statisticsStudents, setStatisticsStudents] = useState<IStatisticStudent[]>([]);
    const asyncActionCreatorsStudentStatistics = useActionCreatorsTyped(asyncActionStudentStatistics);

    const auth = useAuth();

    const handleChangeHomework = (value: any) => {
        setSelectedHomework(value);
    };

    useEffect(() => {
        asyncActionCreatorsStudentStatistics.getStudentStatistics({idStudent: auth?.user?.id || ''}).then((response) => {
            const data = (response.payload as IGradeStudents[]).map((statStudent, index) => ({
                ...statStudent,
                index,
            }));

            setStatisticsStudents(data);

            if (data.length > 0) {
                setSelectedHomework(data[0]);
            }
        });
    }, []);

    return (
      <div className={styles.statisticStudent}>
        <h1 className={styles.title}>Ваша статистика по домашним заданиям</h1>

        <div className={styles.statisticTable}>
          <StatisticsTable
            data={statisticsStudents}
            color="purple"
            percent
            value={selectedHomework}
            onChange={handleChangeHomework}
          />
        </div>
        {selectedHomework ? (
          <div className={styles.selectStatistic}>
            <div className={styles.selectStatisticNumber}>#{selectedHomework.index + 1}</div>
            <div className={styles.selectStatisticTable}>
              <div className={styles.selectStatisticColumn}>Название домашней работы</div>
              <div className={styles.selectStatisticColumn}>Количество баллов</div>
              <div className={styles.selectStatisticColumn}>Всего вопросов</div>
              <h3 className={styles.selectStatisticTitle}>{selectedHomework.nameHomework}</h3>
              <div className={styles.selectStatisticPoints}>{selectedHomework.points}</div>
              <div className={styles.selectStatisticPoints}>{selectedHomework.allQuestionLength}</div>
            </div>
          </div>
          ) : null}
      </div>
    );
}

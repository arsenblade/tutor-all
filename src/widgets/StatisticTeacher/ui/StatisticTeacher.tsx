import styles from './StatisticTeacher.module.scss';
import StatisticsTable from 'shared/ui/StatisticTable/StatisticTable';
import {useEffect, useState} from 'react';
import {useActionCreatorsTyped} from 'shared/hooks/useActionsCreators';
import {asyncActionStudentStatistics} from 'entities/Statistic';
import {useAuth} from 'shared/hooks/useAuth';
import {IGradeStudents} from 'entities/Statistic/types/GradeStudent';
import {asyncActionStudents, IStudent} from 'entities/Student';
import {useAppSelector} from 'shared/hooks/useAppSelector';
import classNames from 'classnames';
import Loader from 'shared/ui/Loader/Loader';

interface IStatisticStudent {
    idTeacher: string,
    idStudent: string,
    idHomework: string,
    allQuestionLength: number
    points: number
    nameHomework: string
    valuePercent: number,
    index: number,
    id: number,
}

interface IStatisticsStudents {
    [idStudent: string]: IStatisticStudent[]
}

export default function StatisticTeacher() {
    const asyncActionCreatorsStudentStatistics = useActionCreatorsTyped(asyncActionStudentStatistics);
    const asyncActionCreatorsStudents = useActionCreatorsTyped(asyncActionStudents);

    const {students, isLoading: isLoadingStudent} = useAppSelector((state) => state.studentsSlice);

    const [selectedHomework, setSelectedHomework] = useState<IStatisticStudent | null>(null);
    const [statisticsStudent, setStatisticsStudent] = useState<IStatisticStudent[]>([]);
    const [statisticsStudents, setStatisticsStudents] = useState<IStatisticsStudents>({});
    const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
    const [isLoadingStatStudent, setIsLoadingStatStudent] = useState(false);

    const auth = useAuth();

    const handleChangeHomework = (value: any) => {
        setSelectedHomework(value);
    };

    const handleChangeStudent = (student: IStudent) => {
        setSelectedStudent(student);
    };

    useEffect(() => {
        if (auth.user) {
            asyncActionCreatorsStudents.getStudents({idTeacher: auth.user.id}).then((response) => {
                const currentStudents = response.payload as IStudent[];
                const currentStudent = currentStudents[0];
                setSelectedStudent(currentStudent);
            });
        }
    }, []);

    useEffect(() => {
        if (selectedStudent) {
            const statStudent = statisticsStudents[selectedStudent.idStudent];

            if (statStudent) {
                setStatisticsStudent(statStudent);

                if (statStudent.length > 0) {
                    setSelectedHomework(statStudent[0]);
                }
            } else {
                setIsLoadingStatStudent(true);

                asyncActionCreatorsStudentStatistics.getStudentStatistics({idStudent: selectedStudent.idStudent}).then((response) => {
                    const data = (response.payload as IGradeStudents[]).map((statStudent, index) => ({
                        ...statStudent,
                        index,
                    }));

                    setStatisticsStudent(data);
                    setStatisticsStudents((prevState) => ({
                        ...prevState,
                        [selectedStudent.idStudent]: data,
                    }));

                    if (data.length > 0) {
                        setSelectedHomework(data[0]);
                    }

                    setIsLoadingStatStudent(false);
                });
            }
        }
    }, [selectedStudent]);

    return (
      <div className={styles.statisticTeacher}>
        <h1 className={styles.title}>Статистика ваших учеников</h1>

        <div className={styles.studentList}>
          {students.map((student) => (
            <button
              className={classNames(styles.studentItem, {
                  [styles.studentItemActive]: selectedStudent?.idStudent === student.idStudent,
              })}
              key={student.id}
              onClick={() => handleChangeStudent(student)}
            >
              {student.nameStudent}
            </button>
            ))}
        </div>

        {isLoadingStatStudent ? (
          <div className={styles.loaderStatistic}>
            <Loader />
          </div>
          ) : null}

        {!isLoadingStatStudent ? (
          <>
            <div className={styles.statisticTable}>
              <StatisticsTable
                data={statisticsStudent}
                color="purple"
                percent
                value={selectedHomework}
                onChange={handleChangeHomework}
              />
            </div>
            {selectedHomework ? (
              <div className={styles.containerSelectedStatistic}>
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
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    );
}

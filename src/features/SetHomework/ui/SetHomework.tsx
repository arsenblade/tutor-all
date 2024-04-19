import {asyncActionHomeworks, IHomework, SelectHomework} from 'entities/Homework';
import {asyncActionStudents, SelectStudent, IStudent} from 'entities/Student';
import styles from './SetHomework.module.scss';
import Button from 'shared/ui/Button/Button';
import {useActionCreatorsTyped} from 'shared/hooks/useActionsCreators';
import {useAppSelector} from 'shared/hooks/useAppSelector';
import {useEffect, useRef, useState} from 'react';
import {useAuth} from 'shared/hooks/useAuth';

interface SetHomeworkPropsInterface {

}

export default function SetHomework({}: SetHomeworkPropsInterface) {
    const auth = useAuth();

    const asyncActionCreatorsStudents = useActionCreatorsTyped(asyncActionStudents);
    const asyncActionCreatorsHomeworks = useActionCreatorsTyped(asyncActionHomeworks);

    const {students, isLoading: isLoadingStudent} = useAppSelector((state) => state.studentsSlice);
    const {homeworks} = useAppSelector((state) => state.homeworksSlice);

    const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
    const [selectedHomeworks, setSelectedHomeworks] = useState<string[]>([]);
    const [visibleHomeworks, setVisibleHomeworks] = useState<IHomework[]>([]);
    const [isLoadingHomework, setIsLoadingHomework] = useState(true);
    const isMount = useRef(false);

    const handleChangeStudent = (student: IStudent) => {
        setSelectedStudent(student);
    };

    const handleChangeHomework = (homeworkId: string, isChecked: boolean) => {
        if (isChecked) {
            setSelectedHomeworks((prevState) => [...prevState, homeworkId]);
        } else {
            setSelectedHomeworks((prevState) => prevState.filter((hId) => hId !== homeworkId));
        }
    };

    const handleSetHomework = () => {
        if (selectedStudent) {
            asyncActionCreatorsStudents.setHomework({id: selectedStudent.id, homeworksIds: [...selectedStudent.homeworksIds, ...selectedHomeworks]}).then((response) => {
                setSelectedHomeworks([]);
                setSelectedStudent((prevState) => {
                    if (prevState) {
                        return {
                            ...prevState,
                            homeworksIds: [...selectedStudent.homeworksIds, ...selectedHomeworks],
                        };
                    }

                    return prevState;
                });
            });
        }
    };

    useEffect(() => {
        if (auth.user) {
            Promise.all([
                asyncActionCreatorsStudents.getStudents({idTeacher: auth.user.id}),
                asyncActionCreatorsHomeworks.getHomeworks({idTeacher: auth.user.id}),
            ]).then((responses) => {
                const firstStudent = students[0];

                if (firstStudent) {
                    setSelectedStudent(firstStudent);
                    setVisibleHomeworks(homeworks.map((homework) => {
                        if (firstStudent.homeworksIds.includes(homework.id)) {
                            return {
                                ...homework,
                                isAssigned: true,
                            };
                        }

                        return homework;
                    }));
                }
            }).finally(() => {
                setIsLoadingHomework(false);
            });
        }
    }, []);

    useEffect(() => {
        if (isMount.current && selectedStudent) {
            setSelectedHomeworks([]);
            setVisibleHomeworks(homeworks.map((homework) => {
                if (selectedStudent.homeworksIds.includes(homework.id)) {
                    return {
                        ...homework,
                        isAssigned: true,
                    };
                }

                return homework;
            }));
        } else {
            isMount.current = true;
        }
    }, [selectedStudent]);

    return (
      <div className={styles.setHomework}>
        <div className={styles.setSelectHomework}>
          <div className={styles.selectHomework}>
            <SelectStudent
              students={students}
              selectedStudent={selectedStudent}
              onChange={handleChangeStudent}
              isLoading={isLoadingStudent}
            />
          </div>
          <SelectHomework
            homeworks={visibleHomeworks}
            isLoading={isLoadingHomework}
            selectedHomeworksIds={selectedHomeworks}
            onChange={handleChangeHomework}
          />
        </div>
        <Button
          className={styles.actionSetHomework}
          color="Violet"
          onClick={handleSetHomework}
        >
          Задать домашнее задание
        </Button>
      </div>
    );
}

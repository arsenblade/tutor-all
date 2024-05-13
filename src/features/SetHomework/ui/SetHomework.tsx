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
    const {homeworks} = useAppSelector((state) => state.setHomeworkSlice);

    const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
    const [selectedHomeworks, setSelectedHomeworks] = useState<{id: string, name: string, lengthQuestions: number}[]>([]);
    const [visibleHomeworks, setVisibleHomeworks] = useState<IHomework[]>([]);
    const [isLoadingHomework, setIsLoadingHomework] = useState(true);
    const isMount = useRef(false);

    const handleChangeStudent = (student: IStudent) => {
        setSelectedStudent(student);
    };

    const handleChangeHomework = (selectedHomework: {id: string, name: string, lengthQuestions: number}, isChecked: boolean) => {
        if (isChecked) {
            setSelectedHomeworks((prevState) => [...prevState, selectedHomework]);
        } else {
            setSelectedHomeworks((prevState) => prevState.filter((hId) => hId.id !== selectedHomework.id));
        }
    };

    const handleSetHomework = () => {
        if (selectedStudent) {
            asyncActionCreatorsStudents.setHomework({id: selectedStudent.id, selectedHomework: [...selectedStudent.setHomeworks, ...selectedHomeworks]}).then((response) => {
                setSelectedHomeworks([]);
                setSelectedStudent((prevState) => {
                    if (prevState) {
                        return {
                            ...prevState,
                            setHomeworks: [...prevState.setHomeworks, ...selectedHomeworks],
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
                        if (firstStudent.setHomeworks?.some((setHomework) => setHomework.id === homework.id)) {
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
                if (selectedStudent.setHomeworks?.some((setHomework) => setHomework.id === homework.id)) {
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
            selectedHomeworks={selectedHomeworks}
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

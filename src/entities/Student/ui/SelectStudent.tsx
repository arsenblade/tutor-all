import styles from './SelectStudent.module.scss';
import {IStudent} from '../types/Student.types';

interface SelectStudentPropsInterface {
    students: IStudent[]
    isLoading: boolean,
    selectedStudent: IStudent | null,
    onChange: (selectedStudent: IStudent) => void;
}

export default function SelectStudent({students, selectedStudent, onChange, isLoading}: SelectStudentPropsInterface) {
    return (
      <div className={styles.selectStudent}>
        <h3 className={styles.title}>Ученики</h3>
        {!isLoading && selectedStudent && students.map((student) => (
          <div
            className={styles.studentTab}
            key={student.id}
          >
            <input
              id={student.idStudent}
              className={styles.studentInput}
              type="radio"
              name="student"
              checked={student.idStudent === selectedStudent.idStudent}
              onChange={(e) => onChange(student)}
            />
            <label htmlFor={student.idStudent} className={styles.studentLabel}>
              {student.nameStudent}
            </label>
          </div>
          ))}

        {!isLoading && students.length === 0 ? (
          <h3 className={styles.titleEmpty}>У вас нет учеников</h3>
          ) : null}

        {isLoading ? (
          <span className={styles.selectStudentLoading} />
          ) : null}
      </div>
    );
}

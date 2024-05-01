import styles from './SelectHomework.module.scss';
import {IHomework} from '../types/Homework.types';

interface SelectHomeworkPropsInterface {
    selectedHomeworks: {id: string, name: string}[]
    onChange: (selectedHomework: {id: string, name: string, lengthQuestions: number}, isChecked: boolean) => void;
    homeworks: IHomework[]
    isLoading: boolean
}

export default function SelectHomework({homeworks, isLoading, selectedHomeworks, onChange}: SelectHomeworkPropsInterface) {
    return (
      <div className={styles.selectHomework}>
        <h3 className={styles.title}>Домашние задания</h3>

        {!isLoading && homeworks.length > 0 && homeworks.map((homework) => (
          <div
            className={styles.homeworkTab}
            key={homework.id}
          >
            <input
              id={homework.id}
              className={styles.homeworkInput}
              type="checkbox"
              name="homework"
              checked={selectedHomeworks.some((selectedHomework) => selectedHomework.id === homework.id)}
              onChange={(event) => onChange({id: homework.id, name: homework.name, lengthQuestions: homework.questions.length}, event.currentTarget.checked)}
              disabled={homework.isAssigned}
            />
            <label
              htmlFor={homework.id}
              className={styles.homeworkLabel}
            >
              <span>
                {homework.name}
              </span>
              {homework.isAssigned ? (
                <span className={styles.homeworkLabelIsAssigned}>
                  Домашнее задание уже задано
                </span>
                ) : null}
            </label>
          </div>
        ))}

        {!isLoading && homeworks.length === 0 ? (
          <h3 className={styles.titleEmpty}>У вас нет домашних заданий</h3>
          ) : null}

        {isLoading ? (
          <span className={styles.selectHomeworkLoading} />
          ) : null}
      </div>
    );
}

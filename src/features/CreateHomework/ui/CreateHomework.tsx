import CustomInput from 'shared/ui/CustomInput/CustomInput';
import Button from 'shared/ui/Button/Button';
import {useActionCreatorsTyped} from 'shared/hooks/useActionsCreators';
import {actionsCreateHomework} from '../model/slices';
import {ChangeEvent, useCallback, useEffect, useRef} from 'react';
import {useAppSelector} from 'shared/hooks/useAppSelector';
import {Question} from 'entities/Question';
import {asyncActionCreateHomework} from '../model/actions';
import {useAuth} from 'shared/hooks/useAuth';
import styles from './CreateHomework.module.scss';
import {useNavigate} from 'react-router-dom';

export default function CreateHomework() {
    const homework = useAppSelector((state) => state.createHomeworkReducer.homework);
    const actionsHomework = useActionCreatorsTyped(actionsCreateHomework);
    const actionsAsyncHomework = useActionCreatorsTyped(asyncActionCreateHomework);
    const refTest = useRef<HTMLDivElement | null>(null);
    const auth = useAuth();
    const navigation = useNavigate();

    const addCreateHomework = useCallback(() => {
        actionsHomework.addQuestion();
    }, []);

    const handleChangeNameHomework = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        actionsHomework.changeNameHomework(event.target.value);
    }, [homework.name]);

    const handleClickAddAnswer = useCallback((idQuestion: string) => {
        actionsHomework.addAnswer({idQuestion});
    }, [homework.name]);

    const handleSubmitCreateHomework = () => {
        actionsAsyncHomework.createHomework({homework, idUser: auth.user?.id || ''}).then((response) => {
            actionsHomework.returnDefaultData();
            navigation('/homework');
        });
    };

    const handleClickRemoveAnswer = (indexQuestion: number, indexAnswer: number) => {
        actionsHomework.removeAnswer({indexQuestion, indexAnswer});
    };

    const handleClickRemoveQuestion = (questionId: string) => {
        actionsHomework.removeQuestion({questionId});
    };

    return (
      <div className={styles.createHomework}>
        <CustomInput
          className={styles.fieldHomeworkName}
          value={homework.name}
          onChange={handleChangeNameHomework}
          type="text"
          placeholder="Введите название домашнего задания"
        />
        {homework.questions.map((question, index) => (
          <Question
            key={question.id}
            question={question}
            onChange={actionsHomework.changeQuestion}
            index={index}
            onClickAddAnswer={handleClickAddAnswer}
            onClickRemoveAnswer={handleClickRemoveAnswer}
            onClickRemoveQuestion={handleClickRemoveQuestion}
          />
        ))}
        <div className={styles.actions}>
          <Button color="Green" onClick={addCreateHomework}>Добавать вопрос</Button>
          <Button
            color="Violet"
            onClick={handleSubmitCreateHomework}
          >
            Создать Д/З
          </Button>
        </div>
      </div>
    );
}

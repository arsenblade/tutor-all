import CustomInput from 'shared/ui/CustomInput/CustomInput';
import Button from 'shared/ui/Button/Button';
import {useActionCreatorsTyped} from 'shared/hooks/useActionsCreators';
import {actionsCreateHomework} from '../model/slices';
import {ChangeEvent, useCallback, useRef} from 'react';
import {useAppSelector} from 'shared/hooks/useAppSelector';
import {Question} from 'entities/Question';

interface CreateHomeworkPropsInterface {

}

export default function CreateHomework({}: CreateHomeworkPropsInterface) {
    const {name, questions} = useAppSelector((state) => state.createHomeworkReducer.homework);
    const actions = useActionCreatorsTyped(actionsCreateHomework);
    const refTest = useRef<HTMLDivElement | null>(null);

    const addCreateHomework = useCallback(() => {
        actions.addQuestion();
    }, []);

    const handleChangeNameHomework = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        actions.changeNameHomework(event.target.value);
    }, [name]);

    const handleClickAddAnswer = useCallback((idQuestion: string) => {
        actions.addAnswer({idQuestion});
    }, [name]);

    return (
      <div>
        <CustomInput
          value={name}
          onChange={handleChangeNameHomework}
          type="text"
          placeholder="Введите название домашнего задания"
        />
        {questions.map((question, index) => (
          <Question
            key={question.id}
            question={question}
            onChange={actions.changeQuestion}
            index={index + 1}
            onClickAddAnswer={handleClickAddAnswer}
          />
        ))}
        <Button color="Violet" onClick={addCreateHomework}>Добавать вопрос</Button>
        <Button color="Green">Создать Д/З</Button>
      </div>
    );
}

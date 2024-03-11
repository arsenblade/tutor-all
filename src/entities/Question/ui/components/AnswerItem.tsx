import CustomInput from 'shared/ui/CustomInput/CustomInput';
import {ChangeEvent, memo} from 'react';
import {IAnswer} from '../../types/Answer.types';

interface AnswerItemPropsInterface {
    answer: IAnswer,
    onChange: (textAnswer: string, idAnswer: string) => void
}

function AnswerItem({answer, onChange}: AnswerItemPropsInterface) {
    const handleChangeAnswer = (event: ChangeEvent<HTMLInputElement>, idAnswer: string) => {
        onChange(event.target.value, idAnswer);
    };

    return (
      <CustomInput
        key={answer.id}
        type="text"
        placeholder="Введите текст ответа"
        onChange={(event) => handleChangeAnswer(event, answer.id)}
      />
    );
}

export default memo(AnswerItem);

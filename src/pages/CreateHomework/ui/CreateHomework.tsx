import {CreateHomework} from 'features/CreateHomework';

interface CreateHomeworkPropsInterface {

}

export default function CreateHomeworkPage({}: CreateHomeworkPropsInterface) {
    return (
      <div>
        <h1>Создайте домашнее задание</h1>
        <CreateHomework />
      </div>
    );
}

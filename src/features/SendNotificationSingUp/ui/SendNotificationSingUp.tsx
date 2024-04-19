import {useAuth} from 'shared/hooks/useAuth';
import {useActionCreatorsTyped} from 'shared/hooks/useActionsCreators';
import {asyncActionSendNotificationSingUp} from '../model/actions';
import Button from 'shared/ui/Button/Button';
import {v4} from 'uuid';

interface TeacherCardPropsInterface {
  idTeacher: string
}

export default function SendNotificationSingUp({idTeacher}: TeacherCardPropsInterface) {
  const auth = useAuth();
  const asyncActionCreatorsSendNotification = useActionCreatorsTyped(asyncActionSendNotificationSingUp);

    const sendNotification = () => {
      if (auth.user) {
        asyncActionCreatorsSendNotification.sendNotificationSingUp({
          title: 'Запрос на добавление в ученики',
          description: `Добавить ученика ${auth.user.name}?`,
          idFrom: auth.user.id,
          nameDestination: auth.user.name,
          idTo: idTeacher,
          id: v4(),
        });
      }
    };

    return (
      <Button
        onClick={sendNotification}
        color="Violet"
      >
        Записаться на урок
      </Button>
    );
}

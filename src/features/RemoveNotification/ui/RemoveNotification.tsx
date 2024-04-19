import Button from 'shared/ui/Button/Button';
import {useActionCreatorsTyped} from 'shared/hooks/useActionsCreators';
import {asyncActionNotifications} from 'entities/Notification';
import {authActions} from 'entities/User';
import {useAuth} from 'shared/hooks/useAuth';

interface RemoveNotificationPropsInterface {
    idNotification: string
}

export default function RemoveNotification({idNotification}: RemoveNotificationPropsInterface) {
    const asyncActionCreatorsRemoveNotification = useActionCreatorsTyped(asyncActionNotifications);
    const actionsUpdateNotify = useActionCreatorsTyped(authActions);

    const auth = useAuth();

    const handleRemoveNotification = async () => {
        asyncActionCreatorsRemoveNotification.removeNotification({idNotification}).then((response) => {
            if (auth.user) {
                actionsUpdateNotify.updateNotification({idUser: auth.user?.id || '', notificationNumbers: auth.user.notificationNumbers - 1});
            }
        });
    };

    return (
      <Button
        onClick={handleRemoveNotification}
        color="Green"
      >
        Нет
      </Button>
    );
}

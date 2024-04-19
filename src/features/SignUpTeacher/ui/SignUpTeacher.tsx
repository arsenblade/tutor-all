import Button from 'shared/ui/Button/Button';
import {useAuth} from 'shared/hooks/useAuth';
import {useActionCreatorsTyped} from 'shared/hooks/useActionsCreators';
import {asyncActionSingUpTeacher} from '../model/actions';
import {ISignUpTeacher} from '../types/SignUpTeacher';
import {asyncActionNotifications} from '../../../entities/Notification';
import {authActions} from 'entities/User';

interface TeacherPropsInterface {
    idNotification: string,
    idStudent: string,
    nameStudent: string,
}

export default function SignUpTeacher({idStudent, nameStudent, idNotification}: TeacherPropsInterface) {
    const auth = useAuth();
    const asyncActionCreatorsSingUpTeacher = useActionCreatorsTyped(asyncActionSingUpTeacher);
    const asyncActionCreatorsRemoveNotification = useActionCreatorsTyped(asyncActionNotifications);
    const actionsUpdateNotify = useActionCreatorsTyped(authActions);

    const handleSingUpTeacher = async () => {
        const singUp: ISignUpTeacher = {
            idTeacher: auth.user?.id || '',
            nameTeacher: auth.user?.name || '',
            idStudent,
            nameStudent,
            homeworksIds: [],
        };
        
        asyncActionCreatorsSingUpTeacher.signUpTeacher({...singUp}).then((response) => {
            asyncActionCreatorsRemoveNotification.removeNotification({idNotification}).then((response) => {
                if (auth.user) {
                    actionsUpdateNotify.updateNotification({idUser: auth.user?.id || '', notificationNumbers: auth.user.notificationNumbers - 1});
                }
            });
        });
    };

    return (
      <Button
        onClick={handleSingUpTeacher}
        color="Violet"
      >
        Да
      </Button>
    );
}

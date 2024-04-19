import styles from './Notification.module.scss';
import {INotification} from '../types/Notification.types';
import {ReactNode} from 'react';
import {ReactComponent as UserIcon} from 'assets/svg/user.svg';
import SignUpTeacher from 'features/SignUpTeacher/ui/SignUpTeacher';
import {RemoveNotification} from 'features/RemoveNotification';

interface TeacherCardPropsInterface {
    notification: INotification
    children?: ReactNode
}

export default function Notification({notification, children}: TeacherCardPropsInterface) {
    return (
      <div className={styles.notification}>
        <UserIcon className={styles.notificationIcon} />
        <div>
          <h5 className={styles.notificationTitle}>
            {notification.nameDestination}
          </h5>
          <p className={styles.notificationDescription}>
            {notification.description}
          </p>

          {children}
        </div>
      </div>
    );
}

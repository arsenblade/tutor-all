import {ReactComponent as NotificationIcon} from 'assets/svg/notification-icon.svg';
import styles from './Header.module.scss';
import {useAuth} from 'shared/hooks/useAuth';
import {useEffect, useRef, useState} from 'react';
import {useActionCreatorsTyped} from 'shared/hooks/useActionsCreators';
import {asyncActionNotifications, Notification} from 'entities/Notification';
import {useAppSelector} from 'shared/hooks/useAppSelector';
import useClickOutside from 'shared/hooks/useClickOutside';
import classNames from 'classnames';
import {authActions} from 'entities/User';
import {SignUpTeacher} from 'features/SignUpTeacher';
import {RemoveNotification} from 'features/RemoveNotification';

export default function HeaderNotification() {
    const {notifications} = useAppSelector((state) => state.notificationSlice);
    const asyncActionCreatorsNotifications = useActionCreatorsTyped(asyncActionNotifications);
    const actionsUpdateNotify = useActionCreatorsTyped(authActions);
    const auth = useAuth();

    const [open, setOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(modalRef, () => {
        if (open) setOpen(false);
    });

    useEffect(() => {
        if (auth.user) {
            asyncActionCreatorsNotifications.getNotification({idUser: auth.user.id});
        }
    }, [auth.user]);

    useEffect(() => {
        if (auth.user && open && notifications.length !== auth.user.notificationNumbers) {
            actionsUpdateNotify.updateNotification({idUser: auth.user.id, notificationNumbers: notifications.length});
        }
    }, [open]);

    return (
      <div className={styles.notifications} ref={modalRef}>
        <button
          className={styles.notificationButton}
          onClick={() => setOpen((prevState) => !prevState)}
        >
          <NotificationIcon className={styles.icon} />
          {auth.user?.notificationNumbers !== undefined && notifications.length > auth.user.notificationNumbers ? (
            <span
              className={styles.notificationNumber}
            >
              {notifications.length - auth.user.notificationNumbers}
            </span>
            ) : null}
        </button>
        <div
          className={classNames(styles.notificationsModal, {
                  [styles.notificationsModalClose]: !open,
        })}
        >
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              notification={notification}
            >
              <div className={styles.notificationsActions}>
                <SignUpTeacher
                  idStudent={notification.idFrom}
                  nameStudent={notification.nameDestination}
                  idNotification={notification.id}
                />

                <RemoveNotification
                  idNotification={notification.id}
                />
              </div>
            </Notification>
          ))}
          {notifications.length === 0 ? (
            <h5 className={styles.notificationsModalNoNotify}>У вас нет уведомлений</h5>
            ) : null}
        </div>
      </div>
    );
}

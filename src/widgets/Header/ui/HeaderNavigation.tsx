import {ReactComponent as NotificationIcon} from 'assets/svg/notification-icon.svg';
import {ReactComponent as ChatIcon} from 'assets/svg/chat-icon.svg';
import {Link} from 'react-router-dom';
import styles from './Header.module.scss';
import {useAuth} from 'shared/hooks/useAuth';
import {LogoutButton} from 'features/LogoutButton';

export default function HeaderNavigation() {
    const auth = useAuth();

    return (
      <ul className={styles.headerNavigation}>
        <li>
          <ChatIcon className={styles.icon} />
        </li>
        <li>
          <NotificationIcon className={styles.icon} />
        </li>
        <li>
          {!auth.user ? (
            <Link className={styles.linkAuth} to="/login">
              Войти
            </Link>
            ) : null}

          {auth.user ? (
            <LogoutButton />
            ) : null}
        </li>
      </ul>
    );
}

import {ReactComponent as ChatIcon} from 'assets/svg/chat-icon.svg';
import {Link} from 'react-router-dom';
import styles from './Header.module.scss';
import {useAuth} from 'shared/hooks/useAuth';
import {LogoutButton} from 'features/LogoutButton';
import HeaderNotification from './HeaderNotification';

export default function HeaderNavigation() {
    const auth = useAuth();

    return (
      <ul className={styles.headerNavigation}>
        {auth.user ? (
          <li>
            <ChatIcon className={styles.icon} />
          </li>
          ) : null}
        {auth.user ? (
          <li>
            <HeaderNotification />
          </li>
          ) : null}
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

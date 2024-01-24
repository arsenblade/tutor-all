import styles from './LogoutButton.module.scss';
import {useActionCreatorsTyped} from 'shared/hooks/useActionsCreators';
import {authActions} from 'entities/User';
import { useCallback, MouseEvent} from 'react';

export default function LogoutButton() {
    const actionsAuth = useActionCreatorsTyped(authActions);

    const handleSubmit = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        actionsAuth.logout().then();
    }, []);

    return (
      <button
        className={styles.logoutButton}
        onClick={handleSubmit}
      >
        Выйти
      </button>
    );
}

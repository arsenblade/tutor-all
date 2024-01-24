import {ReactComponent as Logo} from 'assets/svg/logo.svg';
import {Link} from 'react-router-dom';
import HeaderNavigation from './HeaderNavigation';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/">
          <Logo className={styles.logo} />
        </Link>
        <HeaderNavigation />
      </div>
    </div>
  );
}

import styles from './Loader.module.scss';
import classNames from 'classnames';

interface ILoader {
    className?: string
}

export default function Loader({className}: ILoader) {
    return (
      <span className={classNames(styles.loader, className)} />
    );
}

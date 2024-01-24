import styles from './Status.module.scss';
import classNames from 'classnames';

interface StatusPropsInterface {
    text: string,
    color: 'green' | 'violet'
}

export default function Status({text, color}: StatusPropsInterface) {
    return (
      <div className={classNames(styles.status, styles[color])}>
        {text}
      </div>
    );
}

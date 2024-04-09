import {ReactNode} from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';
import {Link} from 'react-router-dom';

interface ButtonPropsInterface {
    children: ReactNode
    color: 'Violet' | 'Green' | 'Blue'
    disabled?: boolean,
    onClick?: () => void
    className?: string
    isLoading?: boolean,
    to?: string
}

export default function Button({children, onClick, color, disabled, className, to, isLoading}: ButtonPropsInterface) {
  return (
    to ? (
      <Link
        to={to}
        className={cn(styles.button, styles[`button${color}`], className)}
        onClick={onClick}
      >
        {children}
      </Link>
    ) : (
      <button
        className={cn(styles.button, styles[`button${color}`], className)}
        onClick={onClick}
        disabled={disabled}
      >
        {isLoading ? (
          <span className={styles.buttonLoading} />
            ) : null}
        {!isLoading ? (
                children
            ) : null}
      </button>
    )
  );
}

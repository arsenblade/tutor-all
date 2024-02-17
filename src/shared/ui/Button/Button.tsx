import {ReactNode} from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

interface ButtonPropsInterface {
    children: ReactNode
    color: 'Violet' | 'Green'
    disabled?: boolean,
    onClick?: () => void
    className?: string
}

export default function Button({children, onClick, color, disabled, className}: ButtonPropsInterface) {
  return (
    <button className={cn(styles.button, styles[`button${color}`], className)} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

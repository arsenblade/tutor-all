import {ReactNode} from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

interface ButtonPropsInterface {
    children: ReactNode
    color: 'Violet' | 'Green'
    disabled?: boolean,
    onClick?: () => void
}

export default function Button({children, onClick, color, disabled}: ButtonPropsInterface) {
  return (
    <button className={cn(styles.button, styles[`button${color}`])} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

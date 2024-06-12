import { FC, ReactNode } from 'react';
import styles from './Radio.module.scss';
import cn from 'classnames';

interface IRadio {
    children?: ReactNode,
    type: string,
    onChange?: (checked: boolean) => void,
    checked?: boolean,
    className?: string,
    disabled?: boolean
}

const Radio:FC<IRadio> = ({children, disabled, className, type, onChange, checked}) => {
    return (
      <label className={cn(styles.radioLabel, {
            [`${className}`]: className && className,
            [styles.disabled]: disabled,
        })}
      >
        <input type="radio" onChange={(e) => onChange && onChange(e.currentTarget.checked)} className={styles.radioInput} name={type} checked={checked} />
        <span className={styles.fakeRadio} />
        {children ? (
          <p className={styles.radioText}>{children}</p>
          ) : null}
      </label>
    );
};

export default Radio;

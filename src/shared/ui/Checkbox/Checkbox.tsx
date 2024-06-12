import { FC, ReactNode } from 'react';
import cn from 'classnames';
import styles from './Checkbox.module.scss';

interface ICheckbox {
  children?: ReactNode,
  onChange?: (checked: boolean) => void,
  checked?: boolean,
  disabled?: boolean,
  className?: string
}

const Checkbox:FC<ICheckbox> = ({
  children, className, onChange, checked, disabled,
}) => (
  <label className={cn(styles.checkboxLabel, {
    [`${className}`]: className && className,
    [styles.disabled]: disabled,
  })}
  >
    <input
      type="checkbox"
      onChange={(e) => onChange && onChange(e.currentTarget.checked)}
      className={styles.checkboxInput}
      checked={checked}
      disabled={disabled}
    />
    <span className={styles.fakeCheckbox} />
    {children ? (
      <p className={styles.checkboxText}>{children}</p>
    ) : null}
  </label>
);

export default Checkbox;

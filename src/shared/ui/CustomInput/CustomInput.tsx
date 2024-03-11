import React, {InputHTMLAttributes, memo} from 'react';
import cn from 'classnames';
import styles from './CustomInput.module.scss';

interface CustomInputPropsInterface extends InputHTMLAttributes<HTMLInputElement> {}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputPropsInterface>(({ className, ...rest }, ref) => (
  <input
    ref={ref}
    className={cn(styles.customInput, className)}
    {...rest}
  />
));

export default memo(CustomInput);

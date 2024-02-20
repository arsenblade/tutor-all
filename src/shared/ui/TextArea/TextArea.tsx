import React, {InputHTMLAttributes} from 'react';
import cn from 'classnames';
import styles from './TextArea.module.scss';

interface TextAreaPropsInterface extends InputHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaPropsInterface>(({ className, ...rest }, ref) => (
  <textarea
    ref={ref}
    className={cn(styles.textArea, className)}
    {...rest}
  />
));

export default TextArea;

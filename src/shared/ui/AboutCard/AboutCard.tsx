import {ChangeEvent, ReactNode} from 'react';
import styles from './AboutCard.module.scss';

interface AboutCardPropsInterface {
    icon: ReactNode;
    title: string;
    value: string;
    readonly?: boolean;
    onChange?: (value: string) => void;
}

export default function AboutCard({icon, title, value, onChange, readonly}: AboutCardPropsInterface) {
    return (
      <div className={styles.aboutCard}>
        <span className={styles.icon}>
          {icon}
        </span>

        <h5 className={styles.title}>
          {title}
        </h5>
        {readonly ? (
          <p className={styles.description}>
            {value}
          </p>
          ) : null}
        {!readonly ? (
          <textarea
            className={styles.field}
            value={value}
            onChange={(event) => onChange && onChange(event.target.value)}
          />
          ) : null}
      </div>
    );
}

AboutCard.defaultProps = {
    readonly: true,
};

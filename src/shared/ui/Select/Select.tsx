import {useCallback, useState} from 'react';
import classNames from 'classnames';
import styles from './Select.module.scss';
import {SelectItemInterface} from './Select.types';

interface SelectPropsInterface {
    items: SelectItemInterface[]
    currentValue: SelectItemInterface,
    onChangeCurrentValue: (item: SelectItemInterface) => void;
}

export default function Select({items, currentValue, onChangeCurrentValue}: SelectPropsInterface) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClickField = useCallback(() => {
    setIsVisible((prevState) => !prevState);
  }, []);

  const handleClickItem = (item: SelectItemInterface) => {
    onChangeCurrentValue(item);
    setIsVisible(false);
  };

  return (
    <div className={styles.select}>
      <input
        className={styles.field}
        value={currentValue.name}
        onClick={handleClickField}
        readOnly
      />

      <svg
        className={classNames(styles.arrowIcon, {
          [styles.arrowOpen]: isVisible,
        })}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <g clipPath="url(#clip0_1060_450)">
          <path d="M19.4824 4.51884C18.7922 3.82705 17.6725 3.82705 16.9815 4.51884L10.0003 12.2244L3.01902 4.51884C2.32805 3.82705 1.20917 3.82705 0.518229 4.51884C-0.172743 5.21063 -0.172743 6.33117 0.518229 7.02296L8.63918 15.9872C9.01297 16.361 9.51081 16.5259 10.0003 16.4951C10.489 16.5259 10.9877 16.361 11.3614 15.9872L19.4824 7.02296C20.1725 6.33117 20.1725 5.21066 19.4824 4.51884Z" fill="white" />
        </g>
        <defs>
          <clipPath id="clip0_1060_450">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <div className={classNames(styles.dropdown, {
        [styles.isVisibleDropdown]: isVisible,
      })}
      >
        {items.map(((item) => (
          <div
            className={classNames(styles.item, {
              [styles.active]: item.value === currentValue.value,
            })}
            onClick={() => handleClickItem(item)}
            key={item.value}
          >
            {item.name}
          </div>
        )))}
      </div>
    </div>
  );
}

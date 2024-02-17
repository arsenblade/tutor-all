import styles from './SwitchTab.module.scss';
import classNames from 'classnames';

interface SwitchTabPropsInterface {
    tabs: {
        name: string,
        value: string,
    }[]
    activeTab: string,
    onChange: (activeTab: string) => void
}

export default function SwitchTab({tabs, activeTab, onChange}: SwitchTabPropsInterface) {
    const handleClick = (activeTab: string) => {
        onChange(activeTab);
    };

    return (
      <div className={styles.switchTab}>
        {tabs.map((tab) => (
          <button
            onClick={() => handleClick(tab.value)}
            className={classNames(styles.tab, {
                  [styles.activeTab]: activeTab === tab.value,
              })}
          >
            {tab.name}
          </button>
          ))}
      </div>
    );
}

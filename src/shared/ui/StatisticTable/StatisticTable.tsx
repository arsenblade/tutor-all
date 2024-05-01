import React, { FC } from 'react';
import cn from 'classnames';
import styles from './StatisticTable.module.scss';

interface IStatUser {
    value: number;
    isFilled: boolean;
}

interface IStatistics {
    data: IStatUser[];
    color: 'blue' | 'purple'
    percent: boolean
    onChange: (value: number) => void,
    value: number,
}

const StatisticsTable:FC<IStatistics> = ({ data, color, percent, value, onChange}) => (
  <div className={styles.statTableContainer}>
    <div className={cn(styles.statTable, {
            [styles.blueScrollBar]: color === 'purple',
            [styles.purpleScrollBar]: color === 'blue',
        })}
    >
      {data.map((statData, idx) => {
                if (statData.isFilled === true) {
                    return (
                      <div className={styles.statBar} key={idx}>
                        <div className={styles.bodyBarContainer} style={{ height: percent === true ? `${statData.value}%` : `${statData.value * 10 * 2}%` }}>
                          <div
                            className={cn(styles.bodyBar, {
                                    [styles.blueBody]: color === 'blue',
                                    [styles.purpleBody]: color === 'purple',
                                    [styles.selectedBar]: value === idx + 1,
                                })}
                            onClick={() => onChange(idx + 1)}
                          >
                            <div className={cn(styles.valueBar, {
                                        [styles.valueZero]: statData.value === 0,
                                    })}
                            >
                              {percent === true ? `${statData.value}%` : `${statData.value}`}
                            </div>
                          </div>
                          <div className={styles.numberBar}>
                            #
                            {idx + 1}
                          </div>
                        </div>
                      </div>
                    );
                }

                return (
                  <div className={cn(styles.statBar, styles.statBarZero)} key={idx}>
                    <div className={styles.bodyBarContainer}>
                      <div className={styles.bodyBar}>
                        <div className={cn(styles.valueBar, styles.valueZero)}>–</div>
                      </div>
                      <div className={styles.numberBar}>
                        #
                        {idx + 1}
                      </div>
                    </div>
                  </div>
                );
            })}
    </div>
  </div>
);

export default StatisticsTable;

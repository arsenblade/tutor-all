import React, { FC } from 'react';
import cn from 'classnames';
import styles from './StatisticTable.module.scss';

interface IStatUser {
    idHomework: string,
    allQuestionLength: number
    points: number
    nameHomework: string
    valuePercent: number
    index: number
}

interface IStatistics {
    data: IStatUser[];
    color: 'blue' | 'purple'
    percent: boolean
    onChange: (value: IStatUser) => void,
    value: (IStatUser) | null,
}

const StatisticsTable:FC<IStatistics> = ({ data, color, percent, value, onChange}) => (
  <div className={styles.statTableContainer}>
    <div className={cn(styles.statTable, {
            [styles.blueScrollBar]: color === 'purple',
            [styles.purpleScrollBar]: color === 'blue',
        })}
    >
      {data.map((statData, idx) => {
              return (
                <div className={styles.statBar} key={idx}>
                  <div className={styles.bodyBarContainer} style={{ height: percent === true ? `${statData.valuePercent}%` : `${statData.valuePercent * 10 * 2}%` }}>
                    <div
                      className={cn(styles.bodyBar, {
                                  [styles.blueBody]: color === 'blue',
                                  [styles.purpleBody]: color === 'purple',
                                  [styles.selectedBar]: value?.idHomework === statData.idHomework,
                              })}
                      onClick={() => onChange(statData)}
                    >
                      <div className={cn(styles.valueBar, {
                                  [styles.valueZero]: statData.valuePercent === 0,
                              })}
                      >
                        {percent === true ? `${statData.valuePercent}%` : `${statData.valuePercent}`}
                      </div>
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

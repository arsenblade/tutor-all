import styles from './HomePage.module.scss';
import {AdvantagesTeachers} from 'widgets/AdvantagesTeachers';
import {AdvantagesStudent} from 'widgets/AdvantagesStudent';
import SwitchTab from 'shared/ui/SwitchTab/SwitchTab';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {MostPopularTeacher} from 'entities/Teacher';

const tabs = [
    {
        name: 'Репетиторам',
        value: 'teachers',
    },
    {
        name: 'Ученикам',
        value: 'student',
    },
];

export default function HomePage() {
    const [activeTab, setActiveTab] = useState(tabs[0].value);

    const handleChangeTab = (tab: string) => {
        setActiveTab(tab);
    };

  return (
    <div className={styles.homePage}>
      <div className={styles.mainContent}>
        <SwitchTab
          tabs={tabs}
          onChange={handleChangeTab}
          activeTab={activeTab}
        />

        {activeTab === 'student' ? (
          <AdvantagesStudent />
            ) : null}

        {activeTab === 'teachers' ? (
          <AdvantagesTeachers />
            ) : null}
      </div>

      <div className={styles.secondaryContent}>
        <div className={styles.secondaryContentWrapper}>
          <h2 className={styles.secondaryContentTitle}>
            Наши лучшие учителя
          </h2>
          <div className={styles.popularTeacherList}>
            <MostPopularTeacher />
            <MostPopularTeacher />
            <MostPopularTeacher />
          </div>
        </div>
      </div>
    </div>
  );
}

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
            <MostPopularTeacher image="https://mtdata.ru/u3/photoD9EE/20305968034-0/original.jpg" />
            <MostPopularTeacher image="https://interesnoewmire.ru/wp-content/uploads/krasivye-devushki-na-chetverg-chast-3-46-foto-cefbb3f.jpg" />
            <MostPopularTeacher image="https://wallbox.ru/wallpapers/main2/201723/satenka.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
}

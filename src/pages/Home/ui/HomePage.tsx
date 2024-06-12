import styles from './HomePage.module.scss';
import {AdvantagesTeachers} from 'widgets/AdvantagesTeachers';
import {AdvantagesStudent} from 'widgets/AdvantagesStudent';
import SwitchTab from 'shared/ui/SwitchTab/SwitchTab';
import {useEffect, useState} from 'react';
import {asyncActionTeacher, MostPopularTeacher} from 'entities/Teacher';
import {useActionCreatorsTyped} from 'shared/hooks/useActionsCreators';
import {useAppSelector} from 'shared/hooks/useAppSelector';
import Loader from 'shared/ui/Loader/Loader';

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
    const asyncActionCreatorsTeacher = useActionCreatorsTyped(asyncActionTeacher);
    const { isLoading, teachers} = useAppSelector((state) => state.teacherSlice);
    const [activeTab, setActiveTab] = useState(tabs[0].value);

    const handleChangeTab = (tab: string) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        asyncActionCreatorsTeacher.getTeachers().then();
    }, []);

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
          {!isLoading ? (
            <div className={styles.popularTeacherList}>
              {teachers.map((teacher) => (
                <MostPopularTeacher
                  key={teacher.id}
                  image={teacher.photo}
                  name={teacher.name}
                  description={teacher.description}
                  link={`/teachers/${teacher.id}`}
                />
                ))}
            </div>
            ) : (
              <div className={styles.loaderContainer}>
                <Loader className={styles.loader} />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

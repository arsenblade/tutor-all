import HomeworkTeacher from 'widgets/HomeworkTeacher/ui/HomeworkTeacher';
import {useAuth} from 'shared/hooks/useAuth';
import HomeworkStudent from 'widgets/HomeworkStudent/ui/HomeworkStudent';
import {Fragment} from 'react';
import styles from './Homework.module.scss';

interface HomeworkPropsInterface {

}

export default function HomeworkPage({}: HomeworkPropsInterface) {
    const auth = useAuth();

    return (
      <div>
        {auth.user?.roles.includes('teacher') ? (
          <HomeworkTeacher />
          ) : null}

        {auth.user?.roles.includes('student') ? (
          <HomeworkStudent />
            ) : null}
      </div>
    );
}

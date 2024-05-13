import HomeworkTeacher from 'widgets/HomeworkTeacher/ui/HomeworkTeacher';
import {useAuth} from 'shared/hooks/useAuth';
import HomeworkStudent from 'widgets/HomeworkStudent/ui/HomeworkStudent';

export default function HomeworkPage() {
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

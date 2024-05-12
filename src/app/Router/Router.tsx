import React, {useEffect, useRef} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import {adminRoutes, notAuthRoutes, publicRoutes, studentRoutes, teacherRoutes} from 'shared/config/routerConfig';
import {useAuth} from 'shared/hooks/useAuth';
import {useParams} from 'react-router';
import {useActionCreatorsTyped} from '../../shared/hooks/useActionsCreators';
import {actionsDoingHomeworks} from '../../entities/Homework/model/slices/doingHomework';
import {actionsCreateHomework} from '../../features/CreateHomework/model/slices';

const AppRouter = () => {
  const auth = useAuth();

  const location = useLocation();
  const prevRoute = useRef('');
  const actionsCreatorsDoingHomeworks = useActionCreatorsTyped(actionsDoingHomeworks);
  const actionsCreatorsHomework = useActionCreatorsTyped(actionsCreateHomework);

  useEffect(() => {
    if (prevRoute.current) {
      const routeSplit = prevRoute.current.split('/');

      if (routeSplit.length && routeSplit[2] === 'doing') {
        actionsCreatorsDoingHomeworks.clearHomework();
        console.log(routeSplit);
      }

      if (prevRoute.current === '/homework/create') {
        actionsCreatorsHomework.returnDefaultData();
      }

      prevRoute.current = location.pathname;
    } else {
      prevRoute.current = location.pathname;
    }
  }, [location]);

  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}
      {!auth.user && notAuthRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}
      {auth.user && auth.user.roles.includes('student') && studentRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}
      {auth.user && auth.user.roles.includes('teacher') && teacherRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}
      {auth.user && auth.user.roles.includes('admin') && adminRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}
    </Routes>
  );
};

export default AppRouter;

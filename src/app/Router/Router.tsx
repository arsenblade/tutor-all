import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {adminRoutes, notAuthRoutes, publicRoutes, studentRoutes, teacherRoutes} from 'shared/config/routerConfig';
import {useAuth} from 'shared/hooks/useAuth';

const AppRouter = () => {
  const auth = useAuth();

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

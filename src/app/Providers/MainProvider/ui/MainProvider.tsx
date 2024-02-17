import React, {FC, useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Header} from 'widgets/Header';
import AppRouter from '../../../Router/Router';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import {useActionCreatorsTyped} from 'shared/hooks/useActionsCreators';
import {authActions} from 'entities/User';
import styles from './MainProvider.module.scss';
import {Navigation} from 'widgets/Navigation';
import Footer from '../../../../widgets/Footer/ui/Footer';

interface MainProviderProps {
    children?: React.ReactNode
}

const MainProvider:FC<MainProviderProps> = ({ children }) => {
    const actionsAuth = useActionCreatorsTyped(authActions);

    useEffect(() => {
         actionsAuth.checkAuth().then();
    }, []);

    return (
      <BrowserRouter>
        <ErrorBoundary>
          <Header />
          <Navigation />
          {children}
          <main className={styles.main}>
            <AppRouter />
          </main>
          <Footer />
        </ErrorBoundary>
      </BrowserRouter>
    );
};

export default MainProvider;

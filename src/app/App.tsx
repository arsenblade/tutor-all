import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './Store';
import {MainProvider} from './Providers/MainProvider';
import './styles/global.scss';

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainProvider />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;

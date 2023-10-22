import React from 'react';
import './App.css';
import { router } from './routing/Routes';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@redux/index';
import Loader from '@components/atoms/loader/Loader.tsx';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const persist = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <Loader />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
};

export default App;

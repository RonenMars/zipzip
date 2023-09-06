import React from 'react';
import './App.css';
import { router } from './routing/Routes';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@redux/index';
import Loader from '@components/atoms/loader/Loader.tsx';

function App() {
  return (
    <Provider store={store}>
      <Loader />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

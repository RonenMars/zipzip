import React from 'react';
import { Phone, Otp } from '@components/pages/login';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginProtectedRoute, AppProtectedRoute } from './Protected';
import { Home } from '@components/pages';
import { PersistentStorage } from '@utils/localStorage/localStorage.ts';

const isUserLoggedIn = PersistentStorage.getItem('userJWT');
export const router = createBrowserRouter([
  {
    path: 'app',
    element: (
      <AppProtectedRoute>
        <Home />
      </AppProtectedRoute>
    ),
    //   children: [
    //     { index: true, element: <Navigate to="dashboard" /> },
    //     { path: 'dashboard', element: <DashboardComponent /> },
    //     { path: 'other', element: <OtherComponent /> },
    //   ],
  },
  { path: '/', element: isUserLoggedIn ? <Navigate replace to="/app" /> : <Phone /> },
  {
    element: (
      <LoginProtectedRoute>
        <Otp />
      </LoginProtectedRoute>
    ),
    path: '/otp',
  },
  { element: <p>There&apos;s nothing here: 404!</p>, path: '*' },
]);

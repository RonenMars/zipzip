import React from 'react';
import { Phone, Otp } from '@components/pages/login';
import { createBrowserRouter } from 'react-router-dom';
import { LoginProtectedRoute, AppProtectedRoute } from '@routing/Protected';
import { Home } from '@components/pages';
import { Registration } from '@components/pages/';
import { UserAlreadyLoggedProtectedRoute } from '@routing/Protected/UserAlreadyLoggedProtectedRoute.tsx';
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
  {
    path: '/',
    element: (
      <UserAlreadyLoggedProtectedRoute>
        <Phone />
      </UserAlreadyLoggedProtectedRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <UserAlreadyLoggedProtectedRoute>
        <Registration />
      </UserAlreadyLoggedProtectedRoute>
    ),
  },
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

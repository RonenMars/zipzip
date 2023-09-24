import React from 'react';
import { Phone, Otp } from '@components/pages/login';
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedLoginRoute } from './Protected/ProtectedLoginRoute';

export const router = createBrowserRouter([
  // {
  //   path: 'app',
  //   element: isLoggedIn ? <HomeComponent /> : <Navigate to="/login" />,
  //   children: [
  //     { index: true, element: <Navigate to="dashboard" /> },
  //     { path: 'dashboard', element: <DashboardComponent /> },
  //     { path: 'other', element: <OtherComponent /> },
  //   ],
  // },
  { element: <Phone />, path: '/' },
  {
    element: (
      <ProtectedLoginRoute>
        <Otp />
      </ProtectedLoginRoute>
    ),
    path: '/otp',
  },
  { element: <p>There&apos;s nothing here: 404!</p>, path: '*' },
]);

import React from 'react';
import { Login, OTP } from '@components/pages/login';
import { createBrowserRouter } from 'react-router-dom';
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
  { element: <Login />, path: '/' },
  { element: <OTP />, path: '/otp' },
]);

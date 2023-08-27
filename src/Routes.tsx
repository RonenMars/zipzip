import React from 'react';
import LoginPhone from '@components/pages/login/LoginPhone.tsx';
import { createBrowserRouter } from 'react-router-dom';
import OTP from '@components/pages/login/OTP.tsx';
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
  { element: <LoginPhone />, path: '/' },
  { element: <OTP />, path: '/otp' },
]);

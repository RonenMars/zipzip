import { Navigate } from 'react-router-dom';
import React, { ReactNode } from 'react';
import { PersistentStorage } from '@utils/localStorage/localStorage';
import { ProtectedRouteInterface } from './interface/ProtectedInterface';

export const LoginProtectedRoute: React.FC<ProtectedRouteInterface> = ({ children, redirectPath = '/' }): ReactNode => {
  const userPhone = !!PersistentStorage.getItem('userPhone');

  if (!userPhone) {
    return <Navigate replace to={redirectPath} />;
  }

  return children;
};

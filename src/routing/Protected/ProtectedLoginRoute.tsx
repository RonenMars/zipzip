import { Navigate } from 'react-router-dom';
import React, { ReactNode } from 'react';
import { PersistentStorage } from '@utils/localStorage/localStorage';
import { ProtectedLoginRouteProps } from './interface/ProtectedInterface';

export const ProtectedLoginRoute: React.FC<ProtectedLoginRouteProps> = ({
  children,
  redirectPath = '/',
}): ReactNode => {
  const userPhone = !!PersistentStorage.getItem('userPhone');

  if (!userPhone) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

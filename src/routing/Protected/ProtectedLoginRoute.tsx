import { Navigate } from 'react-router-dom';
import React, { ReactNode } from 'react';
import { PersistentStorage } from '@utils/localStorage/localStorage';
import { ProtectedLoginRouteInterface } from './interface/ProtectedInterface';

export const ProtectedLoginRoute: React.FC<ProtectedLoginRouteInterface> = ({
  children,
  redirectPath = '/',
}): ReactNode => {
  const userPhone = !!PersistentStorage.getItem('userPhone');

  if (!userPhone) {
    return <Navigate replace to={redirectPath} />;
  }

  return children;
};

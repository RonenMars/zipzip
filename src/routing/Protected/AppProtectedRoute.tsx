import { Navigate } from 'react-router-dom';
import React, { ReactNode } from 'react';
import { ProtectedRouteInterface } from './interface/ProtectedInterface';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/index.ts';

export const AppProtectedRoute: React.FC<ProtectedRouteInterface> = ({ children, redirectPath = '/' }): ReactNode => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  if (!isLoggedIn) {
    return <Navigate replace to={redirectPath} />;
  }

  return children;
};

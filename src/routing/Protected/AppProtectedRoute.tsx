import React, { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';
import { ProtectedRouteInterface } from '@routing/Protected/interface/ProtectedInterface.ts';
import { PersistentStorage } from '@utils/localStorage/localStorage.ts';

export const AppProtectedRoute: React.FC<ProtectedRouteInterface> = ({ children, redirectPath = '/' }): ReactNode => {
  const jwtToken = PersistentStorage.getItem('jwtToken');
  if (!jwtToken) {
    return <Navigate to={redirectPath} />;
  }
  return children;
};

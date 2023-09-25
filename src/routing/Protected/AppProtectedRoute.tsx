import React, { ReactNode, useContext } from 'react';

import { Navigate } from 'react-router-dom';
import { AuthContext } from '@routing/Protected/hooks/useAuth';
import { ProtectedRouteInterface } from '@routing/Protected/interface/ProtectedInterface.ts';

export const AppProtectedRoute: React.FC<ProtectedRouteInterface> = ({ children, redirectPath = '/' }): ReactNode => {
  const { jwtToken } = useContext(AuthContext);
  if (!jwtToken) {
    return <Navigate to={redirectPath} />;
  }
  return children;
};

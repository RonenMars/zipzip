import React from 'react';

export interface ProtectedLoginRouteProps {
  children: React.ReactNode;
  identificator: boolean;
  redirectPath?: string;
}

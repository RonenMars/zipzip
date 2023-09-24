import React from 'react';

export interface ProtectedRouteInterface {
  children: React.ReactNode;
  redirectPath?: string;
}

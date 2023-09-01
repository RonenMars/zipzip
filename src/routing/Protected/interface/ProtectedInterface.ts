import React from 'react';

export interface ProtectedLoginRouteInterface {
  children: React.ReactNode;
  redirectPath?: string;
}

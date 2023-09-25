import React from 'react';
import { createContext, ReactNode, useState } from 'react';

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  jwtToken: string | undefined;
  setJwtToken: (newToken: string) => void;
};

const initialValue = {
  jwtToken: undefined,
  setJwtToken: () => {},
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const [jwtToken, setJwtToken] = useState(initialValue.jwtToken as unknown as string);

  return <AuthContext.Provider value={{ jwtToken, setJwtToken }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };

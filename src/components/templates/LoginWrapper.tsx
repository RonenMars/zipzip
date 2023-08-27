import React, { ReactNode } from 'react';
type Props = {
  children: ReactNode;
};
const LoginWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-white w-96 rounded-3xl shadow-lg py-8 px-14">{children}</div>
    </div>
  );
};
export default LoginWrapper;

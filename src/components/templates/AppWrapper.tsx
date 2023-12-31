import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { LanguageSwitcher } from '@components/molecules/languageSwitcher/LanguageSwitcher.tsx';

type Props = {
  children: ReactNode;
  classes?: string[];
};
const AppWrapper: React.FC<Props> = ({ children, classes }) => {
  const baseClass = ['bg-white w-96 rounded-3xl shadow-lg py-8 px-14'];
  const wrapperClass = clsx(baseClass, classes);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <LanguageSwitcher />
      <div className={wrapperClass}>{children}</div>
    </div>
  );
};
export default AppWrapper;

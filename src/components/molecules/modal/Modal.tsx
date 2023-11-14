import React from 'react';
import { ReactNode } from 'react';
import clsx from 'clsx';

type ModalProps = {
  children: ReactNode;
  wrapperClasses?: Array<string>;
  classes?: Array<string>;
};
const Modal = ({ children, wrapperClasses, classes }: ModalProps) => {
  const wrapperClass = clsx('absolute w-full h-full bg-purple-100 opacity-90 z-30 top-0 right-0', wrapperClasses);

  const modalClasses = clsx('absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2', classes);

  return (
    <div className={wrapperClass}>
      <div className={modalClasses}>{children}</div>
    </div>
  );
};

export default Modal;

import React from 'react';
import { ReactNode } from 'react';

type ModalProps = {
  children: ReactNode;
};
const Modal = ({ children }: ModalProps) => {
  return (
    <div className="absolute w-full h-full bg-purple-100 opacity-90 z-30 top-0 right-0">
      <div className="absolute top-1/3 right-1/2 transform translate-x-1/2 translate-y-1/2">{children}</div>
    </div>
  );
};

export default Modal;

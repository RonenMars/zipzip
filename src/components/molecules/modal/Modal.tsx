import React from 'react';
import { ReactNode } from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/pro-solid-svg-icons';
import { closeModal } from '@redux/ModalsReducer';
import { useDispatch } from 'react-redux';

type ModalProps = {
  children: ReactNode;
  name: string;
  wrapperClasses?: Array<string>;
  classes?: Array<string>;
  hideCloseButton?: boolean;
};
const Modal = ({ children, wrapperClasses, classes, name, hideCloseButton }: ModalProps) => {
  const dispatch = useDispatch();

  const wrapperClass = clsx('absolute w-full h-full bg-purple-100 top-0 right-0 z-40', wrapperClasses);

  const modalClasses = clsx(
    'absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 pb-8 px-14 w-96 rounded-3xl opacity-100',
    classes,
  );

  const closeSelf = () => {
    dispatch(closeModal({ name }));
  };

  return (
    <div className={wrapperClass}>
      <div className={modalClasses}>
        {!hideCloseButton && (
          <FontAwesomeIcon
            icon={faXmark}
            onClick={closeSelf}
            className="absolute left-4 top-4 cursor-pointer w-8 h-8"
          />
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;

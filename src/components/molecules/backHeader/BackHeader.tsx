import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface BackHeaderInterface {
  title: string;
  fallbackRoute?: string;
}
export const BackHeader = ({ title, fallbackRoute }: BackHeaderInterface) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (fallbackRoute) {
      navigate(fallbackRoute);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex-1 justify-self-start">
        <FontAwesomeIcon className="cursor-pointer" icon={faChevronRight} onClick={goBack} />
      </div>
      <h1 className="flex-1 text-center">{title}</h1>
      <div className="flex-1" />
    </div>
  );
};

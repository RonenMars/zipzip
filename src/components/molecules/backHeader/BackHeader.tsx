import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface BackHeaderInterface {
  title: string;
}
export const BackHeader = ({ title }: BackHeaderInterface) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center">
      <div className="flex-1 justify-self-start">
        <FontAwesomeIcon className="cursor-pointer" icon={faChevronRight} onClick={() => navigate(-1)} />
      </div>
      <h1 className="flex-1 text-center">{title}</h1>
      <div className="flex-1" />
    </div>
  );
};

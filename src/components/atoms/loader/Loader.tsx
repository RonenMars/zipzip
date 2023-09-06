import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/index.ts';

const Loader: React.FC = () => {
  const loaderState = useSelector((state: RootState) => state.loader.loading);
  return <div>{loaderState && <div className="absolute z-10 h-full w-full bg-black opacity-30"></div>}</div>;
};

export default Loader;

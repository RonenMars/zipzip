import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/index.ts';

/**
 * Loader component for displaying a loading overlay.
 *
 * @returns {JSX.Element} The rendered Loader component, which displays an overlay when loading is in progress.
 */
const Loader: React.FC = () => {
  /**
   * The loading state retrieved from the Redux store.
   * @type {boolean}
   */
  const loaderState: boolean = useSelector((state: RootState) => state.loader.loading);
  return <div>{loaderState && <div className="absolute z-10 h-full w-full bg-black opacity-30"></div>}</div>;
};

export default Loader;

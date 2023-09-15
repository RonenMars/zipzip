import React, { ReactElement, FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/index.ts';
import Lottie from 'lottie-react';
import { loaderAnimation } from '@assets/lottie-animations';
/**
 * Loader component for displaying a loading overlay.
 *
 * @returns {React.ReactElement} The rendered Loader component, which displays an overlay when loading is in progress.
 */
const Loader: FC = (): ReactElement => {
  /**
   * The loading state retrieved from the Redux store.
   * @type {boolean}
   */
  const loaderState: boolean = useSelector((state: RootState) => state.loader.loading);
  const style = {
    height: 300,
    width: 300,
  };

  return (
    <div>
      {loaderState && (
        <div>
          <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Lottie animationData={loaderAnimation} loop={true} style={style} />
          </div>
          <div className="absolute z-10 h-full w-full bg-white opacity-30"></div>
        </div>
      )}
    </div>
  );
};

export default Loader;

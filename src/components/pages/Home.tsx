import React, { ReactNode } from 'react';
import { AppWrapper } from '@components/templates';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { Button } from '@components/atoms';
import { Header } from '@components/molecules';
export const Home: React.FC = (): ReactNode => {
  return (
    <AppWrapper classes={['px-6', 'py-4']}>
      <div className="relative h-[50vh]">
        <Header />
        <div className="absolute bottom-0 left-0">
          <Button classes={['rounded-3xl', 'w-14', 'h-14']}>
            <FontAwesomeIcon icon={faPlus} onClick={() => {}} />
          </Button>
        </div>
      </div>
    </AppWrapper>
  );
};

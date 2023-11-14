import React, { ReactNode } from 'react';
import { AppWrapper } from '@components/templates';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { Button } from '@components/atoms';
import { Header } from '@components/molecules';
import { useTranslation } from 'react-i18next';
import AddCoupon from '@components/pages/AddCoupon.tsx';

export const Home: React.FC = (): ReactNode => {
  const { t } = useTranslation();

  return (
    <AppWrapper classes={['px-6', 'py-4']}>
      <div className="relative h-[50vh]">
        <Header title={t('myCoupons')} />
        <div className="absolute bottom-0 left-0">
          <Button classes={['rounded-3xl', 'w-14', 'h-14']}>
            <FontAwesomeIcon icon={faPlus} onClick={() => {}} />
          </Button>
        </div>
      </div>
      <AddCoupon />
    </AppWrapper>
  );
};

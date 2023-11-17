import React, { ReactNode, useEffect } from 'react';
import { AppWrapper } from '@components/templates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { Button } from '@components/atoms';
import { Header } from '@components/molecules';
import { useTranslation } from 'react-i18next';
import AddCoupon from '@components/pages/AddCoupon';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '@redux/ModalsReducer';
import { RootState } from '@redux/index.ts';

const addCouponModalName = 'AddCoupon';

export const Home: React.FC = (): ReactNode => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    return () => {
      dispatch(closeModal({ name: addCouponModalName }));
    };
  }, []);

  const addCouponModalState = useSelector((state: RootState) => state.modals.modalsState[addCouponModalName]);

  const openAddCouponModal = () => {
    dispatch(openModal({ name: addCouponModalName }));
  };

  return (
    <AppWrapper classes={['px-6', 'py-4']}>
      <div className="relative h-[50vh]">
        <Header title={t('myCoupons')} />
        <div className="absolute bottom-0 left-0">
          <Button classes={['rounded-3xl', 'w-14', 'h-14']}>
            <FontAwesomeIcon icon={faPlus} onClick={openAddCouponModal} />
          </Button>
        </div>
      </div>
      {addCouponModalState && <AddCoupon name={addCouponModalName} />}
    </AppWrapper>
  );
};

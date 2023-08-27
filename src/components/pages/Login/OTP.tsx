import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import LoginWrapper from '@components/templates/LoginWrapper.tsx';

const LoginPhone: React.FC = (): ReactNode => {
  const { t } = useTranslation();

  return (
    <LoginWrapper>
      <div className="flex justify-center flex-col">
        <h1 className="text-center">{t('enter')}</h1>
      </div>
    </LoginWrapper>
  );
};

export default LoginPhone;

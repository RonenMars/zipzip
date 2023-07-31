import React from 'react';
import { Button, Input } from '@components/atoms';
import { Form } from '@components/molecules';
import { useTranslation } from 'react-i18next';
import buttonDesignTypes from '@components/atoms/Button/ButtonEnums';

const Login: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex justify-center flex-col">
        <h1 className="text-center">{t('enter')}</h1>
        <Form classes="pt-4">
          <Input name="phoneNumber" placeholder={t('demoPhoneNumber')} label={t('phoneNumber')} />
          <Button type="submit" classes={['mt-4']}>
            {t('enter')}
          </Button>
        </Form>
        <div className="text-center">
          <h2 className="mt-4">חדשים פה?</h2>
          <Button design={buttonDesignTypes.Link}>{t('registerNow')}</Button>
        </div>
      </div>
    </>
  );
};

export default Login;

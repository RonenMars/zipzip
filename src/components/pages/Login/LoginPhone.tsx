import React from 'react';
import { Button, Input } from '@components/atoms';
import { Form } from '@components/molecules';
import { useTranslation } from 'react-i18next';
import buttonDesignTypes from '@components/atoms/Button/ButtonEnums';
import * as Yup from 'yup';

const Login: React.FC = () => {
  const { t } = useTranslation();

  const LoginPhoneSchema = Yup.object().shape({
    phoneNumber: Yup.string().min(10, 'Too Short!').max(10, 'Too Long!').required('Required'),
  });

  return (
    <>
      <div className="flex justify-center flex-col">
        <h1 className="text-center">{t('enter')}</h1>
        <Form classes="pt-4" validationSchema={LoginPhoneSchema}>
          <Input
            name="phoneNumber"
            placeholder={t('demoPhoneNumber')}
            label={t('phoneNumber')}
            classes={['text-center']}
          />
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

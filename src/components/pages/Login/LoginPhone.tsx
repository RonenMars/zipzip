import React from 'react';
import { Button, Input } from '@components/atoms';
import { Form, FormFields } from '@components/molecules';
import { useTranslation } from 'react-i18next';
import buttonDesignTypes from '@components/atoms/Button/ButtonEnums';
import * as Yup from 'yup';
import API from '@api/index';

const Login: React.FC = () => {
  const { t } = useTranslation();

  const LoginPhoneSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .min(10, t('tooShortPhoneNumber'))
      .max(10, t('tooLongPhoneNumber'))
      .required(t('fieldRequired')),
  });

  const handleFormSubmit = async (phoneNumber: FormFields) => {
    const { phoneNumber: userPhone } = phoneNumber;
    const submitPhoneNumber = await API.get(`/user/${userPhone}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="flex justify-center flex-col">
        <h1 className="text-center">{t('enter')}</h1>
        <Form classes="pt-4" validationSchema={LoginPhoneSchema} onSubmit={handleFormSubmit}>
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
          <h2 className="mt-4">{t('loginRegisterTitle')}</h2>
          <Button design={buttonDesignTypes.Link}>{t('registerNow')}</Button>
        </div>
      </div>
    </>
  );
};

export default Login;

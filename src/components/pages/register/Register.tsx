import React, { useState } from 'react';
import { AppWrapper } from '@components/templates';
import { Form, FormFields } from '@components/molecules';
import { Button, Input } from '@components/atoms';
import { useNavigate } from 'react-router-dom';
import { SingleError } from '@components/pages/login/phone/interface/PhoneInterface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/index.ts';
import { useTranslation } from 'react-i18next';
import { RegistrationSchema } from '@validations/user/register/registration.schema';

export const Register = () => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Array<SingleError>>([]);
  const loaderState = useSelector((state: RootState) => state.loader.loading);
  const handleFormSubmit = async (formFields: FormFields) => {};

  return (
    <AppWrapper>
      <div className="flex justify-center flex-col">
        <h1 className="text-center">{t('enter')}</h1>
        <Form classes="pt-4" onSubmit={handleFormSubmit} serverErrors={errors} validationSchema={RegistrationSchema}>
          <Input
            classes={['text-center']}
            dir="ltr"
            disabled={loaderState}
            label={t('fullName')}
            name="fullName"
            placeholder={t('enterFullName')}
          />
          <Input
            classes={['text-center']}
            dir="ltr"
            disabled={loaderState}
            label={t('phoneNumber')}
            name="phone"
            placeholder={t('enterPhone')}
          />
          <Input
            classes={['text-center']}
            dir="ltr"
            disabled={loaderState}
            label={t('email')}
            name="email"
            placeholder={t('enterEmail')}
          />
          <Button classes={['mt-4', 'w-full']} disabled={loaderState} type="submit">
            {t('register')}
          </Button>
        </Form>
      </div>
    </AppWrapper>
  );
};

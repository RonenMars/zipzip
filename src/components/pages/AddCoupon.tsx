import React, { useEffect, useState } from 'react';
import { RegistrationSchema } from '@validations/user/register/registration.schema';
import { Button, Input } from '@components/atoms';
import { Form, FormFields } from '@components/molecules';
import Modal from '@components/molecules/modal/Modal';
import { useTranslation } from 'react-i18next';
import { SingleError } from '@components/pages/login/phone/interface/PhoneInterface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/index.ts';
import { useNavigate } from 'react-router-dom';
import { PersistentStorage } from '@utils/localStorage/localStorage';
import { setLoader } from '@redux/LoaderReducer.ts';
import API from '@api/index';
import axios from 'axios';

type AddCouponProps = {
  name: string;
};

const AddCoupon = ({ name }: AddCouponProps) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<Array<SingleError>>([]);
  const loaderState = useSelector((state: RootState) => state.loader.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    PersistentStorage.setItem('registrationState', true);
  }, []);

  const handleFormSubmit = async (formFields: FormFields) => {
    dispatch(setLoader({ loading: true }));
    try {
      await API.post('/account/register', formFields);
      const { phone: userPhone } = formFields;
      PersistentStorage.setItem('userPhone', userPhone);
      navigate('/otp');

      dispatch(setLoader({ loading: false }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverErrors = error?.response?.data.message;
        if (serverErrors) {
          if (Array.isArray(serverErrors)) {
            setErrors(serverErrors);
          } else {
            setErrors([
              {
                name: 'global',
                message: serverErrors,
              },
            ]);
          }
        }
      } else {
        console.error(error);
      }

      dispatch(setLoader({ loading: false }));
    }
    dispatch(setLoader({ loading: false }));
  };
  return (
    <Modal name={name} classes={['bg-white']}>
      <Form classes="pt-4" onSubmit={handleFormSubmit} serverErrors={errors} validationSchema={RegistrationSchema}>
        <Input
          classes={['text-center']}
          disabled={loaderState}
          label={t('fullName')}
          name="name"
          placeholder={t('enterFullName')}
          wrapperClasses="mt-4"
        />
        <Input
          classes={['text-center']}
          dir="ltr"
          disabled={loaderState}
          label={t('phoneNumber')}
          name="phone"
          placeholder={t('enterPhone')}
          wrapperClasses="mt-3"
        />
        <Input
          classes={['text-center']}
          dir="ltr"
          disabled={loaderState}
          label={t('email')}
          name="email"
          placeholder={t('enterEmail')}
          wrapperClasses="mt-3"
        />
        <Button classes={['mt-4', 'w-full']} disabled={loaderState} type="submit">
          {t('add')}
        </Button>
      </Form>
    </Modal>
  );
};

export default AddCoupon;

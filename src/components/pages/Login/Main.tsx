import React from 'react';
import { Button, Input } from '@components/atoms';
import { Form } from '@components/molecules';
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Form>
      <Input name="phoneNumber" placeholder={t('demoPhoneNumber')} label={t('phoneNumber')} />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default Login;

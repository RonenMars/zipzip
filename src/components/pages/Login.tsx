import React from 'react';
import { Input } from '@components/atoms';
import { Form } from '@components/molecules';

const Login: React.FC = () => {
  return (
    <Form>
      <Input name="firstName" placeholder="Type your first name" />
      <Input name="lastName" placeholder="Type your last name" />
    </Form>
  );
};

export default Login;

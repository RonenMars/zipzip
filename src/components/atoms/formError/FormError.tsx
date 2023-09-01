import React, { ReactNode } from 'react';
import { FormErrorInterface } from '@components/atoms/formError/interface/FormErrorInterface';
const FormError: React.FC<FormErrorInterface> = ({ error }): ReactNode => {
  return <div className="text-red">{error}</div>;
};

export default FormError;

import React, { ReactNode } from 'react';
import { FormErrorInterface } from '@components/atoms/formError/interface/FormErrorInterface';

/**
 * FormError component for displaying error messages in a form.
 *
 * @param {Object} props - The props object containing the following properties:
 * @param {string} props.error - The error message to be displayed.
 *
 * @returns {ReactNode} The rendered FormError component, which displays the error message.
 */
const FormError: React.FC<FormErrorInterface> = ({ error }: { error: string }): ReactNode => {
  return <div className="text-red">{error}</div>;
};

export default FormError;

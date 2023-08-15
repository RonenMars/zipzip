import React, { useState, createContext } from 'react';
import { ValidationError, AnyObjectSchema } from 'yup';
import { omit } from 'lodash';
import { FormFields } from '@components/molecules';

interface FormProps {
  children: React.ReactNode;
  classes: string;
  validationSchema: AnyObjectSchema;
  onSubmit: (formData: FormFields) => Promise<void>;
}

export interface FormValidationError {
  [key: string]: string;
}
export const FormContext = createContext({});

export const Form: React.FC<FormProps> = ({ children, classes, validationSchema, onSubmit }) => {
  const [formState, setFormState] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState({} as FormValidationError);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleErrors = (error: unknown) => {
    if (error instanceof ValidationError) {
      const errorsObj = error.inner.reduce((errors, error) => {
        if (typeof error.path !== 'undefined') errors[error.path as keyof FormValidationError] = error.message;
        return errors;
      }, {} as FormValidationError);
      setFormErrors(errorsObj);
    }
  };

  const validate = async (event?: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const inputName: string = event?.target.name as string;
      await validationSchema.validate(formState, { abortEarly: false });
      const errorsObj = omit(formErrors, inputName) as FormValidationError;
      setFormErrors(errorsObj);
      return true;
    } catch (error: unknown) {
      handleErrors(error);
      return false;
    }
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const onChange = {
        onChange: handleInputChange,
        onBlur: validate,
      };

      return React.cloneElement(child, onChange);
    }
    return child;
  });

  const submitForm = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formValidation = await validate();
    if (formValidation) {
      onSubmit(formState);
    }
  };

  return (
    <FormContext.Provider value={formErrors}>
      <form onSubmit={submitForm} className={classes}>
        {childrenWithProps}
      </form>
    </FormContext.Provider>
  );
};

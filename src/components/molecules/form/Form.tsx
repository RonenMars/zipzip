import React, { useState, createContext } from 'react';
import { omit } from 'lodash';
import { FormFields } from '@components/molecules';
import { AnySchema, ValidationResult } from 'joi';

interface FormProps {
  children: React.ReactNode;
  classes: string;
  validationSchema: AnySchema;
  onSubmit: (formData: FormFields) => Promise<void>;
}

export interface FormValidationError {
  [key: string]: string;
}

export const FormContext = createContext({});

export const Form: React.FC<FormProps> = ({ children, classes, validationSchema, onSubmit }) => {
  const [formState, setFormState] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  function validationField(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const validationResult = validationSchema.extract(name).validate(value);
    console.log('validationResult', validationResult);
    const errorsList: Record<string, string> = {};
    if (validationResult.error) {
      validationResult.error.details.forEach((error) => {
        errorsList[name] = error.message;
      });
      setFormErrors({
        ...formErrors,
        ...errorsList,
      });
    } else {
      const errorsObj = omit(formErrors, name) as FormValidationError;
      setFormErrors(errorsObj);
    }
  }

  const handleErrors = (error: ValidationResult) => {
    const errorsObj =
      error?.error?.details.reduce((errors, currentError) => {
        const fieldName = currentError.path.toString();
        if (typeof currentError.path !== 'undefined') errors[fieldName] = currentError.message;
        return errors;
      }, {} as FormValidationError) || ({} as FormValidationError);

    setFormErrors(errorsObj);
    return errorsObj;
  };

  const validate = async () => {
    const validationErrors = await validationSchema.validate(formState, { abortEarly: false });
    const formErrors = handleErrors(validationErrors);
    return !!Object.keys(formErrors).length;
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const onChange = {
        onChange: handleInputChange,
        onBlur: validationField,
      };

      return React.cloneElement(child, onChange);
    }
    return child;
  });

  const submitForm = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formValidationErrors = await validate();
    if (!formValidationErrors) {
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

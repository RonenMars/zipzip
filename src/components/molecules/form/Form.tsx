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

/**
 * A reusable form component for handling form state, validation, and submission.
 *
 * @component
 * @param {Object} props - The component's properties.
 * @param {React.ReactNode} props.children - The content to render within the form.
 * @param {string} props.classes - Additional CSS classes to apply to the form.
 * @param {AnyObjectSchema} props.validationSchema - The Yup schema used for form validation.
 * @param {function} props.onSubmit - A callback function to execute when the form is submitted successfully.
 * @returns {JSX.Element} The rendered form component.
 *
 * @example
 * import React from 'react';
 * import { Form } from './your-form-component';
 * import * as Yup from 'yup';
 *
 * const validationSchema = Yup.object({
 *   name: Yup.string().required('Name is required'),
 *   email: Yup.string().email('Invalid email').required('Email is required'),
 * });
 *
 * const MyForm = () => {
 *   const handleSubmit = async (formData) => {
 *     console.log('Form submitted with data:', formData);
 *   };
 *
 *   return (
 *     <Form validationSchema={validationSchema} onSubmit={handleSubmit} classes="my-form">
 *       <input type="text" name="name" placeholder="Name" />
 *       <input type="text" name="email" placeholder="Email" />
 *       <button type="submit">Submit</button>
 *     </Form>
 *   );
 * };
 *
 * export default MyForm;
 */

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

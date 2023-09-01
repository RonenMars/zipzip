import React from 'react';
import { AnySchema } from 'joi';

export interface FormFields {
  [name: string]: string;
}

export interface ServerError {
  name: string;
  message: string;
}

export interface FormProps {
  children: React.ReactNode;
  classes?: string;
  validationSchema: AnySchema;
  onSubmit: (formData: FormFields) => Promise<void> | void;
  serverErrors?: Array<unknown>;
}

export interface FormValidationError {
  [key: string]: string;
}

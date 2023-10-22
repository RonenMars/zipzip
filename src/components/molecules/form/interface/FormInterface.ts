export interface FormFields {
  [name: string]: string;
}

export interface ServerError {
  name: string;
  message: string;
}

export interface FormValidationError {
  [key: string]: string;
}

import React from 'react';

export interface InputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder: string;
  label: string;
  classes?: Array<string>;
}

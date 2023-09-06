import React from 'react';
import { ButtonDesignTypes } from '@components/atoms/button/ButtonEnums';

export interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    React.AriaAttributes {
  children: React.ReactNode;
  classes?: Array<string>;
  design?: ButtonDesignTypes;
}
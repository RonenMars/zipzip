import React from 'react';
import { ButtonDesignTypes } from '@components/atoms/button/ButtonEnums';
import clsx from 'clsx';
import { ButtonProps } from '@components/atoms/button/interface/ButtonsInterface';

/**
 * Button component for creating customizable buttons or links with different designs.
 *
 * @param {Object} props - The props object containing the following properties:
 * @param {ButtonDesignTypes} [props.design=ButtonDesignTypes.Button] - The design type of the button, either "Button" or "Link".
 * @param {string} [props.children] - The content to display within the button.
 * @param {string} [props.classes] - Additional CSS classes to apply to the button.
 * @param {boolean} [props.inverse] - Should the button be inverted colors
 * @param {boolean} [props.fill] - Should the button be filled with bg colors
 * @param {...any} [props.rest] - Any other props to be spread onto the underlying HTML button element.
 */

const Button = ({ design = ButtonDesignTypes.Button, children, classes, inverse, fill, ...rest }: ButtonProps) => {
  const baseClass = ['text-center'];

  let buttonClass = '';

  const buttonClasses = [
    'h-12 text-white bg-gradient-to-b from-purple-100 to-purple-200 via-purple-500 rounded-full font-bold',
  ];

  const linkClasses = ['text-purple-300 underline text-lg'];

  if (inverse) {
    buttonClass = clsx(
      classes,
      'text-5xl p-4 text-center font-bold from-purple-100 to-purple-200 via-purple-500 bg-gradient-to-r bg-clip-text text-transparent',
    );
  }
  if (fill) {
    buttonClass = clsx(buttonClass, classes, 'text-5xl text-center');
  }
  if (!inverse && !fill) {
    buttonClass = clsx(
      baseClass,
      design === ButtonDesignTypes.Button && buttonClasses,
      design === ButtonDesignTypes.Link && linkClasses,
      classes,
    );
  }
  return (
    <button {...rest} className={buttonClass}>
      {children}
    </button>
  );
};

export default Button;

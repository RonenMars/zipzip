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
 * @param {...any} [props.rest] - Any other props to be spread onto the underlying HTML button element.
 *
 * @returns {JSX.Element} The rendered Button component.
 */

const Button = ({ design = ButtonDesignTypes.Button, ...props }: ButtonProps) => {
  const { children, classes, ...rest } = props;

  const baseClass = ['w-full text-center'];

  const buttonClasses = [
    'h-12 text-white bg-gradient-to-b from-purple-100 to-purple-200 via-purple-500 rounded-full font-bold',
  ];
  const linkClasses = ['text-purple-300 underline text-lg'];

  const buttonClass = clsx(
    baseClass,
    design === ButtonDesignTypes.Button && buttonClasses,
    design === ButtonDesignTypes.Link && linkClasses,
    classes,
  );
  return (
    <button {...rest} className={buttonClass}>
      {children}
    </button>
  );
};

export default Button;

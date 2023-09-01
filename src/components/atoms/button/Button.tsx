import React from 'react';
import { ButtonDesignTypes } from '@components/atoms/button/ButtonEnums';
import clsx from 'clsx';
import { ButtonProps } from '@components/atoms/button/interface/ButtonsInterface';

/**
 * A customizable button component for use in React applications.
 *
 * @component
 * @param {Object} props - The component's properties.
 * @param {React.ReactNode} props.children - The content to display within the button.
 * @param {Array<string>} [props.classes] - Additional CSS classes to apply to the button.
 * @param {ButtonDesignTypes} [props.design] - The design style of the button.
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props - Additional HTML button attributes.
 * @param {React.AriaAttributes} props - ARIA attributes for accessibility.
 * @returns {JSX.Element} The rendered button component.
 *
 * @example
 * import React from 'react';
 * import Button, { ButtonDesignTypes } from './ButtonComponent';
 *
 * const MyComponent = () => {
 *   return (
 *     <div>
 *       <Button>Default Button</Button>
 *       <Button design={ButtonDesignTypes.Link}>Link Button</Button>
 *       <Button classes={['custom-class']}>Custom Button</Button>
 *     </div>
 *   );
 * };
 *
 * export default MyComponent;
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

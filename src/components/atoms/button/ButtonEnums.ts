/**
 * Enum representing different design types for buttons in a React component.
 *
 * @enum {number}
 * @readonly
 * @property {number} Button - Represents a regular button design.
 * @property {number} Link - Represents a link-style button design.
 *
 * @example
 * import ButtonDesignTypes from './ButtonEnums';
 *
 * const myButton = ButtonDesignTypes.Button;
 * console.log(myButton); // Output: 0
 */

export enum ButtonDesignTypes {
  Button = 'button',
  Link = 'link',
}

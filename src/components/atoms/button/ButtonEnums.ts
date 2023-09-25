/**
 * Enum representing different design types for buttons in a React component.
 *
 * @enum {number}
 * @readonly
 * @property {number} button - Represents a regular button design.
 * @property {number} link - Represents a link-style button design.
 *
 * @example
 * import ButtonDesignTypes from './ButtonEnums';
 *
 * const myButton = ButtonDesignTypes.Button;
 * console.log(myButton); // Output: 0
 */

export enum ButtonDesignTypes {
  button = 'button',
  link = 'link',
}

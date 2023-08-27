/**
 * Enum representing different design types for buttons in a React component.
 *
 * @enum {number}
 * @readonly
 * @property {number} Button - Represents a regular button design.
 * @property {number} Link - Represents a link-style button design.
 *
 * @example
 * import buttonDesignTypes from './ButtonEnums';
 *
 * const myButton = buttonDesignTypes.Button;
 * console.log(myButton); // Output: 0
 */

enum buttonDesignTypes {
  Button,
  Link,
}

export default buttonDesignTypes;

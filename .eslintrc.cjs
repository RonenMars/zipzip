module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:jsx-a11y/recommended', 'plugin:@typescript-eslint/recommended', 'eslint-config-prettier', 'plugin:storybook/recommended'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@components', './src/components'],
          ['@api', './src/api'],
          ['@validations', './src/validations'],
        ],
      },
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        // use an array of glob patterns
        project: ['packages/*/tsconfig.json', 'other-packages/*/tsconfig.json'],
      },
    },
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', 'src/stories'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    // React Rules
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/prefer-stateless-function': 'error',
    'react/no-unused-prop-types': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-no-script-url': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger': 'error',
    'react/no-danger-with-children': 'error',
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    'react/jsx-fragments': 'error',
    'react/destructuring-assignment': [
      'error',
      'always',
      { destructureInSignature: 'always' },
    ],
    'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
    'react/jsx-max-depth': ['error', { max: 5 }],
    'react/function-component-definition': [
      'warn',
      { namedComponents: 'arrow-function' },
    ],
    'react/jsx-key': [
      'error',
      {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
          warnOnDuplicates: true,
      },
    ],
    'react/jsx-no-useless-fragment': 'warn',
    'react/jsx-curly-brace-presence': 'warn',
    'react/no-typos': 'warn',
    'react/display-name': 'warn',
    'react/self-closing-comp': 'warn',
    'react/jsx-sort-props': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/prop-types': 'off',
    // TypeScript Rules
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "default",
        format: ["camelCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "variable",
        // Specify PascalCase for React components
        format: ["PascalCase", "camelCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "parameter",
        format: ["camelCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "property",
        format: null,
        leadingUnderscore: "allow",
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
    ],
    "no-console": ["error", { allow: ["warn", "error"] }],
    // "filename-rules/match": [2, { ".ts": "camelcase", ".tsx": "pascalcase" }],
    // "import/no-default-export": "error",
    // // JSDoc Rules
    // "jsdoc/require-throws": "error",
    // "jsdoc/check-indentation": "warn",
    // "jsdoc/no-blank-blocks": "warn",
    // "jsdoc/require-asterisk-prefix": "warn",
    // "jsdoc/require-description": "warn",
    // "jsdoc/sort-tags": "warn",
    // "jsdoc/check-syntax": "warn",
    // "jsdoc/tag-lines": ["warn", "never", { startLines: 1 }],
    // "jsdoc/require-param": ["warn", { checkDestructuredRoots: false }],
    // "jsdoc/require-jsdoc": [
    //   "warn",
    //   {
    //     publicOnly: true,
    //     require: {
    //       FunctionDeclaration: true,
    //       FunctionExpression: true,
    //       ArrowFunctionExpression: true,
    //       ClassDeclaration: true,
    //       ClassExpression: true,
    //       MethodDefinition: true,
    //     },
    //     contexts: [
    //       "VariableDeclaration",
    //       "TSTypeAliasDeclaration",
    //       // Encourage documenting React prop types
    //       "TSPropertySignature",
    //     ],
    //     enableFixer: true,
    //   },
    // ],
    // // TSDoc Rules
    // "jsdoc/require-hyphen-before-param-description": "off",
    // "jsdoc/require-returns": "off",
    //
    // "tsdoc/syntax": "warn",

  },

};


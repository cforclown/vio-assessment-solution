module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react-refresh/only-export-components': 'off',
    'react/display-name': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/no-children-prop': 'error',
    'react/prop-types': 'off',
    'react/self-closing-comp': ['error', { 'component': true, 'html': true }],
    'react/jsx-indent': [2, 2],
    'no-console': 'error',
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
    'semi': 'error',
    'indent': ['error', 2],
    'arrow-body-style': ['error', 'as-needed'],
    'keyword-spacing': 'error',
    'block-spacing': 'error',
    'key-spacing': ['error', { 'afterColon': true }],
    'space-infix-ops': 'error',
    'object-curly-spacing': ['error', 'always'],
    'brace-style': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
  },
}

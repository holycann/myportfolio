export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
  }
];
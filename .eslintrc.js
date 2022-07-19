module.exports = {
  plugins: ['prettier', 'unused-imports'],
  extends: ['next/core-web-vitals'],
  rules: {
    'no-console': 'warn',
    'prettier/prettier': 'warn',
    'react-hooks/exhaustive-deps': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};

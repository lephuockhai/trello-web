// Updated by trungquandev.com's author on May 13 2023
// Sample Eslint config for React project
module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: [
    'react',
    'react-hooks',
    'react-refresh'
  ],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 0,
    'react/display-name': 0,

    //MUI 
    'no-restricted-imports': [
      2,
      {
        'patterns': ['@mui/*/*/*']
      }
    ],

    //COMMON
    'no-console': 1, // DUNG CHO PRODUCT
    'no-lonely-if': 1, // KHONG CHO PHEP IF TRONG MOT LENH ELSE
    'no-unused-vars': 1, //BIEN KHONG DUNG SE BAO WARN
    'no-trailing-spaces': 1, //
    'no-multi-spaces': 1,
    'no-multiple-empty-lines': 1,
    'space-before-blocks': [2, 'always'],
    'object-curly-spacing': [1, 'always'],
    'indent': [1, 2],
    'semi': [1, 'never'],
    'quotes': [2, 'single'],
    'array-bracket-spacing': 1,
    'linebreak-style': 0,
    'no-unexpected-multiline': 1,
    'keyword-spacing': 1,
    'comma-dangle': 1,
    'comma-spacing': 1,
    'arrow-spacing': 1
  }
}

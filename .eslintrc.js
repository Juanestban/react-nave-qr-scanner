module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['standard', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': 0,
    'no-unused-vars': 0,
    'import/first': 0,
    'space-before-function-paren': 0,
    'no-useless-return': 0,
  },
}

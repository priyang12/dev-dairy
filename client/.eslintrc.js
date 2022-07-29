module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    quotes: 'off',
    'no-console': 'error',
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    '@typescript-eslint/no-unused-vars': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 0,
    allowSyntheticDefaultImports: 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

    'react/jsx-props-no-spreading': 'off',
  },
};

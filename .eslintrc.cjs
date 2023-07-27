module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:tailwindcss/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/no-non-null-assertion': 'off',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/order': 'error',
  },
  ignorePatterns: ['vite.config.ts', 'tailwind.config.js', '.eslintrc.cjs'],
  settings: {
    tailwindcss: {
      groupByResponsive: true,
      whitelist: [],
    },
    'import/resolver': {
      typescript: {
        project: './',
      },
      node: true,
    },
  },
};

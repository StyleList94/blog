import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import tseslint from 'typescript-eslint';
import stylishConfig from 'eslint-config-stylish';
import stylishReactConfig from 'eslint-config-stylish/react';
import stylishTypeScriptConfig from 'eslint-config-stylish/typescript';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import vitest from '@vitest/eslint-plugin';
import testingLibrary from 'eslint-plugin-testing-library';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  ...compat.config({
    extends: ['plugin:@next/next/core-web-vitals'],
  }),
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    extends: [stylishConfig],
  },
  {
    files: ['**/*.{js,jsx,tsx}'],
    extends: [stylishReactConfig],
  },
  {
    files: ['**/*.{ts,mts,cts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
      },
    },
    extends: [stylishTypeScriptConfig],
  },
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    ...testingLibrary.configs['flat/react'],
  },
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    ...vitest.configs.recommended,
  },
  eslintConfigPrettier,
);

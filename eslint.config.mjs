import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import { defineConfig, globalIgnores } from 'eslint/config';
import stylish from 'eslint-config-stylish';
import stylishReact from 'eslint-config-stylish/react';
import stylishReactHooks from 'eslint-config-stylish/react-hooks';
import stylishTypeScript from 'eslint-config-stylish/typescript';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import vitest from '@vitest/eslint-plugin';
import testingLibrary from 'eslint-plugin-testing-library';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig(
  ...compat.extends('plugin:@next/next/core-web-vitals'),
  globalIgnores([
    'node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'vitest.config.mts',
  ]),
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    extends: [stylish],
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.?(js|ts|tsx)',
            '**/code-block.tsx',
            'eslint.config.*',
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.{js,jsx,tsx}'],
    extends: [stylishReact, stylishReactHooks],
  },
  {
    files: ['**/use*.ts'],
    extends: [stylishReactHooks],
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
    extends: [stylishTypeScript],
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

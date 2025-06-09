---
title: Next.js 프로젝트 세팅
description: Next.js 프로젝트를 처음부터 끝까지 세팅해봅시다.
date: '2022-03-01T11:21:00.000Z'
coverImage: /assets/images/cover.png
ogImage: /assets/images/cover.png
---

## Create Next App

Typescript를 사용할 수 있는 프로젝트를 생성합니다.

```bash:title=Terminal
yarn create next-app --typescript
```

## 단위 테스팅 환경 구축

jest와 react testing library를 이용하여 유닛 테스팅 환경을 구축합니다

```bash:title=Terminal
yarn add -D jest @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/testing-library__jest-dom identity-obj-proxy babel-jest
```

DOM Testing을 위한 setup 파일을 생성합니다

```js:title=jest.setup.js
import '@testing-library/jest-dom/extend-expect';
```

jest config 파일을 생성합니다

```js:title=jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],

  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules', 'src'],
};

module.exports = createJestConfig(customJestConfig);
```

`package.json`에 스크립트를 추가합니다

```json:title=package.json
{
  "scripts": {
    "test": "jest --watch",
    "test:ci": "jest --ci"
  }
}
```

## Prettier

다음 패키지를 설치합니다.

```bash:title=Terminal
yarn add -D prettier
```

`.prettierrc` 파일을 루트 디렉토리에 생성합니다.

```json:title=.prettierrc
{
  "singleQuote": true,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "endOfLine": "auto"
}
```

## ESLint

다음 패키지를 설치합니다.

```bash:title=Terminal
 yarn add -D @next/eslint-plugin-next @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-jest eslint-plugin-testing-library
```

`.eslintrc.json` 파일을 업데이트 합니다.

```json:title=.eslintrc.json
{
  "root": true,
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest": true
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json",
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "ignorePatterns": ["*.config.js", "jest.setup.js"],
  "plugins": [
    "@typescript-eslint",
    "@next/eslint-plugin-next",
    "testing-library"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@next/next/recommended",
    "plugin:jest/recommended",
    "next/core-web-vitals",
    "prettier"
  ],
  "overrides": [
    {
      "files": [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)"
      ],
      "extends": ["plugin:testing-library/react"]
    }
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".tsx"] }],
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react-hooks/rules-of-hooks": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-interface": "off"
  }
}
```

## lint-staged

다음 패키지를 설치합니다.

```bash:title=Terminal
yarn add -D lint-staged
```

`.lintstagedrc.js` 파일을 생성합니다.

```js:title=.lintstagedrc.js
const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
};
```

## Husky

다음 커멘드를 이용하여 husky를 설치합니다.

```bash:title=Terminal
npx husky-init && yarn
```

커밋 전에 staged된 변경사항에 대해 ESLint를 검사합니다.

```bash:title=.husky/pre-commit
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint-staged
```

## Bash URL 설정

`src` 폴더를 base url로 설정하여 절대 경로를 사용할 수 있게 합니다.

```json:title=tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "src"
  }
}
```

jest config의 `moduleNameMapper`를 업데이트 합니다

```js:title=jest.config.js
moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
```

## Emotion

다음 패키지를 설치합니다.

```bash:title=Terminal
yarn add @emotion/react @emotion/styled
yarn add -D @emotion/babel-plugin
```

`css` props 사용을 위해 다음 설정들을 업데이트 합니다.

```json:title=.babelrc
{
  "presets": [
    [
      "next/babel",
      {
        "preset-react": {
          "runtime": "automatic",
          "importSource": "@emotion/react"
        }
      }
    ]
  ],
  "plugins": ["@emotion/babel-plugin"]
}
```

```json:title=tsconfig.json
{
  "compilerOptions": {
    "jsxImportSource": "@emotion/react"
  }
}
```

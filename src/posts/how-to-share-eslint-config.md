---
title: 답답해서 내가 만든 최신 ESLint 규칙 공유하기 
description: ESLint 규칙 세트를 패키지로 배포하기 
date: '2025-06-20T12:19:00.000Z'
lastModified: '2025-06-24T08:30:00.000Z'
---

## 빠른 참고

[나만의 Config 만들기](https://eslint.org/docs/latest/extend/shareable-configs)

## 벌써 일년

ESLint의 Flat Config가 도입 된지 벌써 일년이 지났지만...

일년 뒤에도 그 일년 뒤에도 `eslint-config-airbnb`를 기다릴 수는 없기에

이번 기회에 나만의, 더 나아가 후론트에게 좋을 것 같은 ESLint rule set를 만들어보려고 한다.

엄청 어렵진 않다.

## 패키지 생성하기

[내가 정한 규칙 세트를 패키지로 만들 수 있다](https://eslint.org/docs/latest/extend/shareable-configs#creating-a-shareable-config). 

몇가지 규칙이 있긴 한데, ESLint를 프로젝트에 구성했다면 많이 익숙할지도...

- 패키지명은 `eslint-config-`의 접두사를 가져야한다.
- scope 모듈이라면 `@scope/eslint-config` 또는 `@scope/eslint-config-*` 처럼 명명해야한다.

디렉토리 생성 후, 터미널에서 `npm init` 명령어를 통해 `package.json`을 생성하면 된다.

직접 생성한 모듈에 바로 접근하는 방식이고, ESLint 관련 패키지들은 전부 peer 의존성을 가지므로 번들링 할 필요가 없다.

## 플러그인 가져오기

규칙을 정의하기 위해, 사용할 플러그인들을 전부 설치해야한다.

플러그인들은 전부 peer 의존성을 가져야한다. Airbnb 규칙 세팅해봤다면 익숙할 것이다.

나는 `import`, `jsx-a11y`, `react`, `react-hooks`, `@typescript-eslint` 플러그인들의 규칙이 필요했다.

```bash:title=Terminal
pnpm add -D \
  eslint-config-stylish \
  eslint @eslint/js \
  eslint-plugin-import \
  eslint-plugin-jsx-a11y \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  typescript-eslint
```

그리고 peer 의존성 패키지들의 최소 버전을 명시적으로 지정하기 위해 `package.json`을 살짝 수정해준다.

```json:title=package.json
{
  "peerDependencies": {
    "@eslint/js": ">=9",
    "eslint": ">=9",
    "eslint-plugin-import": ">=2",
    "eslint-plugin-jsx-a11y": ">=6",
    "eslint-plugin-react": ">=7",
    "eslint-plugin-react-hooks": ">=5",
    "typescript-eslint": ">=8"
  }
}
```

### Resolver 등록

TypeScript에서 `import/extensions`, `import/no-extraneous-dependencies` 규칙이 정상적으로 동작하기 위해서는,
리졸버를 이용해서 프로젝트의 타입스크립트 구성을 알려줘야 한다.

먼저 `eslint-import-resolver-typescript` 패키지를 설치한다.

```bash:title=Terminal
pnpm add -D eslint-import-resolver-typescript
```

그리고 피어 의존성 페키지로 등록한다.

```json:title=package.json
{
  "peerDependencies": {
    /* 상기 패키지 포함 */
    "eslint-import-resolver-typescript": ">=4",
  }
}
```

이제 규칙을 맞춤 제작할 준비가 모두 완료되었다.

## 첫 번째 규칙 제작

프로젝트 루트에 `index.js` 모듈을 생성하고 다음과 같이 작성한다.

`typescript-eslint`의 `config()` helper를 이용하면 에디터가 지원하는 타입스크립트 기능을 활용해서 안전하게 제작할 수 있다. 

```js:title=index.js
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config({
  extends: [eslint.configs.recommended, importPlugin.flatConfigs.recommended],
  languageOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'error',
    'no-console': 'warn',
    /* 각종 규칙들을 정의하거나 덮어쓰기 */
  },
});
```

`tseslint.config()`는 가변 인수 형식이므로, 배열형태가 아님에 주의하자!

5번 줄에서 `extends`의 값으로 플러그인 별 활성화할 기본 규칙 세트를 지정할 수 있다.

`rules`의 값으로 각종 규칙들을 정의하거나 덮어쓸 수 있다.

## 그룹짓기

단일 엔트리(`index.js`)에 모든 규칙들을 지정할 수 있지만, 이러면 개발 할 때, 성능에 영향을 미칠 수 있다.

JSX 구문이 없는 모듈에서 react, jsx 관련 규칙을 검사할 필요가 없고, JavaScript 모듈에서 TypeScript 관련 규칙을 검사할 필요가 없기 때문이다.

그래서 검사할 규칙들을 그룹화 할 필요가 있는데, [엄청 쉽게 할 수 있다!](https://eslint.org/docs/latest/extend/shareable-configs#sharing-multiple-configs)

단순히 엔트리 모듈을 생성한 것 처럼 그냥 `js` 모듈을 만들기만 하면 된다.

나는 다음과 같이 그룹화 했다.

| 그룹         | 플러그인                               | 
|------------|------------------------------------|
| Base       | `eslint`, `import`                 |
| React      | `react`, `react-hooks`, `jsx-a11y` | 
| TypeScript | `typescript-eslint`                |

나는 소스코드들을 프로젝트 루트에 잘 놔두지 않기 때문에, `config/` 디렉토리를 생성하고 내부에 모든 모듈을 정의했다.

앞서 만든 `index.js`를 `config/` 내부로 옮긴 뒤, `react.js`, `typescript.js` 모듈들도 생성해준다.

```js:title=config/react.js
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config({
  plugins: {
    react: reactPlugin,
    'react-hooks': reactHooks,
    'jsx-a11y': jsxA11y,
  },
  languageOptions: {
    ...reactPlugin.configs.flat.recommended.languageOptions,
    ...jsxA11y.flatConfigs.recommended.languageOptions,
    globals: {
      ...globals.browser,
    },
  },
  rules: {
    ...reactPlugin.configs.flat.recommended.rules,
    ...reactPlugin.configs.flat['jsx-runtime'].rules,
    ...jsxA11y.flatConfigs.recommended.rules,
    /* 각종 규칙들을 정의하거나 덮어쓰기 */
  },
});
```

`plugins`에 사용할 플러그인을 지정하고, 스프레드 기법으로 각각의 옵션을 정의해줄 수 있다.

JSX 구문에 호환될 수 있도록, `languageOptions`을 미리 정의해주만 프로젝트에서 가져다 쓸 때, 따로 정의 안해줘도 된다.

```js:title=config/typescript.js
import tseslint from 'typescript-eslint';

export default tseslint.config({
  extends: [tseslint.configs.strictTypeChecked],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    /* 각종 규칙들을 정의하거나 덮어쓰기 */
  },
});
```

앞서 세팅한 리졸버를 구성해주면 특정 규칙들에 대한 이슈를 해결할 수 있다.

TypeScript 규칙은 가장 강력한 `strictTypeChecked` 규칙 세트를 적용해봤다. ~~사용해보고 안되면 그 규칙만 덮어쓰면 되니깐!~~

## 야 너도 타입있어

요즘은 에디터 레벨에서 타입스크립트를 지원하기 때문에, 패키지에서 사용중인 모듈에 타입이 정의되어있지 않으면 타입이 없다고 난리친다.

그러한 불상사를 당하지 않도록 타입 선언을 해줘야 하는데, 모든 모듈의 타입이 똑같으므로 하나만 만들고 돌려쓰면 된다.

```ts:title=config/index.d.ts
import type { Linter } from 'eslint';
declare const config: Linter.Config[];
export default config;
```

## 메타데이터 작성

이제 `package.json`에 모듈 정보를 업데이트 해줘야한다.

```json:title=package.json
{
  "name": "eslint-config-lovelyconfig",
  "main": "index.js",
  "types": "./config/index.d.ts",
  "exports": {
    ".": {
      "types": "./config/index.d.ts",
      "import": "./config/index.js"
    },
    "./react": {
      "types": "./config/index.d.ts",
      "import": "./config/react.js"
    },
    "./typescript": {
      "types": "./config/index.d.ts",
      "import": "./config/typescript.js"
    }
  }
  /* .. */
}
```

NPM 패키지로 배포해야 하니깐 나머지 메타데이터들도 적절히 채워주면 된다.

익숙하지 않겠지만, `scripts`가 없어도 된다! ~~실행할 게 없으니깐...~~

## 배포하기

터미널에서 바로 배포하는건 아무리 상남자라도 추천하지 않는다.

진짜는 Github의 릴리즈 기능을 활용해서 배포하는 것이다.

어떤 규칙들이 추가되었고 삭제되었는지 이력 관리를 할 수 있기 때문에 좋다.

특히 릴리즈 문서를 작성하지 않으면 배포가 안되기 때문에, 문서를 작성하는 습관을 기르는 것에 도움이 많이 된다.

다음과 같이 Github Actions 스크립트를 작성해서 배포 준비를 할 수 있다!

```yaml:title=.github/workflows/npm-publish.yml
name: Node.js Package

on:
  # 릴리즈가 생성되면 실행
  release:
    types: [created]

jobs:
  publish-npm:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # 다른 패키지 매니저를 사용하려면 이 부분을 변경하면 된다
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: https://registry.npmjs.org/
      - run: pnpm install --frozen-lockfile
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.npm_token}}
```

Github 리포지토리 설정에서 `NPM_TOKEN`에 NPM Access Token 넣는거 잊지 말자!

## 사용하기

리포지토리 만들고 first commit 메시지 작성해서 커밋하고 origin 등록하고 push한 뒤 릴리즈 문서까지 작성했다면 나만의 ESLint config 모듈이 생성되었을 것이다.

이제 갖다 쓰면 된다.



```js:title=your-project/eslint.config.js
import tseslint from 'typescript-eslint';
import stylish from 'eslint-config-stylish';
import stylishReact from 'eslint-config-stylish/react';
import stylishTypeScript from 'eslint-config-stylish/typescript';

export default tseslint.config(
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    extends: [stylish],
  },
  {
    files: ['**/*.{js,jsx,tsx}'],
    extends: [stylishReact],
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
);
```

파일별로 맞춤 린트를 구성할 수 있다!

대부분의 프로젝트는 타입스크립트일 테니 `typescript-eslint`를 활용하겠지만,

기본 ESLint의 `defineConfig()`에 구성해도 똑같이 동작한다!, 다만 인수를 배열로 감싸주는것만 잊지말자.

## 정리

Airbnb는 엄격한 규칙으로 좋은 개발습관을 가질 수 있는 장점이 있어 모든 루키들의 등용문처럼 사용되는 경향이 없지 않아 있었다.

하지만, 사용해봤으면 안다. 날이 가면 갈 수록 늘어가는 `rules`의 길이... 규칙을 꺼버리는 것에 어느새 익숙해져버린 나를 발견할 수 있다.

이제 내 스타일에 맞는 규칙을 확장하고, 집단지성으로 규칙을 정할 수 있도록 패키지로 관리해보는 것은 어떨까?

절대 어렵지가 않다! 또 구축하는 데 시간이 많이 걸리지도 않는다!

물론 규칙가지고 싸우다가 시간이 다 가버리겠지...

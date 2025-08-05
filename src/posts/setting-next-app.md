---
title: Next.js 프로젝트 세팅
description: Next.js 프로젝트를 내 맘대로 세팅하기
date: '2022-03-01T11:21:00.000Z'
lastModified: '2025-08-05T07:00:00.000Z'
---

## 삼년만에 돌아왔다

3년이면 후론트는 강산이 변한다.

## Create Next App

[여기 참고하면 된다.](https://nextjs.org/docs/app/getting-started/installation)

선호하는 패키지 매니저애 맞춰 `create-next-app`을 실행하면

- TypeScript
- ESLint
- Tailwind CSS
- `src/` 디렉토리 구성
- 커스터마이즈 import 별칭

까지는 알아서 해준다. 진짜 세상 좋아졌다!

이제부터는 개인적으로 필요하다고 생각되는 세팅들을 해보려 한다.

## 단위 테스팅 환경 구축

예전에는 Jest로 구성했었지만 요즘에는 Vitest로 구성하고 있다. [Vitest가 더 좋아진 이유!](/post/review-2024#%EC%98%AC%ED%95%B4%EC%9D%98-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EB%8F%84%EA%B5%AC)

DOM Testing은 여전히 Testing Library를 대체할 수 없다.

```bash:title=Terminal
pnpm add -D vitest @testing-library/react @testing-library/dom @testing-library/jest-dom jsdom
```

디테일한 이벤트 시뮬레이션이 필요하다면 아래 패키지도 추가로 구성하는게 좋지만, 대부분 `fireEvent()`로 시뮬레이션이 가능하다!

```bash:title=Terminal
pnpm add -D @testing-library/user-event
```

우리는 React 컴포넌트를 테스팅 해야하니깐 아래 플러그인도 추가로 구성해야한다.

```bash:title=Terminal
pnpm add -D @vitejs/plugin-react vite-tsconfig-paths
```

`vite-tsconfig-paths`의 경우 TypeScript 환경에서 `tsconfig.json`의 구성된 import paths를 그대로 이용할 수 있게 해주는 아주 유용한 플러그인이다.

Jest 였다면 상상도 못할일이다.

이제 Vitest config 모듈을 생성해야한다.

```ts:title=vitest.config.mts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    globals: true, // 이걸 해주면 Jest 사용했을 때 처럼, import 없이 vitest 모듈을 사용할 수 있다.
    css: true,
  },
});
```

Jest 구성 모듈과 비교하면 너무나 짧고 간결하다!

TypeScript가 전역에서 Vitest를 사용한다는 것을 알아채기 위해 `tsconfig.json`을 업데이트 해준다.

```json:title=tsconfig.json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

이제 `package.json`에 스크립트를 추가해주면 된다.

```json:title=package.json
{
  "scripts": {
    "test:watch": "vitest",
    "test": "vitest run",
  }
}
```

## Prettier

ESLint의 단짝, Prettier의 차례다!

```bash:title=Terminal
pnpm add -D prettier
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

ESLint를 구성하기로 했다면 [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier?tab=readme-ov-file#installation)를 꼭 ESLint에 추가해줘야 한다!

## lint-staged

커밋 전 변경 사항들에 대한 Lint 검사를 수행할 수 있다면 협업할 때, 코드리뷰 포인트가 하나 줄어든다!

```bash:title=Terminal
pnpm add -D lint-staged
```

`lint-staged.config.mjs` 파일을 프로젝트 루트에 생성해준다.

```js:title=lint-staged.config.mjs
import path from 'node:path';
import process from 'node:process';

/**
 * @filename: lint-staged.config.mjs
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js,jsx,ts,tsx}': (filenames) => {
    const files = filenames.map((file) => path.relative(process.cwd(), file));
    return `next lint --fix ${files.map((file) => `--file ${file}`).join(' ')}`;
  },
};
```

해당 확장자를 가진 모듈에 대해 ESLint 검사를 수행하고 교정까지 시도한다.

## Husky

커밋하거나 리모트 저장소에 푸시하기전에 실행하고 싶은 스크립트가 있다면, 이것을 활용하면 된다.

```bash:title=Terminal
pnpm add -D husky

# 이후 초기화를 권장하고 있다
pnpm exec husky init
```

커밋 전에 staged된 변경사항에 대해 ESLint를 검사하고 싶다면 다음과 같이 작성하면 된다.

```bash:title=.husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm exec lint-staged
```

## 역사속으로

[3년 전 버전이 그립다면](https://github.com/StyleList94/blog/blob/248e7334dc391f170c9fa2146fa8ff7604a819ff/src/posts/setting-next-app.md)




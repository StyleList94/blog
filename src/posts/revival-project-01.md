---
title: 시작은 정리부터
description: 블로그 리바이벌 프로젝트 - 1장
date: '2024-10-01T14:25:00.000Z'
coverImage: /assets/images/cover.png
ogImage: /assets/images/cover.png
---

## 빠른 참고
- [Next.js 업그레이드 가이드](https://nextjs.org/docs/app/building-your-application/upgrading/version-14) 
- [Vitest Config 레퍼런스](https://vitest.dev/config/) 
- [Vitest ESLint Plugin 사용법](https://github.com/vitest-dev/eslint-plugin-vitest?tab=readme-ov-file#usage)
- [tailwindcss Next.js Quick Start](https://tailwindcss.com/docs/guides/nextjs)
- [App Router 마이그레이션](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#migrating-from-pages-to-app)


## 의존 패키지 업데이트

패키지들을 최신버전으로 한번 갈아끼워줄 때가 됐다.

[Next.js 최신버전 업데이트](https://nextjs.org/docs/app/building-your-application/upgrading/version-14)를 참고해서 프레임워크부터 청소해야한다.

나머지 패키지는 그냥 latest 버전으로 다시 추가하거나 `package.json`에서 선택적으로 골라서 버전을 수정한 뒤, 다시 설치하면 된다.

ESLint를 제외한 모든 패키지를 최신버전으로 갱신했다. ESLint v9 버전은 Next.js v14에서 아직 지원하지 않는다.

## 테스팅 도구 변경

`Jest`도 충분히 근본 있는 테스팅 도구이지만, 요즘 트렌드는 ESM 사용 아니겠는가.

바로 `Vitest`로 전환한다.

`Jest`에 비교해서 가지는 장점이라고 생각되는건, 구성이 단순하고, ESM을 지원하며, 무엇보다도 빠르다.

### 기본 설치

```bash:title=Terminal
# 이거 없으면 요리 자체가 안됨
yarn add -D vitest @vitejs/plugin-react vite-tsconfig-paths jsdom
```

`vitest.config.ts` 구성 모듈을 생성한다. ([레퍼런스](https://vitest.dev/config/))

```ts:title=vitest.config.mts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
// 이것을 사용하면 테스팅 코드에서의 path 애로사항을 단번에 해결할 수 있다
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom', // 컴포넌트 테스팅을 할꺼니깐
    globals: true, // 전역 사용 여부
    css: true, // 이거 하나로 CSS Mocking 문제 해결
  },
});
```

`Vitest`는 아직 근본으로 인정받지 못해서, 전역으로 사용하려면 `tsconfig.json`도 수정해줘야 한다
```json:title=tsconfig.json
{
  "compilerOptions": {
    "types": ["vitest/globals"] 
  }
}
```

### ESLint 플러그인 추가

```bash:title=Terminal
yarn add -D @vitest/eslint-plugin
```

`Vitest`에서 ESLint 플러그인은 눈치없게 v9에서 동직이 기본값이다.

v8에서 동작하게 하려면 다음과 같이 `.eslintrc.json`을 수정해야한다. ([레퍼런스](https://github.com/vitest-dev/eslint-plugin-vitest?tab=readme-ov-file#usage))

```json:title=.eslintrc.json
{
  "overrides": [
    {
      "files": [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)"
      ],
      "extends": ["plugin:@vitest/legacy-recommended", "plugin:testing-library/react"]
    }
  ]
}
```

### 기타 유틸리티 도구 추가

잘 안쓰긴 할텐데, UI 도구랑 커버리지 확인할 수 있는 모듈은 간지를 챙기기위해 설치해준다

```bash:title=Terminal
yarn add -D @vitest/coverage-v8 @vitest/ui
```

### 스크립트 업데이트

나는 이렇게 구성했다

```json:title=package.json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "test:ui": "vitest --ui"
  }
}
```

## 스타일링 방법 바꾸기

`Emotion`은 RSC(서버 컴포넌트)를 지원해주지 않는다.(작성일 기준 오피셜임) 

그리고 그 동안 이걸로 스타일링하면서 가장 힘들었던 것이 컴포넌트 이름 짓는거였다.

컴포넌트 모듈도 너무 길어진다... 물론 관심사 분리를 하면 되지만, 파일 두개씩보고 하는거 너무 비효율적이라고 생각했다.

그러한 이유로 난 `tailwindcss`로 갈아타기로 했다.

[그냥 이거 따라하면 됨](https://tailwindcss.com/docs/guides/nextjs)

그리고 모든 컴포넌트들에서 `Emotion`의 흔적을 없애면 된다. 마치 한번도 사용 안한 것처럼...

## App Router 드루와

이제 드디어 Pages 라우터와 작별을 고할때다.

블로그 유형과 같은 정적 페이지들은 서버 컴포넌트의 이점을 그대로 살릴 수 있다.

클라이언트 컴포넌트도 많이 필요없다.

벌써부터 설렌다.

마이그레이션은 절대 어렵지 않다. [이거](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#migrating-from-pages-to-app)보고 따라하면 된다.

컴포넌트 파일명도 kebab-case로 변경했다.

## 다음편 예고

는 스타일 가이드를 정의는 것으로 정했다

---
title: UI Kit를 만들어서 디자인 시스템에 곁들여볼까?
description: React 기반의 컴포넌트 및 스타일 라이브러리 업글(?)기
date: '2025-05-21T14:05:00.000Z'
lastModified: '2025-10-12T12:20:00.000Z'
---

## 빠른 참고

[`/vit/`(빨리) 시작하기](https://vite.dev/guide/#manual-installation),
[Vite 라이브러리 모드](https://vite.dev/guide/build.html#library-mode),
[Vitest를 써야하는 이유](/post/review-2024#%EC%98%AC%ED%95%B4%EC%9D%98-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EB%8F%84%EA%B5%AC),
[그러니깐 당장 Vitest를 깔아보자!](https://vitest.dev/guide/#getting-started),
[Storybook 설치 가이드](https://storybook.js.org/docs/get-started/install),
[입맛대로 Storybook 바꿔보기](https://storybook.js.org/docs/configure/user-interface/theming),
[tailwindcss 시작 가이드 근데 vite를 곁들인...](https://tailwindcss.com/docs/installation/using-vite),
[Storybook의 `vite` 구성을 덮어씌울 수 있다고?](https://storybook.js.org/docs/api/main-config/main-config-vite-final),
[Storybook에 글꼴 추가](https://storybook.js.org/docs/configure/integration/images-and-assets#referencing-fonts-in-stories),
[tailwindcss가 빠를 수 밖에 없는 이유 중 하나](https://tailwindcss.com/docs/detecting-classes-in-source-files)

## 세상 좋아졌다

2021년, 디자인 시스템에 꽂혀버린 나머지 `rollup` 번들러를 활용하여 [React Component 라이브러리 템플릿](https://github.com/StyleList94/stylish-ui-kit/tree/v1)을 만든 적이 있다.

Typescript는 물론 UI 확인을 위한 Storybook, Jest와 Testing Library를 이용한 단위 테스팅 기능이 포함되었다.

성능도 생각해서 CSS In JS 기법의 유혹을 뿌리치고 Sass로 스타일링 했던것도 생각난다.

번들링 설정은 뭐... 플러그인이 알아서 해줘서 그렇게 어려운건 아니었다.

그렇게 그 당시에 컴포넌트 라이브러리를 구축해야 하는 상황마다 잘 써먹었다.

시간은 흘러흘러 2025년, 내가 만든 템플릿은 시대의 풍파를 그대로 처맞았다!

Tailwind CSS의 막강한 편의성과 성능으로 인해 CSS In JS는 역사 속으로 사라지는 것 같고,

Vite는 `rollup`의 문화를 그대로 계승하면서 후론트에는 없어서는 안될 빌드 도구가 되었으며,

React 마저 서버 컴포넌트 도입으로 인해, 컴포넌트 구조 설계 또한 많이 변화했다.

이대로는 안된다! 살려내야 한다!!!

## 빨리 빌드 도구 부터 바꾸기

먼저 번들링을 도와줄 [빌드 도구](https://vite.dev/guide/#manual-installation)부터 바꿔야한다. **빨리** 바꾸자.

앗! 그 전에, 패키지 매니저도 `pnpm`으로 바꿔주기 위해 `lockfile`도 자워버리자!

```bash:title=Terminal
# 처음 시작한다면 그냥 create-vite 로 빠르게 시작하면 된다.
pnpm create vite your-ui-kit --template react-ts

# 나는 마이그레이션 해야하니깐... 수동으로 해야함...
pnpm add -D vite
```

React 플러그인도 추가해준다.

```bash:title=Terminal
pnpm add -D @vitejs/plugin-react
```

### 프로젝트 구성 설정

그 다음, `vite.config.ts`를 다음과 같이 추가한다.

[Library Mode](https://vite.dev/guide/build.html#library-mode)를 활용해야 한다.

```ts:title=vite.config.ts
import { defineConfig } from 'vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';

// [!code focus:40]
export default defineConfig({
  plugins: [
    react(), // React 플러그인
  ],
  build: {
    lib: {
      // [!code highlight:3]
      entry: {
        main: resolve(__dirname, 'lib/main.ts'),
      },
      name: 'StylishReactUIKit',
      formats: ['es', 'umd'], // 기본 값
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      cssFileName: 'style',
    },
    rollupOptions: {
      // React는 프로젝트의 React를 사용하게끔 한다
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        chunkFileNames: () => `bundle/[name]-[hash].js`,
        // 안하면 경고 나옴
        // [!code highlight:5]
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    copyPublicDir: false,
  },
  resolve: {
    alias: [
      { find: 'lib', replacement: resolve(__dirname, './lib') },
      { find: 'src', replacement: resolve(__dirname, './src') },
    ],
  },
});
```

`tsconfig.json`: 타입스크립트 설정 관련된 것들은, `create-vite` 로 `vite` 프로젝트를 구성했다면 자동으로 만들어졌을테니깐, 수동으로 하는 나만 고생하면 된다.

### 퍼스트 빌드

`lib` 디렉토리를 생성한 뒤, 간단한 버튼 컴포넌트를 생성한다.

```tsx:title=lib/components/button.tsx
import type { ReactNode } from 'react';

// [!code focus:3]
export const Button = ({ children }: { children: ReactNode }) => (
  <button>{children}</button>
);

export default Button;
```

`lib/main.ts` 엔트리 모듈을 생성한 뒤, 컴포넌트를 내보낸다.

```ts:title=lib/main.ts
import { Button } from './components/button';

export { Button };
```

빌드 이후에 타입 정의 모듈을 추가해 주기 위해서 `tsconfig.build.json`을 수정해야한다.

```json:title=tsconfig.build.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./dist",
    "emitDeclarationOnly": true,
    "noEmit": false
  },
  "include": ["lib"]
}
```

옵션의 의미는 다음과 같다.

- `declaration`: TypeScript 컴파일 시 `.d.ts` 타입 선언 파일을 생성
- `declarationDir`: 생성된 `.d.ts` 파일을 저장할 위치(`./dist`)
- `emitDeclarationOnly`: 오직 타입 선언 파일만 생성
- `noEmit`: `emitDeclarationOnly` 이거 사용하려면 반드시 falsy 해야함
- `include`: 여기 포함된 디렉토리 내의 파일만 이 설정으로 컴파일

vite 빌드를 위해 스크립트를 업데이트 한다.

```json:title=package.json
{
  "scripts": {
    "build": "vite build && tsc -p ./tsconfig.build.json",
    "preview": "vite preview"
  }
}
```

Vite가 빌드하면서 output을 초기화 하기때문에 순서가 중요하다!

빌드를 수행하면

```bash:title=Terminal
pnpm run build
```

잘 나오는 것을 확안할 수 있다.

```text
dist
┣━━ components
┃   ┗━━ button.d.ts
┣━━ main.d.ts
┣━━ main.es.d.ts
┣━━ main.es.js
┗━━ main.umd.js
```

### React 최소 버전

예전에는 Hooks와 함께 함수형 컴포넌트 패러다임으로 전환을 알린 16.8 버전 이상을 기준으로 했지만,

서버 컴포넌트 도입에 따라 대부분 프로젝트는 18 버전을 사용할 것이다.

그러니깐 최소 버전도 올려주는 것이 좋을 것이다!

```bash:title=Terminal
pnpm add react@^18 react-dom@^18
```

`peerDependencies`도 업데이트 해준다.

```json:title=package.json
{
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  }
}
```

## 단위 테스팅 교체

Jest도 좋지만 [Vitest는 더 좋다](/post/review-2024#%EC%98%AC%ED%95%B4%EC%9D%98-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EB%8F%84%EA%B5%AC).

[Vitest를 설치 및 구성](https://vitest.dev/guide/#getting-started)해보자!

### Vitest 설치

```bash:title=Terminal
pnpm add -D vitest jsdom
```

### Vitest 구성

Vite를 사용 중이라면 `vite.config.ts`에서 바로 구성 설정을 수행할 수 있다!

```ts:title=vite.config.ts
// 1. 맨 위에 트리플 슬래시 참조를 통해 vitest 구성 타입 추가
/// <reference types="vitest" /> // [!code ++]

export default defineConfig({
  // ...
  // 2. vitest 설정
  test: { // [!code ++]
    globals: true, // 이렇게 해야 import 없이 사용할 수 있다. 마치 Jest 처럼... // [!code ++]
    environment: 'jsdom', // DOM 테스트 // [!code ++]
    css: true, // css 처리여부 // [!code ++]
  }, // [!code ++]
  // ...
});
```

타입스크립트가 알아차릴 수 있도록 `tsconfig.json`을 업데이트 한다.

```json:title=tsconfig.json
{
  "compilerOptions": {
    // ..
    "types": ["vitest/globals"] // [!code ++]
  },
  // ..
  "exclude": ["node_modules", "**/*.test.ts?(x)"]
}
```

### Testing Library 추가

```bash:title=Terminal
pnpm add -D @testing-library/react @testing-library/jest-dom @testing-library/dom @testing-library/user-event
```

### 퍼스트 테스팅

테스트 코드는 번들에 굳이 포함 시키지 않아도 되니깐, `src` 디렉토리에 별도로 작성해준다. 스토리들도 여기에 작성할 예정이다.

앞서만든 `Button` 컴포넌트의 테스트 코드를 작성한다.

```tsx:title=src/tests/button.test.tsx
import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/react';

import { Button } from 'lib/main';

describe('Button', () => {
  it('should render', () => {
    render(<Button>Click Me</Button>);

    expect(
      screen.getByRole('button', { name: 'Click Me' }),
    ).toBeInTheDocument();
  });
});
```

scripts를 업데이트!

```json:title=package.json
{
  "scripts": {
    "build": "vite build && tsc -p ./tsconfig.build.json",
    "preview": "vite preview"
    "test": "vitest run", // [!code ++]
    "test:watch": "vitest" // [!code ++]
  }
}
```

그리고 테스트를 실행하면...

```bash:title=Terminal
pnpm run test

...
✓ src/tests/button.test.tsx (1 test) 54ms
   ✓ Button > should render 53ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
...
```

우와~ 통과한다!

## UI 탐색기

디자인 시스템을 위한 사이트를 구축하는것이 최선의 시나리오 겠지만, 우리에겐 그럴 시간도, 팀도 없는 것이 현실이다. ~~이걸 경영진이 이해해 줄리가 없다.~~

결국 잘 만들어진 서비스를 사용해야하는데, Storybook이 현재로썬 유일한 대안이지 싶다.

노력과 작업 시간에 비해 상당한 퀄리티를 보여주며, 구현한 컴포넌트를 다양한 시나리오로 보여줄 수 있다!

지금 Storybook을 사용하고 있지만, 버전이 너무 낮아 지우고 [새로 설치](https://storybook.js.org/docs/get-started/install)하기로 했다. ~~그게 가장 슆다. 절대 귀찮아서가 아님~~

### Storybook 구성

TSDoc 코멘트를 자동으로 스토리에 포함시켜주는 기능을 추가한다.

```ts:title=.storybook/main.ts
const config: StorybookConfig = {
  // ..
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: './tsconfig.json',
    },
  },
  // ..
};
```

### 브랜드 커스터마이징

커스터마이징이 상당히 제한적이긴 한데, [이 정도는 커스터마이징](https://storybook.js.org/docs/configure/user-interface/theming) 할 수 있다.

먼저 사이드바에 브랜딩부터 적용한다.

`.storybook/theme.ts` 모듈을 생성한 뒤, 다음과 같이 구성한다.

```ts:title=.storybook/theme.ts
import { create } from 'storybook/theming/create';

// [!code focus:6]
export default create({
  base: 'light', // 스토리 영역을 제외하고 테마가 변경된다
  brandTitle: 'Stylish UI',
  brandUrl: 'your_site', // Storybook이 배포된 사이트 주소
  brandTarget: '_self', // 이렇게 해야 새 창에서 안열린다
});
```

`.storybook/manager.ts` 모듈을 생성해서 커스터마이징한 테마를 등록해준다.

```ts:title=.storybook/manager.ts
import { addons } from 'storybook/manager-api';

// [!code focus:5]
import theme from './theme';

addons.setConfig({
  theme,
});
```

### 내맘대로 사이트 타이틀 변경

사이트 타이틀 변경이 조금 까다로운데, Storybook 브랜딩이 기본적으로 적용되어 있어, 상당히 곤란하다.

커스텀 애드온을 활용하면 사이트 타이틀을 어느 정도 입맛대로 재조정 할 수 있다.

`./storybook/manager.ts`에 다음 애드온을 구성해주면 된다.

```ts:title=.storybook/manager.ts
import { addons } from 'storybook/manager-api';
import { STORY_RENDERED, DOCS_RENDERED } from 'storybook/internal/core-events';

// ..

// [!code focus:22]
addons.register('TitleAddon', (api) => {
  const projectName = 'Stylish UI';

  const setDocumentTitle = () => {
    const storyData = api.getCurrentStoryData();
    if (!storyData) {
      document.title = projectName;
    }
    /** 입맛대로 바꾸면 된다.
     * storyData.title: 스토리 타이틀(사이드바 에서 선택한 스토리)
     * storyData.name: 각 스토리 이름
     */
    document.title = `${storyData.title} - ${storyData.name} :: ${projectName}`;
  };

  api.on(DOCS_RENDERED, () => {
    setDocumentTitle();
  });
  api.on(STORY_RENDERED, () => {
    setDocumentTitle();
  });
});

// ..
```

### 퍼스트 스토리 작성

아까 만든 Button에 대한 스토리를 `src/stories` 디렉토리에 작성한다.

```tsx:title=src/stories/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from 'lib/components/button';

// [!code focus:15]
const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Click me!',
  },
};
```

그리고 Storybook을 실행해서 확인하면 된다.

```bash:title=Terminal
pnpm run storybook
```

## 요즘 스타일링

여기까지만 해도 필수요소들은 모두 구축이 완료된 상태다.

스타일링은 언제나 선택의 영역이기 때문에 많이 사용할 것 같은 걸로 구성하면 된다.

하지만 요즘 대세는 뭐니뭐니해도 Tailwind CSS를 사용하는 것이기 때문에. 대세에 몸을 맡겨보도록 한다.

[공식 문서](https://tailwindcss.com/docs/installation/using-vite)에서 하라는대로 하면 되긴 하지만,

라이브러리 모드에 맞게 최적화를 해주면 더 좋다.

### tailwindcss 설치 및 구성

일단 Tailwind CSS를 설치해준다.

```bash:title=Terminal
pnpm add -D tailwindcss @tailwindcss/vite
```

`peerDependencies`도 업데이트 해준다.

```json:title=package.json
{
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18",
    "tailwindcss": ">=4" // [!code ++]
  }
}
```

여기서부터 중요한데, 라이브러리 모드에서 `tailwindcss`가 필요한 상황은 Storybook 말고는 없기 때문에,

`tailwindcss` 플러그인을 Storybook이 빌드 또는 개발 서버로 실행 될 때만, 등록해주면 된다.

그러기 위해서 Storybook의 [`vite` config를 오버라이딩](https://storybook.js.org/docs/api/main-config/main-config-vite-final) 해줘야 한다.

```ts:title=.storybook/main.ts
const config: StorybookConfig = {
  //..

  // 라이브러리 번들링할 때 말고, 여기서만 tailwindcss를 구동하기 위한 플러그인을 추가한다.
  async viteFinal(config) { // [!code ++]
    const { mergeConfig, defineConfig } = await import('vite'); // [!code ++]
    const { default: tailwindcss } = await import('@tailwindcss/vite'); // [!code ++]
    // [!code ++]
    return mergeConfig( // [!code ++]
      config, // [!code ++]
      defineConfig({ // [!code ++]
        plugins: [tailwindcss()], // [!code ++]
      }), // [!code ++]
    ); // [!code ++]
  }, // [!code ++]
};
```

다음은, 루트 CSS에 `tailwindcss`를 import 하면 된다.

빌드에 포함 안되어도 되니깐, `src` 디렉토리에 입맛에 맞게 만들어주면 된다.

```css:title=src/style.css
@import 'tailwindcss';
```

이렇게 만든 CSS 모듈을 `.storybook/preview.ts`에 import 하면 된다.

```ts:title=.storybook/preview.ts
// ..
import '../src/styles.css'; // [!code ++]

// ..
```

### Button 스타일링

변경사항들이 잘 적용 되는지 확인하기 위해, `Button` 컴포넌트에 간단한 스타일링을 수행한다.

```tsx:title=lib/components/button.tsx
import type { ReactNode } from 'react';

export const Button = ({ children }: { children: ReactNode }) => (
  // [!code focus:1]
  <button className="flex justify-center items-center px-3 py-2 outline-0 border border-zinc-400 rounded-sm bg-transparent cursor-pointer hover:bg-zinc-200 active:bg-zinc-300 transition-colors duration-200 ease-in-out">
    {children}
  </button>
);

export default Button;
```

Storybook을 구동시켜서 원하는대로 적용되었는지 확인하면...

원하는대로 적용이 되어있다!

## 추가적으로 하면 좋은 것들

여기까지하면 필요한 것들은 모두 적용이 되어있는 상태지만, 더 적용하면 좋은 것들을 정리해본다.

여기서 언급되는 것들은 라이브러리 구축에 종속되는 것이 아니라서 맘대로 하면 된다.

### ESLint, Prettier

일관적인 코드 스타일을 유지하기 위해 거의 반 강제적으로 구성해야한다.

이거 구성하는 건 가이드가 너무 많으니깐, 입맛에 맞게 구성하면 된다.

나는... [구(9) 버전](https://github.com/StyleList94/stylish-ui-kit/commit/edad00ceb1580aec638b050e1da542f924cd23b1)을 적용해봤다.

### 글꼴 추가

폰트는 사실 개별 프로젝트에서 직접 추가하는게 가장 성능이 좋다.

여기서는 [Storybook에 글꼴을 추가](https://storybook.js.org/docs/configure/integration/images-and-assets#referencing-fonts-in-stories)하면 되는데,

`.storybook/preview-head.html`에 웹폰트를 추가하면 스토리에 적용된다.

### 스토리에도 다크모드 적용

`@storybook/theming`으로 구성한 라이트/다크 테마는 스토리 컴포넌트에는 적용되지 않는다.

`@storybook/addon-themes`의 `withThemeByClassName()`를 활용하면 이프로 부족하긴하지만, 스토리에도 라이트/다크 테마를 적용할 수 있다.

이렇게하면 `tailwindcss`와도 궁합이 맞도록 설정할 수 있다.

먼저 `tailwindcss`가 클래스로 다크모드를 알아차릴 수 있도록 CSS를 업데이트 한다

```css:title=src/style.css
@import 'tailwindcss';

@custom-variant dark (&:is(.dark *));
```

그리고 다음 패키지를 설치한다.

```bash:title=Terminal
pnpm add -D @storybook/addon-themes
```

다음으로 `.storybook/preview.ts`에 다음과 같이 업데이트 한다.

```ts:title=.storybook/preview.ts
import { withThemeByClassName } from '@storybook/addon-themes';

// ..

const preview: Preview = { // [!code focus]
  parameters: {
    // ..
    // [!code focus:3]
    backgrounds: {
      disable: true, // 이 기능은 배경 색만 바꾸기 때문에, 테마에 따른 스타일링을 확인하기에는 다소 무리가 있다.
    },
    // ..
  },
  // [!code focus:10]
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};
```

## 주의할 점

Next.js와 같이 RSC(서버 컴포넌트)를 지원하는 프레임워크에서 컴포넌트 라이브러리를 운용할 때, 발생할 수 있는 이슈다.

### 번들링 된 컴포넌트는?

번들링 된 컴포넌트는 클라이언트 환경에서만 사용 가능하다. 즉, 서버 컴포넌트에서 사용할 수 없다.

`esbuild` 특성 상, 번들에 포함시키지 않은 패키지는 import 구문만 포함해서 빌드하는데,

여기에는 Hooks, Context API 모두 포함된다.

컴포넌트를 확인하는 시점에 이 import 구문을 무조건 컴파일 하기 때문에, 서버 컴포넌트에서 사용하면 에러가 발생한다.

### 스타일을 따로 관리하자

물론 `'use client'`로 클라이언트 컴포넌트로 만들면 그만이지만, 서버 컴포넌트의 이점을 최대한 활용하고 싶다면,

스타일 모듈을 공통 모듈로 생성해서, 서버 컴포넌트에서는 스타일만 가져다 사용하는 식으로 구성하면 해결할 수 있다.

라이브러리를 빌드할 때, 멀티 엔트리를 구성해서 컴포넌트, 스타일 각각의 엔트리를 생성하면,

스타일 모듈을 가져올 때, 라이브러리 내부에서 사용하지 않은 패키지(`react`)는 해당 컴포넌트에 포함되지 않는다.

### 스타일이 작용되지 않을 때

`tailwindcss`에서 [사용하지 않은 스타일은 컴파일에 포함시키지 않는다](https://tailwindcss.com/docs/detecting-classes-in-source-files).

의존성 패키지(`node_modules`)내부는 기본적으로 감지되지 않기에, 컴포넌트 라이브러리에서 사용중인 클래스를 감지하도록 설정해줘야 한다.

```css:title=your-project/src/global.css[example]
@source "../node_modules/your-ui-library";
```

## 마치며

서버 컴포넌트의 등장으로 인해, 컴포넌트 라이브러리에 의존하지 않으려는 패턴이 많이 등장했다.

컴포넌트 라이브러리를 구상할 때, 컴포넌트 뿐만 아니라,

스타일 가이드를 더 집중적으로 구성하는 쪽으로 방향을 잡는 것이 중요할 것으로 보인다.

디자이너가 개떡같이 말해도 찰떡같이 반영할 수 있도록, 디자인 시스템에 기여해보는건 어떨까?

## 업데이트 히스토리

25-06-16: Storybook v9 릴리즈 대응

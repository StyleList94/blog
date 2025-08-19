---
title: 은하계에서 살아남기
description: Next.js에서 Astro까지 2부
date: '2025-08-19T07:50:00.000Z'
series: 'Astro 첫 경험'
seriesOrder: 2
---

## 빠른 참고

[Astro에서 순결하고 싶다면](https://docs.astro.build/ko/guides/client-side-scripts/),
[ESLint 플러그인 별](https://ota-meshi.github.io/eslint-plugin-astro/),
[Prettier 적용하기](https://docs.astro.build/ko/editor-setup/#prettier),
[배포하기](https://docs.astro.build/ko/guides/deploy/)

## 다크모드 적용하기

Next.js에서는 `next-themes` 패키지를 이용하면 다크모드를 정말 쉽게 구현할 수 있었다.

하지만 Astro에서는 Context API를 이용한 상태관리가 쉽지 않기 때문에 [클라이언트에 스크립트를 주입하는 방식](https://docs.astro.build/ko/guides/client-side-scripts/)으로 다크테마를 구현해야한다.

> Astro에서 Context를 사용하기 어려운 이유는 그들만의 섬 아키텍처 방식 때문인 것 같다.

로컬 스토리지를 활용하여 `theme` 정보를 저장하고 이 정보를 활용해서 `html` 태그에 `dark` 클래스를 추가하는 방식으로 다크모드를 구현하면 된다.

`MutationObserver`를 이용해서 이벤트에 의해 `html` 태그에 클래스가 변경되었을 경우 로컬 스토리지에 저장된 `theme` 정보를 갱신하고,

시스템 테마가 변경되는 것을 감지해서, 페이지 테마도 같이 변경해주는 이벤트 핸들러도 구현해주면 더없이 완벽하겠지???

```astro:title=src/components/theme.script.astro
<script is:inline>
  // 태그드 템플릿 기법을 이용해서 오랜만에 styled 처리를 해볼까?
  function css(strings) {
    return strings.join('').trim();
  }

  // 로컬 스토리지에 정의된 테마 값을 반환하는 함수
  const getThemePreference = () => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return 'system'; // 없으면 기본값인 시스템 테마를 사용한다
  };

  // theme 값을 이용해서 `html` 태그의 클래스를 업데이트 하는 함수
  const resolveTheme = (theme) => {
    if (theme === 'system') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    document.documentElement.classList[theme === 'dark' ? 'add' : 'remove'](
      'dark',
    );
  };

  // 스크립트가 로딩될 때 테마를 적용한다.
  let currentTheme = getThemePreference();
  resolveTheme(currentTheme);

  // 다른 이벤트에 의해 `html` 태그의 클래스 업데이트를 감지해서 수행할 액션을 정의
  if (typeof localStorage !== 'undefined') {
    const observer = new MutationObserver(() => {
      const currentTheme = getThemePreference();

      // 로컬 스토리지의 `theme` 값 업데이트
      if (currentTheme !== 'system') {
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      }

      // shadcn-ui를 사용한다면 테마가 전환될 때, 트랜지션 효과를 일시적으로 무효 처리 해야한다!
      const style = document.createElement('style');
      style.textContent = css`
        *,
        *::before,
        *::after {
          transition: none !important;
        }
      `;
      document.head.appendChild(style);
      setTimeout(() => {
        document.head.removeChild(style);
      }, 10);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  // 시스템 테마가 변경될 때 페이지 테마도 같이 업데이트 한다
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChangeTheme = () => {
    if (
      typeof localStorage !== 'undefined' &&
      getThemePreference() === 'system'
    )
      resolveTheme('system');
  };
  mediaQuery.addEventListener('change', handleChangeTheme);
</script>
```

첫 줄에 `is:inline` 지시어를 주입해야 스크립트가 올바르게 로딩된다.

> Astro는 `src` 이외의 속성이 있는 경우 처리하지 않는다고 한다. `is:inline` 지시어를 사용하면 작성된 그대로 HTML로 렌더링한다!

이렇게 작성하고 루트 레이아웃에 삽입하면 된다.

```astro:title=src/layouts/root.astro
---
import Head from '@/components/head.astro';
// [!code focus]
import ThemeScript from '@/components/theme-script.astro';

import '@/styles/global.css';
---

// [!code focus]
<ThemeScript />

<html lang="ko">
  <Head />
  <body>
    <slot />
  </body>
</html>
```

> 사실 루트 레이아웃에 바로 스크립트를 삽입해도 된다. 나도 그러고 싶었다...~~WebStorm에서 하이라이팅 처리를 못 할줄이야...~~

이렇게 하면 테마를 바꿀 준비는 모두 끝났다!

### 다크테마로 변경하기

`next-themes`를 사용했다면 `useTheme()` 으로 쉽게 구현했을텐데, 스크립트를 직접 주입하는 형태로 테마를 구현한 이상, DOM 요소에 직접 접근하는 방식으로 구현해야한다!

React 컴포넌트로 테마를 변경하는 스위치를 다음과 같이 만들 수 있다.~~Astro 컴포넌트가 익숙하지 않아서 그런건 절대 아니다~~

```tsx:title=src/componenets/theme-control-switch.tsx
import { useEffect, useState } from 'react';

const ThemeControlSwitch = () => {
  const [isMounted, setIsMounted] = useState(false);

  // [!code focus:4]
  // 로컬 스토리지의 theme 값과 동일하게 테마 상태를 저장한다.
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(
    'system',
  );

  // [!code focus:17]
  // 테마 변경 이벤트 핸들러 함수, 상태만 업데이트 한다
  const toggleTheme = () => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';

    const currentTheme = theme === 'system' ? systemTheme : theme;

    const resolvedTheme: 'light' | 'dark' =
      currentTheme === 'dark' ? 'light' : 'dark';

    setThemeState(resolvedTheme);
    if (typeof localStorage !== 'undefined' && !localStorage.getItem('theme')) {
      localStorage.setItem('theme', resolvedTheme);
    }
  };

  // [!code focus:15]
  // 시스템 테마 변경을 감지해서 컴포넌트의 테마 상태도 업데이트 해줘야 한다.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChangeTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setThemeState(isDarkMode ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChangeTheme);

    handleChangeTheme();

    return () => mediaQuery.removeEventListener('change', handleChangeTheme);
  }, []);

  // [!code focus:8]
  // 테마 상태 변경이 감지되면 DOM에 접근해서 클래스 업데이트을 통한 테마 변경을 수행한다
  useEffect(() => {
    const isDark =
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
  }, [theme]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>{/* 스위치 버튼 렌더링 */ }</>
  );
};

export default ThemeControlSwitch;
```

이렇게 클래스 업데이트를 하면, 앞에서 구현한 스크립트에서도 클래스 변경을 감지해서, 구현된 액션들을 수행한다!

### 토스터에도 적용하기

`shadcn/ui`의 Toaster, 특히 `sonner` 기반 토스터 컴포넌트를 사용한다면, 이것도 `next-themes` 기반으로 테마를 업데이트 하기 때문에,
이 부분을 걷어내고 테마 상태 변경을 직접 구현해줘야 한다!

```tsx:title=src/components/ui/sonner.tsx
'use client';

import { type CSSProperties, useEffect, useState } from 'react';

import { Toaster as Sonner, type ToasterProps } from 'sonner';

// [!code focus:7]
// 테마 정보를 가져오는 함수
const getThemePreference = () => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme');
  }
  return 'system';
};

const Toaster = ({ ...props }: ToasterProps) => {
  // [!code focus:2]
  // 타입이 일치하는건 기막힌 우연의 일치이다
  const [theme, setTheme] = useState<ToasterProps['theme']>('system');

  // [!code focus:18]
  // `html` 태그의 클래스 변경이 감지되면 상태를 업데이트 하도록 이펙트를 추가한다
  useEffect(() => {
    setTheme(getThemePreference() as ToasterProps['theme']);

    const observer = new MutationObserver(() => {
      const currentTheme = getThemePreference();
      if (currentTheme !== 'system') {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'dark' : 'light');
      } else {
        setTheme(currentTheme);
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }, []);

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as CSSProperties
      }
      {...props}
    />
  );
};

export default Toaster;
```

이렇게하면 100% 완벽하진... 않지만? 다크/라이트 테마 전환이 가능한 페이지가 구현되었다!

## ESLint

이제 개발 편의성 부분을 마이그레이션 해야한다.

ESLint 구성을 할 때, 전부 그대로 가져올 수 있다. 하지만 `.astro` 확장자에 대한 특별한 처리를 해줘야한다.

다행히 `eslint-plugin-astro` 플러그인이 커뮤니티에서 제공되고 있다. (사실상 오피셜)

`.astro` 컴포넌트를 주로 사용하지 않는다면 필요는 없겠지만, 그래도 명색이 Astro 기반 앱인데, 플러그인 구성정도는 괜찮지 않을까?

하지만 이 녀석... 아직 실험적 단계다. 사용하려면 플러그인과 의존 패키지를 모두 설치해야한다

```bash:title=Terminal
pnpm add -D eslint-plugin-astro

# TypeScript를 사용한다면 추가로 설치
pnpm add -D @typescript-eslint/parser

# 설마 React를 사용하는데 JSX 플러그인이 구성이 안되어있진 않겠지...?
pnpm add -D eslint-plugin-jsx-a11y
```

이제 구성을 업데이트 해야하는데, 해당 플러그인은 타입이 일단 불안정하고, 이미 구성된 세트말고 세부적으로는 적용할 수 없기 때문에, 적용순서가 중요하다

```js:title=eslint.config.mjs
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import astroESLintParser from 'astro-eslint-parser';
import tsESLintParser from '@typescript-eslint/parser';

import { configs as astroConfigs } from 'eslint-plugin-astro';

export default tseslint.config(
  globalIgnores(['node_modules', 'dist', '.astro']),
  // [!code focus:6]
  // 가장 먼저 정의해줘야 한다
  // 공식 문서와 import 방식이 다른 이유는 import 플러그인이 태클을 걸기 때문이다.
  // 둘 중 하나만 적용해도 아무 문제가 없다. 오히려 그래야만 한다(구성설정이 중복됨)
  // 규칙만 따로 꺼내서 정의할 수가 없기 때문에 그냥 이렇게 한다... 알 게 뭐야~
  ...astroConfigs.recommended,
  ...astroConfigs['jsx-a11y-strict'],
  // [!code focus:23]
  // 타입스크립트 구문을 이해시킬려면 이렇게 오버라이드 해줘야 한다!
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroESLintParser,
      parserOptions: {
        parser: tsESLintParser,
        extraFileExtensions: ['.astro'],
        project: './tsconfig.json',
        ecmaVersion: 12,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
      },
    },
    extends: [
      // astro 모듈에 적용하고 싶은 TypeScript 관련 config를 여기에 추가
    ],
    rules: {
      // astro 모듈에 적용할 규칙을 추가 또는 덮어쓰기
    },
  },
  // ..
);
```

쬐끔 애매하지만, 일단 넘어간다. 작동은 하잖아?

## Prettier

역시 `.astro` 모듈에 대해서는 플러그인을 통해 적용할 수 있다. 이건 또 [공식으로 제공](https://docs.astro.build/ko/editor-setup/#prettier)하네?

```bash:title=Terminal
pnpm add -D prettier-plugin-astro
```

플러그인을 설치한 뒤, `.prettierrc` 상단에 추가하면 된다!

```json:title=.prettierrc
{
  "plugins": ["prettier-plugin-astro"],
  "overrides": [
    {
      "files": "*.astro",
      "options": {
        "parser": "astro"
      }
    }
  ],
  // ..
}
```

## 테스팅 마이그레이션

React 컴포넌트를 테스팅한다면 기존 테스팅 방식 그대로 구성할 수 있다.

다만 서버 컴포넌트에 대한 단위 테스트 모듈이 있다면 props에 따른 렌더링이 수행되었는지를 중심으로 테스트 스위트를 재작성 해야 한다.

Astro 컴포넌트에 대한 테스트 작성은... 급하게 하느라 좀 더 알아봐야 한다. 어렵진 않겠지..?~~담에보자~~

## 배포

Astro로 변경을 시도했던 가장 큰 이유 중 하나다.

Next.js는 현 시점 Vercel 말고는 제 성능을 낼 수 있는 서버리스 서비스가 없다시피하다.

> 실제로 앱 라우터가 도입되면서 벤더 락인이 더 심해졌다...

이유는 간단한데, Vercel이 각각의 서버리스에서 효율적으로 Next.js 서버를 운용할 수 있도록 어댑터를 기능을 제공하지 않기 때문이다.

> 그나마 [OpenNext](https://opennext.js.org/)가 이 문제를 어느정도 해결하려는 노력을 하고 있다는 것에 감사할 따름이다.

> 정신을 차린걸까? 얼마전 이례적으로 [Next.js 16에 대한 로드맵](https://nextjs.org/blog/next-15-4#looking-ahead-nextjs-16)(?)이 언급되었고, 어댑터 지원을 공식화 했다!

다시 Astro 얘기로 돌아오면, Astro는 기본적으로 빌드 시점에 페이지가 모두 생성되기 때문에, SSR 기능을 사용하기 위해선, 배포 서비스에 맞는 어댑터를 활용해야 한다!

정적 사이트를 렌더링할 때는 어댑터가 필요없다.

나는 [Cloudflare Workers를 이용한 배포](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/)를 선택했다.

먼저 터미널에서 다음 명령을 수행한다

```bash:title=Terminal
pnpm astro add cloudflare
```

뭔가를 물어보면 예스맨이 되어서 답한 뒤, `astro.config.mjs`에 Vite 관련 구성을 업데이트해야한다.

```js:title=astro.config.mjs
// ..

export default defineConfig({
  integrations: [react()],
  vite: {
    // ..
    // [!code ++:8]
    resolve: {
      alias: import.meta.env.PROD
        ? {
            'react-dom/server': 'react-dom/server.edge',
          }
        : {},
    },
  },
  // ..
  // [!code ++:7]
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },

    imageService: 'compile',
  }),
});
```

그 다음 `public/` 디렉토리에 `.assetsignore` 파일을 다음과 같이 추가해야한다.

```text:title=public/.assetsignore
_worker.js
_routes.json
```

배포 구성을 위한 `wragler.jsonc` 모듈도 프로젝트 루트에 다음과 같이 구성해준다.

```json:title=wrangler.jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "lovely-app",
  "main": "./dist/_worker.js/index.js",
  "compatibility_date": "2025-08-09",
  "compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"],
  "assets": {
    "binding": "ASSETS",
    "directory": "./dist",
  },
  "observability": {
    "enabled": true,
  },
}
```

마지막으로 배포를 위한 스크립트도 추가해주면 된다.

```json:title=package.json
{
 "scripts": {
    "preview": "astro build && wrangler dev",
    // [!code ++:2]
    "deploy": "astro build && wrangler deploy",
    "cf-typegen": "wrangler types"
  },
}
```

어댑터를 추가하면 기존의 `astro preview`는 동작하지 않기 때문에, 어댑터를 이용해서 실행하는 패턴으로 변경해야한다.

이렇게 구성하고 대시보드 또는 CLI를 통해 배포하면 된다.

어댑터를 이용해서 빌드하면 앱 자체가 SSR로 동작하기 때문에(`output: 'server'`), 정적 생성이 필요한 페이지는 상단에 `export const prerender = true` 표현식을 추가해야한다.

## 찍먹 후기

실제로 빌드해봤더니 Next.js 빌드 결과보다 많이 가벼워진 번들 사이즈를 얻을 수 있었다. Vite가 좋긴 좋은가보다

확실히 블로그, 홍보, 문서 페이지 같은 정적 콘텐츠를 개발할 때는 이제 이 프래임워크로 개발하지 않을까 싶다.

더 깊이 사용해보면서 아일랜드 아키텍처에 대해 깊이 탐구하면 좋을 것 같은 생각이다.

하지만, React의 Context API를 활용하지 못한다거나, 서버 컴포넌트 기반의 최신 아키텍쳐를 사용하지 못하는 건 크나큰 아쉬움으로 남는다.

하지만 이제 나에겐 선택지가 생겼다.

정적 콘텐츠는 Astro, 웹 앱이 필요하면 Next.js

목적에 맞게 두 프레임워크 모두 꾸준히 사용할 수 있다면, 프론트엔드 업계에서 한 동안은 살아남을 수 있지 않을까???

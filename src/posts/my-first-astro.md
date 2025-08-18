---
title: 나랑 별 보러 가지 않을래?
description: Next.js에서 Astro까지 1부 
date: '2025-08-18T09:00:00.000Z'
series: 'Astro 첫 경험'
seriesOrder: 1
---

## 빠른 참고

[별 보러 가야만 하는 이유를 설득하기](https://docs.astro.build/ko/concepts/why-astro/),
[그들이 설명하는 섬 구조](https://docs.astro.build/ko/concepts/islands/),
[Next.js에서 Astro까지](https://docs.astro.build/ko/guides/migrate-to-astro/from-nextjs/),
[Astro에 Tailwind CSS 추가](https://tailwindcss.com/docs/installation/framework-guides/astro),
[Astro에 shadcn/ui 추가](https://ui.shadcn.com/docs/installation/astro),
[폰트 추가(올드스쿨)](https://docs.astro.build/ko/guides/fonts/),
[실험적 글꼴 API](https://docs.astro.build/ko/reference/experimental-flags/fonts/),
[레이아웃](https://docs.astro.build/ko/basics/layouts/),
[페이지](https://docs.astro.build/ko/basics/astro-pages/),
[별 컴포넌트 다보겠네](https://docs.astro.build/ko/basics/astro-components/),
[Astro에서 JSX를 사용할 때](https://docs.astro.build/ko/reference/astro-syntax/#astro%EC%99%80-jsx%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90),
[찾을 수 없는 페이지](https://docs.astro.build/ko/basics/astro-pages/#%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%A0%95%EC%9D%98-404-%EC%98%A4%EB%A5%98-%ED%8E%98%EC%9D%B4%EC%A7%80),
[뭔가 잘못되었을 때 페이지](https://docs.astro.build/ko/basics/astro-pages/#%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%A0%95%EC%9D%98-500-%EC%98%A4%EB%A5%98-%ED%8E%98%EC%9D%B4%EC%A7%80),
[Astro 컴포넌트에 React 컴포넌트를 불러와야 할 때](https://docs.astro.build/ko/reference/directives-reference/#%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%A7%80%EC%8B%9C%EC%96%B4),
[레디~ 액션!](https://docs.astro.build/ko/guides/actions/)

## 혜성같이 등장한 웹 프레임워크

요즘 React와 Next.js는 약간 애증의 관계인 것 같다.

서버 컴포넌트 같은 React의 최신 기술을 100% 활용하려면 Next.js를 사용하는 것이 유일한 방법이지만,

얘가 가면 갈수록 Vercel에 배포하지 않으면 성능이든 뭐든 반쪽짜리가 되어버린 것 같은 느낌이다.

그렇게 느껴지던 와중, OpenAI가 Remix로 전환했다는 소식이 알려지고, 업계에서는 이 문제가 꽤나 큰 가십거리였다.

사실 그럴만한게, Next.js로 만든 앱은 Vercel로 배포하면 가장 쉽고 최상의 퍼포먼스를 보여주지만, 다른 서버리스 서비스로 배포하면 그렇지가 않다.

최근 2~3년간 Next.js는 알게 모르게 Vercel에 의존적인 방향으로 설계되고 있었지 않았을까라는 의구심 속에,

별 하나를 알게 된다.

## 별 보러 가는 이유

[Astro를 사용하는 이유](https://docs.astro.build/en/concepts/why-astro/)에 보면 Astro는 올인원 웹 프레임워크라고 하면서 다음 특장을 가진다고 한다.

- [아일랜드 기법](https://docs.astro.build/en/concepts/islands/): 아일랜드라는 독특한 아키텍쳐로 웹사이트를 최적화
- UI 프레임워크: 대부분의 UI 프레임워크를 심지어 스까서(?) 사용 가능
- 서버 퍼스트: 서버에서 먼저 렌더링
- 제로 번들: 클라이언트에서 로드해야할 JS 감소

특징만 보면 블로그 같은 컨텐츠 중심 사이트를 구축할 때 사용하면 시너지가 극한으로 끌어올려질 것 같은 느낌이다.

프레임워크 치고는 자유도가 높은 편인데, 하나의 프로젝트 안에 여러 UI 프레임워크를 사용할 수 있다는 것이 눈에 확 들어온다.

UI 프레임워크 간 마이그레이션할 때, 점진적으로 할 수 있다는 것이니깐 서비스를 제공 중인 프로덕트 입장에서는 리스크 없이 시도할 수 있으니깐 꽤나 큰 강점이다.

그 밖에도 아일랜드 아키텍처니 뭐니 하는데, 문서를 읽어보면 꽤나 매력적인 기법이라는 걸 알게 될 것이다.(실제로 나는 그랬다.)

이제 보러 갈 명분이 생겼다.

## 정리의 첫 걸음

프레임워크를 전환하는건 꽤나 큰 공사이다.


그나마 가장 쉬운 방법은 [전환하려는 프레임워크의 '시작하기'](https://docs.astro.build/en/install-and-setup/) 방법을 통해 새로운 앱을 만들고, 하나씩 옮기는 법이다.

특히 프레임워크간 차이점을 꼭 알고 진행해야하는데, 전자제품 사용설명서는 읽지 않더라도, [Next.js에서 마이그레이션](https://docs.astro.build/en/guides/migrate-to-astro/from-nextjs/)하는 방법에 대한 문서를 꼭 읽어봐야한다.

Astro를 설치할 떄, 바로 React 구성을 추가할 수 있는 데, 그렇게 시작하면 구성이 더 단순해진다.

프로젝트 루트위치에서 새로운 Astro 앱을 생성한다.

```bash:title=Terminal
pnpm create astro@latest --add react
```

이러면 마법사가 몇가지 물어보는데 다음과 같이 답하면 된다.

- **Where should we create your new project?:** 프로젝트 이름 입력
- **How would you like to start your new project?:** Use minimal (empty) template
- **Install dependencies? (recommended)**: Yes! (추천한다니깐..)
- **Initialize a new git repository? (optional)**: No (이미 git repository가 있다)

이렇게 하면 React를 바로 사용할 수 있는 Astro 앱이 생성된다.

## Tailwind CSS 추가

Astro는 Vite를 이용해서 번들링을 수행하기 때문에, [Tailwind CSS를 추가](https://tailwindcss.com/docs/installation/framework-guides/astro)하는 건 정말 쉽다.

먼저 패키지를 설치해주고

```bash:title=Terminal
pnpm install -D tailwindcss @tailwindcss/vite
```

`astro.config.mjs` 구성에 `tailwindcss`를 추가해준다.

```js:title=astro.config.mjs
// @ts-check
import { defineConfig } from "astro/config";
// ..
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // ..
  vite: {
    plugins: [tailwindcss()], // [!code ++]
    // ..
  },
});
```

마지막으로 Root CSS를 구성해주면 끝이다.

```css:title=src/styles/global.css
@import 'tailwindcss';
```

## shadcn-ui 추가

서버 컴포넌트를 최대한 활용하려면 공통 UI 컴포넌트도 프로젝트별 독립적으로 작성해야하는데,

이러한 추세 속에 `shadcn/ui` 인기가 아주 하늘을 모르고 치솟고 있다.

Astro에서도 `shadcn/ui`의 UI 컴포넌트를 아무 문제 없이 사용할 수 있다.

[설치](https://ui.shadcn.com/docs/installation/astro)도 간단하다.

우리는 이미 React와 Tailwind CSS를 추가했기 때문이다.

먼저 `tsconfig.json`에 import alias를 다음과 같이 정의해줘야한다.

```json:title=tsconfig.json
{
  "compilerOptions": {
    // ...
    // [!code ++:6]
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
```

다음 마법사의 힘을 빌리면 끝이다.

```bash:title=Terminal
pnpm dlx shadcn@latest init
```

## 폰트 추가

Next.js에서는 [폰트 최적화](https://nextjs.org/docs/app/getting-started/fonts) 기법을 통해 쉽고 편리하게 웹 폰트 구성을 할 수 있다.

Astro에서는 폰트 추가를 3가지 방법으로 할 수 있다.

- `@font-face` 직접 정의
- Fontsource 사용
- 실험적 글꼴 API 사용

나는 실험적 글꼴 API를 사용해서 글꼴을 추가해보려 한다. ~~아직 미련이 남았나보다~~

먼저 사용했던 폰트를 `src/assets/fonts/` 디렉토리 안에 넣어준다.

그 다음, 폰트 디렉토리에 `index.ts`를 작성해준다.

나 같은 경우 이전 프로젝트에서 '프리텐다드', 'Roboto Mono', 'Titillium Web' 폰트를 사용 중이었다.

```ts:title=src/assets/fonts/index.tsx
import { fontProviders } from 'astro/config';

export const pretendard = {
  provider: 'local' as const,
  name: 'Pretendard' as const,
  cssVariable: '--font-pretendard' as const,
  variants: [
    {
      weight: 400,
      style: 'normal',
      src: ['./src/assets/fonts/pretendard/Pretendard-Regular.subset.woff2',],
    },
    {
      weight: 500,
      style: 'normal',
      src: ['./src/assets/fonts/pretendard/Pretendard-Medium.subset.woff2'],
    },
    {
      weight: 600,
      style: 'normal',
      src: ['./src/assets/fonts/pretendard/Pretendard-SemiBold.subset.woff2'],
    },
    {
      weight: 700,
      style: 'normal',
      src: ['./src/assets/fonts/pretendard/Pretendard-Bold.subset.woff2'],
    },
    {
      weight: 800,
      style: 'normal',
      src: ['./src/assets/fonts/pretendard/Pretendard-ExtraBold.subset.woff2'],
    },
  ],
};

export const robotoMono = {
  provider: fontProviders.google(),
  name: 'Roboto Mono' as const,
  cssVariable: '--font-roboto-mono' as const,
};

export const titilliumWeb = {
  provider: fontProviders.google(),
  name: 'Titillium Web' as const,
  cssVariable: '--font-titillium-web' as const,
};
```

`cssVariable` 키를 이용해서 Tailwind CSS에서 사용할 글꼴 변수를 지정할 수 있다.

그 다음 `astro.config.mjs`에 폰트 구성을 추가해준다.

```js:title=astro.config.mjs
// @ts-check
import { defineConfig } from "astro/config";
// ..

// https://astro.build/config
export default defineConfig({
  // ..
  experimental: {
    fonts: [
      // @ts-ignore
      pretendard,
      robotoMono,
      titilliumWeb,
    ],
  },
});
```

그래... 실험적 API니깐 타입이 올바름에도 불고하고 검사가 제대로 되지 않는다는거, 이해해주자.

물론 별도의 모듈로 구성하지 않고 바로 때려넣으면 타입 검사도 통과한다.

나는 폰트를 바로 쑤셔넣으니깐, 너무 길어져서 별도 모듈로 구성했다.

이렇게 추가한 폰트를 `head` 하위에 컴포넌트 형태로 추가해줘야 하는데, 페이지 레이아웃을 구성하면서 한번에 하면 된다.

## 레이아웃 마이그레이션

Astro도 파일 기반 라우팅을 제공하기 때문에, [레이아웃](https://docs.astro.build/en/basics/layouts/) 규칙에 맞게 옮겨오면 된다.

Next.js의 Root Layout을 다음과 같이 옮겨 준다.

```astro:title=src/layouts/root.astro
---
import { Font } from 'astro:assets';

import '@/styles/global.css';
---

// [!code focus:14]
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- 아까 구성한 글꼴 추가 -->
    <Font cssVariable="--font-pretendard" preload />
    <Font cssVariable="--font-roboto-mono" preload />
    <Font cssVariable="--font-titillium-web" preload />
    <!-- 페이지 메타 정보 추가 -->
  </head>
  <body>
    <slot />
  </body>
</html>
```

`<slot />`이 React로 치면 `children` 같은 역할을 한다고 이해하면 편하다.

페이지에 하나하나 메타 정보를 태그로 정의해주는게 생각보다 엄청나게 귀찮다.

메타정보를 동적으로 관리해야하는 경우 `head` 하위 태그들을 별도의 컴포넌트로 구성해서 주입하면 된다.


```astro:title=src/components/head.astro
---
import { Font } from 'astro:assets';

const title = 'My First Astro';
const description = '별나다 별나';
const siteUrl = 'http://127.0.0.1:3000';
const keywords = ['첫경험은', '짜릿해'].join(', ');
const ogImage = `${siteUrl}/opengraph-image.png`;
const twitterImage = `${siteUrl}/twitter-image.png`;
---

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- 폰트 -->
  <Font cssVariable="--font-pretendard" preload />
  <Font cssVariable="--font-roboto-mono" preload />
  <Font cssVariable="--font-titillium-web" preload />

  <!-- 사이트 정보 -->
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />

  <link rel="canonical" href={siteUrl} />

  <!-- 아이콘 -->
  <link rel="icon" href="/favicon.ico" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:site_name" content={title} />
  <meta property="og:url" content={siteUrl} />
  <meta property="og:image" content={ogImage} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={twitterImage} />
</head>
```

앱 아이콘 같은건 `public` 디렉토리로 옮겨주면 된다.

## 페이지 컴포넌트

Next.js와 동일하게 파일 기반 라우팅이기 때문에 `app/` 디렉토리에 있는 `page.tsx` 컴포넌트를 `pages/` 하위 컴포넌트로 [적절하게 옮겨주면](https://docs.astro.build/ko/basics/astro-pages/) 된다.

페이지 컴포넌트 만큼은 `.astro` 컴포넌트로 생성해야한다.

[Astro 컴포넌트](https://docs.astro.build/ko/basics/astro-components/)는 JSX 문법을 지원하지만 React에서 사용하는 JSX와는 달리 [몇가지 차이](https://docs.astro.build/ko/reference/astro-syntax/#astro%EC%99%80-jsx%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90)가 있다.

- HTML 속성에 표준 `kebab-case` 형식을 사용.
- `className`은 `class`로 사용.
- 코멘트는 HTML, JS 스타일 모두 사용 가능

그리고 Astro 컴포넌트에서 React 컴포넌트를 렌더링할 때, [클라이언트 지시어](https://docs.astro.build/ko/reference/directives-reference/#%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8-%EC%A7%80%EC%8B%9C%EC%96%B4)를 추가해줘야 한다.

클라이언트 지시어는 크게 5가지가 있는데, 컴포넌트 JavaScript를 즉시 로드하고 수화하는 시점을 결정한다.

- `client:load`: 페이지 로드 시(우선순위 높음)
- `client:idle`: 페이지의 초기로드가 완료되고 `requestIdleCallback` 이벤트 또는 document의 `load` 이벤트가 실행될 때(우선순위 중간)
- `client:visible`: 컴포넌트가 뷰포트에 들어왔을 때(우선순위 낮음)
  - 내부적으로 `IntersectionObserver` 사용
  - Mount에 따른 렌더링 로직이 있다면 제대로 동작하지 않는다
- `client:media`: 컴포넌트가 미디어 쿼리를 충족했을 때(우선순위 낮음)
- `client:only`: 서버 렌더링을 건너뛰고 클라이언트에서만 렌더링
  - fallback 렌더링을 지원

클라이언트 지시어를 추가하지 않고 React 컴포넌트를 렌더링하면, 클라이언트에 의한 상호작용이 발생하지 않는다!

### 페이지를 찾을 수 없습니다

Next.js에서는 `app/not-found.tsx`, [Astro에서는 `pages/404.astro`로 생성](https://docs.astro.build/ko/basics/astro-pages/#%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%A0%95%EC%9D%98-404-%EC%98%A4%EB%A5%98-%ED%8E%98%EC%9D%B4%EC%A7%80)하면 된다.

적절하게 문법에 맞춰 옮겨주면 된다.

### 뭔가 잘못 되었습니다 페이지

Next.js에서는 `app/error.tsx`, [Astro에서는 `pages/500.astro`로 생성](https://docs.astro.build/ko/basics/astro-pages/#%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%A0%95%EC%9D%98-500-%EC%98%A4%EB%A5%98-%ED%8E%98%EC%9D%B4%EC%A7%80)하면 된다.

`Astro.props`에 `error` 오브젝트가 들어있고, try-catch의 error처럼 `unknown` 타입으로 주입되니깐, 원하는 에러 타입이 있다면 적절히 검사해서 로직을 구성하면 된다.

## 서버 컴포넌트 마이그레이션

React 서버 컴포넌트에서 `fetch()`를 이용해서 데이터를 가져온 뒤 렌더링을 하는 패턴은 Astro 컴포넌트로 데이터를 불러오고 React 컴포넌트로 UI를 렌더링하는 형태로 마이그레이션하는 것이 가장 현명하다

RSS로 블로그 피드를 가져오는 서버 컴포넌트를 다음과 같이 마이그레이션 할 수 있다.

```astro:title=src/components/blog-feed.astro
---
import BlogFeedContainer from './blog-feed-ui';

type Post = {
  title: string;
  link: string;
  description: string;
};

const extractTags = (xml: string, tag: string): string[] => {
  const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'g');
  return Array.from(xml.matchAll(regex), (match) => match[1]);
};

// [!code focus:21]
// props 정의
let postList: Post[] = [];
let errorMessage: string | null = null;

try {
  const res = await fetch('https://blog.stylelist94.dev/rss.xml');

  if (!res.ok) {
    errorMessage = '피드 어디갔어!?';
  } else {
    const data = await res.text();

    postList = extractTags(data, 'item').map((itemXml) => ({
      title: extractTags(itemXml, 'title')[0] || '',
      link: extractTags(itemXml, 'link')[0] || '',
      description: extractTags(itemXml, 'description')[0] || '',
    }));
  }
} catch {
  errorMessage = '그럴리가 없는데...';
}
---

// [!code focus:2]
<!-- 서버 컴포넌트에서 렌더링 부분만 분리해서 데이터만 Props로 받는 형태로 재가공 -->
<BlogFeedContainer postList={postList} errorMessage={errorMessage} />
```

## 서버 액션

React에서 Form Action을 구현할 때, Server Action 기법을 활용해서 유연하게 서버 액션을 정의할수 있다.

Astro에서도 [Action](https://docs.astro.build/ko/guides/actions/) 기능을 제공하기 때문에 마이그레이션이 어렵지 않다.

먼저 `src/actions/index.ts`에서 `server` 오브젝트를 다음과 같은 형태로 내보내야 한다.

```ts:title=src/actions/index.ts
import { defineAction } from 'astro:actions';

export const server = {
  // action은 `defineAction()` 으로 구현하면 된다
  myAction: defineAction({ /* ... */ })
}
```

`FormData`를 수신하기 위해서는 `defineAction()`에서 `accept: form`을 설정하면 된다.

그리고 `handler`를 통해 처리할 액션을 구현해주면 된다.

```ts:title=src/actions/index.ts
import { defineAction } from 'astro:actions';

type ConvertResult = {
  success: boolean;
  data: string;
};

export const server = {
  // action은 `defineAction()` 으로 구현하면 된다
  myAction: defineAction({
    accept: 'form',
    async handler(formData: FormData): Promise<ConvertResult> {
      // 이런식으로 formDate를 바로 사용할 수 있다.
      const file = formData.get('icon') as File;
      
      // 데이터 처리후 양식에 맞게 반환
    },
  }),
}
```

반환 양식은 자유롭지만 클라이언트 네트워크를 통해 처리되기 때문에 직렬화가 가능한 값이어야한다.(JSON이 가장 무난하다)

이렇게 정의한 액션은 React 컴포넌트 내부에서도 사용이 가능하다.

```tsx:title=src/components/icon-converter.tsx
'use client';

import { actions } from 'astro:actions';

// ..

const IconConverter = () => {
  // ..
  
  const convertAction = (formData: FormData) => {
    const file = formData.get('icon') as File;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('5MB 이하 파일만 허용됩니다');
      return;
    }

    startTransition(async () => {
      try {
        // [!code focus:6]
        const { data: res } = await actions.myAction(formData);

        if (res) {
          const { success, data } = res;
          // ..
        }
      } catch (error) {
        // ..
      } finally {
        // ..
      }
    });
  };

  return (
    <>{/* 렌더링 */}</>
  );
};

export default IconConverter;
```

## 주의사항

Astro에서 React를 사용할 때, 몇가지 주의해야할 점이다

### 쉽지 않은 Context

내가 잘못 사용한건지, 아일랜드 아키텍쳐 때문에 그런지 모르겠지만 Context를 통한 상태 관리가 전혀 동작하지 않았다.

전역적 상태관리가 필요하다면 Astro에서 권장하는 상태 관리 기법을 따라야 할 것 같다

### 서버에서 먼저 실행되는 컴포넌트

Astro 특성상 React 컴포넌트는 일단 서버에서 한번 실행된다.

수화될 때, 상태 일치에 신경쓸 뿐만아니라, 조건문을 통해서 클라이언트에서 실행되어야할 코드를 명확히 구분해야한다.

## 분량 조절 실패

여기까지만 하면 마이그레이션한 페이지를 확인할 순 있다!

하지만 아직 할 게 많이 남았다.

다크모드 마이그레이션, 코드 포멧터, 테스팅 등등은 후속 편에서 다뤄보기로 한다.


---
title: Next.js 15는 어떻게 변했을까?
description: Next.js 15의 변경 점을 내맘대로 정리
date: '2024-11-14T11:45:00.000Z'
---

## 빠른 참고

[Next.js 15 릴리즈](https://nextjs.org/blog/next-15)

## 캐싱 정책 변경

fetch 요청, GET 라우트 핸들러, 클라이언트 라우터 캐시가 기본적으로 캐시되지 않도록 변경되었다.

희소식이다. 한 때, 서버 시간을 불러오기 위해 API를 구현할 일이 있었다.

이 기능을 배포하고 API를 요청해봤는데, 캐싱되어 시간을 실시간으로 불러오지 못했던 기억이 스쳐지나간다.

기본값이 `no-store`로 설정, 캐싱이 필요한 경우 `force-cache` 옵션을 사용하면 된다고 한다.

## 동적 API들의 비동기화

pages 컴포넌트, layouts 컴포넌트 metadata API, route handler 의 `params` , `searchParams` props가 이제 비동기로 동작한다.

`next/headers`의 `cookies()`, `draftMode()`, `headers()` 들도 마찬가지로 이제 비동기로 동작한다.

적용 안한다고 동작을 아예 안하는건 아니지만. 터미널에서 바꾸라고 재촉할 것이다.

마이그레이션할 때 애먹겠네...

## React 19

React 19를 지원한다.

이 글을 작성하는 시점엔 RC 버전이지만,

React 팀과 긴밀한 작업으로 안정성을 확보했다나 어쩌나 하면서 그냥 적용해버린 것 같다.

App Router를 사용하는 경우에는 19 버전을 사용하면 될 것 같다.

Page Router를 사용하는 경우에는 18 버전을 사용하면 동작한다고 하니 참고만 한다.(이제 페이지 라우터 안씀...)

하이드레이션 에러가 발생 했을 경우 해결 방법이 좀더 상세하게 나온다고 한다. 이거 은근히 신경쓰였는데 이젠 괜찮겠지...

React 19 변경 점은 좀 써보고 정리해야겠다.

## instrumentation.js

이 기법을 사용해서 서버 라이프사이클을 활용하여 에러를 추적하고 Sentry 같은 곳에 전달할 수 있다고 한다.

정보가 꽤 자세하게 들어있다. 에러 추적할 때 활용하면 좋을 것 같다

## Form Component

`next/form` 컴포넌트가 추가되었는데,

대표적으로 `action` 을 통해 클라이언트 사이드에서 페이지를 이동한 뒤, 처리할 수 있는 기능이 있다.

이건 서버 컴포넌트에서 입력 요소 처리할 때, 유용하게 사용할 듯 하다.

## next.config.ts

제목이 곧 내용. 더이상 말이 필요없다. 드디어 이걸 해주는구나...

## 외부 패키지 번들링 최적화

`nextConfig`에서 `serverExternalPackages` 옵션을 통해,

특정 패키지가 서버에서 번들링 되지 않고, 기본 Node.js를 사용할 수 있다고 한다.

## ESLint 9 지원

하지만 airbnb rule을 지키고 있다면, 현 시점에서 아무 의미 없다.

## 개발 및 빌드 성능 향상

서버 컴포넌트에서 HMR을 지원하고, App Router에서 정적 생성 성능을 향상 했다고 한다.

이건 프로젝트 규모가 커졌을 때나 체감 할 수 있을 것 같다.

## 그래서 업그레이드 해야할까?

그냥 신기능 써보고 싶으면 하면 될 것같다.

React 19 정식 릴리즈 되고 해도 늦진 않을 듯.

하지만 난 이미 마이그레이션을 하고 있다.

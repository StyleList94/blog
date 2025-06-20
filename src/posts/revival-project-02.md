---
title: 그땐 뭔 생각으로 만들었을까?
description: 블로그 리바이벌 프로젝트 - 2장
date: '2024-10-05T15:40:00.000Z'
series: '블로그 리바이벌 프로젝트'
seriesOrder: 3
---

## 빠른 참고
- [Next.js 글꼴 적용 방법(App Router)](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [tailwindcss 컬러 확장 방법](https://tailwindcss.com/docs/customizing-colors#adding-additional-colors)

## 과거의 나를 부정한다

2년 전, 모든 콘텐츠가 가운데 배치된 블로그를 본 것 같다.

일반 사이트와는 다른 스타일이라 왠지 모르게 따라하고 싶었나보다.

어설프게 따라해서 문제였고, 하다 말아서 더 문제였던거 같다.

게다가 지금은 시간이 지나서 그런지 더 촌스럽게 느껴진다.

난 이걸 바꿔야 한다.

## 최대한 가짓수를 줄여야 한다

글꼴 얘기다.

글꼴은 고딕(산 세리프), 명조(세리프), 고정폭(모노), 디스플레이 4개만 사용할려고 한다.

고정폭 글꼴은 아무래도 코드를 간지나게 표현할일이 많다보니깐...

디스플레이 글꼴은 브랜딩 표현을 위해 넣는다.

굵기도 사용하는 것만 지정해야, 받아오는 리소스를 줄일 수 있다.

[글꼴 적용 역시 어렵지 않게 할 수 있다(많이 쉽다...)](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

여기에는 글꼴 사용을 다음과 같이 했다.

### 고딕: 프리텐다드

말이 필요없다. 한글 글꼴 중에 가장 읽기 편하고 정갈한 느낌이 난다고 생각한다.

이거 하나로만 사이트를 구성해도 쌍팔년도 사이트 느낌은 절대로 나지 않을 것이다.

### 명조: Noto Serif KR

명조체를 많이 안쓸 것 같지만 만일을 대비해서 가장 모던한걸로 골랐다.

갑자기 성의가 없게 느껴진다면, 맞다. 안쓸것 같아서 그냥 대충 골랐다...

### 고정폭: Roboto Mono

사실 D2Coding, Roboto Mono 사이에서 많은 고만을 했다, D2Coding은 한글을 지원하는 이유로 고민했었는데,

영단어 강조 표현으로만 활용할 것 같아서 Roboto Mono를 채택했다.

### 디스플레이

글꼴은 그냥 내맘대로 골랐다. 브랜딩용이니깐 이유 같은건 패스해도 되겠지...?

### 모양

타이포그래피는 그냥 `tailwindcss` 기본설정을 활용하기로 했다. 블로그라서 그것만으로도 충분하다.

## 색칠놀이

컬러도 최대한 `tailwindcss` 기본 구성을 활용하기로 했다. 하지만 

블랙이 `#000000`이라는 이거 하나 만큼은 용납못하겠다.

[컬러 추가도 어렵지 않다.](https://tailwindcss.com/docs/customizing-colors#adding-additional-colors)

나는 확장성을 위해 모듈 기반으로 구성했다.

```ts:title=styles/colors.ts
export type ColorValue = HexColorCode | RGBAColorCode;

export type Colors = Record<ColorKey, ColorValue>;

export const colors: Colors = {
    white: '#ffffff',
    black: 'rgba(10, 10, 10, 100)', // neutral-950
};
```

이렇게 구성한 뒤 `colors`를 `tailwind.config.ts`에 포함시키면 된다.

```ts:title=tailwind.cnfig.ts
// Path alias를 지원하지 않기 때문에, 상대경로로 지정해야한다.
import { colors } from './src/styles/colors';

const config = {
  theme: {
    extend: {
      colors, // 기존 구성에 다음과 같이 추가하면 된다.
    },
  },
} satisfies Config;
```

`tailwind` 구성 모듈은 `TypeScript`도 지원하니깐 확장자 바꾸고 쓰면, 좀더 모던할 수 있다.

## 가운데 모임을 해산하자

지긋지긋했던(?) 가운데 모임을 해산할때가 됐다.

그전에 뷰포트부터 정해야한다.

뷰포트도 일단 컨텐츠가 부실하기 때문에, 단순하게 최대크기를 `1536px`로 설정하고

`1024px`을 기준으로 뷰포트 중단점을 지정했다.

### 헤더

지금 헤더는 높이가 너무 커서`96px`) `64px`로 높이 조정을 해줬다.

브랜딩 요소도 왼쪽으로 배치했다.

나중에 검색창 이런거 넣을 수 있게, 일기를 많이 써야할 것 같다.

### 리스트 페이지

글 목록들의 너비가 고정이 아니라서, 요소 길이에 따라 들쭉날쭉 하고 있던걸 모르고 있었다...

남들이 보기 전에 수정해준다.

큰 화면일 때는 전체 영역에 반쪽에만 목록을 보여주고, 작은 화면일 때는 전체 너비로 보여주기로 했다.

컨텐츠가 많이자면 페이징 처리, 오른쪽 영역에 보여줄 리스트를 고민해봐야 할 것이다.

### 본문

여기는 일단 응급처지만 해놓았다. 

단락간 간격이 너무 좁아 일단 넓혀놨고, 머릿글 영역을 수정했다.

하지만 문단 구분이 안되는 문제점이 있어서 추후에 코드 하이라이팅 부분과 함께 개선해야한다.

어떻게 할지 고민 중이다...

### 푸터

어디에나 있는 저작권표기, Github 링크, 라이트/다크모드 변경 기능이 있다.

시스템 설정을 따라가게끔 했기 때문에, 라이트/다크모드 변경은 잘 안할 것 같아서 맨 밑에 배치했다.

### 다음에는

SEO 작업, Deploy 변경이 기다리고 있다.

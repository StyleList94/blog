---
title: 2024년 연말결산
description: 내맘대로 정리하는 2024년
date: '2024-12-31T12:18:00.000Z'
coverImage: /assets/images/cover.png
ogImage: /assets/images/cover.png
---

## 올해의 프론트엔드 JS

여지없이 `React`

여전히 밥벌어먹고 살게 해주는 고마운 라이브러리다.

4월 말 쯤에 [v19 RC 버전](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)이 업데이트 된 이후 결국 연말에 [메이저 릴리즈](https://react.dev/blog/2024/12/05/react-19) 되었다.

[`use`](https://react.dev/reference/react/use), [`useOptimistic`](https://react.dev/reference/react/useOptimistic) 등의 기능들이 추가되어

데이터 처리 관련해서 서드파티 라이브러리 의존을 크게 줄일 수 있어보인다.

커뮤니티가 강력하다보니 대부분의 문제는 시련없이 해결 가능하다.

당분간 패러다임은 안바뀔 것 같다...

## 올해의 스타일링

`tailwindcss`

첫인상은 별로였다.

`className`에 뭔 이상한 외계어가 아주 길게 작성되어있는 꼴이 별로였나보다.

하지만 점점 사용하면 사용할 수록, 빠져들고야 말았다.

키워드에 익숙해져, 이제 한글만큼 편한 느낌이다.

### 작업 속도 향상

처음에는 적용할 스타일링을 공식문서에서 계속 검색하면서 사용한지라, 속도가 나질 않았다.

그러나 이제 모국어가 되면서, 퍼블리싱 속도가 말도안되게 빨라졌다.

스타일 컴포넌트 기법에서 컴포넌트 이름 정하는 게 시련이었는데, 그런 고통이 없다.

### 강력한 스타일 가이드 구축

기본적으로 제공하는 키워드 뿐만 아니라 키워드 속성들을 커스터마이징 할 수 있다.

[`@layer` 기능](https://tailwindcss.com/docs/adding-custom-styles#using-css-and-layer)을 이용하면 특정 스타일링을 제공하는 키워드도 만들 수 있으니깐 이거 뭐 안쓸 이유가 없다.

### 이거↗ 어디까지↗ 길어지는↗ 거에요?↗

적용해야 할 스타일이 많으면(특히 반응형 스타일링) `className`이 길어질 수 밖에 없다.

하지만, `clsx`와 `tailwind-merge` 라이브러리를 이용해서, 스타일링을 그룹지을 수 있다.

그룹짓는 방법은 다양한데, 최근 프로젝트에서는 '정렬/텍스트/모양/반응형 스타일'으로 크게 구분짓는 형태로 적용했었다.

## 올해의 FE 프레임워크

`Next.js`

이것 역시 대안이 없다. `React`를 제대로 사용하고, 트렌드에 뒤쳐지기 싫다면 이 프레임워크를 사용해야한다.

아직도 `Webpack`으로 번들링하고 메이저 릴리즈를 거듭할 수록 무거워 지는 것도 사실이지만...

그만큼 편의성 업데이트도 많이 되고 있어서, 별다른 고민과 수고로움 없이, 완성도 높은 웹 서비스를 구축할 수 있다.

## 올해의 테스트 도구

`Vitest`

빠른 것도 빠르지만, `Jest`에 비해 설정 구성하는 방법이 너무 간단하다.

`Jest`에서 사용할 수 있는 메서드들과 이름이 같아서, 마이그레이션도 쉬운편이다.

커버리지, 시각화 같은 유틸리티도 좋은편이다.

유닛 테스팅을 도입한 프로젝트들은 전부 이걸로 교체했다.

## 올해의 만족템

iPad Pro 13(M4 모델)

살다살다 아이패드에 320을 태울줄이야...

1테라를 사야 메모리를 16GB 넣어준대서 그랬다. 뭐든지 램이 작은 건 못참는다.

그래서 가격때문에라도 만족해야한다.

얇고, 가볍고, 화면 미쳤고 유튜브 보기 좋다.

어지간한 작업은 다 할수가 있어서 맥북 대용으로 들고다닌다.

## 올해의 기술

말해 뭐하나... AI

어지간한 잡일은 다 ChatGPT 시키면 된다.

요즘에는 궁금하면 구글검색 대신 퍼플렉시티에 검색한다.

심지어 퍼플렉시티는 내가 물어본 내용들을 블로그 글처럼 정리해주는 기능도 있다.

[Creatie](https://creatie.ai/)를 이용하면 무료로 AI 프롬포트를 활용해서 웹디자인도 해준다.

피그마랑 UX도 비슷하다.

비슷한 것으로 [v0](https://v0.dev/)라는 서비스도 있다.

프로토타이핑할 때, 정말 도움이 많이 된다.

관련주들로 수익 많이 못 번게 아쉽다...

## 정리

솔직하게 개인적으로 올해는 2020년대 들어 가장 단조로웠던 것 같다.

올해의 나에게 반성하며

내년에는 올해보다 더 많은 도전과 다양한 경험들을 하면서, 하루하루 소중하게즐겨야겠다.
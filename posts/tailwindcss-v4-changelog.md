---
title: 이제 tailwindcss를 사용하지 않을 이유가 없다.
description: Tailwind CSS v4 변경점 정리
date: '2025-05-03T14:00:00.000Z'
---

## 빠른 참고

[Tailwind CSS v4.0](https://tailwindcss.com/blog/tailwindcss-v4),
[`@layer` MDN 가이드](https://developer.mozilla.org/ko/docs/Web/CSS/@layer),
[`color-mix()` MDN 가이드](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix),
[테마 변수 가이드 문서](https://tailwindcss.com/docs/theme),
[oklch](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch),
[컨테이너 쿼리](https://tailwindcss.com/docs/responsive-design#container-queries),
[`@starting-style` MDN 가이드](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style),
[`not-*` 가이드 문서](https://tailwindcss.com/docs/hover-focus-and-other-states#not),
[inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert),

## 서론

특별한 이유 없이 좋아하고 있는 Tailwind CSS가 4.0 메이저 업데이트를 했다.

성능과 유연성을 높인 완전히 새로운 버전의 프레임워크라고 소개하고있는데, 정말 그런 것 같다. 많이 좋아졌다!

이번 업데이트의 특징은 다음과 같다.

- 새로운 고성능 엔진
- 모던 웹 기반 설계
- 간소화된 설치
- Vite 플러그인 공식 지원
- 콘텐츠 자동 감지
- 빌트인 된 `@import` 구문
- CSS 우선 구성
- CSS 테마 변수
- 동적 유틸리티 값 및 속성 지원
- 모던 P3 컬러 팔레트
- 컨테이너 쿼리 지원
- 새로운 3D 변형 유틸리티
- 확장된 그래디언트 API
- `@starting-style` 지원
- `not-*` 속성 지원
- 더 많은 유틸리티 속성

## 새로운 고성능 엔진

Rust 기반의 새로운 고성능 엔진(Oxide) 도입으로 빌드 속도가 획기적으로 개선되었다.

이전 버전 대비, 전체 빌드는 3.78배, 증분 빌드는 8.8배 이상 빠르다.

|                             |  v3.4 |  v4.0 |  배수 |
| --------------------------- | ----: | ----: | ----: |
| 전체 빌드                   | 378ms | 100ms | 3.78x |
| 새로운 CSS 포함 증분 빌드   |  44ms |   5ms |  8.8x |
| 새로운 CSS 미포함 증분 빌드 |  35ms | 192µs |  182x |

특히 새로운 CSS를 컴파일 하지 않는 증분 빌드를 통해 성능이 대폭 향상되었다는데, 프로젝트 규모가 커질 수록, 이전에 사용했던 클래스를 재사용하는 경우가 많기 때문에 더욱 큰 효과를 볼 수 있다.

`styled-components`를 채택한 프로젝트의 경우, 컴포넌트가 많이잘 수록, 빌드 속도에도 영향을 줬었던 것 같은데, 이정도면 이제 성능때문에라도 CSS-In-JS 기법을 써야할 이유가 없다.

## 모던 웹 기반 설계

모던 CSS의 최신 구문 및 기능들을 모두 지원한다.

```css:title=CSS
/* 레이어 순서 정의 */
@layer theme, base, components, utilities;

/* 레이어 정의 */
@layer utilities {
  .mx-6 {
    margin-inline: calc(var(--spacing) * 6);
  }
  .bg-blue-500\/50 {
    /* color-mix() 지원 */
    background-color: color-mix(
      in oklab,
      var(--color-blue-500) 50%,
      transparent
    );
  }
}

/* 커스텀 속성 정의 */
@property --tw-gradient-from {
  syntax: '<color>';
  inherits: false;
  initial-value: #0000;
}
```

## 간소화된 설치

어차피 CLI가 자동으로 다 해줬지만, 설치가 더 쉬워졌다.

- 루트 CSS 파일에 `@import tailwindcss` 만 추가하면 된다.
- 구성 정보를 세팅하지 않더라도, 바로 사용할 수 있다.
- 외부 플러그인이 필요하지 않고, 구문 변환을 위해 내부에서 Lightning CSS를 사용한다.

## Vite 플러그인 공식 지원

Vite 플러그인을 공식적으로 지원함에 따라, 더 이상 `postcss`, `autoprefixer`을 종속적으로 설치할 필요가 없어졌다.

## 콘텐츠 자동 감지

v3에서는 config 파일에 content 배열을 정의해서, tailwindcss를 감지하도록 구성해야했지만, 이번 버전에서는 자동으로 감지한다.

기본적으로 `.gitignore`에 포함된 파일이나 디렉토리는 스캔하지 않으며, 자동으로 무시한다.

그렇기 때문에, UI 라이브러리에서 `tailwindcss`를 사용하는 경우 CSS 파일에 `@source` 구문을 통해 명시적으로 콘텐츠를 포함 시켜야 한다.

```css:title=CSS
@import 'tailwindcss';
@source "../node_modules/@my-company/ui-lib";
```

## 빌트인 된 `@import` 구문

`@import` 구문 지원이 `@tailwindcss/postcss`에 포함되었다. 이전 버전에서는 `@import` 구문을 사용하기 위해 `postcss-import` 플러그인을 등록해야 했다.

## CSS 우선 구성

프로젝트 구성 방식을 `JavaScript`에서 `CSS`로 전환했다.

**이번 버전에서 가장 큰 변화** 중 하나다.

Tailwind를 가져오는 CSS 파일에서 모든 옵션들을 커스터마이징 할 수 있어, 관리해아할 파일이 하나 줄어든다(`tailwind.config.js`).

## CSS 테마 변수

CSS에서 정의된 [테마 변수](https://tailwindcss.com/docs/theme)는 CSS 변수로 사용할 수 있다.

다른 라이브러리에서 CSS 변수를 참조해야할 때, 유용하다.

## 동적 유틸리티 값 및 속성 지원

미리 구성된 단위 값이 아니더라도 자동으로 계산해서 적용해준다.

```html:title=HTML
<!-- grid-cols-15는 정의되지 않은 단위지만 자동으로 계산해준다 -->
<div class="grid grid-cols-15">
  <!-- ... -->
</div>
```

사용자 정의 불리언 `data-*` 속성도 따로 정의할 필요 없이 자동으로 적용해준다.

```html:title=HTML
<!-- data-current에 대한 구성을 따로 정의하지 않아도 바로 사용할 수 있다 -->
<div data-current class="opacity-75 data-current:opacity-100">
  <!-- ... -->
</div>
```

이제 없는 단위를 일일이 커스터마이즈 할 필요가 없다. 미쳤다.

## 모던 P3 컬러 팔레트

기본 색상 팔레트를 `rgb`에서 `oklch`로 변경함으로써, 더 넓은 색영역을 활용하고, sRGB 색 공간으로 제한되었던 곳의 색상을 더욱 선명하게 표현할 수 있게 되었다.

컬러 밸런스를 이전 버전과 최대한 동일하게 유지하려고 노력했기 때문에, 기본으로 정의된 팔레트를 사용 중이라면 이질감이 느껴지지 않을 것이라고 한다. ~~좋은 게 좋은거겠지...~~

## 컨테이너 쿼리 지원

컨테이너 쿼리를 사용하기 위해 더 이상 `@tailwindcss/container-queries` 플러그인을 설치할 필요가 없다.

또한 `@max-*` 구문을 지원하며, `@min-*`, `@max-*`를 동시에 지정하여 범위 쿼리도 사용 가능하다.

## 새로운 3D 변형 유틸리티

`rotate-x-*`, `rotate-y-*`, `scale-z-*`, `translate-z-*` 등의 3D 변형 유틸리티가 추가되었다. (원래 있는 줄...)

## 확장된 그래디언트 API

이전 버전에서 그래디언트는 커스터마이징 하지 않는 이상 매우 제한적으로 구현할 수 있었는데, 이번 버전에서는 새로운 그라데이션 기능이 대거 추가되어, 커스터마이징 하지 않아도 다양한 효과를 구현할 수 있다.

### 선형 그래디언트 각도

이제 선형 그레디언트에 각도를 지정할 수 있게 되었다.

```html:title=HTML
<!-- bg-linear-* 기법으로 각도를 지정할 수 있다. -->
<div class="bg-linear-45 from-indigo-500 via-purple-500 to-pink-500"></div>
```

### 그래디언트 보간 수정자

수정자를 사용하여 그라데이션의 색상 보간 모드를 제어하는 기능이 추가되었다.

- `bg-linear-to-r/srgb`: sRGB를 사용하여 보간
- `bg-linear-to-r/oklch`: OKLCH를 사용하여 보간(기본 값)

### Conic 과 radial 그래디언트 지원

이제 `bg-conic-*`와 `bg-radial-*`을 이용해서 Conic과 radial 그래디언트를 사용할 수 있다.

`bg-gradient-*` 이름이 변경된 이유이기도 하다(다양한 그래디언트 지원).

```html:title=HTML
<div
  class="size-24 rounded-full bg-conic/[in_hsl_longer_hue] from-red-600 to-red-600"
></div>
<div
  class="size-24 rounded-full bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%"
></div>
```

## `@starting-style` 지원

제목이 곧 내용

## `not-*` 속성 지원

`not-*` 속성을 통해 `:not()` 의사 클래스를 사용할 수 있다.

## 더 많은 유틸리티 속성

- 새로운 그림자 유형 [`inset-shadow-*`](https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow), [`inset-ring-*`](https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring)
- [`field-sizing`](https://tailwindcss.com/docs/field-sizing): 자바스크립트 코드 한 줄 작성 없이, 텍스트영역 크기 자동 조정
- [`color-scheme`](https://tailwindcss.com/docs/color-scheme): 이제 다크모드에서 눈치 없게 혼자 빛나는 스크롤바를 없앨 수 있다.
- [`font-stretch`](https://tailwindcss.com/docs/font-stretch): 폰트 너비 조정이 쉬워집니다(장평).
- [`inert`](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-inert-elements): 비활성 상태의 요소를 쉽게 스타일링할 수 있다.
- [`nth-*`](https://tailwindcss.com/docs/hover-focus-and-other-states#first-last-odd-and-even): 이걸 드디어 해주네...
- [`in-*`](https://tailwindcss.com/docs/hover-focus-and-other-states#implicit-groups): 이제 `group` 클래스를 명시하지 않아도 그룹하듯이 스타일링 할 수 있다.
- [`:popover-open`](https://tailwindcss.com/docs/hover-focus-and-other-states#openclosed-state) 지원
- [`**` 선택자](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-all-descendants) 지원

## 마이그레이션 방법

[마이그레이션](https://tailwindcss.com/docs/upgrade-guide#using-the-upgrade-tool)은 엄청나게 쉽다.

```bash:title=Terminal
npx @tailwindcss/upgrade
```

이걸 프로젝트 루트에서 실행하면, 버전 업과 동시에 레기서 코드들을 자동으로 변경해준다.

새로운 브랜치에서 실행하는 걸 추천하고 있다.

주의할 점은, 프로젝트에서 Tailwind CSS에 종속된 라이브러리들이 모두 v4 버전을 지원하는지 확인 한 뒤, 마이그래이션을 해야한다.

## 총평

이번 업데이트는 그냥 미쳤다라는 말밖에 안나올 정도로 놀라운데, 압도적인 빌드 성능, CSS-first 방식 구성, 최신 CSS 표준 적극도입 등, 모두가 만족할 만한 기능들을 도입하면서 '이 구역의 미친 놈' 타이틀을 가져오려는 것 같다.

이제 대부분의 유저들은 모던 브라우저를 사용하고 있어, 이전보다 크로스 브라우징에 대한 제약이 덜해진 만큼, 최신 CSS 문법 도입을 더욱 적극적으로 도입할 수 있게 되었다. Tailwind CSS를 사용하면 최신 CSS 기술을 많이 활용할 수 있을 것으로 기대된다.

게다가, 이전에 Tailwind CSS를 사용하면서 아쉬웠던 점인 '없는 단위 사용', '제한된 선택자' 등에 대한 문제들이 이번 버전에서 모두 해결되면서 개발 편의성이 엄청나게 증가했다.

이제 더 이상 Tailwind CSS를 사용하지 않을 이유가 없다.

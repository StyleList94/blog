---
title: 테크(?) 블로그는 코드가 멋스러워야 한다. 
description: 구문 강조 맵시 나게 갈아엎기
date: '2025-06-27T08:00:00.000Z'
---

## 빠른 참고

[이'시키' 맘에드네](https://shiki.style)

## 간지가 없네

거의 일기장 처럼 쓰긴 하지만, 그래도 명색이 기술 관련된 내용들을 정리하고 있는데, 그 중에 핵심인 코드 블록 얘기다.

블로그를 처음 구축할 당시 가장 유명했던 `react-syntax-highlighter`를 적용 했었는데, 이녀석도 뭔가 세월의 풍파를 제대로 처맞았다.

너랑 나... 우리사이 뭐가 문제였을까??

### 다이어트가 필요한 것 같아

많이 무겁다... 일반적인 사용 방법을 적용하면 번들 크기가 어마어마하게 커진다.

다행히 트리 쉐이킹이 되어있고 경량화된 버전을 적용할 수 있지만, 이러면 사용하고싶은 언어 타입을 직접 등록해줘야한다.

다행히도 나는 잡식성이 아니라서, 등록할 수 있는 언어 개수가 작았기 때문에, 별 문제는 없었지만, 그래도 너.. 많이 무겁더라...

### 나도 많이 변했어

React 18 버전 부터는 서버 컴포넌트 기법이 도입되었다.

서버 컴포넌트는 제로 코크 같이 번들 사이즈가 제로이기 때문에, 클라이언트 상호작용이 없다면 무조건 사용해야한다.

그래서 번들 다이어트에 효과가 아주 좋아서, 얘를 강제로 다이어트 시켜줄 수 있다.

하지만 라이트/다크 테마를 적용한다면, 클라이언트 레벨에서 테마를 결정해야하기 때문에, 바로 요요가 와버린다...

뿐만 아니라, 컴포넌트가 완전히 마운트 되기 전에는 스타일도 바로 적용이 안된다!

지긋지긋하다 증말...

### 그리고 진짜 이런 말까진 안할려고 했는데

간지가 없다.

뽀대나지 않는다.

## 우연히 봄

요즘 `Next.js`를 비롯해서 많고 많은 기술 문서들을 보면 하나 같이 코드 블럭들이 비슷한데 세련되기까지 했다.

이것이 뭔지 AI에게 물어보니, 대뜸 '시키' 라고 욕 비스무리한걸 답이라고 내놓더라.

알고 봤더니, `shiki`라는 syntax highlighter 였다.

일본어로 식(式)을 뜻하는 거였다. ~~욕이 아니었구나~~

난 첫 눈에 바로 반해버렸다.

## 나니가스키

이걸 사용하는 것 그 자체로 내가 그 동안 겪었던 모든 문제가 해결되었다.

아주 채-신 기술 답게 [ESM만 지원](https://shiki.style/guide/#features)하고,

[라이트/다크 테마도 동시에 지정](https://shiki.style/guide/dual-themes)할 수 있고,

[서버 컴포넌트](https://shiki.style/packages/next#react-server-component)를 지원해서 완전 가볍고

[무엇보다 간지가 미쳤다!](https://shiki.style/themes)

## 첫 만남

첫 만남은 언제나 설렌다.

```bash:title=Terminal
pnpm add -D shiki
```

`devDependencies`에 포함되는 것이 특이한데, 생각해보면, 빌드 타임때만 사용하니깐 그런 것 같기도 하다.

그래, 너라면 `import/no-extraneous-dependencies` 규칙 따위, 꺼버릴 수 있어!

### 너를 위한 컴포넌트

[취향에 맞는 모양을 결정](https://shiki.style/themes)하고, `code-block.tsx`를 다음과 같이 생성한다.

```tsx:title=src/components/code-block.tsx
import { codeToHtml } from 'shiki';

import type { BundledLanguage } from 'shiki';
import type { ClassAttributes, HTMLAttributes } from 'react';
import type { ExtraProps } from 'react-markdown';

import { cn } from '@/lib/utils';

import '@/styles/code-block.css'; // 바로 밑에서 추가

// [!code focus:46]
// react-markdown에서 사용하는 대체 컴포넌트라서 props 타입을 이렇게 해줘야 한다.
type Props = ClassAttributes<HTMLElement> &
  HTMLAttributes<HTMLElement> &
  ExtraProps;

const CodeBlock = async (props: Props) => {
  const { children, className, node, ...rest } = props;
  
  const match = /language-(\w+)/.exec(className || '');

  // 언어를 발견 못했다면 그냥 모노 폰트에 배경을 적용한다. 라이브러리 같은 문구 강조하는 그거 맞다!
  if (!match) {
    return (
      <code
        {...rest}
        className={cn(
          className,
          'relative rounded',
          'px-[0.3rem] py-[0.2rem]',
          'bg-neutral-100 dark:bg-neutral-800',
          'font-mono text-sm text-neutral-900 dark:text-neutral-100',
        )}
      >
        {children}
      </code>
    );
  }

  // 서버 컴포넌트를 지원하는 아주 아름다운 모습이다.
  const out = await codeToHtml(String(children).replace(/\n$/, ''), {
    lang: match[1] as BundledLanguage,
    // 서버 레벨에서 듀얼 테마를 적용할 수 있다! 어머 이건 써야해!
    themes: {
      light: 'one-light',
      dark: 'github-dark',
    },
  });

  return (
    <div className={cn('overflow-x-auto')}>
      <div dangerouslySetInnerHTML={{ __html: out }} />
    </div>
  );
};

export default CodeBlock;
```

그리고 [각 테마에 대한 스타일을 적용](https://shiki.style/guide/dual-themes#class-based-dark-mode)하기 위해 CSS 코드를 추가해줘야한다.

```css:title=src/styles/code-block.css
html.dark .shiki,
html.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}
```

이렇게 적용하면 서버에서 라이트 다크테마에 대한 스타일을 모두 적용한 HTML이 생성된다.

그런데 제로 코크 마냥 제로 사이즈다?

사용하지 않을 수 없다.

## 깔롱지게 꾸미기

이렇게만 적용해도 봐줄 만 하지만, 더 깔롱지게 꾸밀 수 있다.

### 몇 번째 줄이니

이 '시키'는 다 좋은데, 줄 번호 표시를 직접 구현해줘야한다.

`bash` 같이 shell 코드 블록은 줄 번호를 표시하면 많이 어색하니깐,
조건에 맞는 언어만 클래스를 추가해서, 줄 번호를 조건적으로 표시해주면 좋을 것 같다!

`code-block.tsx`에 조건부 클래스를 적용하면

```tsx:title=src/components/code-block.tsx
// import 뭐시기.. 

// [!code focus:21]
const CodeBlock = async (props: Props) => {
  //..
  
  // ts, tsx, js, json, css 에 한해서 줄 번호 표시
  const showLineNumber = /ts(x)?|js(on)?|css/.test(match[1]); // [!code ++]

  return (
     // [!code --:3]
    <div className={cn('overflow-x-auto')}> 
      <div dangerouslySetInnerHTML={{ __html: out }} />
    </div>
    <div // [!code ++:8]
      className={cn(
        'code-block',
        showLineNumber && 'code-block__with-line-numbers',
        'overflow-x-auto',
      )}
      dangerouslySetInnerHTML={{ __html: out }}
    />
  );
};

// ..
```

이제 `::before` 가상클래스를 활용해서 번호를 붙여주면 된다!

```css:title=src/styles/code-block.css
/* 높이를 지정해주면 더 예쁘게 나온다 */ 
pre .line {
  padding: 0 1.25rem;
  height: calc(var(--text-sm) * var(--leading-normal));
}

.code-block__with-line-numbers {
  counter-reset: line;
}

.code-block__with-line-numbers .line {
  counter-increment: line;
  position: relative;
  padding: 0 1.25rem;
}

.code-block__with-line-numbers .line::before {
  display: inline-block;
  content: counter(line);
  width: 1.125rem;
  margin-right: 1.25rem;
  text-align: right;
  color: var(--color-neutral-700);
  opacity: 0.6;
  user-select: none;
}

/* 다크 테마 대응 */
.dark .code-block__with-line-numbers .line::before {
  color: var(--color-neutral-400);
}
```

100줄이 넘어가면 `::before` 클래스의 `width`를 적절히 늘려주면 된다.

근데 100줄이 넘어가면 가독성이 떨어지니깐, 그냥 코드를 적절하게 분할해서 읽기 좋게 하는 것이 좋겠다.

안 그래도 JSX 코드는 들여쓰기가 너무 많아서 가독성이 떨어진다...ㅜㅜ 

### 배경색 채우기

코드 블록에서 줄이 영역이 넘어갈 때, `overflow-x: auto;`를 통해 스크롤링할 수 있게했다.

하지만 우리 '시키'는 오버플로우된 영역 따위 신경쓰지 않는다.

실제로 영역이 넘친 경우, 배경색이 표시가 되지 않는데, 사용하는 테마의 배경색을 알아내서 직접 주입해주면 된다.

```tsx:title=src/components/code-block.tsx
// ..
<div 
  className={cn(
    'code-block',
    showLineNumber && 'code-block__with-line-numbers',
    'overflow-x-auto',
    'bg-[#FAFAFA] dark:bg-[#24292e]', // [!code ++]
  )}
  dangerouslySetInnerHTML={{ __html: out }}
/>
// ..
```

### 타이틀 넣기

이 '시키'를 사용하는 대부분의 기술 문서에서는 이것만 단독으로 사용하지 않고 있다.

대부분 프로젝트가 모듈명을 표기하고 있는데, 이걸 구현하면 더 직관적으로 코드의 역할을 보여줄 수 있을 것 같다.

먼저 마크다운에 language를 추출하는 역할을 하는 정규표현식을 다음과 같이 수정한다.

```tsx:title=src/components/code-block.tsx
// ..

const { children, className, node, ...rest } = props;

const match = /language-(\w+)/.exec(className || ''); // [!code --]
const languageRegExp = /language-(\w+)(:title=(.+))?/; // [!code ++]

// ..
```

`remark-gfm` 플러그인은 줄 안에서의 공백도 개행된 것으로 간주하기 때문에, 띄어쓰기 이후의 텍스트를 무시한다.

띄어쓰기 말고 타이틀을 구분할 묘수가 필요한데, 나는 `:`로 구분하기로 했다. 이렇게!

```text
```tsx:title=src/components/code-block.tsx```
```

이제 코드 언어와 타이틀을 함께 추출할 수 있게 됐다.

```tsx:title=src/components/code-block.tsx
// ..

const showLineNumberRegExp = /ts(x)?|js(on)?|css/; // [!code ++]
const showLineNumber = /ts(x)?|js(on)?|css/.test(match[1]); // [!code --]
const showLineNumber = showLineNumberRegExp.test(match[1]); // [!code ++]
// [!code focus:2]
const language = match[1] as BundledLanguage; // [!code ++]
const title = match[3]; // [!code ++]

// ..

return (
  // [!code --:10]
  <div
    className={cn(
      'code-block',
      showLineNumber && 'code-block__with-line-numbers',
      'overflow-x-auto',
      'bg-[#FAFAFA] dark:bg-[#24292e]',
    )}
    /* eslint-disable-next-line react/no-danger */
    dangerouslySetInnerHTML={{ __html: out }}
  />
  // [!code ++:31]
  <div
    className={cn(
      'flex flex-col rounded-lg',
      'bg-[#FAFAFA] dark:bg-[#24292e]',
    )}
  >
    // [!code focus:15]
    {title && (
      <>
        <div className={cn('flex items-center gap-2 px-5 py-3')}>
          <span
            className={cn(
              'overflow-hidden text-ellipsis break-normal whitespace-nowrap',
              'font-sans text-xs text-neutral-500 dark:text-neutral-400',
            )}
          >
            {title}
          </span>
        </div>
        <hr className="border-none h-px w-full bg-zinc-200/50 dark:bg-zinc-700/50" />
      </>
    )}
    <div
      className={cn(
        'code-block',
        showLineNumber && 'code-block__with-line-numbers',
        'overflow-x-auto',
      )}
      dangerouslySetInnerHTML={{ __html: out }}
    />
  </div>
);
```

## 특수효과 넣기

여기까지만 해도 충분히 멋지지만, 더 깔롱 부릴수있다.

이미 눈치 챘겠지만, 코드블럭에 `diff` 하이라이팅, 포커스 효과가 적용되어있다.

[이 '시키'](https://shiki.style/packages/transformers)랑 함께라면 이런 효과도 어렵지 않게 구현할 수 있다!

근데, 주의할 점은 문서에도 언급했듯이 스타일이 제공 되지 않는다! 

스타일링은 알아서 하라는 까칠한 모먼트를 보여준다. ~~그래도 괜찮아!~~

그... 그래, 알단 설치부터 하자

```bash:title=Terminal
pnpm add -D @shikijs/transformers
```

나는 효과를 4개 사용했다.


```tsx:title=src/components/code-block.tsx
// ..

import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
} from '@shikijs/transformers';

// ..

// [!code focus:14]
const out = await codeToHtml(String(children).replace(/\n$/, ''), {
  lang: match[1] as BundledLanguage,
  // 서버 레벨에서 듀얼 테마를 적용할 수 있다! 어머 이건 써야해!
  themes: {
    light: 'one-light',
    dark: 'github-dark',
  },
  // [!code ++:6]
  transformers: [
    transformerNotationDiff(), // 변경 사항 (+/-) 하이라이터 
    transformerNotationHighlight(), // 일반 하이라이터
    transformerNotationFocus(), // 포커스 효과 
    transformerNotationErrorLevel(), // 에러, 경고 하이라이터
  ],
});

return (

// ..
```

이제 코드 블록을 작성할 때, 지정한 서식을 입력하면, 그에 맞는 클래스가 추가된다.

### 변경 사항 하이라이팅

`// [!code ++]`, `// [!code --]` 를 코드에 입력하면
[변경 사항을 하이라이팅](https://shiki.style/packages/transformers#transformernotationdiff)을 적용하는 클래스를 포함시킨다.

라인에 적용할 때는 라인 끝에 코멘트 적듯이 작성하면 된다.

`// [!code ++:숫자]`를 단일 라인에 적용하면 바로 밑 라인 부터 숫자에 적힌 라인 수 만큼 전부 효과를 적용한다.

이건 밑에 나오는 효과도 마찬가지로 사용 가능하다.

라인마다 효과를 적용하는 고생을 하지 않아도 되는, 츤데레적 모먼트도 보여준다.

스타일링을 해야하는데, [`color-mix()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix)를 활용해서 배경색의 투명도를 결정하고,

`::after` 가상 클래스로 +/-를 표시해 봤다.

```css:title=src/styles/code-block.css
/* 라인 하이라이팅 */

pre code .diff.add {
  /* 스타일을 덮어 씌워줘야한다. */
  background-color: var(--color-emerald-100) !important;
}

.dark pre code .diff.add {
  background-color: color-mix(
    in oklab,
    var(--color-teal-800) 50%,
    transparent
  ) !important;
}

/* 단어 단위 하나 하나에도 배경색을 전부 덮어씌워야한다. */
.dark pre code .diff.add span {
  background-color: color-mix(in oklab, var(--color-teal-800)) !important;
}

pre code .diff.remove {
  background-color: var(--color-rose-100) !important;
}

.dark pre code .diff.remove {
  background-color: color-mix(
    in oklab,
    var(--color-pink-600) 20%,
    transparent
  ) !important;
}

.dark pre code .diff.remove span {
  background-color: color-mix(in oklab, var(--color-pink-600)) !important;
}

/* 기호 표시 */

pre code .diff::after {
  position: absolute;
  left: 0.25rem;
}

pre code .diff.add::after {
  content: '+';
  color: var(--color-emerald-400);
}

.dark pre code .diff.add::after {
  color: var(--color-teal-600);
}

pre code .diff.remove::after {
  content: '-';
  color: var(--color-rose-400);
}

.dark pre code .diff.remove::after {
  color: var(--color-pink-600);
}
```

그러면 이렇게 보여줄 수 있다!

```ts
console.log('치즈버거') // [!code --]
console.log('띠뜨버거!') // [!code ++]
```

### 하이라이팅

`// [!code highlight]`를 코드에 입력하면 [밋밋한(?) 하이라이팅](https://shiki.style/packages/transformers#transformernotationhighlight) 효과를 줄 수 있다.

마찬가지로 `// [!code highlight:숫자]` 사용도 가능하다.

스타일링은 약간 잿빛돌게 하면 된다.

```css:title=src/styles/code-block.css
pre code .highlighted {
  background-color: color-mix(
    in oklab,
    var(--color-gray-400) 10%,
    transparent
  ) !important;
  transition: background-color 0.5s;
}

.dark pre code .highlighted {
  background-color: color-mix(
    in oklab,
    var(--color-gray-500) 10%,
    transparent
  ) !important;
  transition: background-color 0.5s;
}

.dark pre code .highlighted span {
  background-color: color-mix(in oklab, var(--color-gray-500)) !important;
}
```

그러면 이렇게 원하는 부분을 하이라이트 처리할 수 있다!

```ts
console.log('이것봐 나를 한번 쳐다봐') // [!code highlight]
console.log('나 지금 이쁘다고 말해봐')
```

### 아직 끝나지 않았다

[에러와 경고에 대한 하이라이팅](https://shiki.style/packages/transformers#transformernotationerrorlevel) 효과도 줄 수 있다.

에러는 `// [!code highlight]`, 경고는 `// [!code highlight]`를 코드에 입력하면 된다.

스타일링은 위에꺼 그대로 복사해서,

1. `.highlighted` 클래스 뒤에 에러면 `.error`, 경고면 `.warning`을 이어 붙인 뒤
2. 색깔만 바꿔주면 된다.

### 집중해줘

`// [!code focus]`를 코드에 입력하면 해당 영역이 [포커싱 처리](https://shiki.style/packages/transformers#transformernotationhighlight)되는 효과를 줄 수 있다.


마찬가지로 `// [!code focus:숫자]` 사용도 가능하다.

블록 내부에 이걸 한번이라도 사용하면 이걸 사용하지 않는 라인은 전부 블러(포커싱하지 않은)처리를 해줘야한다.

으으.. 머리가 복잡해지지만, 선택자에 적절한 논리를 주면 어렵지 않게 해결할 수 있다.

```css:title=src/styles/code-block.css
/* 트랜지션 효과를 주면 더 자연스럽다이브 */
pre.has-focused code .line * {
  transition: opacity 0.2s;
}

/* 블록 전체가 hover되지 않았고, line 클래스 요소에 focused 클래스가 없다면 */
pre.has-focused:not(:hover) code .line:not(.focused) * {
  opacity: 0.3; /* 블러처리, 필터도 주고 다해봤는데 그냥 투명처리하는게 젤 낫더라 */
}
```

그러면 이렇게 포커스 효과를 줄 수 있다.

```ts
console.log('드립 고갈된건 안비밀')
console.log('올해 롯데 가을야구 제발') // [!code focus]
console.log('유광점퍼 입어보고 싶다')
```

개인적으로 이 효과가 가장 좋다. 가독성을 위해 많이 써먹을 수 있다!

## 마지막 섹션

이 '시키'! 직접 써보니깐 더 매력적이다!

아름답지만 때로는 까칠하다, 하지만 츤데레다.

너로 인해 내 기술 아닌 기술 블로그는 더욱 더 정감이 가게 되었다. _뭔가 더 예뻐졌어!_

어느 새 이 글의 마지막이다.

너도 가장 마지막으로 사용한 구문 하이라이터 였으면 좋겠다. _오래오래 함께하자._

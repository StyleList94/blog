---
title: 남은 건 이제 의지뿐...
description: 블로그 리바이벌 프로젝트 - 4장
date: '2024-10-20T05:30:00.000Z'
coverImage: /assets/images/cover.png
ogImage: /assets/images/cover.png
---

## 빠른 참고
- [next-themes 수화 문제 해결](https://github.com/pacocoursey/next-themes?tab=readme-ov-file#avoid-hydration-mismatch)
- [react-syntax-highlighter 빌드 경량화](https://github.com/react-syntax-highlighter/react-syntax-highlighter?tab=readme-ov-file#light-build)
- [작업 결과](https://github.com/StyleList94/blog/commit/924cd9603ec8d907e9c140c41d655f877e642c93)

<br />

## 때로는 단순한 것이 좋다

Markdown 내용을 `react-markdown` 패키지를 이용해서 문법에 맞는 컴포넌트로 변환하는 과정에서

그 컴포넌트들을 별도의 모듈로 구분하고 dot notation 기법으로 불러오고 있었다.

Props drilling 문제가 발생할 뿐만 아니라, 전달이 제대로 안되고 있었다는 것을 알았다.

[과감하게 걷어내고 그냥 해당 위치에 바로 선언한다.](https://github.com/StyleList94/blog/commit/924cd9603ec8d907e9c140c41d655f877e642c93#diff-6957be044fff6ee0ee66fbf68e6b99a76efce62850eb2e3983052c7c99b24c9d)

추가로 누락되었던 문법에 대한 스타일링도 지정해줬다.

본문간 여백도 적절히 조정해서, 개인적으로 좀 더 읽기 편하게 만들었다

## 코드 스타일링

웬만하면 클라이언트 컴포넌트를 사용하지 않고 싶었지만...

테마 상관없이 어두운 테마의 하이라이터 테마를 사용하다보니, 라이트모드에서 이질감이 들었다.

난 이것을 참지 못했다.

```tsx
const CodeElement = (
    props: ClassAttributes<HTMLElement> &
        HTMLAttributes<HTMLElement> &
        ExtraProps,
) => {
    // next-themes 에서는 useTheme()를 수화문제 없이 사용하려면 마운트 로직을 넣어야한다더라...
    // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#avoid-hydration-mismatch
    const mounted = useMounted();
    const { isDarkTheme } = useThemeControl();

    const { children, className, node, ...rest } = props;
    const match = /language-(\w+)/.exec(className || '');

    // TMI: 나는 코드 에디터도 One Dark 테마룰 사용하고 있다.
    const highlighterStyle = isDarkTheme ? oneDark : oneLight;

    // 이건 일반 코드(``) 표현
    if (!match) {
        return (
            <code
                {...rest}
                className={cn(
                    className,
                    'px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800',
                    'font-mono',
                )}
            >
                {children}
            </code>
        );
    }

    // 마운트 되기전에는 로딩중인 척 하자...
    return !mounted ? (
        <div className="animate-pulse w-full h-48 my-2 bg-neutral-100 dark:bg-gray-700/50 rounded-lg" />
    ) : (
        <SyntaxHighlighter
            PreTag="div"
            language={match[1]}
            style={highlighterStyle}
            showLineNumbers
        >
            {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
    );
};
```

## 막간 다이어트

`react-syntax-highlighter` 패키지는 [경량 모듈도 제공](https://github.com/react-syntax-highlighter/react-syntax-highlighter?tab=readme-ov-file#light-build)하고 있다는 것을 알아버렸다.

망설이지 말고 적용해준다

```tsx
// code-element.tsx

'use client';

// 1. 사용할 언어팩을 불러온다음
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';

// 2. PrismLight 컴포넌트로 교체하고
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';

// 3. registerLanguage() 메서드로 등록하면 된다
SyntaxHighlighter.registerLanguage('jsx', js);
SyntaxHighlighter.registerLanguage('jsx', ts);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('jsx', tsx);
SyntaxHighlighter.registerLanguage('jsx', bash);
```

나중에 다른 코드 하이라이터가 필요하면 여기서 확장하면 될 것 같다.

이렇게하면 페이지 사이즈도 확실하게 줄어드는 것을 확인했다!
```bash
# Next.js build Logs

# before
...
Route (app)                              Size     First Load JS
┌ ○ /                                    1.14 kB         104 kB
├ ○ /_not-found                          138 B          87.5 kB
├ ○ /apple-icon.png                      0 B                0 B
├ ○ /icon.png                            0 B                0 B
├ ○ /opengraph-image.png                 0 B                0 B
├ ● /post/[slug]                         244 kB          347 kB
...

# after
...
Route (app)                              Size     First Load JS
┌ ○ /                                    1.17 kB         104 kB
├ ○ /_not-found                          138 B          87.3 kB
├ ○ /apple-icon.png                      0 B                0 B
├ ○ /icon.png                            0 B                0 B
├ ○ /opengraph-image.png                 0 B                0 B
├ ● /post/[slug]                         24.9 kB         128 kB
...
```
##### `/post/[slug]` 페이지 사이즈가 거의 90% 줄었음을 확인할 수 있었다!

## 준비는 모두 끝난듯

본문 레이아웃도 어느정도 볼만 해 졌으니, 이제 한석봉 마냥 글만 잘쓰면 될 것 같다.

생각보다 내용이 짧은 것 같은데, 본문 레이아웃 구성하는게 생각보다 어렵지 않아서 그런 것 같다.

이제 초기 세팅은 다 한것 같다.

**적어도 주당 한번은 일기든 기술 회고든 뭐든 작성해야겠다.**

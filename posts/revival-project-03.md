---
title: 기초공사 마무리
description: 블로그 리바이벌 프로젝트 - 3장
date: '2024-10-11T15:11:00.000Z'
series: '블로그 리바이벌 프로젝트'
seriesOrder: 4
---

## 빠른 참고

- [Next.js 메타데이터 적용(App Router)](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Next.js 웹 아이콘 적용(App Router)](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons)
- [Next.js 오픈그래프 이미지 적용(App Router)](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [Next.js 사이트맵 적용(App Router)](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Next.js robots.txt 적용(App Router)](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- [Next.js robots.txt 적용(App Router)](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- [Next.js JSON-LD 적용(App Router)](https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld)

<br />

## 언젠가는 검색 당하겠지...

그래서 SEO 작업을 해야한다.

현 세대 `Next.js`에서는 이 작업이 오늘 저녁 메뉴 고르는거보다 쉽다.

### 사이트 정보

Root Layout에 `metadata` 라는 이름의 갹체를 [구성](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)하기만 하면 된다.

나는 이렇게 구성했다

```tsx:title=app/layout.tsx
// 이 객체는 따로 모듈로 선언했지만 편의상 여기에 표시
const metadataContext = {
    title: 'STYLISH.LOG',
    description: '첫경험 위주로 끄적여봅니다.',
    siteName: 'STYLISH.LOG',
    url: 'https://blog.stylelist94.dev',
    ogImage: 'https://blog.stylelist94.dev/og-image.png',
};

export const metadata: Metadata = {
    title: metadataContext.title,
    description: metadataContext.description,
    keywords: ['블로그', 'Blog', '기술 블로그', 'Tech Blog'],
    openGraph: {
        title: metadataContext.title,
        description: metadataContext.description,
        type: 'website',
        siteName: metadataContext.siteName,
        url: metadataContext.url,
    },
    twitter: {
        card: 'summary_large_image',
        title: metadataContext.title,
        description: metadataContext.description,
    },
};

```

`metadataContext`라는 객체를 생성해서 [동적 메타데이터](https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata) 생성 시 활용할 수 있도록 했다.

포스트마다 다른 메타데이터를 구현하기 위해, 다음과 같이 적용해봤다.

```tsx:title=app/post/[slug]/page.tsx
// 이 객체는 따로 모듈로 선언했지만 편의상 여기에 표시
const metadataContext = {
    title: 'STYLISH.LOG',
    // 밑에 생략
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post: Post = getPostBySlug(params.slug);

    const title = `${post.title} :: ${metadataContext.title}`;
    const { description } = post;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
    };
}
```

물론 여기에서 덮어쓰지 않은 값은 루트 레이아웃에서 정의된 값이 적용된다.

### 앱 아이콘

파일 이름만 형식에 맞춰서 `app/` 바로 하위에 [추가](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons)하면 된다.

- `favicon.ico`: 웹사이트 파비콘
- `apple-icon.png`: iOS에서 보여지는 웹페이지 아이콘 (180x180)
- `icon.png`: 고해상도 아이콘 (512x512)

아이콘 세트를 구성하려면 일단 `512px` 정방형 사이즈의 아이콘을 준비하고,

이걸 `icon.png`로 생성한 뒤 `app` 디렉토리에 추가한다.

그 다음, 이 파일을 두개 복제해서 각각 `256px`, `180px` 정방형 사이즈로 구성한다.

`256px` 크기는 `ico` 변환 목적으로 활용하는 데, 그냥 구글 검색 후 입맛에 맞는곳에서 바꾸면 된다.

`180px` 크기는 `apple-icon.png`로 이름을 변경한 뒤, `app` 디렉토리에 추가한다.

파일만 넣었을 뿐인데, 프레임워크가 알아서 메타태그로 구성해준다... 진짜 편하다.

### Open Graph 이미지

오픈 그래프 이미지 비율은 1.91:1 이어야 하고, 파일 크기가 8MB 이하여야 한다.

보통 1200x630 사이즈를 많이 활용하는 것 같다.

트위터 이미지도 비율은 똑같으니깐 그냥 같이 쓰는걸로 하자.

각각 `opengraph-image.png`, `twitter-image.png` 이름으로 `app` 디렉토리 밑에 [추가](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)해주면 된다.

### 사이트맵

와... [사이트맵을 모듈로 구성](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts)할 수 있다.

```ts:title=app/sitemap.ts
import type { MetadataRoute } from 'next';

export const runtime = 'edge';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://blog.stylelist94.dev',
      lastModified: new Date(),
      changeFrequency: 'weekly', // 에이, 그래도 주당 글 한개는 끄적이겠지...
      priority: 1,
    },
  ];
}
```

그리고 게시글 마다 사이트맵을 만들어야할 것 같아서 그냥 따라 해봤다.

```ts:title=app/post/sitemap.ts
import type { MetadataRoute } from 'next';

// Edge Runtime 환경에서는 파일시스템 모듈을 이용할 수 없다.
// 그래서 포스트 목록이 저장된 배열을 선언하는 방식으로 구성했다
// 그러면 Node.js로 하면 되지 왜 이렇게 까지 하냐고 할 수 있을 텐데.
// 맞다... 뒤에서 얘기할 Cloudflare Pages에 배포 '시도'를 했기 때문에 이렇게 했다.
export const runtime = 'edge';

// 사실 모듈로 분리되어 있다. 보기 편하라고...
const postList = [
    { slug: 'revival-project-prologue', date: '2024-09-27T14:25:00.000Z' },
    { slug: 'revival-project-01', date: '2024-10-01T14:25:00.000Z' },
    { slug: 'revival-project-02', date: '2024-10-05T15:40:00.000Z' },
];


export async function generateSitemaps() {
  return [{ id: 0 }];
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // 구글에서는 하나의 시이트맵 페이지에 최대 50,000개의 페이지를 넣을 수 있다고 한다.
  // 평생 글을 써도 5만개는 못쓸꺼 같은데...
  const start = id * 50000;
  const end = start + 50000;

  // 사실 프로미스가 아닌데 그냥 있어보일려고 이렇게 했다.
  return new Promise((resolve) => {
    resolve(
      postList.slice(start, end).map((post) => ({
        url: `https://blog.stylelist94.dev/post/${post.slug}`,
        lastModified: new Date(post.date),
      })),
    );
  });
}
```

그 결과로 사이트맵 주소가 2개 나온다.

- https://blog.stylelist94.dev/sitemap.xml
- https://blog.stylelist94.dev/post/sitemap/0.xml

이렇게 구성된 사이트맵은 Google Search Console에 등록하는 등으로 활용하면 될 것이다.

<br />

## 구조화된 데이터 뭐시기

각 포스트마다 리치 검색결과가 지원되기를 기대해보며 일단 [추가](https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld)해본다

```tsx:title=app/post/[slug]/page.tsx
export default async function PostContentPage({ params }: Props) {

  const jsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title, // 포스트 제목
    dateCreated: post.date, // 작성일
    description: post.description, // 포스트 부제 또는 설명
  };

  return (
    <section>
      <script
        type="application/ld+json"
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
```

<br />

## 검색 봇 모시기

[잘 부탁드립니다. 선생님](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)

<br />

## 페이지를 찾을 수 없습니다.

404 페이지가 구성이 안되있는건 톤앤메너를 철저하게 무시하는 행위이기 때문에 용납할 수 없다.

[이거](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) 보고 만들면 된다.. 요즘 `Next.js`에서는 진짜 쉽다.

<br />

## 에러 페이지

특히 이런 정적 페이지에서는 발생할 일이 거의 없긴한데... 그래도 구색 맞추느라 넣어보기로 한다.

[이거](https://nextjs.org/docs/app/api-reference/file-conventions/error) 보고 `app/error.tsx`만 만들어도 충분하다.

<br />

## 둥지 변경 시도

결론부터 얘기하면 안하기로 했다.

무제한 대역폭에 끌려 Cloudflare Pages 서비스로 배포를 변경하려고 했지만

Edge Runtime 환경으로만 사이트를 구성해야 하는 것이 치명적 단점으로 다가왔다.

말도 안되게 블로그가 유명해져서 vercel의 무료 사용량 한도를 초과한다거나,

포스트 마크다운 파일을 클라우드 스토리지에서 받아온다거나,

그때 다시 고민해보기로 했다.

사실 vercel을 사용하는게 진짜 너무 편하다. 딸깍 한번으로 배포되고 알아서 최적화 해주니깐...

<br />

## 바로 반성하기

저번 글에서 라이트/다크모드 변경 기능을 Footer에 추가했었는데

기세로 갈려고 이런저런 이유도 만들었지만...

결국 사용성을 위해서 Header에 배치하는 것으로 변경했다.

막상 바꾸려니깐 불편하더라...

<br />

## 다음에는

이거 너무 끌어도 안될 것 같아서 4부작으로 마무리 해야겠다.

본문의 가독성을 높일 수 있는 방법을 고민해보고 적용하는 내용으로 돌아오겠다.

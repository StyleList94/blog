---
title: 세련되게 Chrome 확장 프로그램 만들기
description: React로 Chrome Extensions 빌드하는 방법
date: '2025-06-18T12:19:00.000Z'
---

## 빠른 참고

[Hello World](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world),
[webpack 설치](https://webpack.js.org/guides/getting-started/#basic-setup),
[TypeScript 곁들이기](https://webpack.js.org/guides/typescript),
[메니페스트 정의](https://developer.chrome.com/docs/extensions/reference/manifest),
[API 정의](https://developer.chrome.com/docs/extensions/reference/api),

## 어느새 순수함은 잊혀졌다

만약 Chrome 확장 프로그램(Extensions)이 없었다면 어땠을까? 어휴... 상상도 하기 싫다.

그만큼 웹 개발에 있어 여러모로 부족한 2%를 각종 유틸리티의 확장 프로그램들이 채워주고 있다.

물론 사이트 이용에 있어 꼭 필요한 기능들을 제공하는 서드파티들도 있어서, 확장 프로그램은 Chrome과 뗄레야 뗄 수 잆는 사이라고 생각한다.

Chrome 확장 프로그램은 [가이드](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world)가 잘 되어 있는 편이라
누구나 쉽게~~사실 쉽진 않다~~ 확장 프로그램을 만들 수 있다.

하지만 공식 가이드는 순수 `HTML`, `CSS`, `JavaScript`로 개발하는 방법을 알려주기에, 우리 같은 전문 업자들이 이걸로 개발하기에는 답답할 수 밖에 없다.

그렇다. 순수함은 잊어버린지 오래다.

Chrome 확장 프로그램을 주특기인 `React`를 활용해서 개발하면 편하고 기능 확장 측면에서도 좋지 않을까?

많은 시행착오 끝에 나온 결과를 단계별로 정리해 보고자 한다.

## Extension 구성

Chrome Extensions은 보통 다음과 같이 구성된다

- UI(popup)
- Content scripts
- Service workers

### UI

UI는 확장 프로그램을 실행했을 때, 표시되는 팝업 형태의 인터페이스를 의미한다.

`HTML`, `CSS`로 개발 할 수 있지만, 이 부분을 `React`와 `tailwindcss`로 대체하고자 한다.

### Content scripts

사이트에서 별도로 수행할 스크립트를 작성할 수 있다.

이 기능을 사용하면 현재 로드된 사이트의 DOM을 제어할 수 있다.

`TypeScript`로 작성하고자 한다.

### Service workers

서비스 워커를 활용하면 브라우저 요소(탭, 히스토리 등)에 대한 이벤트를 핸들링 할 수 있다.

`TypeScript`로 작성하고자 한다.

### 프로젝트 구조

[extension 프로젝트 구조](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#structure)는 반드시 `manifest.json` 퍼일을 프로젝트 루트에 포함시켜야 한다.

나머지는 자유롭게 구성해도 된다.

나는 다음과 같이 구성했다

```text
src
┣━━ images
┃   ┣━━ icon-16.png
┃   ┣━━ icon-32.png
┃   ┣━━ icon-48.png
┃   ┗━━ icon-128.png
┣━━ popup
┃   ┣━━ App.tsx
┃   ┣━━ index.css
┃   ┣━━ index.html
┃   ┗━━ index.tsx
┣━━ scripts
┃   ┗━━ content.ts
┣━━ service-worker
┃   ┗━━ background.ts
┗━━ manifest.json
```

## 초기 세팅하기

먼저 주특기를 사용하기 위한 기초적인 세팅을 해줘야한다.

## 번들러

`React`를 선택한 이상 트랜스파일링을 위한 번들링은 필수불가결인데, 현재로써는, `webpack`이 구성하기에 가장 간편하다.

`vite`를 시도해봤는데, 컨텐츠 스크립트와 서비스 워커가 ES module로 번들링 되어 브라우저에서 스크립트 실행이 되지 않는 현상이 발생했다.

생각해보니깐 빌드가 빨라서 사용하는건데, 복잡한 설정까지 해가면서 ES build를 포기할 바에, 그냥 `webpack`으로 간단하게 번들링하는 것이 더 낫다고 판단했다.

먼저 Node Package를 구성하고

```bash:title=Terminal
mkdir lovely-extensions

cd lovely-extensions/

npm init -y
```

그 다음 `webpack`을 [설치](https://webpack.js.org/guides/getting-started/#basic-setup)해 준다.

```bash:title=Terminal
# PNPM이 대세(?)였으면 좋겠다
pnpm add -D webpack webpack-cli --save-dev
```

## TypeScript

[TypeScript 처리](https://webpack.js.org/guides/typescript)를 하기 위해 다음 패키지를 설치한다.

```bash:title=Terminal
# PNPM이 대세(?)였으면 좋겠다
pnpm add -D typescript ts-loader chrome-types
```

`chrome-types` 패키지는 chrome extension API에 대한 타입을 제공한다. 

`tsconfig.json`도 작성해준다

```json:title=tsconfig.json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "esnext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "moduleResolution": "node",
    "noImplicitAny": true,
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx", // JSX 처리
    "incremental": true,
    "types": ["chrome-types"]
  },
  "include": ["src"], // src 디렉토리 구조 채택
  "exclude": ["dist", "node_modules"]
}
```

### tailwindcss

스타일링을 하기위해 다음 패키지를 설치한다.

```bash:title=Terminal
pnpm add -D tailwindcss @tailwindcss/postcss postcss
```

PostCSS 설정을 위해 다음 모듈을 루트 디렉토리에 추가한다.

```js:title=postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```
CSS는 나중에 popup을 생성할 때 추가해준다.

### 기타 로더 및 플러그인

아래는 프로젝트에 필요한 각종 로더와 플러그인들이다!

- `babel-loader`: 프로덕션용 트랜스파일링 로더
- `css-loader`: CSS 로더
- `postcss-loader`: `tailwindcss` 처리를 위한 로더
- `@svgr/webpack`: svg 파일을 컴포넌트로 처리
- `html-webpack-plugin`: HTML 템플릿 생성(왠지 익숙하다...)
- `clean-webpack-plugin`: 빌드 하기전 기존 결과물 정리, 빌드 후 사용하지 않는 에셋 정리
- `copy-webpack-plugin`: 특정 파일/디렉토리를 그대로 복사(메니페스트, 에셋)
- `mini-css-extract-plugin`: CSS 파일을 별도로 추출하기 위해 사용
- `css-minimizer-webpack-plugin`: CSS 파일크기 최적화
- `terser-webpack-plugin`: 번들 결과 압축

단일 파일로 환경별 구성을 하기 위해 `webpack-merge` 패키지도 추가로 구성하면 좋다.

싹다 설치 해준다.
```bash:title=Terminal
pnpm add -D babel-loader css-loader postcss-loader @svgr/webpack \
html-webpack-plugin clean-webpack-plugin copy-webpack-plugin \
mini-css-extract-plugin css-minimizer-webpack-plugin terser-webpack-plugin \
webpack-merge
```

그리고.. 드디어 `webpack.confng.js`에 필요한 로더와 플러그인을 구성하면 된다.

```js:title=webpack.config.js
const path = require('node:path');

const { EnvironmentPlugin } = require('webpack');
const { mergeWithRules } = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const defaultConfig = {
  module: {
    // 추후 엔트리 추가 예정
    rules: [
      {
        test: /\.(ts|tsx)$/,
        // babel-loader는 빠르지만 타입 검사를 수행하지 않는다.
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/i,
        issuer: /\.tsx?$/,
        use: ['@svgr/webpack'],
        type: 'asset',
      },
    ],
  },
  resolve: { extensions: ['.*', '.ts', '.tsx', '.js'] },
  plugins: [
    new EnvironmentPlugin({}),
    new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: ['*.LICENSE.txt'] }),
    new CopyPlugin({
      patterns: [
        // 아래 두 파일은 확장프로그램의 필수 요소다!
        {
          from: path.resolve(__dirname, 'src/images'),
          to: path.resolve(__dirname, 'dist/images'),
        },
        {
          from: path.resolve(__dirname, 'src/manifest.json'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/popup/index.html'),
      minify: true,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
      cacheGroups: {
        external: {
          test: /[\\/]node_modules[\\/]/,
          name: 'external',
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.esbuildMinify,
        terserOptions: {},
      }),
      new CssMinimizerPlugin(),
    ],
  },
};

const mergeRules = mergeWithRules({
  module: {
    rules: {
      test: 'match', // 일치하면
      use: 'replace', // 교체
    },
  },
  plugins: 'append',
  optimization: {
    minimizer: 'append',
  },
});

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    return mergeRules(defaultConfig, {
      mode: 'development',
      // 이거 안해주면 보안상 이슈(eval)로 에러남
      devtool: 'cheap-module-source-map',
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            // ts-loader는 느리지만 타입 검사를 수행하니깐 개발 모드에서 사용하면 좋다.
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
      },
      // development 모드에서는 최적화가 발생하지 않기 때문에 용량을 늘려줘야 한다.
      performance: {
        hints: 'warning',
        maxAssetSize: 400000,
        maxEntrypointSize: 400000,
      },
    });
  }

  return mergeRules(defaultConfig, {
    mode: 'production',
  });
};
```

이제 빌드 스크립트를 지정해주면 된다.

```json:title=package.json
{
  "scripts": {
    "build": "webpack",
    "dev": "webpack --mode development --watch",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

## 매니페스트 정의

내가 만든 JS 번들 앱이 Chrome 확장 프로그램으로 인정 받으려면 반드시 번들 최상위 루트에 [정해진 규격](https://developer.chrome.com/docs/extensions/reference/manifest)의  `manifest.json`을 포함해야 한다.

메니페스트 파일을 다음과 같이 만들어 준다.

```json:title=src/manifest.json
{
  "manifest_version": 3,
  "name": "Stylish Extension",
  "description": "React based Chrome Extensions",
  "version": "0.1",

  "icons": {
    "16": "images/icon-16.png",
    "32": "images/icon-32.png",
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  },

  "action": {
    "default_popup": "index.html", // 번들할때는 루트에 포함됨
    "default_icon": {
      "16": "images/icon-16.png",
      "32": "images/icon-32.png",
      "48": "images/icon-48.png",
      "128": "images/icon-128.png"
    }
  }
}
```

### 에셋 정의

`src/images` 디렉토리에 `16px`,`32px`,`48px`,`128px` 정방형 사이즈의 아이콘을 준비하면 된다.

이렇게 정의한 메니페스트와 에셋들은 앞서 구성한 webpack 플러그인 설정에 의해 번들 결과의 최상위 루트로 복사된다.

## Popup UI 만들기

이제 `React`와 `tailwindcss`를 이용해서 확장 프로그램을 눌렀을 때 표시할 UI를 만들 수 있다!

팝업은 

먼저 클라이언트 사이드 렌더링을 위한 HTML 템플릿을 생성한다

```html:title=src/popup/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lovely Extension</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="app"></div>
  </body>
</html>
```

다음, `tailwindcss`를 로드하기 위해, 엔트리 CSS를 생성한다.

```css:title=src/popup/index.css
@import 'tailwindcss';

body {
  min-width: 320px;
}
```

> Popup UI의 최대 크기는 너비 800px, 높이 600px이다.

이제 컴포넌트를 만들 수 있다! 카운터 UI를 생성해본다(~~만만한게 카운터~~).

```tsx:title=src/popup/App.tsx
import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  const handleIncrease = async () => {
    const nextCount = count + 1;
    setCount(nextCount);
  };
  
  return (
    <div className="flex flex-col p-6">
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col items-center gap-3">
          <p className="text-xl">Lovely Extension</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <button
            className="flex justify-center items-center px-3 py-2 rounded-md bg-gray-600 text-white transition-colors hover:bg-gray-700"
            onClick={handleIncrease}
          >
            count: {count}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
```

마지막으로 JS 엔트리 포인트를 생성하고 HTML 템플릿에 연결하면 된다.

```tsx:title=src/popup/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('app')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### 사이트에서 스크립트 실행하기

Content scripts 기능을 활용하면 사이트의 DOM 제어와 같은 스크립트를 실행할 수 있다.

사이트에서 스크립트를 실행하기 위해서는 [매니페스트 파일에서 컨텐츠 스크립트 관련 설정](https://developer.chrome.com/docs/extensions/reference/manifest#register-a-content-script)을 해줘야 한다.

```json:title=src/manifest.json
{
  // ..
  "content_scripts": [
    {
      "js": ["scripts/content.js"],
      "matches": ["https://*/*", "http://*/*"]
    }
  ],
}
```

이제 스크립트 파일을 생성하면 된다. 아래 예시는 body의 배경색을 블랙으로 변경한다.

```ts:title=src/scripts/content.ts
const article = document.querySelector('body');

if (article) {
  article.style.backgroundColor = '#000';
} 
```

컨텐츠 스크립트는 빌드 이후에 `chrome://extensions`의 개발자 모드에서 Update를 눌러 갱신해야 반영된다.

## 브라우저 이벤트 활용하기

Service Worker 기능을 이용하면 브라우저 이벤트를 핸들링 할 수 있다.

먼저 매니패스트에 서비스 워커에서 사용하는 브라우저 기능에 대한 [권한](https://developer.chrome.com/docs/extensions/reference/permissions-list)을 부여해야 한다.

```json:title=src/manifest.json
{
  // ..
  // 서비스 워커 등록
  "background": {
    "service_worker": "background.js"
  }
  "host_permissions": ["https://*/*", "http://*/*"],
  "permissions": ["scripting"],
}
```

이제 서비스 워커를 생성할 수 있다. 아래 예시는 확장 프로그램이 설치되었을 때, Popup UI를 열어주는 기능을 수행한다.
```ts:title=src/service-worker/background.ts
chrome.runtime.onInstalled.addListener(async () => {
  await chrome.action.openPopup();
});
```

## 어셈블

앞서 만든 Popup UI, Content script, Service Worker를 번들링한다.

```js:title=webpack.config.js
const defaultConfig = {
  // 엔트리 등록
  entry: {
    main: './src/popup/index.tsx',
    content: './src/scripts/content.ts',
    background: './src/service-worker/background.ts',
  },
  output: {
    filename: (pathData) => {
      switch (pathData.chunk.name) {
        case 'content':
          return 'scripts/[name].js'; // 메니페스트에서 정의한 Content Script 이름을 그대로 설정
        case 'background':
          return '[name].js'; // 메니페스트에서 정의한 Service Worker 이름을 그대로 설정
        default:
          return '[name].[fullhash].js';
      }
    },
    publicPath: 'auto',
    path: path.resolve(__dirname, 'dist'),
  },
  // ..
}
```

## 확장 프로그램 로드하기

빌드를 수행하면 `dist/` 디렉토리에 번들 결과가 생성된다.

```bash:title=Terminal
pnpm run build
```

이렇게 생성된 번들을 `chrome://extensions`에 접속한 뒤, 우측 상단에 Developer mode를 활성화 하고,
좌측에 Load unpacked를 눌러 생성된 번들 디렉터리를 선택하면 생성된 확장 프로그램을 불러올 수 있다.

Popup UI는 dev(watch) 모드에서 확장 프로그램을 다시 실행해서 빠르게 확인할 수 있지만,
스크립트 관련 액션은 빌드 이후, Update 버튼을 눌러야 변경사항이 적용된다.

## 정리

확장 프로그램을 잘 활용하면 개발에 필요한 강력한 유틸리티들을 많이 만들 수 있다.

React로 확장 프로그램을 만들 수 있게 되었으니, 더이상 HTML과 CSS가 손이 많이가서 만들기 어렵다는 핑계는 통하지 않는다.

쓸데 없는 것들 많이 만들어 보자!

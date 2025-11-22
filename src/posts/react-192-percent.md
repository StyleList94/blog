---
title: 어디까지 반응할까?
description: React 192% 활용하기
date: '2025-11-15T15:00:00.000Z'
---

## 빠른 참고

[`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore),
[`useId`](https://react.dev/reference/react/useId),
[`useDeferredValue`](https://react.dev/reference/react/useDeferredValue),
[`useTransition`](https://react.dev/reference/react/useTransition),
[`startTransition`](https://react.dev/reference/react/startTransition),
[`useActionState`](https://react.dev/reference/react/useActionState),
[`useOptimistic`](https://react.dev/reference/react/useOptimistic),
[`useEffectEvent`](https://react.dev/reference/react/useEffectEvent),
[`use`](https://react.dev/reference/react/use)

## 어떻게 사랑하지 않을 수 있어

나의 첫 React 버전은 찾아보니깐 16.13 이었다.

함수형 컴포넌트의 태동기부터 서버 컴포넌트까지, React는 지금도 진화하고 있다.

하지만 아쉽게도 우리는 5대 Hook에서 쉽게 벗어나지 못하고 있다.

> useState, useEffect, useMemo, useCallback, useRef. 내가 생각하는 5대 명검이다!

React 19.2 릴리즈 기념으로 생각보다 활용하면 UI, UX, DX 모두 챙길 수 있는 유용한 기능들을 정리해봤다.

## useSyncExternalStore

`v18`부터 사용가능

추천: ⭐️⭐️⭐️⭐️⭐️

[공식 문서](https://react.dev/reference/react/useSyncExternalStore)

> 외부 저장소의 값을 useState 처럼 사용하고 싶을 때 추천!

이름 그대로 외부 스토어의 상태를 동기화 할 수 있는 Hook이다.

Web Storage의 상태변화를 컴포넌트에서 감지해서 리렌더링할 때 아주 유용하다.

유명한 상태 관리 라이브러리들은 죄다 이거 활용하고 있다고 보면 된다.

아래 예시는 `localStorage`의 특정 key에 대한 상태를 구독하는 커스텀 Hook 예시다.

```ts:title=use-local-storage.ts
import { useCallback, useSyncExternalStore } from 'react';

// 로컬 스토리지에 대한 스토어를 생성하는 함수
// [!code focus:1]
function createLocalStorageStore<T>(key: string, initial: T) {
  let data: T = read();

  const listeners = new Set<() => void>();

  // 로컬 스토리지에서 값을 읽어오는 함수
  function read(): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  }

  // 로컬 스토리지에 값을 쓰는 함수
  function write(value: T) {
    data = value;
    localStorage.setItem(key, JSON.stringify(value));
    listeners.forEach(l => l());
  }

  // 이런 이벤트 핸들러를 구현하면 다른 탭에서의 변경사항을 감지 할 수도 있다.
  window.addEventListener('storage', e => {
    if (e.key !== key) return;

    if (e.newValue == null) {
      data = initial;
    } else {
      try {
        data = JSON.parse(e.newValue);
      } catch {
        data = initial;
      }
    }
    listeners.forEach(l => l());
  });

  // [!code focus:11]
  return {
    getSnapshot: () => data,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    setValue: (next: T | ((prev: T) => T)) => {
      const newValue = next instanceof Function ? next(data) : next;
      write(newValue);
    },
  };
}

// key에 대한 스토어 캐시
const stores = new Map<string, any>();

export function useLocalStorage<T>(key: string, initial: T) {
  if (!stores.has(key)) {
    stores.set(key, createLocalStorageStore(key, initial));
  }
  const store = stores.get(key) as ReturnType<typeof createLocalStorageStore<T>>;

  const value = useSyncExternalStore(store.subscribe, store.getSnapshot); // [!code focus]

  const setValue = useCallback(
    (v: T | ((prev: T) => T)) => store.setValue(v),
    [store],
  );

  return [value, setValue] as const;
}
```

Web Storage 뿐만 아니라 외부 저장소에 대한 상태를 공유받고 싶다면 이 Hook을 강력 추천한다!

## useId

`v18`부터 사용가능

추천: ⭐️⭐️⭐️⭐️⭐️

[공식 문서](https://react.dev/reference/react/useId)

> 이제 id 애트리뷰트에 값을 넣을 수 있는 방법이 생겼다!

v18 이전에는 컴포넌트에 ID를 부여하는건 쉽지 않은 일이었다.

서버사이드에서 생성한 랜덤 값이 클라이언트에서 생성된 랜덤 값과 달라지는 하이드레이션 불일치 문제 뿐만 아니라,

재사용 가능하다는 컴포넌트의 개념은, DOM에서 유일해야만 하는 ID값을 지정할 수 없는 이유 중 하나였다.

그렇다고 접근성 관련 요구사항 때문에 ID값을 아예 사용하지 않을 수는 없었는데,

React v18부터 다행히 `useId`라는 고유한 ID 값을 생성하는 Hook을 제공한다.

`useId`를 사용하면 하이드레이션 이슈 없이 고유한 ID를 생성할 수 있고,

이렇게 생성된 ID는 접근성 요소에 고유한 ID를 부여할 수 있는 가장 좋은 방법이 되어버렸다.

```tsx:title=custom-input.tsx
import { useId } from 'react';

export default function CustomInput() {

  const id = useId();

  return (
    <>
      <label htmlFor={id}>Name</label>
      <input id={id} type="text" />
    </>
  );
};
```

주의할 점은, 이렇게 생성한 ID를 컴포넌트의 `key` prop으로 사용하면 안된다!

`useId`로 생성한 ID는 렌더 순서가 변하면 바뀌는 값이기 때문에 의외로 불변성을 보장하지 않는다.

## useDeferredValue

`v18`부터 사용가능

추천: ⭐️⭐️⭐️⭐️

[공식 문서](https://react.dev/reference/react/useDeferredValue)

> 입력 폼의 UX를 간단한 방법으로 좋게 하고 싶을 때!

급한 UI는 즉시, 무거운 렌더링은 뒤로 미룰 수 있는 Hook이다.

`useDeferredValue`에 주입된 상태 값이 업데이트 될 때, 낮은 우선순위로 백그라운드에서 렌더링을 시도한다.

이렇게 업데이트가 지연된 값은 `Suspense`에서 fallback UI대신 업데이트 이전의 값을 계속 보여줄 수 있게 해준다.

주로 입력 필드의 값을 지연 시키는 용도로 많이 사용하고, 입력 값에 의해 렌더링 되어야하는 결과가 무거울 때, 그 진가를 발휘한다.

하지만 결과 렌더링에 대해 메모이제이션이 되어야 의미가 있다. 그렇지 않으면 어쨋든 다시 렌더링 되어야 하므로(상태 값이 업데이트 되었으니깐) 지연 시키는 의미가 없다.

```tsx:title=deferred-list.tsx
import { memo, useState, useDeferredValue } from 'react';

export default function DeferredList() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query); // [!code focus]

  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* [!code focus] */}
      <SlowList text={deferredQuery} />
    </>
  );
}

const range = (n: number) => [...Array(n).keys()];

// [!code focus:10]
// 이걸 렌더링하려면 250ms 정도의 시간이 필요한 아주 비싼 컴포넌트다.
const SlowList = memo(function SlowList({ text }: { text: string }) {
  return (
    <ul className="items">
      {range(250).map((i) => (
        <SlowItem key={i} text={text} />
      ))}
    </ul>
  );
});

function SlowItem({ text }: { text: string }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // 아무것도 안함, 단지 1ms 지연시키기 위한 블로킹 코드
  }

  return <li className="item">Text: {text}</li>;
}
```

여기서 `SlowList` 컴포넌트에 `memo` 래퍼를 제거한 뒤, 다시 렌더링해 보면 입력 값이 엄청 느려지는 것처럼 느껴질 것이다!

이런 상황에서는, 메모이제이션을 안하면 값이 지연되는 것과 상관없이 무조건 렌더링 되기 때문에, 아무 효과가 없다.

## useTransition

`v18`부터 사용가능

추천: ⭐️⭐️⭐️⭐️

[공식 문서](https://react.dev/reference/react/useTransition)

> 비싼 렌더링을 백그라운드에서 처리하고 싶을 때

UI의 일부를 백그라운드에서 렌더링할 수 있는 Hook이다.

[`startTransition()`](https://react.dev/reference/react/startTransition)에 `isPending` 상태가 추가되어 제공된다.

액션결과에 따른 랜더링 비용이 비싸서, 다른 렌더링에 영향을 줄 때, `startTransition()`으로 감싸면 된다.

메모이제이션 적용하는 것처럼 문제가 생기면 그때 적용하면 된다. 예방 차원의 적용은 오히려 성능을 저하시킬 수도 있다.

트랜지션 관련해서는 심층적으로 다루고 싶어서, 따로 정리할 예정

## useActionState

`v19`부터 사용가능

추천: ⭐️⭐️⭐️⭐️

[공식 문서](https://react.dev/reference/react/useActionState)

> form 액션 처리를 깔끔하게 하고 싶을 때

form 제출이나 액션 기반 상태 업데이트를 할 때,

기존의 `useState` + `useEffect` + 로딩/에러 상태 관리 조합이 너무 복잡하다고 느껴졌다면,

이 Hook을 사용하면 된다. 코드량을 획기적으로 줄일 수 있다.

특히 서버 액션과의 궁합도 좋아서 Next.js에서 사용하면 좋다!

아래는 Astro 프레임워크에서 form 액션에 대한 처리 예시이다

```tsx:title=icon-converter.tsx
import { actions, type SafeResult } from 'astro:actions';
import { withState } from '@astrojs/react/actions';
import { useActionState, useId, useEffect } from 'react';

const initialConvertState: SafeResult<FormData, { iconData: string }> = {
  data: { iconData: '' },
  error: undefined,
};

export default function IconConverter() {
  const inputIconId = useId();
  // [!code focus:5]
  const [state, formAction, isPending] = useActionState(
    // convertToICO는 Astro Actions 기법으로 구현한 백앤드 로직이다.
    withState(actions.convertToICO),
    initialConvertState,
  );

  // 액션이 완료되었을 때, 변환된 아이콘 다운로드
  useEffect(() => {
    if (state.data?.iconData) {
      const link = document.createElement('a');
      link.href = `data:image/x-icon;base64,${state.data.iconData}`;
      link.download = 'favicon.ico';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [state.data?.iconData]);

  return (
    <form action={formAction}>
      <label htmlFor={inputIconId}>
        <p>아이콘 이미지</p>
        <input type="file" name="icon" id={inputIconId} />
      </label>

      <button type="submit" disabled={isPending}>
        ICO 내놔!
      </button>
    </form>
  );
}
```

[`withState`](https://docs.astro.build/en/guides/integrations-guide/react/#withstate)와 궁합이 좋은 편이다!

## useOptimistic

`v19`부터 사용가능

추천: ⭐️⭐️

[공식 문서](https://react.dev/reference/react/useOptimistic)

> 서버 액션 수행 시 낙관적 업데이트를 제공하고 싶을 때

React 19의 주요 변경점 중에 하나인 서버 액션에 대한 UX 향상을 제공할 수 있는 Hook이다

UI가 지금 당장 바뀐 것처럼 보이게 하고 싶을 때, 사용하면 된다.

`startTransition`과도 궁합이 좋다.

그래서 이 Hook은 서버 액션이나 startTransition 내부에 수행되는 액션에 대해서만 사용을 권장하고 있다.

공식 문서에 예제가 굉장히 이해가 쉽도록 작성되었기 때문에 그걸 참고하면 된다.

생각보다 최근에 나왔고, 특수한 경우에 사용이 권장되기 때문에, 그렇게 많이 사용되는 상황은 없는 편이다.

## useEffectEvent

`v19.2`부터 사용가능

추천: ⭐️⭐️⭐️

[공식 문서](https://react.dev/reference/react/useEffectEvent)

> 항상 최신의 상태 값을 참조하고 싶지만, effect의 의존성으로는 관리하고 싶지 않을 때

공식 문서에는 비반응형 로직을 분리해서 _Effect Event_ 라는 재사용 가능한 함수로 만들 수 있다고 설명하는데,

그냥 `useEffect` 내부에서 참조되어야하는 값이지만 이 값의 업데이트로 인해 이팩트가 실행되는건 막고 싶을 때, 이 기법을 사용하면 된다.

`useEffect` 내부에서 참조된 값들은 의존성 배열에 포함되어야 하는 규칙이 있다(린트 검사 항목에도 있음)

가끔가다 그렇지 않아야 하는 상황도 충분히 있을 수 있다. 그럴 때마다 저 린트 검사를 비활성화 했어야 했는데 이젠 그럴필요가 없다.

아래 컴포넌트는 `roomId` 값이 변경될 때마다 연결 기능을 이펙트로 실행하는 예시 패턴이다. 연결 기능과 상관없는 `theme` 상태 값도 같이 받고 있다.

```tsx
function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      showNotification('Connected!', theme); // [!code focus]
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, theme]); // [!code focus]

  return <h1>Welcome to the {roomId} room!</h1>;
}
```

위 컴포넌트는 `theme`이 변경될 때마다 연결되었다는 알림을 보내고 있고, 이는 사용자 경험 상 문제가 될 수 있는 패턴이다.(다크모드로 테마를 바꿨는데, 연결되었다는 알림이 발생하는 건 많이 이상하다...)

하지만 다음과 같이 Effect Event로 분리하면 `theme`변경으로 인한 effect 실행을 막을 수 있고, 의존성 배열에 없더라도 항상 최신의 값을 참조할 수 있다!

```tsx
import { useEffectEvent, useEffect } from 'react';

function ChatRoom({ roomId, theme }) {
  // [!code focus:3]
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected(); // [!code focus]
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  // ...
}
```

## use

`v19`부터 사용가능

추천: ⭐️⭐️

[공식 문서](https://react.dev/reference/react/use)

> 놀랍게도 이건 Hook이 아닙니다!

Promise나 context를 가져올 수 있는 새로운 방법이다.

놀랍게도 Hook이 아니라서 반복문, 조건문 안에서도 사용가능하고 심지어 서버 컴포넌트에서도 사용할 수 있다.

다만 반드시 컴포넌트 내부에서만 호출할 수 있다!

```tsx
import { use } from 'react';

function MessageComponent({ messagePromise }) {
  const message = use(messagePromise); // 프로미스
  const theme = use(ThemeContext); // context
  // ...
}
```

인수로는 Promise나 context를 받을 수 있는데, 프로미스의 경우, 반환된 값을 렌더링에 사용하려면 Suspense 처리가 필요하다!

서버 컴포넌트에서 꽤나 유용한데, 프로미스를 `use`로 감싸서 fallback UI와 같이 유연하게 처리할 수 있고,

**무엇보다 context의 값을 서버 컴포넌트에서 읽을 수 있다**

물론 제약은 있다, context에서 반환되는 값이 상태로 관리되지 않는 값이어야 하고 클라이언트의 값을 참조할 수는 없다.

이러한 이유로 `useContext`를 use로 완전 대체할 수는 없다! 클라이언트 상태에 대한 업데이트가 추적되지 않기 때문이다.

프로미스와 컨텍스트를 읽어오는 것의 차이를 정리해봤다.

| 구분                     | `use(promise)`                                       | `use(context)`                                                         |
| ------------------------ | ---------------------------------------------------- | ---------------------------------------------------------------------- |
| 기대하는 값의 특성       | Promise(비동기 리소스)                               | Context의 value (동기 값 또는 Promise)                                 |
| Suspense 동작            | **항상 Suspense 필요** (pending 시 fallback)         | value가 **Promise일 때만** Suspense 동작함                             |
| ErrorBoundary 동작       | Promise reject → ErrorBoundary로 전달                | value가 **Promise이고 reject**될 때만 ErrorBoundary 동작               |
| 내부 처리                | 인자로 전달된 Promise를 **리소스처럼 처리**          | Context value가 Promise라면 **그 Promise를 사용해 리소스 처리**        |
| 일반 컨텍스트 value 읽기 | 해당 없음                                            | 즉시 값 반환, Suspense 없음                                            |
| Promise 컨텍스트 처리    | 가능                                                 | **가능** (value가 Promise라면 `use(promise)`와 동일하게 작동)          |
| 사용 목적                | fetch 결과, Server Action 결과 등 비동기 리소스 읽기 | 전역 설정(theme, locale) + 필요 시 Promise 리소스 전달                 |
| 주의사항                 | Promise는 반드시 “한 번 생성된 안정된 리소스”여야 함 | Context value가 **매 렌더마다 새 Promise면** 무한 Suspense 가능성 있음 |

서버 컴포넌트를 사용하지 않는 환경이라면 그렇게 많이 사용되지는 않는다. 그래서 별 두개!

## 사랑받는 이유를 알게 되었다

상태가 최소한으로 관리돠거나 부수효과가 없을수록 가장 이상적인 컴포넌트라고 하지만, 그런 컴포넌트만 만들 순 없는 것이 현실이다.

React의 렌더링 효율을 최대한으로 끌어올리거나, 외부 상태를 React 상태랑 조화롭게 구현하는 것이 중요한데,

버전 18부터 Virtual DOM의 한계를 다양한 방법을 제공함으로써 극복하려는 의지가 돋보여서, 이것이 React가 계속 사랑받는 이유가 아닐까 싶었다.

계속... 사랑받을 수 있겠지...?

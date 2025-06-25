---
title: 상태 관리계의 떠오르는 샛별, Zustand 첫 경험
description: Next.js에 Zustand를 화끈하게 세팅하기
date: '2025-05-27T10:19:00.000Z'
lastModified: '2025-06-14T12:48:00.000Z'
---

## 빠른 참고

[Next.js에 Zustand 세팅하기](https://zustand.docs.pmnd.rs/guides/nextjs)

## 패션 만큼이나 유행에 민감하네

React 에서의 상태 관리 얘기다.

Context API 부터 시작해서 지금 Zustand 까지 왔다.

수 많은 프로젝트를 시도하면서 흥미 있었던 점은 여러 상태 관리 기법을 도입해 봤다는 것이다.

세팅이 조금 복잡(?)한 Redux에 대항하기 위해 상태 관리 라이브러리가 많이 나왔다고 생각한다.

지금까지 써봤던 상태 관리 기법에 대한 몇줄 평으로 시작해본다.

### Context API

React와 처음 만나면 자연스럽게 알게 되는 패턴이다.

내가 처음 React를 알게 되었을 떄는, SPA(Single Page Application, ~~에잇세컨즈 같은거 아님~~)가 대세였기 때문에,

클라이언트 단위만 챙기면 되는 아주 편한 시대였다.

React에 기본적으로 내장되어있는 기능이기 때문에, 접근이 쉽고 구현방법이 생각 외로 간단한다(Redux를 알기 전 까진 그랬다).

프로젝트 규모가 커질 수록 관리하기 힘들어지며, 이럴 때 메모이제이션을 적절하게 해주지 않으면 성능도 안좋아진다.

지금은 클라이언트 컴포넌트의 특정 UI 그룹에서 간단한 상태 공유를 하고싶을 때 사용하고 있다.

### Redux

React를 책으로 배웠다? 그러면 상태 관리 관련 챕터에 무조건 등장했다고 보면 된다.

그 만큼, 상태 관리계에선 두 말하면 입이 아플정도로 유명하다.

설계하는 방식이 정해진 게 없어서, 많은 패턴들이 있었는데, 모듈 개수가 늘어나는게 싫었던 나는,

상태, 액션, 리듀서가 하나에 다 들어가있는 Ducks 패턴이 좋았다.

하지만 이걸 사용하려면 상태, 액션 리듀서 모두 정의해줘야하고, 비동기 액션을 만들려면 미들웨어도 연결해야하고, 생각외로 완전 복잡하다.

요 근래들어 Redux Toolkit 등장으로 쬐끔 편리해지긴 했지만... 그래도, 모듈 개수는 줄지 않았다.

아주 오랫동안 사용한 손 많이가는 우리 Redux. 이제 떠나 보낼 때가 됐다.

### Recoil

손 많이가는 Redux에 질려버렸던 걸까? 생각보다 많은 사람들이 간단하게 상태 관리를 하고 싶어했나보다.

수 많은 라이브러리가 나왔고, Recoil도 그 중 하나 였는데 이건 React를 창조하신 곳에서 만들어서 약간 더 주목받았다.

단일 Provider와, Jotai같이 atom 이라는 패턴으로 상태를 구성하고 `useState` 사용하듯이 상태를 바꿀 수 있다.

세팅과 사용이 정말 간편해서 급부상 할 줄 알았으나, 복잡한 상태를 관리하긴 힘들었고, React 패러다임이 또 바뀌면서 자연스럽게 잊혀졌다.

오랜만에 생각나서 찾아봤는데, 이거 연초에 완전 개발 중단됐다...

### Zustand

그 뒤로 _아.. 역시 Redux 만한게 없지!_ 하면서, 지낸 와중에, 미친놈이 등장했다.

이 미친놈은 상태 액션 리듀서 다 필요없고, 초기 스토어를 만들 때, 상태와 상태를 업데이트할 함수만 넣어주면 된다.

근데 Provider도 필요 없다, 게다가 초경량 라이브러리다. 미들웨어도 지원한다. 안 쓸 이유가 없다.

이렇게 마법같이 동작하는 원리에 대해서는 다음에 깊게 탐구해보기로 하고(전역 변수 기반으로 동작), 빨리 적용해보자.

## 우리 제법 안어울려요

이렇게 완벽한 Zustand도 Next.js와 궁합이 그렇게 좋은 편은 아니다. 물론 일반적으로 세팅 해서 사용하는 것 자체는 문제가 없다.

하지만 Zustand의 동작 원리 특성 상, 특정 상황에서 Next.js 아키텍처에 위배될 수 있다.

[공식 문서](https://zustand.docs.pmnd.rs/guides/nextjs)에 따르면 Next.js에서 Zustand 사용 시,
`Context`를 사용하면 다음과 같은 문제를 해결할 수 있다고 한다.

- Next.js 서버는 여러 요청을 동시에 처리할 수 있으니깐 스토어는 요청별로 생성되어야 하며 요청 간 공유되어서는 안된다.
- 서버 레벨에서 저장소를 초기화하고, 클라이언트에서 다시 저장소를 초기화 해서, SSR 렌더링으로 인해 하이드레이션 이슈를 해결해야함.
- SPA 라우팅에 대응하기 위해, 스토어가 재설정 될 때, `Context`를 시용해서 컴포넌트 레벨에서 초기화 되어야 한다.
- App Route 아키텍처를 사용하는 경우에는 공격적인 서버 캐싱을 지원하는데, 스토어는 모듈 상태이므로 이 캐싱과 완벽하게 호환된다.

Zustand를 적절하게 사용하려면 다음 권장사항을 준수해야한다고 한다.

- **전역 스토어 사용 금지**: 스토어는 여러 요청에서 공유되면 안된다. 그렇기 때문에 요청마다 스토어를 생성해야한다.
- **서버 컴포넌트에서는 스토어에 접근할 수 없다**: RSC는 상태를 유지하도록 설계되지 않았기 때문에, 스토어에 접근하는 건 Next.js 아키텍쳐를 위배하는 행위다.

결국 정리하면 Next.js에서 제대로 사용하려면, 요청할 때, 스토어를 생성할 수 있도록, 스토어 팩토리 함수를 작성하는 패턴으로 스토어를 만들고,
이를 단일 Provider의 값으로 전파하면 된다.

스토어별로 Provider를 만들 필요가 없는 데, 이유는 스토어에 저장 된 상태가 갱산될 때, Provider의 자식 컴포넌트가 모두 리렌더링 되는 것이 아니라,
늘 그렇듯이 구독하고 있는 부분만 리렌더링 된다. 밑에서 구현하겠지만, Provider엔 `useRef`에 저장된 스토어가 주입된다. 

실제로도 될 수 있으면 하지마라고 한다.

## 그래서 하고 싶은 건?

**Next.js의 아키텍처를 존중하면서 Zustand를 사용하는데, Redux의 리듀서 방식을 같이 활용해보고 싶었다.** 

Zustand에 Redux Devtools을 통해 디버깅을 시도해 본 적이 있다면, Redux와 다르게 하나의 앱인데도 불구하고, 스토어별로 구분되서 출력된다.

스토어끼리 상태를 공유할 수 있을 수도 있기 때문에, 디버깅할 때 상태확인에 있어 조금 번거로울 수 있다.

나는 소속감이 있는 걸 많이 좋아하기 때문에, Redux처럼 하나의 항목에서 모든 스토어의 값을 확인 하고 싶다.

그리고, Redux가 많이 그립기도 하다.

## 스토어 구축하기

스토어 안에 여러 스토어를 주입하는 패턴으로 만들려면 [슬라이스 패턴](https://zustand.docs.pmnd.rs/guides/slices-pattern)을 활용해야한다.
(왠지 익숙하다)

즉, 하나의 최상위 스토어 안에, 기능적으로 구분된 스토어를 여러개 주입하는 방식으로 만들 수 있는 데, 이렇게 하면 디버깅할 때, 조금 편하고,
정리된 느낌까지 들어 편하다.

```ts:title=src/store/counter.ts
// 역시 카운터 만한게 없다!
import { type StateCreator } from 'zustand';

import { type RootStore } from '@/store/index';

// [!code focus:30]
// 상태에 대한 타입
export type CounterState = {
  count: number;
};

// 액션에 대한 타입
export type CounterActions = {
  decrementCount: () => void;
  incrementCount: () => void;
};

// 퓨~전
export type CounterSlice = CounterState & CounterActions;

// 초기 상태
const initialCounterState: CounterState = {
  count: 0,
};

// 스토어를 생성할 수 있는 팩토리 함수 만들기
export const createCounterSlice: StateCreator<
  RootStore,
  [],
  [],
  CounterSlice
> = (set) => ({
  ...initialCounterState,
  decrementCount: () => set((state) => ({ count: state.count - 1 })),
  incrementCount: () => set((state) => ({ count: state.count + 1 })),
});
```

타입스크립트라, 타입을 정의하는 과정이 조금 까다로운데, [이거 따라서 했다.](https://zustand.docs.pmnd.rs/guides/typescript#slices-pattern)

상태와 액션에 대한 타입을 명확하게 구분하고 싶어서 별도로 선언했다. ~~못 잊어 Redux~~

## 스토어를 만드는 함수를 만들기

이제 최상위 스토어를 만들어야 한다. 스토어는 `create`를 이용해서 생성하면 바로 `hook`을 반환하면서 사용가능한 상태가 되지만, 이는 Next.js 서버가 싫어한다.

그렇기 때문에 [스토어를 만드는 함수를 만들어야 한다](https://zustand.docs.pmnd.rs/guides/nextjs#creating-a-store-per-request). 어쩌다보니 패턴이 요상해졌다.(~~슬라이스를 만드는 함수를 만드는 스토어를 만드는 함수를 만들기?~~)

```ts:title=src/store/index.ts
import { createStore } from 'zustand/vanilla';

import {
    type CounterSlice,
    type CounterState,
    createCounterSlice,
    initialCounterState,
} from '@/store/counter';

// [!code focus:11]
// 슬라이스 된 스토어들의 타입을 결합하는 패턴으로 확장할 수 있다.
export type RootStore = CounterSlice;
// 슬라이스 된 스토어들의 상태를 결합하는 패턴으로 확장할 수 있다.
export type RootState = CounterState;

// 스토어를 만드는 팩토리 함수를 만든다.
export const createRootStore = () =>
    createStore<RootStore>()((...rest) => ({
        ...createCounterSlice(...rest),
        // 이후 스토어를 확장할 때, 같은 패턴으로 주입하면 된다.
    }));
```

이렇게해서 요청마다 스토어를 생성할 수 있게 되었다.

## 스토어를 제공하기

이제 `Context`를 이용해서 스토어를 생성하고, 상태를 제공할 수 있게 [provider 컴포넌트를 만들면 된다](https://zustand.docs.pmnd.rs/guides/nextjs#providing-the-store).

```tsx:title=src/providers/store-provider.tsx 
import { type ReactNode, createContext, useRef } from 'react';

import { createRootStore } from '@/store';

type Props = {
  children: ReactNode;
};

// [!code focus:16]
export type StoreApi = ReturnType<typeof createRootStore>;

// Context 생성
export const StoreContext = createContext<StoreApi | undefined>(undefined);

const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<StoreApi>(null);

  // value가 변경된다고 자식 컴포넌트가 모두 리렌더링 되지 않는다.
  // 상태 업데이트에 의한 리렌더링은 스토어에서 결정된다. 
  if (!storeRef.current) {
    storeRef.current = createRootStore(); // 스토어를 생성한다.
  }

  return <StoreContext value={storeRef.current}>{children}</StoreContext>;
};

export default StoreProvider;
```

이렇게 만든 `Context`를 루트 레이아웃에 적절히 감싸주면 된다.

이렇게 해서 생성한 스토어를 컴포넌트 레벨에서 전달할 수 있게 되었다.



## 스토어 사용하기

스토어를 사용하기 위해 커스텀 Hook을 제작해야한다.

```ts:title=src/store/hooks.ts
import { useContext } from 'react';
import { useStore } from 'zustand';

import { StoreContext } from '@/providers/store-provider';

import { type RootStore } from '@/store/index';

// [!code focus:9]
const useRootStore = <T>(selector: (store: RootStore) => T): T => {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    throw new Error('useAppStore must be used within StoreProvider');
  }

  return useStore(storeContext, selector);
};

export default useRootStore;
```

provider 컴포넌트에 바로 선언할 수도 있었지만, 목적별로 모듈을 관리하고 싶어서 분리했다.

이제 이런 식으로 스토어의 있는 상태와 액션을 가져올 수 있게 되었다.

```ts:title=JSX
const { count, incrementCount, decremenetCount } = useRootStore((state) => state);
```

## 뭔가 이프로 부족하다

스토어를 목적에 맞게 그룹화 하고, 이를 Next.js에서 재대로 사용하게 되었음에도 불구하고 몇가지 해결하고 싶은 과제가 남았다.

### 코드로만 구분하면 뭐해

맞다. 실제로 최상위 스토어에는 슬라이스된 스토어들의 상태와 액션들이 구분없이 모두 들어가있다.

이것도 적절히 구분해주면 좋을텐데, 불변성 이슈로 인해 그렇게 간단하게 해결할 수는 없다.

이건 적용하는 가장 좋은 방법을 고민해본 뒤에 정리해서 업데이트 해야겠네..

## 세 줄 요약

- 지금 시점으로 Zustand를 안 쓸 이유가 없다.
- Zustand를 Next.js에서 제대로 사용하려면 적절한 처리를 해줘야한다.
- 슬라이스 패턴을 이용해서 목적에 맞게 스토어들을 분리해서 하나의 스토어로 결합할 수 있다.

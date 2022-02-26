import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {
  ThemeProvider as EmotionThemeProvider,
  useTheme as useEmotionTheme,
} from '@emotion/react';

import { darkTheme, lightTheme } from 'styles/theme';

type State = {
  isDarkTheme: boolean;
};

type Action = {
  type: 'SET_LIGHT_THEME' | 'SET_DARK_THEME' | 'TOGGLE_THEME';
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LIGHT_THEME':
      return {
        isDarkTheme: false,
      };
    case 'SET_DARK_THEME':
      return {
        isDarkTheme: true,
      };
    case 'TOGGLE_THEME':
      return {
        isDarkTheme: !state.isDarkTheme,
      };
    default:
      return state;
  }
}

const initialState: State = {
  isDarkTheme: false,
};

const ThemeStateContext = createContext<State>(initialState);
const ThemeDispatchContext = createContext<Dispatch<Action> | null>(null);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch({ type: 'SET_DARK_THEME' });
    } else {
      dispatch({ type: 'SET_LIGHT_THEME' });
    }
  }, []);

  return (
    <ThemeStateContext.Provider value={state}>
      <ThemeDispatchContext.Provider value={dispatch}>
        <EmotionThemeProvider
          theme={state.isDarkTheme ? darkTheme : lightTheme}
        >
          {children}
        </EmotionThemeProvider>
      </ThemeDispatchContext.Provider>
    </ThemeStateContext.Provider>
  );
};

export const useTheme = () => {
  const state = useContext(ThemeStateContext);
  const dispatch = useContext(ThemeDispatchContext);
  const theme = useEmotionTheme();

  if (!state || !dispatch) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const setLightTheme = useCallback(() => {
    dispatch({
      type: 'SET_LIGHT_THEME',
    });
  }, [dispatch]);

  const setDarkTheme = useCallback(() => {
    dispatch({
      type: 'SET_DARK_THEME',
    });
  }, [dispatch]);

  const toggleTheme = useCallback(() => {
    dispatch({
      type: 'TOGGLE_THEME',
    });
  }, [dispatch]);

  return {
    theme,
    isDarkTheme: state.isDarkTheme,
    setLightTheme,
    setDarkTheme,
    toggleTheme,
  };
};

export default ThemeProvider;

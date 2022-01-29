import '@emotion/react';
import { Theme as LibTheme } from '../styles/theme';

declare module '@emotion/react' {
  export interface Theme extends LibTheme {}
}

import palette from './palette';

type ThemeKey =
  | 'text'
  | 'subText'
  | 'lightBorder'
  | 'background'
  | 'horizontalRule'
  | 'date';

export type Theme = Record<ThemeKey, string>;

export const lightTheme: Theme = {
  text: palette.gray[9],
  subText: palette.gray[5],
  lightBorder: palette.gray[1],
  background: palette.white,
  horizontalRule: palette.gray[4],
  date: palette.gray[7],
};

export const darkTheme: Theme = {
  text: palette.gray[0],
  subText: palette.gray[4],
  lightBorder: palette.gray[8],
  background: palette.gray[9],
  horizontalRule: palette.gray[7],
  date: palette.gray[4],
};

import palette from './palette';

export type Theme = {
  text: string;
  subText: string;
  background: string;
};

export const lightTheme: Theme = {
  text: palette.gray[9],
  subText: palette.gray[5],
  background: palette.white,
};

export const darkTheme: Theme = {
  text: palette.gray[0],
  subText: palette.gray[4],
  background: palette.gray[9],
};

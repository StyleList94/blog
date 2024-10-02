export type HexColorCode = `#${string}`;
export type RGBAColorCode = `rgba(${number}, ${number}, ${number}, ${number})`;

export type ColorKey = 'white' | 'black';

export type ColorValue = HexColorCode | RGBAColorCode;

export type Colors = Record<ColorKey, ColorValue>;

export type Palette = {
  white: ColorValue;
  black: ColorValue;
};

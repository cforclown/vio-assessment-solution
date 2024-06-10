export enum ThemeTypes {
  PRIMARY = 'PRIMARY',
  DARK ='DARK'
}

export interface IThemeSidebar {
  bg: string;
  textColor: string;
  itemBg: string;
  itemTextColor: string;
  itemActiveTextColor: string;
  itemActiveBg: string;
}

export interface IThemeHeader {
  bg: string;
  textColor: string;
}

export const themeColorNames = [ 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'muted', 'white' ] as const;

export type ThemeColors = typeof themeColorNames[number];

export type IThemeColors = Record<ThemeColors, string>;

export interface ITheme {
  id: ThemeTypes;
  bg: string;
  textColor: string;
  colors: IThemeColors;
  sidebar: IThemeSidebar;
  header: IThemeHeader;
}

export const primaryTheme: ITheme = {
  id: ThemeTypes.PRIMARY,
  bg: '#fff',
  textColor: '#3d3d3d',
  colors: {
    primary: '#f53b57',
    secondary: '#a4b0be',
    success: '#2ed573',
    danger: '#eb2f06',
    warning: '#f9ca24',
    info: '#0984e3',
    light: '#ffffff',
    dark: '#222f3e',
    muted: '#b2bec3',
    white: '#ffffff'
  },
  sidebar: {
    bg: '#222f3e',
    textColor: '#ffffff',
    itemBg: '#222f3e',
    itemTextColor: '#ffffff',
    itemActiveTextColor: '#ffffff',
    itemActiveBg: '#636e72',
  },
  header: {
    bg: '#f53b57',
    textColor: '#ffffff',
  },
};

export const darkTheme: ITheme = {
  id: ThemeTypes.DARK,
  bg: '#2C3A47',
  textColor: '#ffffff',
  colors: {
    primary: '#f53b57',
    secondary: '#a4b0be',
    success: '#2ed573',
    danger: '#eb2f06',
    warning: '#f9ca24',
    info: '#0984e3',
    light: '#ffffff',
    dark: '#222f3e',
    muted: '#b2bec3',
    white: '#ffffff'
  },
  sidebar: {
    bg: '#dff9fb',
    textColor: '#2C3A47',
    itemBg: '#dff9fb',
    itemTextColor: '#2C3A47',
    itemActiveBg: '#2C3A47',
    itemActiveTextColor: '#dff9fb',
  },
  header: {
    bg: '#535c68',
    textColor: '#ffffff',
  },
};

const Themes: Record<ThemeTypes, ITheme> = {
  [ThemeTypes.PRIMARY]: primaryTheme,
  [ThemeTypes.DARK]: darkTheme,
};

export const getTheme = (themeId: ThemeTypes): ITheme => Themes[themeId];

export default Themes;

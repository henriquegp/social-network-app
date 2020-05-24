interface SearchColors {
  input: string;
  icon: string;
}

export interface Theme {
  color: string;
  primary: string;
  success: string;
  danger: string;
  navBar: string;
  bodyBackground: string;
  cardBackground: string;
  inputBackground: string;
  textareaBackground: string;
  searchColors: SearchColors;
}

interface Themes {
  MAIN: Theme;
  DARK: Theme;
}

export type Colors = 'primary' | 'danger' | 'success';

const main: Theme = {
  color: 'black',
  primary: '#03a9f4',
  success: '#00c853',
  danger: '#e63e3e',
  navBar: '#FFF',
  bodyBackground: '#f0f1f5',
  cardBackground: '#FFFFFF',
  inputBackground: '#fafafa',
  textareaBackground: '#0000000d',
  searchColors: {
    input: '#e7e7ec',
    icon: '#c7c7d2',
  },
};

const themeConfig: Themes = {
  MAIN: main,
  DARK: {
    ...main,
    color: '#fff',
    navBar: '#18181b',
    bodyBackground: '#0e0e10',
    cardBackground: '#242526',
    inputBackground: '#3a3a3d',
    textareaBackground: '#3a3a3d',
    searchColors: {
      input: '#3a3a3d',
      icon: '#686871',
    },
  },
};

export type ThemeTypes = keyof Themes;

export default themeConfig;

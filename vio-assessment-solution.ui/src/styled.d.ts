import { ITheme } from './themes/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}

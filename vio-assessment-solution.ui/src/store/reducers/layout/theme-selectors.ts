import { IAppState } from '../..';
import { ITheme, IThemeColors } from '../../../themes/themes';

export const selectTheme = (): (state: IAppState) => ITheme => (state: IAppState) => state.layout.theme;

export const selectThemeColors = (): (state: IAppState) => IThemeColors => (state: IAppState) => state.layout.theme.colors;

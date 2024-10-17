import 'styled-components';
import { ColorsTypes, FontsTypes } from '../styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorsTypes;
    fonts: FontsTypes;
  }
}

import 'styled-components';
import { ColorsTypes, FontsTypes } from '@src/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorsTypes;
    fonts: FontsTypes;
  }
}

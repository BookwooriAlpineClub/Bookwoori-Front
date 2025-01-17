import 'styled-components';
import {
  ColorsTypes,
  FontsTypes,
  RoundedTypes,
  PaddingTypes,
  GapTypes,
  ZIndexTypes,
} from '@src/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorsTypes;
    fonts: FontsTypes;
    rounded: RoundedTypes;
    padding: PaddingTypes;
    gap: GapTypes;
    zIndex: ZIndexTypes;
  }
}

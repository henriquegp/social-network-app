import 'styled-components';
import { Theme } from '../config/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    primary: string;
  }
}

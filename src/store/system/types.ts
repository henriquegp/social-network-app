import { ThemeTypes, Colors } from '../../config/themes';

export enum SystemTypes {
  LOGIN_REQUEST = 'system/LOGIN_REQUEST',
  LOGIN_SUCCESS = 'system/LOGIN_SUCCESS',
  LOGIN_FAILURE = 'system/LOGIN_FAILURE',
  LOGOUT = 'system/LOGOUT',
  SET_THEME = 'system/SET_THEME',
  SHOW_SNACK_BAR = 'system/SHOW_SNACK_BAR',
  HIDE_SNACK_BAR = 'system/HIDE_SNACK_BAR',
  CHANGE_PICTURE = 'system/CHANGE_PICTURE',
}

export interface Profile {
  name: string;
  picture: string;
  privated?: boolean;
  about?: string;
}

export interface User {
  userId: number;
  username: string;
  email: string;
  profile: Profile;
}

export interface SnackBarState {
  message: string;
  type: Colors;
  show?: boolean;
}

export interface SystemState {
  user: User;
  isAuthorized: boolean;
  token: string;
  errorMessage: string;
  loading: boolean;
  theme: ThemeTypes;
  snackBar: SnackBarState;
}

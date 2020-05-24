import { SystemTypes, User, SnackBarState } from './types';
import { ThemeTypes } from '../../config/themes';

export interface Credential {
  username: string;
  password: string;
}

export function loginRequest(credential: Credential) {
  return {
    type: SystemTypes.LOGIN_REQUEST,
    payload: {
      ...credential,
    },
  };
}

interface LoginSuccess {
  user: User;
  token: string;
}

export function loginSuccess({ user, token }: LoginSuccess) {
  return {
    type: SystemTypes.LOGIN_SUCCESS,
    payload: {
      user,
      token,
    },
  };
}

export function loginFailure(errorMessage: string) {
  return {
    type: SystemTypes.LOGIN_FAILURE,
    payload: { errorMessage },
  };
}

export function logout() {
  return {
    type: SystemTypes.LOGOUT,
  };
}

export function setTheme(theme: ThemeTypes) {
  return {
    type: SystemTypes.SET_THEME,
    payload: { theme },
  };
}

export function showSnackBar(snackBar: SnackBarState) {
  return {
    type: SystemTypes.SHOW_SNACK_BAR,
    payload: { snackBar },
  };
}

export function hideSnackBar() {
  return {
    type: SystemTypes.HIDE_SNACK_BAR,
  };
}

export function changePicture(picture: string) {
  return {
    type: SystemTypes.CHANGE_PICTURE,
    payload: { picture },
  };
}

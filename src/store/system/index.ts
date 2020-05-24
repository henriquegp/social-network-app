import { Reducer } from 'redux';
import { SystemTypes, SystemState, SnackBarState } from './types';

const initialSnackBar: SnackBarState = {
  message: '',
  type: 'success',
  show: false,
};

const initialState: SystemState = {
  user: {
    userId: 0,
    email: '',
    username: '',
    profile: {
      name: '',
      picture: '',
    },
  },
  isAuthorized: false,
  token: '',
  errorMessage: '',
  loading: false,
  theme: 'MAIN',
  snackBar: initialSnackBar,
};

const systemReducer: Reducer<SystemState> = (state = initialState, action) => {
  switch (action.type) {
    case SystemTypes.LOGIN_REQUEST:
      return {
        ...state,
        errorMessage: '',
        loading: true,
      };

    case SystemTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthorized: true,
        user: action.payload.user,
        token: action.payload.token,
        errorMessage: '',
      };

    case SystemTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.errorMessage,
      };

    case SystemTypes.LOGOUT:
      return {
        ...initialState,
        theme: state.theme,
        snackBar: state.snackBar,
      };

    case SystemTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload.theme,
      };

    case SystemTypes.SHOW_SNACK_BAR:
      return {
        ...state,
        snackBar: {
          ...action.payload.snackBar,
          show: true,
        },
      };

    case SystemTypes.HIDE_SNACK_BAR:
      return {
        ...state,
        snackBar: { ...initialSnackBar },
      };

    case SystemTypes.CHANGE_PICTURE:
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            picture: action.payload.picture,
          },
        },
      };

    default:
      return state;
  }
};

export default systemReducer;

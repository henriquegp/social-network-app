import { call, put, delay } from 'redux-saga/effects';
import {
  loginSuccess, loginFailure, Credential, hideSnackBar,
} from './actions';
import { authRepository } from '../../repositories';

interface LoginRequestAction {
  type: string;
  payload: Credential;
}

// eslint-disable-next-line import/prefer-default-export
export function* checkCredentials({ payload }: LoginRequestAction) {
  try {
    const response = yield call(authRepository.authenticate, payload);

    yield put(loginSuccess(response));
  } catch ({ response }) {
    yield put(loginFailure(response?.data.message));
  }
}

export function* hideSnackBarMd() {
  yield delay(3000);
  yield put(hideSnackBar());
}

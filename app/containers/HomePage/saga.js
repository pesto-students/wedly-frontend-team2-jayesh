import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNOUT_SUCCESS,
  SIGNOUT_FAILURE,
  SIGNOUT,
  AUTH_STATE_SUCCESS,
  AUTH_STATE_FAILURE,
  AUTH_STATE,
} from "./constants";
import {
  signoutFailureToast,
  signinFailureToast,
  signinSuccessToast,
  signoutSuccessToast,
} from "../../utils/toast";
import history from "../../utils/history";

export async function signIn(email, password) {
  const requestURL = `${process.env.SERVER_URL}/login`;
  const response = await axios.post(
    requestURL,
    {
      email,
      password,
    },
    { withCredentials: true }
  );
  return response;
}

export async function signOut() {
  const requestURL = `${process.env.SERVER_URL}/logout`;
  const response = await axios.post(requestURL, {}, { withCredentials: true });
  return response;
}

export async function getAuthState() {
  const requestURL = `${process.env.SERVER_URL}/authState`;
  const response = await axios.get(requestURL, { withCredentials: true });
  return response;
}

function* signinSaga(action) {
  try {
    const response = yield call(signIn, action.email, action.password);

    // dispatch a success action to the store with the new dog
    yield put({ type: SIGNIN_SUCCESS, response });
    yield signinSuccessToast();
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: SIGNIN_FAILURE, error });
    yield signinFailureToast();
  }
}

function* signoutSaga() {
  try {
    const response = yield call(signOut);
    yield put({ type: SIGNOUT_SUCCESS, response });
    yield signoutSuccessToast();
    yield history.push("/");
  } catch (err) {
    yield put({ type: SIGNOUT_FAILURE });
    yield signoutFailureToast();
  }
}

function* authStateSaga() {
  try {
    const response = yield call(getAuthState);
    yield put({ type: AUTH_STATE_SUCCESS, response });
  } catch (err) {
    yield put({ type: AUTH_STATE_FAILURE, err });
  }
}

export default function* watcherSaga() {
  yield takeEvery(SIGNIN, signinSaga);
  yield takeEvery(SIGNOUT, signoutSaga);
  yield takeEvery(AUTH_STATE, authStateSaga);
}

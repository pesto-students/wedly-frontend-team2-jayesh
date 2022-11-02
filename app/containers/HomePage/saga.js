import { call, put, takeEvery } from "redux-saga/effects";
import axiosInstance from "../../utils/axios";
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
  custom401toast,
} from "../../utils/toast";
import history from "../../utils/history";

export async function signIn(email, password) {
  const response = await axiosInstance.post("/login", {
    email,
    password,
  });
  localStorage.setItem("accessToken", response.data.accessToken);
  return response;
}

export async function signOut() {
  const response = await axiosInstance.post("/logout", {});
  localStorage.removeItem("accessToken");
  return response;
}

export async function getAuthState() {
  const urlParams = new URLSearchParams(location.search);
  for (const [key, value] of urlParams) {
    if (key === "accessToken") localStorage.setItem("accessToken", value);
  }
  const response = await axiosInstance.get("/authState");
  return response;
}

function* signinSaga(action) {
  try {
    const response = yield call(signIn, action.email, action.password);
    yield put({ type: SIGNIN_SUCCESS, response });
    yield signinSuccessToast();
  } catch (error) {
    console.log(error);
    yield put({ type: SIGNIN_FAILURE, error });
    yield custom401toast(error.response.data.message);
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

import { call, put, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../utils/axios";
import { SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./constants";
import { signupFailureToast, signupSuccessToast } from "../../utils/toast";
import history from "../../utils/history";

export async function signup(name, email, password) {
  const response = await axiosInstance.post("/signup", {
    name,
    email,
    password,
  });
  return response;
}

function* workerSaga(action) {
  try {
    const response = yield call(
      signup,
      action.name,
      action.email,
      action.password
    );

    yield put({ type: SIGNUP_SUCCESS, response });
    yield signupSuccessToast();
    yield history.push("/");
  } catch (error) {
    yield put({ type: SIGNUP_FAILURE, error });
    yield signupFailureToast();
  }
}

export default function* watcherSaga() {
  yield takeLatest(SIGNUP, workerSaga);
}

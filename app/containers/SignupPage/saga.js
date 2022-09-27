import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./constants";
import { signupFailureToast, signupSuccessToast } from "../../utils/toast";
import history from "../../utils/history";

export async function signup(name, email, password) {
  const requestURL = `http://localhost:7000/api/signup`;
  const response = await axios.post(
    requestURL,
    {
      name,
      email,
      password,
    },
    { withCredentials: true }
  );
  console.log(response);
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

    // dispatch a success action to the store with the new dog
    yield put({ type: SIGNUP_SUCCESS, response });
    yield signupSuccessToast();
    yield history.push("/");
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: SIGNUP_FAILURE, error });
    yield signupFailureToast();
  }
}

export default function* watcherSaga() {
  yield takeLatest(SIGNUP, workerSaga);
}

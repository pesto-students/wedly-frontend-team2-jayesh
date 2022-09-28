/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE } from "./constants";
import { signinFailureToast, signinSuccessToast } from "../../utils/toast";
// import { LOAD_REPOS } from "containers/App/constants";
// import { reposLoaded, repoLoadingError } from "containers/App/actions";

// import request from "utils/request";
// import { makeSelectUsername } from "containers/HomePage/selectors";

// /**
//  * Github repos request/response handler
//  */
// export function* getRepos() {
//   // Select username from store
//   const username = yield select(makeSelectUsername());
//   const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

//   try {
//     // Call our request helper (see 'utils/request')
//     const repos = yield call(request, requestURL);
//     yield put(reposLoaded(repos, username));
//   } catch (err) {
//     yield put(repoLoadingError(err));
//   }
// }

export async function signIn(email, password) {
  const requestURL = `http://localhost:7000/api/login`;
  const response = await axios.post(
    requestURL,
    {
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

export default function* watcherSaga() {
  yield takeLatest(SIGNIN, workerSaga);
}

// /**
//  * Root saga manages watcher lifecycle
//  */
// export default function* githubData() {
//   // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
//   // By using `takeLatest` only the result of the latest API call is applied.
//   // It returns task descriptor (just like fork) so we can continue execution
//   // It will be cancelled automatically on component unmount
//   yield takeLatest(LOAD_REPOS, getRepos);
// }

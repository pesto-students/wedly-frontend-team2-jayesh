import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_COUPLE_DETAILS,
  ADD_COUPLE_DETAILS_FAILURE,
  ADD_COUPLE_DETAILS_SUCCESS,
} from "./constants";
import {
  addCoupleSuccessToast,
  addCoupleFailureToast,
} from "../../utils/toast";
// import history from "../../utils/history";

export async function addCoupleDtails(
  brideName,
  brideMotherName,
  brideFatherName,
  brideState,
  brideCity,
  groomName,
  groomMotherName,
  groomFatherName,
  groomState,
  groomCity
) {
  const requestURL = `http://localhost:7000/api/weddingDetails`;
  const response = await axios.post(
    requestURL,
    {
      brideName,
      brideMotherName,
      brideFatherName,
      brideState,
      brideCity,
      groomName,
      groomMotherName,
      groomFatherName,
      groomState,
      groomCity,
    },
    {
      withCredentials: true,
    }
  );
  return response;
}

// export async function getEvents() {
//   const requestURL = `http://localhost:7000/api/event`;
//   const response = await axios.get(requestURL, { withCredentials: true });
//   return response;
// }

function* addDetailsSaga(action) {
  try {
    const response = yield call(
      addCoupleDtails,
      action.brideName,
      action.brideMotherName,
      action.brideFatherName,
      action.brideState,
      action.brideCity,
      action.groomName,
      action.groomMotherName,
      action.groomFatherName,
      action.groomState,
      action.groomCity
    );

    yield put({ type: ADD_COUPLE_DETAILS_SUCCESS, response });
    yield addCoupleSuccessToast();
  } catch (error) {
    yield put({ type: ADD_COUPLE_DETAILS_FAILURE, error });
    yield addCoupleFailureToast();
  }
}

// function* getEventSaga() {
//   try {
//     const response = yield call(getEvents);

//     yield put({ type: GET_EVENT_SUCCESS, response });

//     // yield history.push("/");
//   } catch (error) {
//     yield put({ type: GET_EVENT_FAILURE, error });
//   }
// }

export default function* watcherSaga() {
  yield takeEvery(ADD_COUPLE_DETAILS, addDetailsSaga);
}

import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import axiosInstance from "../../utils/axios";
import {
  ADD_COUPLE_DETAILS,
  ADD_COUPLE_DETAILS_FAILURE,
  ADD_COUPLE_DETAILS_SUCCESS,
  GET_COUPLE_DETAILS,
  GET_COUPLE_DETAILS_SUCCESS,
  GET_COUPLE_DETAILS_FAILURE,
} from "./constants";
import {
  addCoupleSuccessToast,
  addCoupleFailureToast,
  connectionTimedOutToast,
} from "../../utils/toast";
import { signOut } from "../HomePage/saga";
import { SIGNOUT_SUCCESS } from "../HomePage/constants";
import history from "../../utils/history";

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
  const response = await axiosInstance.post("weddingDetails", {
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
  });
  return response;
}

export async function getCoupleDetails() {
  const response = await axiosInstance.get("/weddingDetails");
  return response;
}

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

function* getCoupleSaga() {
  try {
    const response = yield call(getCoupleDetails);
    yield put({ type: GET_COUPLE_DETAILS_SUCCESS, response });
  } catch (error) {
    yield put({ type: GET_COUPLE_DETAILS_FAILURE, error });
  }
}

export default function* watcherSaga() {
  yield takeEvery(ADD_COUPLE_DETAILS, addDetailsSaga);
  yield takeEvery(GET_COUPLE_DETAILS, getCoupleSaga);
}

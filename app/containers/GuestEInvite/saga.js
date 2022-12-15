import { call, put, takeEvery } from "redux-saga/effects";
import axiosInstance from "../../utils/axios";
import {
  GET_EINVITE,
  GET_EINVITE_SUCCESS,
  GET_EINVITE_FAILURE,
} from "./constants";

export async function getEinviteDetails(hostID) {
  const response = await axiosInstance.get(`/guesteinvite/${hostID}`);
  return response;
}

function* getEinviteSaga(action) {
  try {
    const response = yield call(getEinviteDetails, action.hostID);
    yield put({ type: GET_EINVITE_SUCCESS, response });
  } catch (error) {
    yield put({ type: GET_EINVITE_FAILURE, error });
  }
}

export default function* guestEinviteSaga() {
  yield takeEvery(GET_EINVITE, getEinviteSaga);
}

import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  GET_EINVITE,
  GET_EINVITE_SUCCESS,
  GET_EINVITE_FAILURE,
} from "./constants";

export async function getEinviteDetails(hostID) {
  const requestURL = `${process.env.SERVER_URL}/guesteinvite/${hostID}`;
  const response = await axios.get(requestURL);
  console.log(response)
  return response;
}

function* getEinviteSaga(action) {
  try {
    console.log(action.hostID)
    const response = yield call(getEinviteDetails, action.hostID);
    yield put({ type: GET_EINVITE_SUCCESS, response });
  } catch (error) {
    yield put({ type: GET_EINVITE_FAILURE, error });
  }
}

export default function* guestEinviteSaga() {
  yield takeEvery(GET_EINVITE, getEinviteSaga);
}

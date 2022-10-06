import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_GUEST,
  ADD_GUEST_FAILURE,
  ADD_GUEST_SUCCESS,
  GET_GUEST,
  GET_GUEST_FAILURE,
  GET_GUEST_SUCCESS,
  DELETE_GUEST,
  DELETE_GUEST_FAILURE,
  DELETE_GUEST_SUCCESS,
  ADD_MULTIPLE_GUESTS_SUCCESS,
  ADD_MULTIPLE_GUESTS_FAILURE,
  ADD_MULTIPLE_GUESTS,
  UPDATE_GUEST_SUCCESS,
  UPDATE_GUEST_FAILURE,
  UPDATE_GUEST,
} from "./constants";
// import { addEventSuccessToast, addEventFailureToast } from "../../utils/toast";

export async function addGuest(name, mobile, email) {
  const requestURL = `http://localhost:7000/api/guest/single`;
  const response = await axios.post(
    requestURL,
    { name, mobile, email },
    {
      withCredentials: true,
    }
  );
  return response;
}

export async function getGuests() {
  const requestURL = `http://localhost:7000/api/guest`;
  const response = await axios.get(requestURL, { withCredentials: true });
  return response;
}

export async function deleteGuest(id) {
  const requestURL = `http://localhost:7000/api/guest`;
  const response = await axios({
    method: "DELETE",
    url: requestURL,
    withCredentials: true,
    data: { id: id },
  });

  return response;
}

export async function addMultipleGuests(arrayOfGuests) {
  const requestURL = `http://localhost:7000/api/guest/multiple`;

  const response = await axios.post(requestURL, arrayOfGuests, {
    withCredentials: true,
  });
  return response;
}

export async function updateGuest(updateObj) {
  const requestURL = `http://localhost:7000/api/guest`;

  const response = await axios.patch(requestURL, updateObj, {
    withCredentials: true,
  });
  return response;
}

function* addGuestSaga(action) {
  try {
    const response = yield call(
      addGuest,
      action.name,
      action.mobile,
      action.email
    );

    yield put({ type: ADD_GUEST_SUCCESS, response });
    // yield addEventSuccessToast();
    // yield history.push("/");
  } catch (error) {
    yield put({ type: ADD_GUEST_FAILURE, error });
    // yield addEventFailureToast();
  }
}

function* addMultipleGuestsSaga(action) {
  try {
    const response = yield call(addMultipleGuests, action.arrayOfGuests);

    yield put({ type: ADD_MULTIPLE_GUESTS_SUCCESS, response });
    // yield addEventSuccessToast();
    // yield history.push("/");
  } catch (error) {
    yield put({ type: ADD_MULTIPLE_GUESTS_FAILURE, error });
    // yield addEventFailureToast();
  }
}

function* getGuestSaga() {
  try {
    const response = yield call(getGuests);

    yield put({ type: GET_GUEST_SUCCESS, response });

    // yield history.push("/");
  } catch (error) {
    yield put({ type: GET_GUEST_FAILURE, error });
  }
}

function* updateGuestSaga(action) {
  try {
    const response = yield call(updateGuest, action.updateObj);

    yield put({ type: UPDATE_GUEST_SUCCESS, response });
  } catch (err) {
    yield put({ type: UPDATE_GUEST_FAILURE, err });
  }
}

function* deleteGuestSaga(action) {
  try {
    const response = yield call(deleteGuest, action.id);

    yield put({ type: DELETE_GUEST_SUCCESS, response });

    // yield history.push("/");
  } catch (error) {
    yield put({ type: DELETE_GUEST_FAILURE, error });
  }
}

export default function* watcherSaga() {
  yield takeEvery(ADD_GUEST, addGuestSaga);
  yield takeEvery(GET_GUEST, getGuestSaga);
  yield takeEvery(DELETE_GUEST, deleteGuestSaga);
  yield takeEvery(ADD_MULTIPLE_GUESTS, addMultipleGuestsSaga);
  yield takeEvery(UPDATE_GUEST, updateGuestSaga);
}

import { call, put, takeEvery } from "redux-saga/effects";
import axiosInstance from "../../utils/axios";
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
  SEND_INVITE_SUCCESS,
  SEND_INVITE_FAILURE,
  SEND_INVITE,
} from "./constants";
import {
  addGuestFailureToast,
  addGuestSuccessToast,
  addMultipleGuestsFailureToast,
  addMultipleGuestsSuccessToast,
  deleteGuestFailureToast,
  deleteGuestSuccessToast,
  inviteFailureToast,
  inviteSuccessToast,
  updateGuestFailureToast,
  updateGuestSuccessToast,
} from "../../utils/toast";

export async function addGuest(name, mobile, email) {
  const response = await axiosInstance.post("/guest/single", {
    name,
    mobile,
    email,
  });
  return response;
}

export async function getGuests() {
  const response = await axiosInstance.get("/guest");
  return response;
}

export async function deleteGuest(id) {
  const response = await axiosInstance.delete("/guest", { data: { id: id } });
  return response;
}

export async function addMultipleGuests(arrayOfGuests) {
  const response = await axiosInstance.post("/guest/multiple", arrayOfGuests);
  return response;
}

export async function updateGuest(updateObj) {
  const response = await axiosInstance.patch("/guest", updateObj);
  return response;
}

export async function sendInvite(from, to, mobile, userId) {
  const requestURL = `https://graph.facebook.com/v14.0/109962048563832/messages`;

  const response = await axios.post(
    requestURL,
    {
      messaging_product: "whatsapp",
      to: `91${mobile}`,
      type: "template",
      template: {
        name: "e_invite",
        language: {
          code: "en",
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: `${to}`,
              },
              {
                type: "text",
                text: `${from}`,
              },
              {
                type: "text",
                text: `${process.env.APP_URL}/einvite/view/${userId}`,
              },
            ],
          },
        ],
      },
    },
    {
      headers: {
        Authorization: `Bearer EAALnfn2bArEBADFcAbZA1NwZAZBdSmOvSR82UqouqKiegW3Eu4JeeKzokDPYXH9Begj4DIiccov6wTiLmAzOGs00IjbZBTwv5yqnQZCOZCXcrNRW8ektpUoZC6pTditnZAEZB0harkYCItQ76cbdDfB2WZA0T3FZBl4p5DmuDt6jVtEnVDfHF5cEKHtbS6j9aZBjUgvSD7yDSjWjvwZDZD`,
        "Content-Type": "application/json",
      },
    }
  );

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
    yield addGuestSuccessToast();
  } catch (error) {
    yield put({ type: ADD_GUEST_FAILURE, error });
    yield addGuestFailureToast();
  }
}

function* addMultipleGuestsSaga(action) {
  try {
    const response = yield call(addMultipleGuests, action.arrayOfGuests);
    yield put({ type: ADD_MULTIPLE_GUESTS_SUCCESS, response });
    yield addMultipleGuestsSuccessToast();
  } catch (error) {
    yield put({ type: ADD_MULTIPLE_GUESTS_FAILURE, error });
    yield addMultipleGuestsFailureToast();
  }
}

function* getGuestSaga() {
  try {
    const response = yield call(getGuests);
    yield put({ type: GET_GUEST_SUCCESS, response });
  } catch (error) {
    yield put({ type: GET_GUEST_FAILURE, error });
  }
}

function* updateGuestSaga(action) {
  try {
    const response = yield call(updateGuest, action.updateObj);
    yield put({ type: UPDATE_GUEST_SUCCESS, response });
    yield updateGuestSuccessToast();
  } catch (err) {
    yield put({ type: UPDATE_GUEST_FAILURE, err });
    yield updateGuestFailureToast();
  }
}

function* deleteGuestSaga(action) {
  try {
    const response = yield call(deleteGuest, action.id);
    yield put({ type: DELETE_GUEST_SUCCESS, response });
    yield deleteGuestSuccessToast();
  } catch (error) {
    yield put({ type: DELETE_GUEST_FAILURE, error });
    yield deleteGuestFailureToast();
  }
}

function* inviteSaga(action) {
  try {
    const response = yield call(
      sendInvite,
      action.from,
      action.to,
      action.mobile,
      action.userId
    );
    yield put({ type: SEND_INVITE_SUCCESS, response });
    yield inviteSuccessToast();
  } catch (error) {
    yield put({ type: SEND_INVITE_FAILURE, error });
    yield inviteFailureToast();
  }
}

export default function* watcherSaga() {
  yield takeEvery(ADD_GUEST, addGuestSaga);
  yield takeEvery(GET_GUEST, getGuestSaga);
  yield takeEvery(DELETE_GUEST, deleteGuestSaga);
  yield takeEvery(ADD_MULTIPLE_GUESTS, addMultipleGuestsSaga);
  yield takeEvery(UPDATE_GUEST, updateGuestSaga);
  yield takeEvery(SEND_INVITE, inviteSaga);
}

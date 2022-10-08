import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_EVENT,
  ADD_EVENT_FAILURE,
  ADD_EVENT_SUCCESS,
  GET_EVENT,
  GET_EVENT_FAILURE,
  GET_EVENT_SUCCESS,
  DELETE_EVENT,
  DELETE_EVENT_FAILURE,
  DELETE_EVENT_SUCCESS,
  ADD_MULTIPLE_EVENTS_SUCCESS,
  ADD_MULTIPLE_EVENTS_FAILURE,
  ADD_MULTIPLE_EVENTS,
  UPDATE_EVENT,
  UPDATE_EVENT_FAILURE,
  UPDATE_EVENT_SUCCESS,
} from "./constants";
import { addEventSuccessToast, addEventFailureToast } from "../../utils/toast";

export async function addEvent(category, customEvent, date, time, venue) {
  const body = {};
  if (category !== "Other") {
    body["category"] = category;
  }
  if (customEvent !== "") {
    body["customEvent"] = customEvent;
  }
  body["date"] = date;
  body["time"] = time;
  body["venue"] = venue;
  const requestURL = `${process.env.SERVER_URL}/event/single`;
  const response = await axios.post(requestURL, body, {
    withCredentials: true,
  });
  return response;
}

export async function getEvents() {
  const requestURL = `${process.env.SERVER_URL}/event`;
  const response = await axios.get(requestURL, { withCredentials: true });
  return response;
}

export async function deleteEvent(id) {
  const requestURL = `${process.env.SERVER_URL}/event`;
  const response = await axios({
    method: "DELETE",
    url: requestURL,
    withCredentials: true,
    data: { id: id },
  });

  return response;
}

export async function addMultipleEvents(arrayOfEvents) {
  const requestURL = `${process.env.SERVER_URL}/event/multiple`;

  const response = await axios.post(requestURL, arrayOfEvents, {
    withCredentials: true,
  });
  return response;
}

export async function updateEvent(updateObj) {
  const requestURL = `${process.env.SERVER_URL}/event`;

  const response = await axios.patch(requestURL, updateObj, {
    withCredentials: true,
  });
  return response;
}

function* addEventSaga(action) {
  try {
    const response = yield call(
      addEvent,
      action.category,
      action.customEvent,
      action.date,
      action.time,
      action.venue
    );

    yield put({ type: ADD_EVENT_SUCCESS, response });
    yield addEventSuccessToast();
    // yield history.push("/");
  } catch (error) {
    yield put({ type: ADD_EVENT_FAILURE, error });
    yield addEventFailureToast();
  }
}

function* addMultipleEventsSaga(action) {
  try {
    const response = yield call(addMultipleEvents, action.arrayOfEvents);

    yield put({ type: ADD_MULTIPLE_EVENTS_SUCCESS, response });
    // yield addEventSuccessToast();
    // yield history.push("/");
  } catch (error) {
    yield put({ type: ADD_MULTIPLE_EVENTS_FAILURE, error });
    // yield addEventFailureToast();
  }
}

function* getEventSaga() {
  try {
    const response = yield call(getEvents);

    yield put({ type: GET_EVENT_SUCCESS, response });

    // yield history.push("/");
  } catch (error) {
    yield put({ type: GET_EVENT_FAILURE, error });
  }
}

function* updateEventSaga(action) {
  try {
    const response = yield call(updateEvent, action.updateObj);

    yield put({ type: UPDATE_EVENT_SUCCESS, response });
  } catch (err) {
    yield put({ type: UPDATE_EVENT_FAILURE, err });
  }
}

function* deleteEventSaga(action) {
  try {
    const response = yield call(deleteEvent, action.id);

    yield put({ type: DELETE_EVENT_SUCCESS, response });

    // yield history.push("/");
  } catch (error) {
    yield put({ type: DELETE_EVENT_FAILURE, error });
  }
}

export default function* watcherSaga() {
  yield takeEvery(ADD_EVENT, addEventSaga);
  yield takeEvery(GET_EVENT, getEventSaga);
  yield takeEvery(DELETE_EVENT, deleteEventSaga);
  yield takeEvery(ADD_MULTIPLE_EVENTS, addMultipleEventsSaga);
  yield takeEvery(UPDATE_EVENT, updateEventSaga);
}

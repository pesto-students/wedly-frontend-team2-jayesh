import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import axiosInstance from "../../utils/axios.js";
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
  REMIND_EVENT_SUCCESS,
  REMIND_EVENT_FAILURE,
  REMIND_EVENT,
} from "./constants";
import {
  addEventSuccessToast,
  addEventFailureToast,
  addMultipleEventsSuccessToast,
  addMultipleEventsFailureToast,
  deleteEventSuccessToast,
  deleteEventFailureToast,
  remindEventSuccessToast,
  remindEventFailureToast,
  updateEventSuccessToast,
  updateEventFailureToast,
} from "../../utils/toast";

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
  const response = await axiosInstance.post("/event/single", body);
  return response;
}

export async function getEvents() {
  const response = await axiosInstance.get("/event");
  return response;
}

export async function deleteEvent(id) {
  const response = await axiosInstance.delete("/event", { data: { id: id } });
  return response;
}

export async function addMultipleEvents(arrayOfEvents) {
  const response = await axiosInstance.post("/event/multiple", arrayOfEvents);
  return response;
}

export async function updateEvent(updateObj) {
  const response = await axiosInstance.patch("/event", updateObj);
  return response;
}

export async function sendReminder(guestsArray, hostName, eventDetails) {
  const requestURL = `https://graph.facebook.com/v14.0/109962048563832/messages`;
  for (let guest of guestsArray) {
    await axios.post(
      requestURL,
      {
        messaging_product: "whatsapp",
        to: `91${guest.mobile}`,
        type: "template",
        template: {
          name: "event",
          language: {
            code: "en",
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: `${guest.name}`,
                },
                {
                  type: "text",
                  text: `${hostName}`,
                },
                {
                  type: "text",
                  text: `${eventDetails.category || eventDetails.customEvent}`,
                },
                {
                  type: "text",
                  text: `${eventDetails.date
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}`,
                },
                {
                  type: "text",
                  text: `${eventDetails.time}`,
                },
                {
                  type: "text",
                  text: `${eventDetails.venue}`,
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
  }
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
  } catch (error) {
    yield put({ type: ADD_EVENT_FAILURE, error });
    yield addEventFailureToast();
  }
}

function* addMultipleEventsSaga(action) {
  try {
    const response = yield call(addMultipleEvents, action.arrayOfEvents);
    yield put({ type: ADD_MULTIPLE_EVENTS_SUCCESS, response });
    yield addMultipleEventsSuccessToast();
  } catch (error) {
    yield put({ type: ADD_MULTIPLE_EVENTS_FAILURE, error });
    yield addMultipleEventsFailureToast();
  }
}

function* getEventSaga() {
  try {
    const response = yield call(getEvents);
    yield put({ type: GET_EVENT_SUCCESS, response });
  } catch (error) {
    yield put({ type: GET_EVENT_FAILURE, error });
  }
}

function* updateEventSaga(action) {
  try {
    const response = yield call(updateEvent, action.updateObj);
    yield put({ type: UPDATE_EVENT_SUCCESS, response });
    yield updateEventSuccessToast();
  } catch (err) {
    yield put({ type: UPDATE_EVENT_FAILURE, err });
    yield updateEventFailureToast();
  }
}

function* deleteEventSaga(action) {
  try {
    const response = yield call(deleteEvent, action.id);

    yield put({ type: DELETE_EVENT_SUCCESS, response });
    yield deleteEventSuccessToast();
  } catch (error) {
    yield put({ type: DELETE_EVENT_FAILURE, error });
    yield deleteEventFailureToast();
  }
}

function* remindSaga(action) {
  try {
    yield call(
      sendReminder,
      action.guestsArray,
      action.hostName,
      action.eventDetails
    );

    yield put({ type: REMIND_EVENT_SUCCESS });
    yield remindEventSuccessToast();
  } catch (error) {
    yield put({ type: REMIND_EVENT_FAILURE, error });
    yield remindEventFailureToast();
  }
}

export default function* watcherSaga() {
  yield takeEvery(ADD_EVENT, addEventSaga);
  yield takeEvery(GET_EVENT, getEventSaga);
  yield takeEvery(DELETE_EVENT, deleteEventSaga);
  yield takeEvery(ADD_MULTIPLE_EVENTS, addMultipleEventsSaga);
  yield takeEvery(UPDATE_EVENT, updateEventSaga);
  yield takeEvery(REMIND_EVENT, remindSaga);
}

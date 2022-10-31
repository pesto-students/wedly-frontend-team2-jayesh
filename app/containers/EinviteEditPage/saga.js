import { call, put, takeEvery } from "redux-saga/effects";
import axiosInstance from "../../utils/axios";
import {
  ADD_FIRST_PAGE,
  ADD_FIRST_PAGE_FAILURE,
  ADD_FIRST_PAGE_SUCCESS,
  GET_FIRST_PAGE,
  GET_FIRST_PAGE_SUCCESS,
  GET_FIRST_PAGE_FAILURE,
  ADD_OTHER_PAGES,
  ADD_OTHER_PAGES_FAILURE,
  ADD_OTHER_PAGES_SUCCESS,
  GET_OTHER_PAGES,
  GET_OTHER_PAGES_SUCCESS,
  GET_OTHER_PAGES_FAILURE,
} from "./constants";
import { addEinviteSuccessToast } from "../../utils/toast";

export async function addFirstPageDetails(date, groom, bride, templateID) {
  const response = await axiosInstance.post("/firstpageeinvite", {
    date,
    groom,
    bride,
    templateID,
  });
  return response;
}

export async function getFirstPageDetails(hostID) {
  const response = await axiosInstance.get(`/firstpageeinvite/${hostID}`);
  return response;
}

export async function addOtherPagesDetails(
  category,
  customEvent,
  date,
  time,
  venue,
  page,
  templateID
) {
  const response = await axiosInstance.post("/otherpageseinvite", {
    category,
    customEvent,
    date,
    time,
    venue,
    page,
    templateID,
  });
  return response;
}

export async function getOtherPagesDetails(hostID, page) {
  const response = await axiosInstance.get(
    `/otherpageseinvite/${hostID}/${page}`
  );
  return response;
}

function* addFirstPageSaga(action) {
  try {
    const response = yield call(
      addFirstPageDetails,
      action.date,
      action.groom,
      action.bride,
      action.templateID
    );

    yield put({ type: ADD_FIRST_PAGE_SUCCESS, response });
    yield addEinviteSuccessToast();
  } catch (error) {
    yield put({ type: ADD_FIRST_PAGE_FAILURE, error });
  }
}

function* getFirstPageSaga(action) {
  try {
    const response = yield call(getFirstPageDetails, action.hostID);
    yield put({ type: GET_FIRST_PAGE_SUCCESS, response });
  } catch (error) {
    yield put({ type: GET_FIRST_PAGE_FAILURE, error });
  }
}

function* addOtherPagesSaga(action) {
  try {
    const response = yield call(
      addOtherPagesDetails,
      action.category,
      action.customEvent,
      action.date,
      action.time,
      action.venue,
      action.page,
      action.templateID
    );

    yield put({ type: ADD_OTHER_PAGES_SUCCESS, response });
    yield addEinviteSuccessToast();
  } catch (error) {
    yield put({ type: ADD_OTHER_PAGES_FAILURE, error });
  }
}

function* getOtherPagesSaga(action) {
  try {
    const response = yield call(
      getOtherPagesDetails,
      action.hostID,
      action.page
    );
    yield put({ type: GET_OTHER_PAGES_SUCCESS, response });
  } catch (error) {
    yield put({ type: GET_OTHER_PAGES_FAILURE, error });
  }
}

export default function* einviteEditPageSaga() {
  yield takeEvery(ADD_FIRST_PAGE, addFirstPageSaga);
  yield takeEvery(GET_FIRST_PAGE, getFirstPageSaga);
  yield takeEvery(ADD_OTHER_PAGES, addOtherPagesSaga);
  yield takeEvery(GET_OTHER_PAGES, getOtherPagesSaga);
}

import { call, put, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../utils/axios";
import {
  updateUserFailureToast,
  updateUserSuccessToast,
} from "../../utils/toast";

import {
  UPDATE_USER,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
} from "./constants";

export async function updateUser(email, name, oldPassword, newPassword) {
  const response = await axiosInstance.post("/updateUser", {
    email,
    updatedName: name,
    oldPassword,
    newPassword,
  });
  return response;
}

function* workerSaga(action) {
  try {
    const response = yield call(
      updateUser,
      action.email,
      action.name,
      action.oldPassword,
      action.newPassword
    );

    yield put({ type: UPDATE_USER_SUCCESS, response });
    yield updateUserSuccessToast();
  } catch (error) {
    yield put({ type: UPDATE_USER_FAILURE, error });
    yield updateUserFailureToast(error.response.data.message);
  }
}

// Individual exports for testing
export default function* accountSettingsPageSaga() {
  yield takeLatest(UPDATE_USER, workerSaga);
}

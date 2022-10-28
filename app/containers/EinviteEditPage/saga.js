import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_CONTENT,
  ADD_CONTENT_FAILURE,
  ADD_CONTENT_SUCCESS,
} from "./constants";
import { addEinviteSuccessToast } from "../../utils/toast";

export async function addInviteDtails(
  templateId,
  page1Content,
  page2Content,
  page3Content,
  page4Content
) {
  const requestURL = `${process.env.SERVER_URL}/addeinvite`;
  const response = await axios.post(
    requestURL,
    {
      templateId,
      page1Content: page1Content,
      page2Content: page2Content,
      page3Content: page3Content,
      page4Content: page4Content,
    },
    {
      withCredentials: true,
    }
  );
  return response;
}

function* addInviteSaga(action) {
  try {
    const response = yield call(
      addInviteDtails,
      action.templateId,
      action.page1Content,
      action.page2Content,
      action.page3Content,
      action.page4Content
    );

    yield put({ type: ADD_CONTENT_SUCCESS, response });
    yield addEinviteSuccessToast();
  } catch (error) {
    yield put({ type: ADD_CONTENT_FAILURE, error });
    // yield addCoupleFailureToast();
  }
}
// Individual exports for testing
export default function* einviteEditPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(ADD_CONTENT, addInviteSaga);
}

/*
 *
 * AccountSettingsPage reducer
 *
 */
import produce, { isDraft } from "immer";
import {
  UPDATE_USER,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
} from "./constants";

export const initialState = {
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const accountSettingsPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UPDATE_USER:
        draft.loading = true;
        break;

      case UPDATE_USER_SUCCESS:
        draft.loading = false;
        break;

      case UPDATE_USER_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default accountSettingsPageReducer;

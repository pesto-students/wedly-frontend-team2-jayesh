/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from "immer";
import {
  SIGNIN_SUCCESS,
  SIGNIN,
  SIGNIN_FAILURE,
  SIGNOUT_SUCCESS,
  AUTH_STATE_SUCCESS,
} from "./constants";

// The initial state of the App
export const initialState = {
  email: "",
  password: "",
  error: false,
  success: false,
  user: null,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SIGNIN:
        let inputEmail = action.email;
        let inputPassword = action.password;
        draft.email = inputEmail;
        draft.password = inputPassword;
        break;

      case SIGNIN_SUCCESS:
        draft.error = false;
        draft.success = true;
        break;

      case SIGNIN_FAILURE:
        draft.error = true;
        draft.success = false;
        break;

      case SIGNOUT_SUCCESS:
        draft.success = false;
        draft.user = null;
        break;

      case AUTH_STATE_SUCCESS:
        if (action.response.data.flag) {
          draft.success = true;
          draft.user = action.response.data.user;
        } else {
          draft.success = false;
        }
        break;
    }
  });

export default homeReducer;

import produce from "immer";
import { SIGNUP, SIGNUP_FAILURE, SIGNUP_SUCCESS } from "./constants";

// The initial state of the App
export const initialState = {
  name: "",
  email: "",
  password: "",
  error: false,
  success: false,
};

/* eslint-disable default-case, no-param-reassign */
const signupReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SIGNUP:
        let inputEmail = action.email;
        let inputPassword = action.password;
        let inputName = action.name;
        draft.email = inputEmail;
        draft.password = inputPassword;
        draft.name = inputName;
        break;

      case SIGNUP_SUCCESS:
        draft.error = false;
        draft.success = true;
        break;

      case SIGNUP_FAILURE:
        draft.error = true;
        draft.success = false;
        break;
    }
  });

export default signupReducer;

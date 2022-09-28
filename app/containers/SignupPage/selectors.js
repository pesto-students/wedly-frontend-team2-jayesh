import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectSignup = (state) => state.signup || initialState;

const makeSelectSignupSuccess = () =>
  createSelector(
    selectSignup,
    (signupstate) => signupstate.success
  );

export { selectSignup, makeSelectSignupSuccess };

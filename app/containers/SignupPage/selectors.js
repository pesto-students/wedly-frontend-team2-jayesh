import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectSignup = (state) => state.signup || initialState;

const makeSelectSignupSuccess = () =>
  createSelector(
    selectSignup,
    (signupstate) => signupstate.success
  );

const makeSelectSignupLoading = () =>
  createSelector(
    selectSignup,
    (signupstate) => signupstate.loading
  );

export { selectSignup, makeSelectSignupSuccess, makeSelectSignupLoading };

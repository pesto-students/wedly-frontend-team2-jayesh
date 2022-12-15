/**
 * Homepage selectors
 */

import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectHome = (state) => state.home || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectHome,
    (homeState) => homeState.username
  );

const makeSelectAuth = () =>
  createSelector(
    selectHome,
    (homeState) => homeState.success
  );

const makeSelectUser = () =>
  createSelector(
    selectHome,
    (homeState) => homeState.user
  );

const makeSelectLoading = () =>
  createSelector(
    selectHome,
    (homeState) => homeState.loading
  );

export {
  selectHome,
  makeSelectUsername,
  makeSelectAuth,
  makeSelectUser,
  makeSelectLoading,
};

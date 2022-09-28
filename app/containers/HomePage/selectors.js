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

const makeSelectLoginSuccess = () => 
  createSelector(
    selectHome,
    (homeState) => homeState.success
  );


export { selectHome, makeSelectUsername, makeSelectLoginSuccess };

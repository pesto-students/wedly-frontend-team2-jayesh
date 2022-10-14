import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the mobileEventsPage state domain
 */

const selectMobileEventsPageDomain = state =>
  state.mobileEventsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MobileEventsPage
 */

const makeSelectMobileEventsPage = () =>
  createSelector(
    selectMobileEventsPageDomain,
    substate => substate
  );

export default makeSelectMobileEventsPage;
export { selectMobileEventsPageDomain };

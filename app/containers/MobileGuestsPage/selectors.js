import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the mobileGuestsPage state domain
 */

const selectMobileGuestsPageDomain = state =>
  state.mobileGuestsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MobileGuestsPage
 */

const makeSelectMobileGuestsPage = () =>
  createSelector(
    selectMobileGuestsPageDomain,
    substate => substate
  );

export default makeSelectMobileGuestsPage;
export { selectMobileGuestsPageDomain };

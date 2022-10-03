import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the guestsPage state domain
 */

const selectGuestsPageDomain = state => state.guestsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GuestsPage
 */

const makeSelectGuestsPage = () =>
  createSelector(
    selectGuestsPageDomain,
    substate => substate
  );

export default makeSelectGuestsPage;
export { selectGuestsPageDomain };

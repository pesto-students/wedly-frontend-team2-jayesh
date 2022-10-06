import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the guestsPage state domain
 */

const selectGuestsPageDomain = (state) => state.guestsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GuestsPage
 */

const makeSelectGuests = () =>
  createSelector(
    selectGuestsPageDomain,
    (substate) => substate.guests
  );

const makeSelectIsLoading = () =>
  createSelector(
    selectGuestsPageDomain,
    (substate) => substate.isLoading
  );
export { selectGuestsPageDomain, makeSelectGuests, makeSelectIsLoading };

import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the eventsPage state domain
 */

const selectEventsPageDomain = (state) => state.eventsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EventsPage
 */

const makeSelectEvents = () =>
  createSelector(
    selectEventsPageDomain,
    (substate) => substate.events
  );

const makeSelectisUploading = () =>
  createSelector(
    selectEventsPageDomain,
    (substate) => substate.isUploading
  );
export { selectEventsPageDomain, makeSelectEvents, makeSelectisUploading };

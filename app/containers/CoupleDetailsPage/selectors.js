import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the coupleDetailsPage state domain
 */

const selectCoupleDetailsPageDomain = (state) =>
  state.coupleDetailsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CoupleDetailsPage
 */

const makeSelectCoupleDetailsPage = () =>
  createSelector(
    selectCoupleDetailsPageDomain,
    (substate) => substate.coupleDetails
  );

const makeSelectLoading = () =>
  createSelector(
    selectCoupleDetailsPageDomain,
    (substate) => substate.loading
  );

export {
  selectCoupleDetailsPageDomain,
  makeSelectCoupleDetailsPage,
  makeSelectLoading,
};

import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the einviteEditPage state domain
 */

const selectEinviteEditPageDomain = (state) =>
  state.einviteEditPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EinviteEditPage
 */

const makeSelectEinviteFirstPage = () =>
  createSelector(
    selectEinviteEditPageDomain,
    (substate) => substate.firstPage
  );

const makeSelectEinviteOtherPages = () =>
  createSelector(
    selectEinviteEditPageDomain,
    (substate) => substate.otherPages
  );

const makeSelectLoadingEInvite = () =>
  createSelector(
    selectEinviteEditPageDomain,
    (substate) => substate.loading
  );
export {
  makeSelectEinviteFirstPage,
  selectEinviteEditPageDomain,
  makeSelectEinviteOtherPages,
  makeSelectLoadingEInvite,
};

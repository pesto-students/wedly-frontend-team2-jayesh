import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the einviteEditPage state domain
 */

const selectEinviteEditPageDomain = state =>
  state.einviteEditPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EinviteEditPage
 */

const makeSelectEinviteEditPage = () =>
  createSelector(
    selectEinviteEditPageDomain,
    substate => substate
  );

export default makeSelectEinviteEditPage;
export { selectEinviteEditPageDomain };

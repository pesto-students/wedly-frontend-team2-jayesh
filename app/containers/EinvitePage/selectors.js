import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the einvitePage state domain
 */

const selectEinvitePageDomain = state => state.einvitePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EinvitePage
 */

const makeSelectEinvitePage = () =>
  createSelector(
    selectEinvitePageDomain,
    substate => substate
  );

export default makeSelectEinvitePage;
export { selectEinvitePageDomain };

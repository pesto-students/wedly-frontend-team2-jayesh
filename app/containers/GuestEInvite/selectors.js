import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the guestEInvite state domain
 */

const selectGuestEInviteDomain = state => state.guestEInvite || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GuestEInvite
 */

const makeSelectGuestEInvite = () =>
  createSelector(
    selectGuestEInviteDomain,
    substate => substate
  );

export default makeSelectGuestEInvite;
export { selectGuestEInviteDomain };

import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the guestEInvite state domain
 */

const selectGuestEInviteDomain = (state) => state.guestEInvite || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GuestEInvite
 */

const makeSelectEinvite = () =>
  createSelector(
    selectGuestEInviteDomain,
    (substate) => substate.einvite
  );

const makeSelectLoading = () =>
  createSelector(
    selectGuestEInviteDomain,
    (substate) => substate.loading
  );

const makeSelectGuestEInvite = () =>
  createSelector(
    selectGuestEInviteDomain,
    (substate) => substate.einvite
  );

export {
  selectGuestEInviteDomain,
  makeSelectEinvite,
  makeSelectLoading,
  makeSelectGuestEInvite,
};

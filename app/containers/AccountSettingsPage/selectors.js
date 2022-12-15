import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the accountSettingsPage state domain
 */

const selectAccountSettingsPageDomain = (state) =>
  state.accountSettingsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AccountSettingsPage
 */

const makeSelectAccountSettingsPage = () =>
  createSelector(
    selectAccountSettingsPageDomain,
    (substate) => substate
  );

const makeSelectAccountLoading = () =>
  createSelector(
    selectAccountSettingsPageDomain,
    (substate) => substate.loading
  );

export default makeSelectAccountSettingsPage;
export { selectAccountSettingsPageDomain, makeSelectAccountLoading };

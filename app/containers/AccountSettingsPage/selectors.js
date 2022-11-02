import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the accountSettingsPage state domain
 */

const selectAccountSettingsPageDomain = state =>
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
    substate => substate
  );

export default makeSelectAccountSettingsPage;
export { selectAccountSettingsPageDomain };

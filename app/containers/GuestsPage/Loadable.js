/**
 *
 * Asynchronously loads the component for GuestsPage
 *
 */

import loadable from "utils/loadable";

export default loadable(() => import("./index"));

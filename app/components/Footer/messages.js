/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from "react-intl";

export const scope = "boilerplate.components.Footer";

export default defineMessages({
  copyrightMessage: {
    id: `${scope}.copyright.message`,
    defaultMessage: "© 2022",
  },
  authorMessage: {
    id: `${scope}.author.message`,
    defaultMessage: `
      Terms and Conditions | Privacy Policy
    `,
  },
});

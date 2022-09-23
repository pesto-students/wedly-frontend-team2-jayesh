/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from "react-intl";

export const scope = "boilerplate.components.Header";

export default defineMessages({
  login: {
    id: `${scope}.login`,
    defaultMessage: "Login",
  },
  signup: {
    id: `${scope}.signup`,
    defaultMessage: "Signup",
  },
  getStarted: {
    id: `${scope}.getStarted`,
    defaultMessage: "Get Started",
  },
  heading: {
    id: `${scope}.heading`,
    defaultMessage: "When your Dream Wedding come true",
  },
  subHeading: {
    id: `${scope}.subHeading`,
    defaultMessage: `"Once in a while, right in the middle of an ordinary life, love gives
    us a fairy tale."`,
  },
  weddingDetails: {
    id: `${scope}.weddingDetails`,
    defaultMessage: 'Wedding Details',
  },
  einvites: {
    id: `${scope}.einvites`,
    defaultMessage: 'E-Invites',
  },
  reminders: {
    id: `${scope}.reminders`,
    defaultMessage: 'Reminders',
  },
  eaashirvaad: {
    id: `${scope}.eaashirvaad`,
    defaultMessage: 'E-Aashirvaad',
  },
  });

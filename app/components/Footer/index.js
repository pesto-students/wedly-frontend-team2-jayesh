import React from "react";
import { FormattedMessage } from "react-intl";
import messages from "./messages";

function Footer() {
  return (
    <footer className="flex justify-between bg-white p-3 md:p-4">
      <section className="text-xs md:text-md">
        <FormattedMessage {...messages.copyrightMessage} />
      </section>
      <section className="text-xs md:text-md">
        <FormattedMessage {...messages.authorMessage} />
      </section>
    </footer>
  );
}

export default Footer;

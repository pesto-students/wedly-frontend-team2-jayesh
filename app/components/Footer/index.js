import React from "react";
import { FormattedMessage } from "react-intl";
import messages from "./messages";

function Footer() {
  return (
    <footer className="flex justify-between bg-white p-4 md:p-4 absolute bottom-0 w-full max-h-[200px]">
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

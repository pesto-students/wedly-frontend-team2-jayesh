import React from "react";
import { FormattedMessage } from "react-intl";

function H1({ text, classes }) {
  return (
    <h1 className={classes}>
      <FormattedMessage {...text} />
    </h1>
  );
}

export default H1;

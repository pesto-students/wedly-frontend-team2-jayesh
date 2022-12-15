import React from "react";
import { FormattedMessage } from "react-intl";

function H3({ text, classes }) {
  return (
    <h3 className={classes}>
      <FormattedMessage {...text} />
    </h3>
  );
}

export default H3;

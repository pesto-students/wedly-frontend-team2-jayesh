import React from "react";
import { FormattedMessage } from "react-intl";

export default function Button({ text, onClickFunction, classes }) {
  return (
    <button
      className={`bg-wedlyPink rounded-xl md:text-lg text-white py-2 px-5 ${classes}`}
      onClick={onClickFunction}
    >
      <FormattedMessage {...text} />
    </button>
  );
}

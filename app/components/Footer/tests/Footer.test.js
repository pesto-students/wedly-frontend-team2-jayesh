import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import { IntlProvider } from "react-intl";

import Footer from "../index";

describe("<Footer/>", () => {
  it("should have footer", () => {
    const { container } = render(
      <IntlProvider locale="en">
        <Footer />
      </IntlProvider>
    );
    expect(container.querySelector("footer")).toBeVisible();
  });
});

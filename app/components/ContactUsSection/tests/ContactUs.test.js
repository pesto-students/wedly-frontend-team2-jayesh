import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";

import ContactUs from "../index";

describe("<ContactUs/>", () => {
  it("should have main section", () => {
    const { container } = render(<ContactUs/>);
    expect(container.querySelector("section")).toBeVisible();
  });
});
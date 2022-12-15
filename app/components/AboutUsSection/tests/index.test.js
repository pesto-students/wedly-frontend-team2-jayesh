import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";

import AboutUs from "../index";

describe("<AboutUs/>", () => {
  it("should have text", () => {
    const { container } = render(<AboutUs/>);
    expect(container.querySelector("p")).toBeVisible();
  });
});
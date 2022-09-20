import React from "react";
import Logo from "./wedly_logo.svg";
export default function NavBar() {
  return (
    <div className="bg-white flex justify-between">
      <img src={Logo} alt="wedly logo" />
    </div>
  );
}

import React from "react";
import NavBar from "./NavBar";
import MobileNavbar from "./MobileNavbar";

function Header({ user }) {
  return (
    !window.location.href.includes("/einvite/view") && (
      <>
        <NavBar user={user} />
        <MobileNavbar user={user} />
      </>
    )
  );
}

export default Header;

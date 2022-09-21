import React from "react";
import Button from "../Button";
import messages from "./messages";
import Logo from "./wedly_logo.svg";
export default function NavBar() {
  return (
    <div className="bg-white flex justify-between py-2 px-2 w-full">
      <img src={Logo} alt="wedly logo" />
      <div className="flex ">
        <Button text={messages.login} />
        <Button text={messages.signup} classes="ml-3" />
      </div>
    </div>
  );
}

import React from "react";
import Button from "../Button";
import messages from "../Header/messages";
import H1 from "../H1";
import H3 from "../H3";
export default function HeroSection() {
  return (
    <div className="hero-background flex flex-col justify-end items-center p-4">
        <H1
          classes="text-white text-4xl font-extrabold leading-3"
          text={messages.heading}
        />
        <H3
          classes="text-white text-2xl font-semibold mb-3"
          text={messages.subHeading}
        />
        <Button classes="font-semibold" text={messages.getStarted} />
    </div>
  );
}

import React from "react";
import { features } from "./features";
export default function FeaturesSection() {
  return (
    <div className="flex justify-around items-center mt-10">
      {features.map(({ text, logo }) => (
        <div className="flex items-center" key={Math.random()}>
          <img src={logo} alt={`${text}.logo`} />
          <p className="ml-4 font-semibold text-menuGrey">{text}</p>
        </div>
      ))}
    </div>
  );
}

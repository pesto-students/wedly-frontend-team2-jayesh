import React from "react";
import { features } from "./features";
export default function FeaturesSection() {
  return (
    <div className="flex flex-col md:flex-row md:justify-around items-center mt-10">
      {features.map(({ text, logo }) => (
        <div
          className="p-3 flex w-full justify-center md:w-fit items-center"
          key={Math.random()}
        >
          <img className="w-9 lg:w-fit" src={logo} alt={`${text}.logo`} />
          <p className="ml-4 w-1/2 md:w-fit font-semibold text-menuGrey">
            {text}
          </p>
        </div>
      ))}
    </div>
  );
}

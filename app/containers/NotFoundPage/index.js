/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from "react";
import history from "../../utils/history";

export default function NotFound() {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <center className="mt-24 m-auto">
        <div className=" tracking-widest mt-4">
          <span className="text-gray-500 text-6xl block">
            <span>4 0 4</span>
          </span>
          <span className="text-gray-500 text-xl">
            Sorry, We couldn't find what you are looking for!
          </span>
        </div>
      </center>
      <center className="mt-6">
        <a
          onClick={() => history.push("/")}
          className="cursor-pointer text-gray-500 font-mono text-xl bg-gray-200 p-3 rounded-md hover:shadow-md"
        >
          Go back
        </a>
      </center>
    </div>
  );
}

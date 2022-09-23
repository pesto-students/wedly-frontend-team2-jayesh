import React from "react";
import Inverted_Commas from "./inverted_commas.svg";
function Feedback({ feedback }) {
  const { image, name, place, content } = feedback;
  return (
      <div className="rounded overflow-hidden shadow-lg bg-white px-6">
        <div className="flex pt-4 items-center">
          <img className="h-12" src={image} alt={name} />
          <div className="flex flex-col justify-center items-start p-3">
            <p className="font-bold mb-2">{name}</p>
            <p>{place}</p>
          </div>
        </div>
        <div className="py-4">
          <img className="h-5 mb-2" src={Inverted_Commas} alt="inverted commas"/>
          <p className="text-gray-700 text-base">{content}</p>
        </div>
      </div>
  );
}

export default Feedback;

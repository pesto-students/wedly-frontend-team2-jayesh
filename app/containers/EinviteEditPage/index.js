import React, { useState } from "react";
import { templates } from "../../utils/eInviteTemplates";
import EinviteFirstPage from "../../components/EinviteFirstPage";
import EinviteOtherPage from "../../components/EinviteOtherPage";

export default function EinviteEditPage() {
  const location = window.location.href;
  let array = location.split("/");
  let id = array[array.length - 1];

  const template = templates[id - 1];
  const [selectedPage, setSelectedPage] = useState(1);
  const pageData = [
    {
      pageNumber: 1,
    },
    {
      pageNumber: 2,
    },
    {
      pageNumber: 3,
    },
    {
      pageNumber: 4,
    },
  ];
  return (
    <div className=" flex flex-col mt-3">
      <div className="flex items-center justify-center">
        <div className="flex justify-around w-[500px]">
          {pageData.map((page, index) => (
            <button
              type="submit"
              className={`py-1 md:py-2 px-3 md:px-5 text-xs font-medium text-center rounded-lg border border-solid ${
                page.pageNumber === selectedPage
                  ? "border-pink  bg-[#FFEDF2]"
                  : "bg-[#F4F4F4]"
              }  shadow-md`}
              onClick={() => setSelectedPage(page.pageNumber)}
              key={index}
            >
              Page {page.pageNumber}
            </button>
          ))}
        </div>
      </div>

      {selectedPage === 1 ? (
        <EinviteFirstPage template={template} />
      ) : (
        <EinviteOtherPage page={selectedPage} template={template} />
      )}
    </div>
  );
}

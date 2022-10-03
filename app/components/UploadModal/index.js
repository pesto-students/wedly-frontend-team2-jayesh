import React from "react";
import { AiOutlineCloudUpload, AiOutlineCloseCircle } from "react-icons/ai";

export default function UploadModal({ isOpen, setIsOpen }) {
  return (
    <div className="overflow-y-hidden overflow-x-hidden fixed top-1/3 left-1/2 z-50 w-1/4 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col items-center p-2 rounded-lg text-center">
      <AiOutlineCloseCircle
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-0 right-0 m-2"
      />
      <AiOutlineCloudUpload
        size="3rem"
        className="mt-2 rounded-full p-2 bg-mainTheme"
      />
      <input
        id="upload"
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        className=" "
        hidden
      />
      <label
        htmlFor="upload"
        className="cursor-pointer text-xl font-semibold text-wedlyPink"
      >
        Choose file
      </label>
      <p className="cursor-pointer text-xs underline font-medium text-[#0E62AA]">
        Download Sample csv
      </p>
      <p className="mt-2">Only .xls and .csv accepted (Max 1MB)</p>
    </div>
  );
}

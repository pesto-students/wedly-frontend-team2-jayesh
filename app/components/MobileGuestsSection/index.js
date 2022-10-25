import React, { useState, useEffect, useRef, memo } from "react";
import useOnClickOutside from "use-onclickoutside";
import {
  AiOutlineInfoCircle,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsPlusLg, BsThreeDotsVertical } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import UploadModal from "../UploadModal";
import AddGuestModal from "../AddGuestModal";
import searchByName from "../../utils/searchByName";

export default function MobileGuestsSection({
  guests,
  deleteGuest,
  user,
  sendInvite,
  selectedGuests,
  searchTerm,
  setSearchTerm,
  setSelectedGuests
}) {
  const ref = useRef();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isUpdate, setIsUpdate] = useState([]);
  const [isUpdateOrDelete, setIsUpdateOrDelete] = useState([]);

  useEffect(() => {
    setIsUpdateOrDelete(new Array(selectedGuests.length).fill(false));
    setIsUpdate(new Array(selectedGuests.length).fill(false));
  }, [selectedGuests]);

  useOnClickOutside(ref, () =>
    setIsUpdateOrDelete(new Array(selectedGuests.length).fill(false))
  );
  const invite = async (from, to, mobile, userId) => {
    setIsSending(true);
    await sendInvite(from, to, mobile, userId);
    setIsSending(false);
  };
  return (
    <div className="block lg:hidden">
      <div
        className={`${
          isAddOpen || isUploadOpen || isUpdate.filter((item) => item).length
            ? "opacity-50 pointer-events-none"
            : "opacity-100"
        } w-full bg-gray-100 relative`}
      >
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
          <div className="flex flex-col">
            <div className="flex justify-between items-center px-1  xs:px-2">
              <div className="flex items-center py-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  Guest Details
                </h3>
              </div>

              <div className="flex py-2">
                <button
                  type="submit"
                  className="flex items-center text-white bg-[#44A300] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-1.5 text-center shadow"
                  onClick={() => setIsUploadOpen(!isUploadOpen)}
                >
                  <HiDownload size="1.1rem" className="mr-1" />
                  Import
                </button>
              </div>
            </div>
            <div className=" flex justify-center">
              <div className="relative w-4/5">
                <input
                  type="search"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-lg focus:outline-none"
                  placeholder="Enter guest's name"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="absolute top-0.5 right-0.5 p-2 text-sm font-medium bg-pink rounded-lg text-white hover:text-pink hover:bg-white"
                  onClick={() => {
                    setSelectedGuests(searchByName(guests, searchTerm));
                  }}
                >
                  <AiOutlineSearch size="1.25rem" />
                </button>
              </div>
            </div>
            <div className="p-2 flex flex-wrap gap-4 justify-center mb-[100px] mt-4">
              <div
                className="p-1.5 flex flex-col bg-pink w-[45%] rounded-md justify-center items-center text-white font-semibold space-y-2 cursor-pointer"
                onClick={() => setIsAddOpen(!isAddOpen)}
              >
                <BsPlusLg size="1.5rem" />
                <div className="text-center">Add a Guest </div>
              </div>
              {selectedGuests.length !== 0 &&
                selectedGuests.map((guestDetails, index) => {
                  return (
                    <div className="p-1.5 flex flex-col bg-white w-[45%] rounded-md justify-between relative" key={guestDetails._id}>
                      <div>
                        <BsThreeDotsVertical
                          size="1rem"
                          className="float-right text-black cursor-pointer"
                          onClick={() =>
                            setIsUpdateOrDelete((prevState) =>
                              prevState.map((item, idx) =>
                                idx === index ? !item : item
                              )
                            )
                          }
                        />
                        {isUpdateOrDelete[index] && (
                          <div
                            ref={ref}
                            className="flex flex-col p-1.5 space-y-1 absolute right-4 top-3 bg-mainTheme rounded-md z-10"
                          >
                            <h6
                              className="font-normal text-xs flex items-center"
                              onClick={() => {
                                setIsUpdate((prevState) =>
                                  prevState.map((item, idx) =>
                                    idx === index ? !item : item
                                  )
                                );
                              }}
                            >
                              <AiOutlineEdit
                                className="mr-1 text-black"
                                size="1rem"
                              />
                              Edit
                            </h6>
                            <h6
                              className="cursor-pointer font-normal text-xs flex items-center"
                              onClick={() => deleteGuest(guestDetails._id)}
                            >
                              <AiOutlineDelete
                                className="mr-1 text-red-500"
                                size="1rem"
                              />
                              Delete
                            </h6>
                          </div>
                        )}
                        <h3 className="text-sm font-semibold text-gray-900">
                          {guestDetails.name}
                        </h3>
                        <div className="text-xs text-gray-900 mt-1">
                          {guestDetails.mobile}
                        </div>
                        <div className="text-xs text-gray-900">
                          {guestDetails.email}
                        </div>
                      </div>
                      <div className="flex justify-center items-center mt-2">
                        <button
                          className="bg-pink rounded-xl text-white py-1 px-2 text-xs xs:w-1/2"
                          onClick={() => {
                            invite(
                              user.name,
                              guestDetails.name,
                              guestDetails.mobile,
                              user._id
                            );
                          }}
                        >
                          Invite
                        </button>
                        <AiOutlineInfoCircle
                          size="1rem"
                          className=" text-black"
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      {isAddOpen && (
        <AddGuestModal role="add" isOpen={isAddOpen} setIsOpen={setIsAddOpen} />
      )}
      {isUploadOpen && (
        <UploadModal
          role="guest"
          isOpen={isUploadOpen}
          setIsOpen={setIsUploadOpen}
        />
      )}
      {isUpdate.indexOf(true) >= 0 && (
        <AddGuestModal
          role="update"
          index={isUpdate.indexOf(true)}
          guest={selectedGuests[isUpdate.indexOf(true)]}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          guests={selectedGuests}
        />
      )}
    </div>
  );
}
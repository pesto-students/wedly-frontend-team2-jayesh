import React, { useState, useEffect, memo } from "react";
import {
  AiOutlineInfoCircle,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import UploadModal from "../UploadModal";
import AddGuestModal from "../AddGuestModal";
import searchByName from "../../utils/searchByName";
import ReactTooltip from "react-tooltip";
import { connect } from "react-redux";
import { compose } from "redux";
import { UPDATE_GUEST } from "../../containers/GuestsPage/constants";
import LoadingIndicator from "../LoadingIndicator";

const tableHeaders = ["Guest Name", "Guest Contact Number", "Guest Email"];
function GuestsSection({
  guests,
  deleteGuest,
  user,
  sendInvite,
  selectedGuests,
  setSelectedGuests,
  searchTerm,
  setSearchTerm,
  handleChange,
  loading,
}) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState([]);
  const invite = async (guestId, from, to, mobile, userId) => {
    await sendInvite(from, to, mobile, userId);
  };
  useEffect(() => {
    setIsUpdate(new Array(selectedGuests.length).fill(false));
  }, [selectedGuests]);
  return (
    <div className="hidden lg:block">
      <div
        className={`${
          isAddOpen ||
          isUploadOpen ||
          isUpdate.filter((item) => item).length ||
          loading
            ? "opacity-50 pointer-events-none"
            : "opacity-100"
        } w-full bg-gray-100 relative`}
      >
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-12">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center py-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  Guest Details
                </h3>
              </div>
              <div className="relative w-full basis-1/2">
                <input
                  type="text"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-lg focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  placeholder="Enter guest's name"
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
              <div className="flex py-2">
                <button
                  type="submit"
                  className="flex items-center text-white bg-[#44A300] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow mr-4"
                  onClick={() => setIsUploadOpen(!isUploadOpen)}
                >
                  <HiDownload size="1.1rem" className="mr-1" />
                  Import
                </button>
                <button
                  type="submit"
                  className="flex items-center text-white bg-[#3498DB] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow"
                  onClick={() => setIsAddOpen(!isAddOpen)}
                >
                  <BsPlusLg size="0.7rem" className="mr-1" />
                  Add a Guest
                </button>
              </div>
            </div>
            {selectedGuests.length !== 0 ? (
              <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-24">
                <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 tracking-wider">
                        <th className="px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            name="allSelect"
                            checked={
                              !selectedGuests.some(
                                (guest) => guest.isChecked !== true
                              ) || false
                            }
                            onChange={handleChange}
                          />
                        </th>
                        {tableHeaders.map((tableHeader, index) => (
                          <th
                            className="px-6 py-3 text-left font-medium"
                            key={index}
                          >
                            {tableHeader}
                          </th>
                        ))}
                        <th className="px-6 py-3 text-center font-medium">
                          <button className="bg-pink rounded-xl text-white py-1 px-4 mr-1">
                            Invite selected guests
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {selectedGuests.map((guest, index) => {
                        return (
                          <tr
                            className={index % 2 && `bg-[#f7f8ff]`}
                            key={guest._id}
                          >
                            <td className="px-6 py-4 whitespace-no-wrap ">
                              <input
                                type="checkbox"
                                name={guest._id}
                                checked={guest.isChecked || false}
                                onChange={handleChange}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap ">
                              <div className="text-sm leading-5 text-gray-900">
                                {guest.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap ">
                              <div className="text-sm leading-5 text-gray-900">
                                {guest.mobile}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap ">
                              <div className="text-sm leading-5 text-gray-900">
                                {guest.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap  text-sm leading-5 text-gray-500 flex items-center justify-around">
                              <div className="flex items-center justify-between">
                                {!guest.isInvited ? (
                                  <button
                                    onClick={() => {
                                      invite(
                                        guest._id,
                                        user.name,
                                        guest.name,
                                        guest.mobile,
                                        user._id
                                      );
                                    }}
                                    className="bg-pink rounded-xl text-white py-1 px-4 mr-1"
                                  >
                                    Invite
                                  </button>
                                ) : (
                                  <button
                                    disabled
                                    className="bg-pink rounded-xl text-white py-1 px-4 mr-1"
                                  >
                                    Invited
                                  </button>
                                )}
                                <button data-tip data-for="invite">
                                  <AiOutlineInfoCircle
                                    size="1rem"
                                    className="cursor-pointer text-black"
                                  />
                                </button>
                                <ReactTooltip
                                  id="invite"
                                  place="top"
                                  effect="solid"
                                >
                                  Sends invitation to the given Whatsapp number
                                </ReactTooltip>
                              </div>
                              <AiOutlineEdit
                                onClick={() =>
                                  setIsUpdate((prevState) =>
                                    prevState.map((item, idx) =>
                                      idx === index ? !item : item
                                    )
                                  )
                                }
                                size="1.5rem"
                                className="cursor-pointer text-black"
                              />
                              <AiOutlineDelete
                                onClick={() => deleteGuest(guest._id)}
                                size="1.5rem"
                                className="cursor-pointer text-red-500"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <LoadingIndicator />
            )}
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

export function mapDispatchToProps(dispatch) {
  return {
    updateGuest: (updateObj) => {
      dispatch({ type: UPDATE_GUEST, updateObj });
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(GuestsSection);

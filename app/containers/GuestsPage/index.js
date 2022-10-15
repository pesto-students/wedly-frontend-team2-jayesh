import React, { useState, memo, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import homeReducer from "../HomePage/reducer";
import saga from "./saga";
import {
  AiOutlineInfoCircle,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import UploadModal from "../../components/UploadModal";
import AddGuestModal from "../../components/AddGuestModal";
import { makeSelectGuests, makeSelectIsLoading } from "./selectors";
import { DELETE_GUEST, GET_GUEST, SEND_INVITE } from "./constants";
import { makeSelectUser } from "../HomePage/selectors";

const tableHeaders = ["Guest Name", "Guest Contact Number", "Guest Email"];
export function GuestsPage({
  guests,
  getGuests,
  deleteGuest,
  user,
  sendInvite,
}) {
  useInjectReducer({ key: "guestsPage", reducer });
  useInjectReducer({ key: "home", reducer: homeReducer });
  useInjectSaga({ key: "guestsPage", saga });
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isUpdate, setIsUpdate] = useState(new Array(100).fill(false));

  const invite = async (from, to, mobile, userId) => {
    setIsSending(true);
    await sendInvite(from, to, mobile, userId);
    setIsSending(false);
  };

  console.log(isSending, "Sending");
  useEffect(() => {
    getGuests();
  }, []);

  return (
    <div>
      <div
        className={`${
          isAddOpen || isUploadOpen ? "opacity-50" : "opacity-100"
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
                  type="search"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-lg"
                  placeholder="Enter guest's name"
                />
                <button
                  type="submit"
                  className="absolute top-0.5 right-0.5 p-2 text-sm font-medium text-white bg-pink rounded-lg"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
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
            <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-24">
              <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 tracking-wider">
                      <th className="px-6 py-3 text-left">
                        <input type="checkbox" />
                      </th>
                      {tableHeaders.map((tableHeader) => (
                        <th className="px-6 py-3 text-left font-medium">
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
                    {guests.length !== 0
                      ? guests.map((guest, index) => {
                          return (
                            <tr className={index % 2 && `bg-[#f7f8ff]`}>
                              <td className="px-6 py-4 whitespace-no-wrap ">
                                <input type="checkbox" />
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
                                  <button
                                    onClick={() => {
                                      invite(
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
                                  <AiOutlineInfoCircle
                                    size="1rem"
                                    className=" text-black"
                                  />
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
                              {isUpdate[index] && (
                                <AddGuestModal
                                  role="update"
                                  index={index}
                                  guest={guest}
                                  isOpen={isUpdate}
                                  setIsOpen={setIsUpdate}
                                />
                              )}
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>
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
    </div>
  );
}

GuestsPage.propTypes = { dispatch: PropTypes.func.isRequired };

const mapStateToProps = createStructuredSelector({
  guests: makeSelectGuests(),
  isLoading: makeSelectIsLoading(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGuests: () => {
      dispatch({ type: GET_GUEST });
    },
    deleteGuest: (id) => {
      dispatch({ type: DELETE_GUEST, id });
    },
    sendInvite: (from, to, mobile, userId) => {
      dispatch({ type: SEND_INVITE, from, to, mobile, userId });
    },
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(
  withConnect,
  memo
)(GuestsPage);

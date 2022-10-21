import React, { useState, memo, useEffect, useRef } from "react";
import useOnClickOutside from "use-onclickoutside";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "../GuestsPage//reducer";
import homeReducer from "../HomePage/reducer";
import saga from "../GuestsPage//saga";
import {
  AiOutlineInfoCircle,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { BsPlusLg, BsThreeDotsVertical } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import UploadModal from "../../components/UploadModal";
import AddGuestModal from "../../components/AddGuestModal";
import { makeSelectGuests, makeSelectIsLoading } from "../GuestsPage/selectors";
import { DELETE_GUEST, GET_GUEST, SEND_INVITE } from "../GuestsPage/constants";
import { makeSelectUser } from "../HomePage/selectors";

export function MobileGuestsPage({
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
  const [isUpdateOrDelete, setIsUpdateOrDelete] = useState([]);
  console.log(isSending, "Sending");
  useEffect(() => {
    getGuests();
  }, []);

  useEffect(() => {
    setIsUpdateOrDelete(new Array(guests.length).fill(false));
    setIsUpdate(new Array(guests.length).fill(false));
  }, [guests]);
  const ref = useRef();
  useOnClickOutside(ref, () =>
    setIsUpdateOrDelete(new Array(guests.length).fill(false))
  );
  const invite = async (from, to, mobile, userId) => {
    setIsSending(true);
    await sendInvite(from, to, mobile, userId);
    setIsSending(false);
  };

  return (
    <div>
      <div
        className={`${
          isAddOpen || isUploadOpen || isUpdate.filter((item) => item).length ? "opacity-50 pointer-events-none" : "opacity-100"
        } w-full bg-gray-100 relative`}
      >
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-12">
          <div className="flex flex-col">
            <div className="flex justify-around items-center">
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
              </div>
            <div className="p-2 flex flex-wrap gap-2 justify-center mb-[100px]">
              <div
                className="p-1.5 flex flex-col bg-pink w-[45%] rounded-md justify-center items-center text-white font-semibold space-y-2"
                onClick={() => setIsAddOpen(!isAddOpen)}
              >
                <BsPlusLg size="1.5rem" />
                <div className="text-center">Add a Guest </div>
              </div>
              {guests.length > 0 &&
                guests.map((guestDetails, index) => (
                  <div
                    className="p-1.5 flex flex-col bg-white w-[45%] rounded-md justify-between relative"
                    key={guestDetails._id}
                  >
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
                    <div className="flex justify-center items-center">
                      <button
                        className="bg-pink rounded-xl text-white py-1 px-2 text-xs xs:w-1/2"
                        onClick={() => {
                          invite(user.name, guest.name, guest.mobile, user._id);
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
                ))}
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
          guest={guests[isUpdate.indexOf(true)]}
          isOpen={isUpdate}
          setIsOpen={setIsUpdate}
        />
      )}
    </div>
  );
}

MobileGuestsPage.propTypes = { dispatch: PropTypes.func.isRequired };

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
)(MobileGuestsPage);

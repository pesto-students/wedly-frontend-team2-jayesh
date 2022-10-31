import React, { memo, useState } from "react";
import { AiOutlineCloseCircle } from "@react-icons/all-files/ai/AiOutlineCloseCircle";
import { connect } from "react-redux";
import { compose } from "redux";
import { ADD_GUEST, UPDATE_GUEST } from "../../containers/GuestsPage/constants";

function AddGuestModal({
  isOpen,
  setIsOpen,
  addGuest,
  role,
  guest,
  updateGuest,
  setIsUpdate,
  guests,
}) {
  const [input, setInput] = useState({
    name: role === "add" ? "" : guest.name,
    email: role === "add" ? "" : guest.email,
    mobile: role === "add" ? "" : guest.mobile,
  });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = () => {
    if (role === "add") {
      setIsOpen(!isOpen);
    } else {
      setIsUpdate(new Array(guests.length).fill(false));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (role === "add") {
      await addGuest(input.name, input.mobile, input.email);
      setIsOpen(!isOpen);
    } else {
      await updateGuest({
        id: guest._id,
        name: input.name,
        mobile: input.mobile,
        email: input.email,
      });
      setIsUpdate(new Array(guests.length).fill(false));
    }
  };

  return (
    <div className="guest-modal overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 z-40 w-4/5 lg:w-1/3 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col py-4 pl-8 rounded-lg">
      <AiOutlineCloseCircle
        onClick={() => handleClick()}
        className="absolute top-0 right-0 m-2 cursor-pointer"
      />
      <h3 className="mt-3 mb-2 md:mb-4 text-xl font-medium text-gray-900">
        {role === "add" ? "Add " : "Update "}
        Guest
      </h3>
      <form
        className="space-y-3 md:space-y-6"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div>
          <label
            htmlFor="name"
            className="block mb-1 md:mb-2 text-sm font-medium text-gray-900"
          >
            Guest Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter guest name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-1.5 py-2 md:p-2.5"
            required
            value={input.name}
            onChange={onInputChange}
          />
        </div>
        <div>
          <label
            htmlFor="mobile"
            className="block mb-1 md:mb-2 text-sm font-medium text-gray-900"
          >
            Guest Contact Number
          </label>
          <input
            type="tel"
            name="mobile"
            id="mobile"
            placeholder="Enter contact number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-1.5 py-2 md:p-2.5"
            required
            value={input.mobile}
            onChange={onInputChange}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-1 md:mb-2 text-sm font-medium text-gray-900"
          >
            Guest Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-1.5 py-2 md:p-2.5"
            required
            value={input.email}
            onChange={onInputChange}
          />
        </div>
        <div className="w-11/12 flex justify-end">
          <button className="bg-pink rounded-lg text-white py-3 px-4">
            {role === "add" ? "Add" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    addGuest: (name, mobile, email) => {
      dispatch({ type: ADD_GUEST, name, mobile, email });
    },
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
)(AddGuestModal);

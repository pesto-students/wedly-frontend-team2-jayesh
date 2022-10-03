import React, { memo, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { connect } from "react-redux";
import { compose } from "redux";
import { ADD_EVENT, GET_EVENT } from "../../containers/EventsPage/constants";
import { useInjectReducer } from "../../utils/injectReducer";
import { useInjectSaga } from "../../utils/injectSaga";
import reducer from "../../containers/EventsPage/reducer";
import saga from "../../containers/EventsPage/saga";

function UploadModal({ isOpen, setIsOpen, addEvent }) {
  useInjectReducer({ key: "eventsPage", reducer });
  useInjectSaga({ key: "eventsPage", saga });
  const [input, setInput] = useState({
    name:"",
    email:"",
    mobile:"",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addEvent(
      input.category,
      input.customEvent,
      input.date,
      input.time,
      input.eventVenue
    );
  };

  return (
    <div className="overflow-y-hidden overflow-x-hidden fixed top-1/2 left-1/2 z-50 w-1/3 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col py-4 pl-8 rounded-lg">
      <AiOutlineCloseCircle
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-0 right-0 m-2"
      />
      <h3 className="mt-3 mb-2 md:mb-4 text-xl font-medium text-gray-900">
        Add Guest
      </h3>
      <form
        class="space-y-3 md:space-y-6"
        onSubmit={(event) => {
          handleSubmit(event);
          setIsOpen(!isOpen);
        }}
      >
        <div>
          <label
            for="name"
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
            for="mobile"
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
            for="email"
            className="block mb-1 md:mb-2 text-sm font-medium text-gray-900"
          >
            Guest Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-1.5 py-2 md:p-2.5"
            required
            value={input.email}
            onChange={onInputChange}
          />
        </div>
        <div className="w-11/12 flex justify-end">
          <button className="bg-pink rounded-lg text-white py-3 px-4">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    addEvent: (category, customEvent, date, time, venue) => {
      dispatch({ type: ADD_EVENT, category, customEvent, date, time, venue });
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
)(UploadModal);

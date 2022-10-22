import React, { memo, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { options } from "../../utils/constants";
import { connect } from "react-redux";
import { compose } from "redux";
import { ADD_EVENT, UPDATE_EVENT } from "../../containers/EventsPage/constants";
import { useInjectReducer } from "../../utils/injectReducer";
import { useInjectSaga } from "../../utils/injectSaga";
import reducer from "../../containers/EventsPage/reducer";
import saga from "../../containers/EventsPage/saga";
import { getMinDate } from "../../utils/functions";

function AddEventModal({
  isOpen,
  setIsOpen,
  addEvent,
  role,
  eventDetails,
  index,
  updateEvent,
}) {
  useInjectReducer({ key: "eventsPage", reducer });
  useInjectSaga({ key: "eventsPage", saga });
  const [input, setInput] = useState({
    category:
      role === "add"
        ? "Category"
        : eventDetails.category
        ? eventDetails.category
        : "Other",
    date: role === "add" ? "" : eventDetails.date.split("T")[0],
    time: role === "add" ? "" : eventDetails.time,
    eventVenue: role === "add" ? "" : eventDetails.venue,
    customEvent: role === "add" ? "" : eventDetails.customEvent,
  });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (role === "add") {
      await addEvent(
        input.category,
        input.customEvent,
        input.date,
        input.time,
        input.eventVenue
      );
    } else {
      await updateEvent({
        id: eventDetails._id,
        category: input.category,
        customEvent: input.customEvent,
        date: input.date,
        time: input.time,
        venue: input.eventVenue,
      });
      window.location.reload();
    }
  };

  const handleClick = (index) => {
    if (role === "add") {
      setIsOpen(!isOpen);
    } else {
      setIsOpen((prevState) =>
        prevState.map((item, idx) => (idx === index ? !item : item))
      );
    }
  };

  return (
    <div className="overflow-y-hidden overflow-x-hidden fixed top-1/2 left-1/2 z-40 w-4/5 lg:w-1/3 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col py-4 pl-8 rounded-lg">
      <AiOutlineCloseCircle
        onClick={() => handleClick(index)}
        className="absolute top-0 right-0 m-2"
      />
      <h3 className="mt-3 mb-2 md:mb-4 text-xl font-medium text-gray-900">
        {role === "add" ? "Add" : "Update"} Event
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
            htmlFor="category"
            className="block mb-1 md:mb-2 text-sm font-medium text-gray-900"
          >
            Event Category
          </label>
          <select
            name="category"
            onChange={onInputChange}
            value={input.category}
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-1.5 py-2 md:p-2.5"
          >
            <option>Category</option>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        {input.category === "Other" && (
          <div>
            <label
              for="customEvent"
              className="block mb-1 md:mb-2 text-sm font-medium text-gray-900"
            >
              Event Name
            </label>
            <input
              type="text"
              name="customEvent"
              id="customEvent"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-1.5 py-2 md:p-2.5"
              required
              value={input.customEvent}
              onChange={onInputChange}
            />
          </div>
        )}
        <div>
          <label
            for="date"
            className="block mb-1 md:mb-2 text-sm font-medium text-gray-900"
          >
            Event Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-1.5 py-2 md:p-2.5"
            required
            value={input.date}
            onChange={onInputChange}
            min={getMinDate()}
          />
        </div>
        <div>
          <label
            for="time"
            className="block mb-1 md:mb-2 text-sm font-medium text-gray-900"
          >
            Event Time
          </label>
          <input
            type="time"
            name="time"
            id="time"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-1.5 py-2 md:p-2.5"
            required
            value={input.time}
            onChange={onInputChange}
          />
        </div>
        <div>
          <label
            for="eventVenue"
            className="block mb-1 md:mb-2 text-sm font-medium text-gray-900"
          >
            Event Venue
          </label>
          <input
            type="text"
            name="eventVenue"
            id="eventVenue"
            placeholder="Enter the venue of event"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-1.5 py-2 md:p-2.5"
            required
            value={input.eventVenue}
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
    addEvent: (category, customEvent, date, time, venue) => {
      dispatch({ type: ADD_EVENT, category, customEvent, date, time, venue });
    },
    updateEvent: (updateObj) => {
      dispatch({ type: UPDATE_EVENT, updateObj });
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
)(AddEventModal);

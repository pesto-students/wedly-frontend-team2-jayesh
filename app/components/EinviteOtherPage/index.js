import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import eventsReducer from "containers/EventsPage/reducer";
import eventsSaga from "containers/EventsPage/saga";
import { makeSelectEvents } from "containers/EventsPage/selectors";
import { options } from "utils/constants";
import einviteEditSaga from "containers/EinviteEditPage/saga";
import { GET_EVENT } from "containers/EventsPage/constants";
import {
  ADD_OTHER_PAGES,
  GET_OTHER_PAGES,
} from "containers/EinviteEditPage/constants";
import { makeSelectEinviteOtherPages } from "containers/EinviteEditPage/selectors";
import einviteEditReducer from "containers/EinviteEditPage/reducer";
import { makeSelectUser } from "containers/HomePage/selectors";
import { AUTH_STATE } from "containers/HomePage/constants";
import MoonLoader from "react-spinners/MoonLoader";
import { makeSelectLoading } from "../../containers/EinviteEditPage/selectors";

const override = {
  display: "block",
  position: "absolute",
  top: "40%",
  left: "50%",
  zIndex: 1000,
};

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

function EinviteOtherPage({
  template,
  page,
  events,
  otherPageDetails,
  user,
  getEvents,
  addOtherPages,
  checkAuthState,
  getOtherPages,
  loading,
}) {
  useInjectReducer({ key: "eventsPage", reducer: eventsReducer });
  useInjectSaga({ key: "eventsPage", saga: eventsSaga });
  useInjectSaga({ key: "einviteEditPage", saga: einviteEditSaga });
  useInjectReducer({ key: "einviteEditPage", reducer: einviteEditReducer });
  const [input, setInput] = useState({
    category: "",
    date: "",
    time: "",
    eventVenue: "",
    customEvent: "",
  });

  useEffect(() => {
    if (Object.keys(user).length > 0) getOtherPages(user._id, page);
  }, [Object.keys(user).length, page]);
  useEffect(() => {
    if (Object.keys(user).length === 0) checkAuthState();
    getEvents();
  }, []);
  useEffect(() => {
    if (otherPageDetails && Object.keys(otherPageDetails).length > 0) {
      setInput({
        category: otherPageDetails.category,
        date: otherPageDetails.date && otherPageDetails.date.split("T")[0],
        time: otherPageDetails.time,
        eventVenue: otherPageDetails.venue,
        customEvent: otherPageDetails.customEvent,
      });
    } else {
      if (events.length > 0) {
        if (page === 2) {
          const weddingEvent = events.find(
            (event) => event.category === "Wedding"
          );
          setInput({
            category: weddingEvent.category,
            date: weddingEvent.date && weddingEvent.date.split("T")[0],
            time: weddingEvent.time,
            eventVenue: weddingEvent.venue,
            customEvent: weddingEvent.customEvent,
          });
        } else {
          const otherEvents = events.filter(
            (event) => event.category !== "Wedding"
          );
          if (otherEvents.length > page - 3) {
            const otherEvent = otherEvents[page - 3];
            setInput({
              category: otherEvent.category ? otherEvent.category : "Other",
              date: otherEvent.date && otherEvent.date.split("T")[0],
              time: otherEvent.time,
              eventVenue: otherEvent.venue,
              customEvent: otherEvent.customEvent,
            });
          } else {
            setInput({
              category: "",
              date: "",
              time: "",
              eventVenue: "",
              customEvent: "",
            });
          }
        }
      }
    }
  }, [Object.keys(user).length, otherPageDetails, events, page]);
  const handleClick = async (e) => {
    e.preventDefault();
    const templateID = template.id;
    await addOtherPages(
      input.category,
      input.customEvent,
      input.date,
      input.time,
      input.eventVenue,
      page,
      templateID
    );
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      if (name === "category" && value !== "other") {
        return {
          ...prev,
          [name]: value,
          customEvent: "",
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div
      className={`${
        loading ? "opacity-50" : "opacity-100"
      } flex mt-4 lg:mt-10 flex-col lg:flex-row lg:items-center mb-[100px]`}
    >
      <div
        id="otherPage"
        className={`bg-[url(${
          template.imageUrls.otherPages
        })] min-[320px]:bg-center bg-contain h-[500px] md:h-[700px] lg:w-[600px] pt-2 sm:pt-5 md:pt-10 mb-2.5`}
      >
        {input && (
          <div className="text-center mt-24 text-[#CCCCCC]">
            <p>Join for my</p>
            <h1>
              {input.category !== "Other" ? input.category : input.customEvent}
            </h1>
            <p>{input.time}</p>
            <p>
              {input.date &&
                new Date(input.date).toLocaleDateString("en-US", dateOptions)}
            </p>
            <p>@</p>
            <div className="flex justify-center">
              <div className="w-1/2 sm:w-1/5 lg:w-1/2 break-all">
                <p className="text-xs md:text-base">{input.eventVenue}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex mt-2 lg:mt-0 justify-center items-center">
        <div className="flex flex-col lg:ml-10 xl:ml-40 h-1/2 w-4/5 min-[320px]:w-80 xl:w-96">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">
            Edit Details
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-1 text-gray-900">
                Event Category
              </h4>
              <select
                name="category"
                onChange={onInputChange}
                value={input.category}
                id="category"
                className="select-arrow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 py-2 md:p-2.5 w-full"
              >
                <option>Category</option>
                {options.map((option, index) => (
                  <option value={option.value} key={index}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {input.category === "Other" && (
              <div>
                <h4 className="font-semibold mb-1 text-gray-900">Event Name</h4>
                <input
                  type="text"
                  name="customEvent"
                  id="customEvent"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 py-2 md:p-2.5"
                  required
                  value={input.customEvent}
                  onChange={onInputChange}
                />
              </div>
            )}
            <div>
              <h4 className="font-semibold mb-1 text-gray-900">Event Date</h4>
              <input
                type="date"
                name="date"
                id="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 py-2 md:p-2.5"
                required
                value={input.date}
                onChange={onInputChange}
              />
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-gray-900">Event Time</h4>
              <input
                type="time"
                name="time"
                id="time"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 py-2 md:p-2.5"
                required
                value={input.time}
                onChange={onInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="eventVenue"
                className="block mb-1 md:mb-2 text-sm font-medium text-gray-900"
              >
                Event Venue
              </label>
              <input
                type="text"
                name="eventVenue"
                id="eventVenue"
                placeholder="Enter the venue of event"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 py-2 md:p-2.5"
                required
                value={input.eventVenue}
                onChange={onInputChange}
              />
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={(e) => handleClick(e)}
                className="bg-pink rounded-lg text-white py-3 px-4 border border-solid border-pink hover:text-pink hover:bg-white "
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <MoonLoader cssOverride={override} size={40} loading={loading} />
      ) : null}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  events: makeSelectEvents(),
  otherPageDetails: makeSelectEinviteOtherPages(),
  user: makeSelectUser(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEvents: () => {
      dispatch({ type: GET_EVENT });
    },
    addOtherPages: (
      category,
      customEvent,
      date,
      time,
      venue,
      page,
      templateID
    ) => {
      dispatch({
        type: ADD_OTHER_PAGES,
        category,
        customEvent,
        date,
        time,
        venue,
        page,
        templateID,
      });
    },
    getOtherPages: (hostID, page) => {
      dispatch({ type: GET_OTHER_PAGES, hostID, page });
    },
    checkAuthState: () => {
      dispatch({ type: AUTH_STATE });
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
)(EinviteOtherPage);

import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import { makeSelectCoupleDetailsPage } from "containers/CoupleDetailsPage/selectors";
import { makeSelectEvents } from "containers/EventsPage/selectors";
import coupleDetailsReducer from "containers/CoupleDetailsPage/reducer";
import coupleDetailsSaga from "containers/CoupleDetailsPage/saga";
import eventsReducer from "containers/EventsPage/reducer";
import eventsSaga from "containers/EventsPage/saga";
import einviteEditSaga from "containers/EinviteEditPage/saga";
import { GET_COUPLE_DETAILS } from "containers/CoupleDetailsPage/constants";
import { GET_EVENT } from "containers/EventsPage/constants";
import {
  ADD_FIRST_PAGE,
  GET_FIRST_PAGE,
} from "containers/EinviteEditPage/constants";
import { makeSelectEinviteFirstPage } from "containers/EinviteEditPage/selectors";
import einviteEditReducer from "containers/EinviteEditPage/reducer";
import { makeSelectUser } from "containers/HomePage/selectors";
import { AUTH_STATE } from "containers/HomePage/constants";
import MoonLoader from "react-spinners/MoonLoader";
import { makeSelectLoading } from "../../containers/CoupleDetailsPage/selectors";

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
function EinviteFirstPage({
  template,
  coupleDetails,
  getCoupleDetails,
  getEvents,
  events,
  addFirstPage,
  firstPageDetails,
  user,
  getFirstPage,
  checkAuthState,
  loading,
}) {
  useInjectReducer({ key: "coupleDetailsPage", reducer: coupleDetailsReducer });
  useInjectSaga({ key: "coupleDetailsPage", saga: coupleDetailsSaga });
  useInjectReducer({ key: "eventsPage", reducer: eventsReducer });
  useInjectSaga({ key: "eventsPage", saga: eventsSaga });
  useInjectSaga({ key: "einviteEditPage", saga: einviteEditSaga });
  useInjectReducer({ key: "einviteEditPage", reducer: einviteEditReducer });

  const [weddingDate, setWeddingDate] = useState("");
  const [brideName, setBrideName] = useState("");
  const [groomName, setGroomName] = useState("");
  useEffect(() => {
    if (Object.keys(user).length > 0) getFirstPage(user._id);
  }, [Object.keys(user).length]);
  useEffect(() => {
    if (Object.keys(user).length === 0) checkAuthState();
    getCoupleDetails();
    getEvents();
  }, []);
  useEffect(() => {
    if (firstPageDetails && Object.keys(firstPageDetails).length > 0) {
      setWeddingDate(firstPageDetails.date.split("T")[0]);
      setBrideName(firstPageDetails.bride);
      setGroomName(firstPageDetails.groom);
    } else {
      if (coupleDetails.bride) setBrideName(coupleDetails.bride.name);
      if (coupleDetails.groom) setGroomName(coupleDetails.groom.name);
      if (events.length > 0) {
        const weddingEvent = events.find(
          (event) => event.category === "Wedding"
        );
        if (weddingEvent) setWeddingDate(weddingEvent.date.split("T")[0]);
      }
    }
  }, [Object.keys(user).length, firstPageDetails, coupleDetails, events]);

  const handleClick = async () => {
    const templateID = template.id;
    await addFirstPage(weddingDate, groomName, brideName, templateID);
  };
  return (
    <>
      <div
        className={`${
          loading ? "opacity-50" : "opacity-100"
        } flex mt-4 lg:mt-10 flex-col lg:flex-row lg:items-center mb-[100px]`}
      >
        <div
          id="page1"
          className={`bg-[url(${
            template.imageUrls.firstPage
          })] min-[320px]:bg-center bg-contain h-[500px] md:h-[700px] lg:w-[600px] pt-2 sm:pt-5 md:pt-10 mb-2.5`}
        >
          <h2 className="text-2xl md:text-3xl text-center text-[#CCCCCC] mt-2">
            {brideName}
          </h2>
          <h2 className="text-lg text-center text-[#CCCCCC]">&amp;</h2>
          <h2 className="text-2xl md:text-3xl text-center text-[#CCCCCC] sm:mb-1 lg:mb-2">
            {groomName}
          </h2>
          <h4 className="text-center text-[#CCCCCC] text-xs md:text-lg">
            {weddingDate &&
              new Date(weddingDate).toLocaleDateString("en-US", dateOptions)}
          </h4>
        </div>
        <div className="flex mt-2 lg:mt-0 justify-center items-center">
          <div className=" flex flex-col lg:ml-10 xl:ml-40 h-1/2 w-4/5 min-[320px]:w-80 xl:w-96">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              Edit Details
            </h3>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="groomName"
                  className="block mb-1 md:mb-2 text-sm font-medium text-gray-900"
                >
                  Groom&#39;s Name
                </label>
                <input
                  type="text"
                  name="groomName"
                  id="groomName"
                  placeholder="Enter groom's name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 py-2 md:p-2.5"
                  value={groomName}
                  onChange={(event) => setGroomName(event.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="brideName"
                  className="block mb-1 md:mb-2 text-sm font-medium text-gray-900"
                >
                  Bride&#39;s Name
                </label>
                <input
                  type="text"
                  name="brideName"
                  id="brideName"
                  placeholder="Enter bride's name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 py-2 md:p-2.5"
                  required
                  value={brideName}
                  onChange={(event) => setBrideName(event.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block mb-1 md:mb-2 text-sm font-medium text-gray-900"
                >
                  Wedding Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 py-2 md:p-2.5"
                  required
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={handleClick}
                className="bg-pink rounded-lg text-white py-3 px-4 border border-solid border-pink hover:text-pink hover:bg-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        {loading ? (
          <MoonLoader cssOverride={override} size={40} loading={loading} />
        ) : null}
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  coupleDetails: makeSelectCoupleDetailsPage(),
  events: makeSelectEvents(),
  firstPageDetails: makeSelectEinviteFirstPage(),
  user: makeSelectUser(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCoupleDetails: () => {
      dispatch({ type: GET_COUPLE_DETAILS });
    },
    getEvents: () => {
      dispatch({ type: GET_EVENT });
    },
    addFirstPage: (date, groom, bride, templateID) => {
      dispatch({
        type: ADD_FIRST_PAGE,
        date,
        groom,
        bride,
        templateID,
      });
    },
    getFirstPage: (hostID) => {
      dispatch({ type: GET_FIRST_PAGE, hostID });
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
)(EinviteFirstPage);

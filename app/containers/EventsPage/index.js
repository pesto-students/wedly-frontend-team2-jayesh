import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import { makeSelectEventLoader, makeSelectEvents } from "./selectors";
import reducer from "./reducer";
import homeReducer from "../HomePage/reducer";
import guestsReducer from "../GuestsPage/reducer";
import eventsSaga from "./saga";
import guestsSaga from "../GuestsPage/saga";
import EventsSection from "components/EventsSection";
import MobileEventsSection from "components/MobileEventsSection";
import { GET_EVENT, DELETE_EVENT, REMIND_EVENT } from "./constants";
import { GET_GUEST } from "../GuestsPage/constants";
import { makeSelectGuests } from "../GuestsPage/selectors";
import MoonLoader from "react-spinners/MoonLoader";

const override = {
  display: "block",
  position: "absolute",
  top: "40%",
  left: "50%",
  zIndex: 1000,
};

function EventsPage({
  getEvents,
  events,
  deleteEvent,
  getGuests,
  guests,
  remindEvent,
  loading,
}) {
  useInjectReducer({ key: "eventsPage", reducer });
  useInjectReducer({ key: "guestsPage", reducer: guestsReducer });
  useInjectReducer({ key: "home", reducer: homeReducer });
  useInjectSaga({ key: "eventsPage", saga: eventsSaga });
  useInjectSaga({ key: "guestsPage", saga: guestsSaga });

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    getGuests();
  }, []);

  return (
    <>
      <EventsSection
        loading={loading}
        getEvents={getEvents}
        events={events}
        deleteEvent={deleteEvent}
        guests={guests.filter((guest) => guest.isInvited)}
        remindEvent={remindEvent}
      />
      <MobileEventsSection
        loading={loading}
        getEvents={getEvents}
        events={events}
        deleteEvent={deleteEvent}
        guests={guests}
        getGuests={getGuests}
        remindEvent={remindEvent}
      />
      {loading ? (
        <MoonLoader cssOverride={override} size={40} loading={loading} />
      ) : null}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  events: makeSelectEvents(),
  guests: makeSelectGuests(),
  loading: makeSelectEventLoader(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEvents: () => {
      dispatch({ type: GET_EVENT });
    },
    deleteEvent: (id) => {
      dispatch({ type: DELETE_EVENT, id });
    },
    getGuests: () => {
      dispatch({ type: GET_GUEST });
    },
    remindEvent: (
      guestName,
      hostName,
      eventName,
      date,
      time,
      venue,
      mobile
    ) => {
      dispatch({
        type: REMIND_EVENT,
        guestName,
        hostName,
        eventName,
        date,
        time,
        venue,
        mobile,
      });
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
)(EventsPage);

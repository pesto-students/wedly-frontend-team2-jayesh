import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import { makeSelectEvents } from "./selectors";
import reducer from "./reducer";
import homeReducer from "../HomePage/reducer";
import saga from "./saga";
import EventsSection from "components/EventsSection";
import MobileEventsSection from "components/MobileEventsSection";
import { GET_EVENT, DELETE_EVENT } from "./constants";

function EventsPage({ getEvents, events, deleteEvent }) {
  useInjectReducer({ key: "eventsPage", reducer });
  useInjectReducer({ key: "home", reducer:homeReducer });
  useInjectSaga({ key: "eventsPage", saga });

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <EventsSection getEvents={getEvents} events={events} deleteEvent={deleteEvent}/>
      <MobileEventsSection getEvents={getEvents} events={events} deleteEvent={deleteEvent}/>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  events: makeSelectEvents(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEvents: () => {
      dispatch({ type: GET_EVENT });
    },
    deleteEvent: (id) => {
      dispatch({ type: DELETE_EVENT, id });
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

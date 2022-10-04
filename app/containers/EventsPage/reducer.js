/*
 *
 * EventsPage reducer
 *
 */
import produce from "immer";
import {
  ADD_EVENT_SUCCESS,
  ADD_MULTIPLE_EVENTS_SUCCESS,
  DELETE_EVENT_SUCCESS,
  GET_EVENT_SUCCESS,
} from "./constants";

export const initialState = {
  events: [],
};

/* eslint-disable default-case, no-param-reassign */
const eventsPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_EVENT_SUCCESS:
        draft.events = action.response.data.events;
        break;

      case ADD_EVENT_SUCCESS:
        draft.events.push(action.response.data.addedEvent);
        break;

      case ADD_MULTIPLE_EVENTS_SUCCESS:
        draft.events.push(action.response.data.addedEvents);
        break;

      case DELETE_EVENT_SUCCESS:
        draft.events = draft.events.filter(
          (event) => event._id !== action.response.data.deletedEvent._id
        );
        break;
    }
  });

export default eventsPageReducer;

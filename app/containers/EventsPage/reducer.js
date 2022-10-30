/*
 *
 * EventsPage reducer
 *
 */
import produce from "immer";
import {
  ADD_EVENT,
  ADD_EVENT_FAILURE,
  ADD_EVENT_SUCCESS,
  ADD_MULTIPLE_EVENTS,
  ADD_MULTIPLE_EVENTS_FAILURE,
  ADD_MULTIPLE_EVENTS_SUCCESS,
  DELETE_EVENT,
  DELETE_EVENT_FAILURE,
  DELETE_EVENT_SUCCESS,
  GET_EVENT,
  GET_EVENT_FAILURE,
  GET_EVENT_SUCCESS,
  UPDATE_EVENT,
  UPDATE_EVENT_FAILURE,
  UPDATE_EVENT_SUCCESS,
} from "./constants";

export const initialState = {
  events: [],
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const eventsPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_EVENT:
        draft.loading = true;
        break;

      case GET_EVENT_SUCCESS:
        draft.events = action.response.data.events;
        draft.loading = false;
        break;

      case GET_EVENT_FAILURE:
        draft.loading = false;
        break;

      case ADD_EVENT:
        draft.loading = true;
        break;

      case ADD_EVENT_SUCCESS:
        draft.events.push(action.response.data.addedEvent);
        draft.loading = false;
        break;

      case ADD_EVENT_FAILURE:
        draft.loading = false;
        break;

      case ADD_MULTIPLE_EVENTS:
        draft.loading = true;
        break;

      case ADD_MULTIPLE_EVENTS_SUCCESS:
        draft.events.push(action.response.data.addedEvents);
        draft.loading = false;
        break;

      case ADD_MULTIPLE_EVENTS_FAILURE:
        draft.loading = false;
        break;

      case UPDATE_EVENT:
        draft.loading = true;
        break;

      case UPDATE_EVENT_SUCCESS:
        draft.events = JSON.parse(
          JSON.stringify(
            draft.events.map((event) => {
              return event._id === action.response.data.updatedEvent._id
                ? action.response.data.updatedEvent
                : event;
            })
          )
        );
        draft.loading = false;
        break;

      case UPDATE_EVENT_FAILURE:
        draft.loading = false;
        break;

      case DELETE_EVENT:
        draft.loading = true;
        break;

      case DELETE_EVENT_SUCCESS:
        draft.events = draft.events.filter(
          (event) => event._id !== action.response.data.deletedEvent._id
        );
        draft.loading = false;
        break;

      case DELETE_EVENT_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default eventsPageReducer;

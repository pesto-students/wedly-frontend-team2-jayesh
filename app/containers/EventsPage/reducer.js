/*
 *
 * EventsPage reducer
 *
 */
import produce from "immer";
import { GET_EVENT_SUCCESS } from "./constants";

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
    }
  });

export default eventsPageReducer;

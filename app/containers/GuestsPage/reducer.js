/*
 *
 * GuestsPage reducer
 *
 */
import produce from "immer";
import {
  ADD_GUEST_SUCCESS,
  ADD_MULTIPLE_GUESTS_SUCCESS,
  DELETE_GUEST_SUCCESS,
  GET_GUEST,
  GET_GUEST_SUCCESS,
  UPDATE_GUEST_SUCCESS,
} from "./constants";

export const initialState = {
  guests: [],
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const guestsPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_GUEST:
        draft.isLoading = true;
        break;

      case GET_GUEST_SUCCESS:
        draft.guests = action.response.data.guests;
        draft.isLoading = false;
        break;

      case ADD_GUEST_SUCCESS:
        draft.guests.push(action.response.data.addedGuest);
        break;

      case ADD_MULTIPLE_GUESTS_SUCCESS:
        draft.guests.push(action.response.data.addedGuests);
        break;

      case UPDATE_GUEST_SUCCESS:
        break;

      case DELETE_GUEST_SUCCESS:
        draft.guests = draft.guests.filter(
          (guest) => guest._id !== action.response.data.deletedGuest._id
        );
        break;
    }
  });

export default guestsPageReducer;

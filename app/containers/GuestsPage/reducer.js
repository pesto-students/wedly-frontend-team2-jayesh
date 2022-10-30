/*
 *
 * GuestsPage reducer
 *
 */
import produce from "immer";
import {
  ADD_GUEST,
  ADD_GUEST_FAILURE,
  ADD_GUEST_SUCCESS,
  ADD_MULTIPLE_GUESTS,
  ADD_MULTIPLE_GUESTS_FAILURE,
  ADD_MULTIPLE_GUESTS_SUCCESS,
  DELETE_GUEST,
  DELETE_GUEST_FAILURE,
  DELETE_GUEST_SUCCESS,
  GET_GUEST,
  GET_GUEST_FAILURE,
  GET_GUEST_SUCCESS,
  SEND_INVITE,
  SEND_INVITE_FAILURE,
  SEND_INVITE_SUCCESS,
  UPDATE_GUEST,
  UPDATE_GUEST_FAILURE,
  UPDATE_GUEST_SUCCESS,
} from "./constants";

export const initialState = {
  guests: [],
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const guestsPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_GUEST:
        draft.loading = true;
        break;

      case GET_GUEST_SUCCESS:
        draft.guests = action.response.data.guests;
        draft.loading = false;
        break;

      case GET_GUEST_FAILURE:
        draft.loading = false;
        break;

      case ADD_GUEST:
        draft.loading = true;
        break;

      case ADD_GUEST_SUCCESS:
        draft.guests.push(action.response.data.addedGuest);
        draft.loading = false;
        break;

      case ADD_GUEST_FAILURE:
        draft.loading = false;
        break;

      case ADD_MULTIPLE_GUESTS:
        draft.loading = true;
        break;

      case ADD_MULTIPLE_GUESTS_SUCCESS:
        draft.guests.push(...action.response.data.addedGuests);
        draft.loading = false;
        break;

      case ADD_MULTIPLE_GUESTS_FAILURE:
        draft.loading = false;
        break;

      case UPDATE_GUEST:
        draft.loading = true;
        break;

      case UPDATE_GUEST_SUCCESS:
        draft.guests = JSON.parse(
          JSON.stringify(
            draft.guests.map((guest) => {
              return guest._id === action.response.data.updatedGuest._id
                ? action.response.data.updatedGuest
                : guest;
            })
          )
        );
        draft.loading = false;
        break;

      case UPDATE_GUEST_FAILURE:
        draft.loading = false;
        break;

      case DELETE_GUEST:
        draft.loading = true;
        break;

      case DELETE_GUEST_SUCCESS:
        draft.guests = draft.guests.filter(
          (guest) => guest._id !== action.response.data.deletedGuest._id
        );
        draft.loading = false;
        break;

      case DELETE_GUEST_FAILURE:
        draft.loading = false;
        break;

      case SEND_INVITE:
        draft.loading = true;
        break;

      case SEND_INVITE_SUCCESS:
        draft.loading = false;
        break;

      case SEND_INVITE_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default guestsPageReducer;

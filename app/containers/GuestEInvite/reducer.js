/*
 *
 * EinviteEditPage reducer
 *
 */
import produce from "immer";
import {
  DEFAULT_ACTION,
  GET_EINVITE_SUCCESS,
} from "./constants";

export const initialState = {
  einvite: [],
};

/* eslint-disable default-case, no-param-reassign */
const guestEinviteReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_EINVITE_SUCCESS:
        draft.einvite = action.response.data.einvite;
        console.log(draft.einvite)
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default guestEinviteReducer;

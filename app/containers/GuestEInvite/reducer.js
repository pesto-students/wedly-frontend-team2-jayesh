/*
 *
 * EinviteEditPage reducer
 *
 */
import produce from "immer";
import {
  DEFAULT_ACTION,
  GET_EINVITE,
  GET_EINVITE_FAILURE,
  GET_EINVITE_SUCCESS,
} from "./constants";

export const initialState = {
  einvite: [],
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const guestEinviteReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_EINVITE:
        draft.loading = true;
        break;
      case GET_EINVITE_SUCCESS:
        draft.einvite = action.response.data.einvite;
        draft.loading = false;
        break;

      case GET_EINVITE_FAILURE:
        draft.loading = false;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default guestEinviteReducer;

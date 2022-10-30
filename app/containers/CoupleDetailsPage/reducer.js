/*
 *
 * CoupleDetailsPage reducer
 *
 */
import produce from "immer";
import {
  ADD_COUPLE_DETAILS,
  ADD_COUPLE_DETAILS_FAILURE,
  ADD_COUPLE_DETAILS_SUCCESS,
  GET_COUPLE_DETAILS,
  GET_COUPLE_DETAILS_FAILURE,
  GET_COUPLE_DETAILS_SUCCESS,
} from "./constants";

export const initialState = {
  coupleDetails: {},
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const coupleDetailsPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_COUPLE_DETAILS:
        draft.loading = true;
        break;
        
      case ADD_COUPLE_DETAILS_SUCCESS:
        draft.coupleDetails.bride = action.response.data.newBride;
        draft.coupleDetails.groom = action.response.data.newGroom;
        draft.loading = false;
        break;

      case ADD_COUPLE_DETAILS_FAILURE:
        draft.loading = false;
        break;

      case GET_COUPLE_DETAILS:
        draft.loading = true;
        break;

      case GET_COUPLE_DETAILS_SUCCESS:
        draft.coupleDetails.bride = action.response.data.bride;
        draft.coupleDetails.groom = action.response.data.groom;
        draft.loading = false;
        break;

      case GET_COUPLE_DETAILS_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default coupleDetailsPageReducer;

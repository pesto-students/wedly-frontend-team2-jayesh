/*
 *
 * CoupleDetailsPage reducer
 *
 */
import produce from "immer";
import { ADD_COUPLE_DETAILS_SUCCESS, GET_COUPLE_DETAILS_SUCCESS } from "./constants";

export const initialState = {
  coupleDetails: {},
};

/* eslint-disable default-case, no-param-reassign */
const coupleDetailsPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_COUPLE_DETAILS_SUCCESS:
        draft.coupleDetails.bride = action.response.data.newBride;
        draft.coupleDetails.groom = action.response.data.newGroom;
        break;
      case GET_COUPLE_DETAILS_SUCCESS:
        draft.coupleDetails.bride = action.response.data.bride;
        draft.coupleDetails.groom = action.response.data.groom;
        break;
    }
  });

export default coupleDetailsPageReducer;

/*
 *
 * EinviteEditPage reducer
 *
 */
import produce from "immer";
import {
  DEFAULT_ACTION,
  ADD_FIRST_PAGE_SUCCESS,
  GET_FIRST_PAGE_SUCCESS,
  ADD_OTHER_PAGES_SUCCESS,
  GET_OTHER_PAGES_SUCCESS,
} from "./constants";

export const initialState = {
  firstPage: {},
  otherPages: {},
};

/* eslint-disable default-case, no-param-reassign */
const einviteEditPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_FIRST_PAGE_SUCCESS:
        break;
      case GET_FIRST_PAGE_SUCCESS:
        draft.firstPage = action.response.data.einviteFirstPage;
        break;
      case ADD_OTHER_PAGES_SUCCESS:
        break;
      case GET_OTHER_PAGES_SUCCESS:
        draft.otherPages = action.response.data.einviteOtherPages;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default einviteEditPageReducer;

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
  ADD_FIRST_PAGE,
  ADD_FIRST_PAGE_FAILURE,
  GET_FIRST_PAGE,
  GET_FIRST_PAGE_FAILURE,
  ADD_OTHER_PAGES,
  ADD_OTHER_PAGES_FAILURE,
  GET_OTHER_PAGES,
  GET_OTHER_PAGES_FAILURE,
} from "./constants";

export const initialState = {
  firstPage: {},
  otherPages: {},
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const einviteEditPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_FIRST_PAGE:
        draft.loading = true;
        break;

      case ADD_FIRST_PAGE_SUCCESS:
        draft.loading = false;
        break;

      case ADD_FIRST_PAGE_FAILURE:
        draft.loading = false;
        break;

      case GET_FIRST_PAGE:
        draft.loading = true;

      case GET_FIRST_PAGE_SUCCESS:
        draft.firstPage =
          action.response && action.response.data.einviteFirstPage;
        draft.loading = false;
        break;

      case GET_FIRST_PAGE_FAILURE:
        draft.loading = false;
        break;

      case ADD_OTHER_PAGES:
        draft.loading = true;
        break;

      case ADD_OTHER_PAGES_SUCCESS:
        draft.loading = false;
        break;

      case ADD_OTHER_PAGES_FAILURE:
        draft.loading = false;
        break;

      case GET_OTHER_PAGES:
        draft.loading = true;
        break;

      case GET_OTHER_PAGES_SUCCESS:
        draft.otherPages =
          action.response && action.response.data.einviteOtherPages;
        draft.loading = false;
        break;

      case GET_OTHER_PAGES_FAILURE:
        draft.loading = false;
        break;
    }
  });

export default einviteEditPageReducer;

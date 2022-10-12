/**
 *
 * EinviteEditPage
 *
 */

import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectEinviteEditPage from "./selectors";
import reducer from "./reducer";
import homeReducer from "../HomePage/reducer";
import saga from "./saga";
import { templates } from "../../utils/eInviteTemplates";
import EinviteFirstPage from "../../components/EinviteFirstPage";
import EinviteOtherPage from "../../components/EinviteOtherPage";
import axios from "axios";

export function EinviteEditPage() {
  const location = window.location.href;
  let array = location.split("/");
  let id = array[array.length - 1];
  useInjectReducer({ key: "einviteEditPage", reducer });
  useInjectReducer({ key: "home", reducer: homeReducer });
  useInjectSaga({ key: "einviteEditPage", saga });
  useEffect(() => {
    getEvents();
  }, []);

  const template = templates[id - 1];
  const [selectedPage, setSelectedPage] = useState(1);
  const [events, setEvents] = useState([]);

  const getEvents = () => {
    axios
      .get(`${process.env.SERVER_URL}/event`, { withCredentials: true })
      .then((res) => {
        setEvents(res.data.events);
      })
      .catch((err) => console.log(err));
  };
  const pageData = [
    {
      pageNumber: 1,
      event: events[0],
    },
    {
      pageNumber: 2,
      event: events[0],
    },
    {
      pageNumber: 3,
      event: events[1],
    },
    {
      pageNumber: 4,
      event: events[2],
    },
  ];
  return (
    <div className="py-5 px-20 flex flex-col relative h-full">
      <div>
        <div className="flex justify-between w-[500px]">
          {pageData.map((page) => (
            <button
              type="submit"
              className={`py-2 px-5 text-sm font-medium text-center rounded-lg border border-solid ${
                page.pageNumber === selectedPage
                  ? "border-pink  bg-[#FFEDF2]"
                  : "bg-[#F4F4F4]"
              }  shadow-md`}
              onClick={() => setSelectedPage(page.pageNumber)}
            >
              Page {page.pageNumber}
            </button>
          ))}
        </div>
      </div>
      {selectedPage === 1 ? (
        <EinviteFirstPage template={template} />
      ) : (
        <EinviteOtherPage
          pageData={
            pageData.filter((data) => data.pageNumber === selectedPage)[0]
          }
          template={template}
        />
      )}
    </div>
  );
}

EinviteEditPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  einviteEditPage: makeSelectEinviteEditPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(EinviteEditPage);

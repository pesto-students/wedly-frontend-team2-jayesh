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
  const [weddingEvent, setWeddingEvent] = useState(null);
  const [otherEvents, setOtherEvents] = useState([]);

  const getEvents = () => {
    axios
      .get(`${process.env.SERVER_URL}/event`, { withCredentials: true })
      .then((res) => {
        const weddingEvent = res.data.events.find(
          (event) => event.category === "Wedding"
        );
        setWeddingEvent(weddingEvent);
        const others = res.data.events.filter(
          (event) => event.category !== "Wedding"
        );
        setOtherEvents(others);
      })
      .catch((err) => console.log(err));
  };
  const pageData = [
    {
      pageNumber: 1,
      event: weddingEvent,
    },
    {
      pageNumber: 2,
      event: weddingEvent,
    },
    {
      pageNumber: 3,
      event: otherEvents[0],
    },
    {
      pageNumber: 4,
      event: otherEvents[1],
    },
  ];

  return (
    <div className=" flex flex-col">
      {/* <div>
        <div className="flex justify-between w-[500px]">
          {pageData.map((page) => (
            <button
              type="submit"
              className={`py-1 md:py-2 px-3 md:px-5 text-sm font-medium text-center rounded-lg border border-solid ${
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
      </div> */}
      {selectedPage === 1 ? (
        <EinviteFirstPage id={1} template={template} />
      ) : (
        <EinviteOtherPage
          page={selectedPage}
          id={1}
          pageData={
            pageData.filter((data) => data.pageNumber === selectedPage)[0]
              ? pageData.filter((data) => data.pageNumber === selectedPage)[0]
              : null
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

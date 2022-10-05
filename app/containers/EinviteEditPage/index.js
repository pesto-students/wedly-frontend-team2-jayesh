/**
 *
 * EinviteEditPage
 *
 */

import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectEinviteEditPage from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { templates } from "../../utils/eInviteTemplates";
import EinviteFirstPage from "../../components/EinviteFirstPage";
import EinviteOtherPage from "../../components/EinviteOtherPage";

export function EinviteEditPage() {
  const location = window.location.href;
  let array = location.split("/");
  let id = array[array.length - 1];
  useInjectReducer({ key: "einviteEditPage", reducer });
  useInjectSaga({ key: "einviteEditPage", saga });
  const template = templates[id - 1];
  const [selectedPage, setSelectedPage] = useState(1);
  const pages = [
    {
      pageNumber: 1,
    },
    {
      pageNumber: 2,
    },
    {
      pageNumber: 3,
    },
    {
      pageNumber: 4,
    },
  ];

  return (
    <div className="py-5 px-20 flex flex-col relative h-full">
      <div>
        <div className="flex justify-between w-[500px]">
          {pages.map((page) => (
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
        <EinviteOtherPage template={template} />
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

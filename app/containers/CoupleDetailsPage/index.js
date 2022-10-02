/**
 *
 * CoupleDetailsPage
 *
 */

import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectCoupleDetailsPage from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import Details from "../../components/Details";

function CoupleDetailsPage() {
  const inputStyles =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";
  useInjectReducer({ key: "coupleDetailsPage", reducer });
  useInjectSaga({ key: "coupleDetailsPage", saga });

  const [groomInput, setGroomInput] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    city: "",
    state: "",
  });

  const [brideInput, setBrideInput] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    city: "",
    state: "",
  });

  return (
    <div className="p-5">
      <h3 className="pl-4 mb-4 text-xl font-semibold text-gray-900">
        Fill the wedding details to start inviting people to your wedding.
      </h3>
      <div className="flex">
        <Details role="Groom" input={groomInput} setInput={setGroomInput} classes="mr-24"/>
        <Details role="Bride" input={brideInput} setInput={setBrideInput} />
      </div>
      <div className="flex justify-end px-4 my-12">
        <button
          type="submit"
          className="text-white bg-[#3498DB] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow"
        >
          Next
        </button>
      </div>
    </div>
  );
}

CoupleDetailsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  coupleDetailsPage: makeSelectCoupleDetailsPage(),
});

export function mapDispatchToProps(dispatch) {
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
)(CoupleDetailsPage);

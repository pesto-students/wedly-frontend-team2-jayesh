/**
 *
 * ContactUsPage
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import InfoSection from "../../components/InfoSection";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectContactUsPage from "./selectors";
import reducer from "./reducer";
import saga from "./saga";

export function ContactUsPage() {
  useInjectReducer({ key: "contactUsPage", reducer });
  useInjectSaga({ key: "contactUsPage", saga });

  return <InfoSection />;
}

ContactUsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  contactUsPage: makeSelectContactUsPage(),
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
)(ContactUsPage);

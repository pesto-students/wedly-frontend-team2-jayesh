/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import history from "../../utils/history";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
import { toggleModal } from "../App/actions";
import { makeSelectIsOpen } from "../App/selectors";
import reducer from "./reducer";
import HeroSection from "../../components/HeroSection";
import FeaturesSection from "../../components/FeaturesSection";
import FeedbackSection from "../../components/FeedbackSection";
import InfoSection from "../../components/InfoSection";
import SigninModal from "../../components/SigninModal";
import {
  verifyEmailFailureToast,
  verifyEmailSuccessToast,
} from "../../utils/toast";

const key = "home";

export function HomePage({ isOpen }) {
  useInjectReducer({ key, reducer });
  useEffect(() => {
    if (history.location.search === "?success=true") {
      verifyEmailSuccessToast();
    } else if (
      history.location.search === "?success=false&errorCode=2" ||
      history.location.search === "?success=false&errorCode=1"
    ) {
      verifyEmailFailureToast();
    }
  }, []);
  return (
    <article>
      <Helmet>
        <title>Wedly</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div className={isOpen ? `opacity-50` : `opacity-100`}>
        <HeroSection />
        <FeaturesSection />
        <FeedbackSection />
        <InfoSection />
      </div>
      {isOpen && <SigninModal />}
    </article>
  );
}

HomePage.propTypes = {
  isOpen: PropTypes.bool,
  onToggleModal: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectIsOpen(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onToggleModal: () => {
      dispatch(toggleModal());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(HomePage);

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

import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
import H2 from "components/H2";
import ReposList from "components/ReposList";
import AtPrefix from "./AtPrefix";
import CenteredSection from "./CenteredSection";
import Form from "./Form";
import Input from "./Input";
import Section from "./Section";
import messages from "./messages";
import { toggleModal } from "../App/actions";
import { makeSelectIsOpen } from "../App/selectors";
import reducer from "./reducer";
import saga from "./saga";
import HeroSection from "../../components/HeroSection";
import FeaturesSection from "../../components/FeaturesSection";
import FeedbackSection from "../../components/FeedbackSection";
import InfoSection from "../../components/InfoSection";
import SigninModal from "../../components/SigninModal";

const key = "home";

export function HomePage({ isOpen }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
 
  return (
    <article>
      <Helmet>
        <title>Wedly</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      {/* <div>
        <CenteredSection>
          <H2>
            <FormattedMessage {...messages.startProjectHeader} />
          </H2>
          <p>
            <FormattedMessage {...messages.startProjectMessage} />
          </p>
        </CenteredSection>
        <Section>
          <H2>
            <FormattedMessage {...messages.trymeHeader} />
          </H2>
          <Form onSubmit={onSubmitForm}>
            <label htmlFor="username">
              <FormattedMessage {...messages.trymeMessage} />
              <AtPrefix>
                <FormattedMessage {...messages.trymeAtPrefix} />
              </AtPrefix>
              <Input
                id="username"
                type="text"
                placeholder="mxstbr"
                value={username}
                onChange={onChangeUsername}
              />
            </label>
          </Form>
          <ReposList {...reposListProps} />
        </Section>
      </div> */}
      <HeroSection />
      <FeaturesSection />
      <FeedbackSection />
      <InfoSection />
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

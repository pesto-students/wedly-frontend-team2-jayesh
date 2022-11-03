/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { Helmet } from "react-helmet";
import { Switch, Route } from "react-router-dom";
import HomePage from "containers/HomePage/Loadable";
import FeaturePage from "containers/FeaturePage/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import SignupPage from "../SignupPage";
import Header from "components/Header";
import Footer from "components/Footer";
import CoupleDetailsPage from "../CoupleDetailsPage/index.js";
import EventsPage from "../EventsPage/index.js";
import GuestsPage from "../GuestsPage";
import EinvitePage from "../EinvitePage";
import EinviteEditPage from "../EinviteEditPage";
import AccountSettingsPage from "../AccountSettingsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import saga from "../HomePage/saga.js";
import reducer from "../HomePage/reducer.js";
import { AUTH_STATE } from "../HomePage/constants";
import { useInjectSaga } from "../../utils/injectSaga";
import { makeSelectAuth, makeSelectUser } from "../HomePage/selectors";
import GuestEInvite from "../GuestEInvite";
import { useInjectReducer } from "../../utils/injectReducer";
import { ContactUsPage } from "../ContactUsPage";

function App({ checkAuthState, user }) {
  const key = "app";
  useInjectSaga({ key, saga });
  useInjectReducer({ key: "home", reducer });
  useEffect(() => {
    checkAuthState();
  }, []);

  return (
    <div className="bg-mainTheme overflow-x-hidden min-h-screen relative overflow-auto">
      <Helmet>
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/features" component={FeaturePage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/accountSettings" component={AccountSettingsPage} />
        <Route path="/coupleDetails" component={CoupleDetailsPage} />
        <Route path="/events" component={EventsPage} />
        <Route path="/guests" component={GuestsPage} />
        <Route path="/einvites" component={EinvitePage} />
        <Route path="/einviteEdit/:id" component={EinviteEditPage} />
        <Route path="/einvite/view/:id" component={GuestEInvite} />
        <Route path="/contactUs" component={ContactUsPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    checkAuthState: () => {
      dispatch({ type: AUTH_STATE });
    },
  };
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(App);

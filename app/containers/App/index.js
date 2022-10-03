/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, useState, memo } from "react";
import PropTypes from "prop-types";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import saga from "../HomePage/saga.js";
import { AUTH_STATE } from "../HomePage/constants";
import { useInjectSaga } from "../../utils/injectSaga";
import { makeSelectAuth, makeSelectUser } from "../HomePage/selectors";

function App({ checkAuthState }) {
  // const [user, setUser] = useState(null);
  const key = "app";
  useInjectSaga({ key, saga });
  useEffect(() => {
    checkAuthState();
  }, []);

  // const getGoogleUser = async () => {
  //   const newUser = await getUser();
  //   setUser(newUser);
  // };

  return (
    <div className="bg-mainTheme overflow-x-hidden min-h-screen relative">
      <Helmet>
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header
      // user={user}
      />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/features" component={FeaturePage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/coupleDetails" component={CoupleDetailsPage} />
        <Route path="/events" component={EventsPage} />
        <Route path="/guests" component={GuestsPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      {/* <GlobalStyle /> */}
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

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(App);

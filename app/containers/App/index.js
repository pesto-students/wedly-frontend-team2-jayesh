/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Switch, Route } from "react-router-dom";
import HomePage from "containers/HomePage/Loadable";
import FeaturePage from "containers/FeaturePage/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import DetailsPage from "../DetailsPage";
import Header from "components/Header";
import Footer from "components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:7000/api/google/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <div className="bg-mainTheme">
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
      <Header user={user} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/features" component={FeaturePage} />
        <Route path="/details" component={DetailsPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      {/* <GlobalStyle /> */}
    </div>
  );
}

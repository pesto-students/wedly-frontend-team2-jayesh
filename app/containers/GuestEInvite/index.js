/**
 *
 * GuestEInvite
 *
 */

import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectGuestEInvite from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import axios from "axios";

function GuestEInvite() {
  useInjectReducer({ key: "guestEInvite", reducer });
  useInjectSaga({ key: "guestEInvite", saga });
  let slideIndex = 1;
  useEffect(() => {
    loadInvite();
  }, []);

  const plusSlide = (n) => {
    slideIndex += n;
    showSlides(slideIndex);
  };

  const showSlides = (n) => {
    let slides = document.querySelectorAll("#page1, #otherPage");
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
  };

  const loadInvite = async () => {
    const res = await axios.post(
      `${process.env.SERVER_URL}/geteinvite`,
      { templateId: 1 },
      { withCredentials: true }
    );
    const page1HTML = new DOMParser().parseFromString(
      res.data.einvite.page1Content,
      "text/html"
    );
    const page2HTML = new DOMParser().parseFromString(
      res.data.einvite.page2Content,
      "text/html"
    );
    const page3HTML = new DOMParser().parseFromString(
      res.data.einvite.page3Content,
      "text/html"
    );
    const page4HTML = new DOMParser().parseFromString(
      res.data.einvite.page4Content,
      "text/html"
    );
    const elem = document.getElementById("page");
    elem.appendChild(page1HTML.body.firstChild);
    elem.appendChild(page2HTML.body.firstChild);
    elem.appendChild(page3HTML.body.firstChild);
    elem.appendChild(page4HTML.body.firstChild);
    const children = document.getElementById("page").children;
    const secondPage = children.item(3);
    const thirdPage = children.item(4);
    const fourthPage = children.item(5);
    secondPage.style.display = "none";
    thirdPage.style.display = "none";
    fourthPage.style.display = "none";
  };

  return (
    <div id="page" className="flex justify-center">
      <a
        onClick={() => plusSlide(-1)}
        className="cursor-pointer absolute top-1/2 left-[35rem]"
      >
        &#10094;
      </a>
      <a
        onClick={() => plusSlide(1)}
        className="cursor-pointer absolute top-1/2 right-[35rem]"
      >
        &#10095;
      </a>
    </div>
  );
}

GuestEInvite.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  guestEInvite: makeSelectGuestEInvite(),
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
)(GuestEInvite);

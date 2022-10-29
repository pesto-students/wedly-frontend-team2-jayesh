import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import saga from "./saga";
import { GET_EINVITE } from "./constants";
import { makeSelectEinvite } from "./selectors";
import reducer from "./reducer";
import { templates } from "utils/eInviteTemplates";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
};

function GuestEInvite({ einvite, getEinvite }) {
  useInjectSaga({ key: "guestEInvite", saga });
  useInjectReducer({ key: "guestEInvite", reducer });
  const hostID = window.location.href.split("/")[5];

  useEffect(() => {
    getEinvite(hostID);
  }, []);
  const [pageData, setPageData] = useState([]);
  useEffect(() => {
    let pages = [];
    if (einvite.length > 0) {
      einvite.map((event) => {
        if (event.hasOwnProperty("page")) pages[event.page - 1] = event;
        else pages[0] = event;
      });
      console.log(templates[pages[0].templateID - 1].imageUrls.firstPage);
      setPageData(pages);
    }
  }, [einvite]);
  console.log(pageData);
  return (
    <div className="mb-[100px]">
      {pageData.length > 0 ? (
        <Slider {...settings}>
          {pageData.map((page, index) =>
            index === 0 ? (
              <div
                className={`bg-[url(${
                  templates[page.templateID - 1].imageUrls.firstPage
                })] min-[320px]:bg-center bg-contain h-[500px] md:h-[700px] lg:w-[600px] pt-2 sm:pt-5 md:pt-10`}
                key={page._id}
              >
                <h2 className="text-2xl md:text-3xl text-center text-[#CCCCCC] mt-2">
                  {page.bride}
                </h2>
                <h2 className="text-lg text-center text-[#CCCCCC]">&amp;</h2>
                <h2 className="text-2xl md:text-3xl text-center text-[#CCCCCC] sm:mb-1 lg:mb-2">
                  {page.groom}
                </h2>
                <h4 className="text-center text-[#CCCCCC] text-xs md:text-lg">
                  {page.date &&
                    new Date(page.date).toLocaleDateString(
                      "en-US",
                      dateOptions
                    )}
                </h4>
              </div>
            ) : (
              <div
                className={`bg-[url(${
                  templates[page.templateID - 1].imageUrls.otherPages
                })] min-[320px]:bg-center bg-contain h-[500px] md:h-[700px] lg:w-[600px] pt-2 sm:pt-5 md:pt-10`}
                key={page._id}
              >
                <div className="text-center mt-24 text-[#CCCCCC]">
                  <p>Join for my</p>
                  <h1>
                    {page.category !== "Other"
                      ? page.category
                      : page.customEvent}
                  </h1>
                  <p>{page.time}</p>
                  <p>
                    {page.date &&
                      new Date(page.date).toLocaleDateString(
                        "en-US",
                        dateOptions
                      )}
                  </p>
                  <p>@</p>
                  <div className="flex justify-center">
                    <div className="w-1/2 sm:w-1/5 lg:w-1/2 break-all">
                      <p className="text-xs md:text-base">{page.venue}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      ) : null}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  einvite: makeSelectEinvite(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEinvite: (hostID) => {
      dispatch({ type: GET_EINVITE, hostID });
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
)(GuestEInvite);

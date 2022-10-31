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
import { makeSelectEinvite, makeSelectLoading } from "./selectors";
import reducer from "./reducer";
import { templates } from "utils/eInviteTemplates";
import axiosInstance from "../../utils/axios";
import { paymentFailureToast, paymentSucessToast } from "../../utils/toast";
import MoonLoader from "react-spinners/MoonLoader";

const override = {
  display: "block",
  position: "absolute",
  top: "40%",
  left: "50%",
  zIndex: 1000,
};

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

function GuestEInvite({ einvite, getEinvite, loading }) {
  useInjectSaga({ key: "guestEInvite", saga });
  useInjectReducer({ key: "guestEInvite", reducer });
  const hostID = window.location.href.split("/")[5];

  useEffect(() => {
    getEinvite(hostID);
  }, []);
  const [pageData, setPageData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(null);
  useEffect(() => {
    let pages = [];
    if (einvite.length > 0) {
      einvite.map((event) => {
        if (event.hasOwnProperty("page")) pages[event.page - 1] = event;
        else pages[0] = event;
      });
      setPageData(pages);
    }
  }, [einvite]);

  const initPayment = (data) => {
    const options = {
      key: process.env.RAZORPAY_KEY,
      amount: data.amount,
      currency: data.currency,
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        try {
          const { data } = await axiosInstance.post(
            "/eaashirvaad/verify",
            response
          );
          console.log(data);
          paymentSucessToast(Number(paymentAmount));
        } catch (error) {
          paymentFailureToast();
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const { data } = await axiosInstance.post("/eaashirvaad", {
        amount: Number(paymentAmount),
      });
      console.log(data);
      initPayment(data.data);
      setIsClicked(false);
      setPaymentAmount("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={`mb-[100px] ${loading ? "opacity-50" : "opacity-100"}`}>
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
      {!isClicked ? (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => {
              setIsClicked(true);
            }}
            className="border rounded-lg px-10 py-2 lg:py-3 text-[#44a030] border-[#44a030]"
          >
            Send Aashirvaad
          </button>
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          <input
            className="px-2 lg:py-2 py-1 mr-4 border rounded-lg border-[#44a030]"
            placeholder="Enter the amount..."
            type="text"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
          />
          <button
            onClick={handlePayment}
            className="border rounded-lg text-sm lg:text-lg px-2 lg:px-4 py-1 lg:py-2 text-[#44a030] border-[#44a030]"
          >
            Pay Now
          </button>
        </div>
      )}
      {loading ? (
        <MoonLoader cssOverride={override} size={40} loading={loading} />
      ) : null}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  einvite: makeSelectEinvite(),
  loading: makeSelectLoading(),
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

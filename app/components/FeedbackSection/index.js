import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { feedbacks } from "./feedbacks";
import FeedbackCard from "../FeedbackCard";

function Feedback() {
  const laptopSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 1,
  };

  const tabletSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 1,
  };

  const mobileSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
  };

  return (
    // <div className="flex justify-around mt-4">
    <>
      <div className="hidden lg:block">
        <Slider {...laptopSettings} className="p-10">
          {feedbacks.map((feedback, index) => (
            <FeedbackCard feedback={feedback} key={index} />
          ))}
        </Slider>
      </div>
      <div className="hidden md:block lg:hidden">
        <Slider {...tabletSettings} className="p-10">
          {feedbacks.map((feedback, index) => (
            <FeedbackCard feedback={feedback} key={index} />
          ))}
        </Slider>
      </div>
      <div className="block md:hidden">
        <Slider {...mobileSettings} className="p-2">
          {feedbacks.map((feedback, index) => (
            <FeedbackCard feedback={feedback} key={index} />
          ))}
        </Slider>
      </div>
    </>
    // </div>
  );
}

export default Feedback;

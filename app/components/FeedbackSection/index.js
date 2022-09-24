import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { feedbacks } from "./feedbacks";
import FeedbackCard from "../FeedbackCard";

function Feedback() {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 1
      };
  return (
    // <div className="flex justify-around mt-4">
    <Slider {...settings} className="p-10">
      {feedbacks.map((feedback,index) => (
        <FeedbackCard feedback={feedback} key={index}/>
      ))}
      </Slider>
    // </div>
    
  );
}

export default Feedback;

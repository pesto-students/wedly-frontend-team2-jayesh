import React from "react";
import { feedbacks } from "./feedbacks";
import FeedbackCard from "../FeedbackCard";

function Feedback() {
  return (
    <div className="flex justify-around mt-4">
      {feedbacks.map((feedback) => (
        <FeedbackCard feedback={feedback} />
      ))}
    </div>
  );
}

export default Feedback;

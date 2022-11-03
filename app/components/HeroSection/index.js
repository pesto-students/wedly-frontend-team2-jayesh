import React, { memo } from "react";
import Button from "../Button";
import messages from "../Header/messages";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import H1 from "../H1";
import H3 from "../H3";
import { toggleModal } from "../../containers/App/actions";
import { makeSelectAuth } from "../../containers/HomePage/selectors";
import { AiOutlineArrowRight } from "@react-icons/all-files/ai/AiOutlineArrowRight";
import history from "../../utils/history";

function HeroSection({ onToggleModal, success }) {
  return (
    <div className="hero-background hero-background-mobile flex flex-col justify-end items-center p-4">
      <H1
        classes="text-2xl font-semibold mt-6 text-white md:text-3xl lg:text-4xl lg:font-extrabold lg:leading-3"
        text={messages.heading}
      />
      <H3
        classes="text-lg font-extralight text-white md:text-xl lg:text-2xl lg:font-semibold lg:mb-3 mb-4"
        text={messages.subHeading}
      />
      {success ? (
        <button
          onClick={() => history.push("/coupleDetails")}
          className="flex items-center bg-wedlyPink hover:bg-[#a51742] rounded-xl lg:text-lg text-white py-2 px-5 font-semibold"
        >
          Fill Details
          <AiOutlineArrowRight className="ml-1" />
        </button>
      ) : (
        <Button
          onClickFunction={() => onToggleModal()}
          classes="font-semibold hover:bg-[#a51742]"
          text={messages.getStarted}
        />
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  success: makeSelectAuth(),
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
)(HeroSection);

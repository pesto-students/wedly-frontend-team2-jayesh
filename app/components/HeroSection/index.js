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
import { AiOutlineArrowRight } from "react-icons/ai";

function HeroSection({ onToggleModal, success }) {
  return (
    <div className="hero-background hero-background-mobile flex flex-col justify-end items-center p-4">
      <H1
        classes="text-2xl font-semibold mt-6 text-white md:text-4xl md:font-extrabold md:leading-3"
        text={messages.heading}
      />
      <H3
        classes="text-md font-extralight text-white md:text-2xl md:font-semibold md:mb-3 mb-4"
        text={messages.subHeading}
      />
      {success ? (
        <button className="flex items-center bg-wedlyPink rounded-xl md:text-lg text-white py-2 px-5 font-semibold">
          Fill Details
          <AiOutlineArrowRight className="ml-1" />
        </button>
      ) : (
        <Button
          onClickFunction={() => onToggleModal()}
          classes="font-semibold"
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

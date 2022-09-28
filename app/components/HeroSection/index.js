import React, { memo } from "react";
import Button from "../Button";
import messages from "../Header/messages";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import H1 from "../H1";
import H3 from "../H3";
import { toggleModal } from "../../containers/App/actions";
import { makeSelectLoginSuccess } from "../../containers/HomePage/selectors";
import { AiOutlineArrowRight } from "react-icons/ai";

function HeroSection({ onToggleModal, success }) {
  return (
    <div className="hero-background flex flex-col justify-end items-center p-4">
      <H1
        classes="text-white text-4xl font-extrabold leading-3"
        text={messages.heading}
      />
      <H3
        classes="text-white text-2xl font-semibold mb-3"
        text={messages.subHeading}
      />
      {document.cookie.length !== 0 ? (
        <button className="flex items-center bg-wedlyPink rounded-xl text-lg text-white py-2 px-5 font-semibold">
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
  success: makeSelectLoginSuccess(),
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

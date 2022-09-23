import React, {memo,useEffect} from "react";
import Button from "../Button";
import messages from "./messages";
import Logo from "./wedly_logo.svg";
import { makeSelectIsOpen } from "../../containers/App/selectors";
import { createStructuredSelector } from "reselect";
import { toggleModal } from "../../containers/App/actions";
import {connect} from "react-redux";
import {compose} from "redux";

function NavBar(props) {
  return (
    <div className="bg-white flex justify-between py-2 px-2 w-full">
      <img src={Logo} alt="wedly logo" />
      <div className="flex ">
        <Button text={messages.login} onClickFunction={() => props.onToggleModal()}/>
        <Button text={messages.signup} classes="ml-3" />
      </div>
    </div>
  );
}


const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectIsOpen(),
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
)(NavBar);

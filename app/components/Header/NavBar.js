import React, { memo } from "react";
import Button from "../Button";
import history from "../../utils/history";
import messages from "./messages";
import Logo from "./wedly_logo.svg";
import { makeSelectIsOpen } from "../../containers/App/selectors";
import { createStructuredSelector } from "reselect";
import { toggleModal } from "../../containers/App/actions";
import { connect } from "react-redux";
import { compose } from "redux";
import axios from "axios";
import { makeSelectLoginSuccess } from "../../containers/HomePage/selectors";
import { deleteAllCookies } from "../../utils/deleteCookies";

function NavBar(props) {
  const logout = async () => {
    console.log("Hii");
    console.log(props.success);
    if (props.user) {
      window.open("http://localhost:7000/api/google/logout", "_self");
    }
    if (props.success) {
      // await axios.post("http://localhost:7000/api/logout");
      deleteAllCookies();
      window.location.reload();
    }
  };

  return (
    <div>
      <div className="bg-white flex justify-between py-2 px-2 w-full">
        <div className="flex items-center w-1/4">
          <img src={Logo} alt="wedly logo" />
        </div>
        {props.success || document.cookie.length !== 0 || props.user ? (
          <>
            <div className="flex items-center justify-evenly w-1/2">
              <a href="">Events</a>
              <a href="">Guests</a>
              <a href="">E-Invites</a>
              <a href="">Contact Us</a>
            </div>
            <div className="flex items-center justify-end w-1/4">
              <p>Account Settings</p>
              <button onClick={logout}>Logout</button>
            </div>
          </>
        ) : (
          <div className="flex">
            <Button
              text={messages.login}
              onClickFunction={() => props.onToggleModal()}
            />
            <Button text={messages.signup} classes="ml-3" />
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectIsOpen(),
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
)(NavBar);

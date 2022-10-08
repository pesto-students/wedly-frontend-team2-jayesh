import React, { memo, useState } from "react";
import Button from "../Button";
import messages from "./messages";
import Logo from "./wedly_logo.svg";
import { makeSelectIsOpen } from "../../containers/App/selectors";
import { createStructuredSelector } from "reselect";
import { toggleModal } from "../../containers/App/actions";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  makeSelectAuth,
  makeSelectUser,
} from "../../containers/HomePage/selectors";
import { MdAccountCircle } from "react-icons/md";
import history from "../../utils/history";
import { SIGNOUT } from "../../containers/HomePage/constants";

function NavBar({ user, success, onToggleModal, logout }) {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="hidden md:block">
      <div className="bg-white flex justify-between py-2 px-2 w-full">
        <div className="flex items-center w-1/4">
          <img
            className="cursor-pointer"
            onClick={() => history.push("/")}
            src={Logo}
            alt="wedly logo"
          />
        </div>
        {success ? (
          <>
            <div className="flex items-center justify-evenly w-2/5">
              <a className="font-semibold" href="">
                Events
              </a>
              <a className="font-semibold" href="">
                Guests
              </a>
              <a className="font-semibold" href="">
                E-Invites
              </a>
              <a className="font-semibold" href="#contactUs">
                Contact Us
              </a>
            </div>
            <div className="flex items-center justify-end w-1/4">
              {user && user.google ? (
                <img
                  onClick={() => setClicked(!clicked)}
                  className="rounded-full h-11 cursor-pointer"
                  src={user.google.photo}
                  alt="profilePicture"
                />
              ) : (
                <MdAccountCircle
                  size={"2em"}
                  onClick={() => setClicked(!clicked)}
                />
              )}
            </div>

            {clicked && (
              <div className="flex flex-col justify-around border border-slate-400 p-2 absolute right-0 top-14 bg-white h-20 rounded-xl">
                <h3 className="font-semibold">Account Settings</h3>
                <h3
                  onClick={() => {
                    logout();
                    setClicked(!clicked);
                  }}
                  className="cursor-pointer font-semibold"
                >
                  Logout
                </h3>
              </div>
            )}
          </>
        ) : (
          <div className="flex">
            <Button
              text={messages.login}
              onClickFunction={() => onToggleModal()}
            />
            <Button
              onClickFunction={() => history.push("/signup")}
              text={messages.signup}
              classes="ml-3"
            />
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectIsOpen(),
  success: makeSelectAuth(),
  user: makeSelectUser(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onToggleModal: () => {
      dispatch(toggleModal());
    },
    logout: () => {
      dispatch({ type: SIGNOUT });
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

import React, { memo, useState, useRef } from "react";
import useOnClickOutside from "use-onclickoutside";
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

function NavBar({ user, success, onToggleModal, logout, loading }) {
  const ref = useRef();
  const [clicked, setClicked] = useState(false);
  useOnClickOutside(ref, () => setClicked(false));
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
            <div className="flex items-center justify-evenly md:w-3/5 lg:w-2/5">
              <button
                onClick={() => history.push("/events")}
                className="font-semibold"
              >
                Events
              </button>
              <button
                onClick={() => history.push("/guests")}
                className="font-semibold"
              >
                Guests
              </button>
              <button
                onClick={() => history.push("/einvites")}
                className="font-semibold"
              >
                E-Invites
              </button>
              <a className="font-semibold" href="/#contactUs">
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
              <div
                ref={ref}
                className="flex flex-col justify-around border border-slate-400 p-2 absolute right-2 top-14 bg-white h-20 rounded-xl z-10"
              >
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

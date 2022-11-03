import React, { memo, useState } from "react";
import Button from "../Button";
import messages from "./messages";
import Logo from "./wedly_logo.svg";
import { makeSelectIsOpen } from "../../containers/App/selectors";
import { createStructuredSelector } from "reselect";
import { toggleModal } from "../../containers/App/actions";
import { connect } from "react-redux";
import { compose } from "redux";
import { makeSelectAuth } from "../../containers/HomePage/selectors";
import { GiHamburgerMenu } from "@react-icons/all-files/gi/GiHamburgerMenu";
import { MdClose } from "@react-icons/all-files/md/MdClose";
import { MdSettings } from "@react-icons/all-files/md/MdSettings";
import { MdEvent } from "@react-icons/all-files/md/MdEvent";
import { MdDetails } from "@react-icons/all-files/md/MdDetails";
import { MdPersonAdd } from "@react-icons/all-files/md/MdPersonAdd";
import { MdEmail } from "@react-icons/all-files/md/MdEmail";
import { MdInfoOutline } from "@react-icons/all-files/md/MdInfoOutline";
import history from "../../utils/history";
import { SIGNOUT } from "../../containers/HomePage/constants";

function MobileNavBar({ user, success, onToggleModal, logout }) {
  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  return (
    <div className="block md:hidden">
      <div className="bg-white flex justify-between py-2 px-2 w-full">
        <div className="flex items-center w-1/4">
          <img
            className="cursor-pointer"
            onClick={() => {
              history.push("/");
              setHamburgerClicked(false);
            }}
            src={Logo}
            alt="wedly logo"
          />
        </div>
        <>
          {!hamburgerClicked ? (
            <GiHamburgerMenu
              size={"1.3em"}
              className="mt-1 text-pink"
              onClick={() => setHamburgerClicked(!hamburgerClicked)}
            />
          ) : (
            <MdClose
              size={"1.3em"}
              className="mt-1 text-pink"
              onClick={() => setHamburgerClicked(!hamburgerClicked)}
            />
          )}
        </>
      </div>

      {hamburgerClicked && (
        <div className="absolute bg-white p-4 w-full z-50 ">
          <div className="flex flex-col text-lg font-semibold">
            {success ? (
              <>
                <a
                  onClick={() => {
                    history.push("/coupleDetails");
                    setHamburgerClicked(!hamburgerClicked);
                  }}
                  className="flex items-center w-fit"
                >
                  <MdDetails className="mr-1" />
                  <span>Details</span>
                </a>
                <a
                  onClick={() => {
                    history.push("/events");
                    setHamburgerClicked(!hamburgerClicked);
                  }}
                  className="flex items-center w-fit"
                >
                  <MdEvent className="mr-1" />
                  <span>Events</span>
                </a>
                <a
                  onClick={() => {
                    history.push("/guests");
                    setHamburgerClicked(!hamburgerClicked);
                  }}
                  className="flex items-center w-fit"
                >
                  <MdPersonAdd className="mr-1" />
                  <span>Guests</span>
                </a>
                <a
                  onClick={() => {
                    history.push("/einvites");
                    setHamburgerClicked(!hamburgerClicked);
                  }}
                  className="flex items-center w-fit"
                >
                  <MdEmail className="mr-1" />
                  <span>E-Invites</span>
                </a>
              </>
            ) : null}
            <a
              onClick={() => {
                history.push("/contactUs");
                setHamburgerClicked(!hamburgerClicked);
              }}
              className="flex items-center w-fit"
            >
              <MdSettings className="mr-1" />
              <span>Contact Us</span>
            </a>
          </div>
          <div className="flex flex-col mt-2">
            {success ? (
              <button
                onClick={() => {
                  logout();
                  setHamburgerClicked(!hamburgerClicked);
                }}
                className="py-2 px-5 text-sm font-medium text-center text-pink rounded-lg border border-solid border-pink hover:bg-pink hover:text-white"
              >
                Logout
              </button>
            ) : (
              <>
                <Button
                  text={messages.login}
                  onClickFunction={() => {
                    onToggleModal();
                    setHamburgerClicked(!hamburgerClicked);
                  }}
                  classes="mb-3"
                />
                <Button
                  onClickFunction={() => {
                    history.push("/signup");
                    setHamburgerClicked(!hamburgerClicked);
                  }}
                  text={messages.signup}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectIsOpen(),
  success: makeSelectAuth(),
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
)(MobileNavBar);

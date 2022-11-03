import React, { memo, useState } from "react";
import googleLogo from "./googleLogo.svg";
import { createStructuredSelector } from "reselect";
import { toggleModal } from "../../containers/App/actions";
import { makeSelectIsOpen } from "../../containers/App/selectors";
import { connect } from "react-redux";
import { compose } from "redux";
import { SIGNIN } from "../../containers/HomePage/constants";
import { makeSelectAuth } from "../../containers/HomePage/selectors";
import history from "../../utils/history";

function SigninModal({ signInModal, onToggleModal }) {
  const [email, setEmail] = useState("shivanshu+demo@gmail.com");
  const [password, setPassword] = useState("demo");

  function handleSubmit(event) {
    event.preventDefault();
    signInModal(email, password);
  }

  const google = () => {
    window.open(`${process.env.SERVER_URL}/google`, "_self");
  };

  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-24 right-0 sm:left-1/4 lg:left-1/3 z-50 w-full h-modal lg:h-full"
    >
      <div className="relative p-6 md:p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-md   shadow">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="authentication-modal"
            onClick={() => onToggleModal()}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-2 md:mb-4 text-xl font-medium text-gray-900">
              Login
            </h3>
            <div className="flex justify-center mb-2 md:mb-4">
              <button
                type="submit"
                className="flex items-center text-black border hover:border-gray-500 border-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={() => {
                  google();
                }}
              >
                <img className="md:mr-2" src={googleLogo} alt="googleLogo" />
                <span className="hidden md:block">Login with Google</span>
              </button>
            </div>
            <div className="flex justify-center mb-1 md:mb-4">
              <span className="text-gray-500">-OR-</span>
            </div>
            <form
              className="space-y-3 md:space-y-6"
              onSubmit={(event) => {
                handleSubmit(event);
                onToggleModal();
              }}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 md:mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-1.5 py-2 md:px-2.5 w-full"
                  placeholder="Enter Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 md:mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 py-2 md:p-2.5 w-full"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="mx-auto text-white bg-pink focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center shadow border border-solid border-pink  hover:bg-inherit hover:text-pink"
                >
                  Login
                </button>
              </div>
              <div className="text-sm font-medium text-center text-black">
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    history.push("/signup");
                    onToggleModal();
                  }}
                  className="text-pink hover:underline"
                >
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
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
    signInModal: (email, password) => {
      dispatch({ type: SIGNIN, email, password });
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
)(SigninModal);

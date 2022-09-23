import React, { memo } from "react";
import googleLogo from "./googleLogo.svg";
import { createStructuredSelector } from "reselect";
import { toggleModal } from "../../containers/App/actions";
import { makeSelectIsOpen } from "../../containers/App/selectors";
import {connect} from "react-redux";
import {compose} from "redux";

function SigninModal(props) { 
  return (
    <div
      id="authentication-modal"
      tabindex="-1"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-24 right-0 left-1/3 z-50 w-full h-modal md:h-full"
    >
      <div class="relative p-4 w-full max-w-md h-full md:h-auto">
        <div class="relative bg-white rounded-2xl shadow">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="authentication-modal"
            onClick={() => props.onToggleModal()}
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900">Login</h3>
            <div className="flex justify-center mb-4">
              <button
                type="submit"
                class="flex items-center text-black border border-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
               
              >
                <img className="mr-2" src={googleLogo} alt="googleLogo" />
                <span>Login with Google</span>
              </button>
            </div>
            <div className="flex justify-center mb-4">
              <span className="text-gray-500">-OR-</span>
            </div>
            <form class="space-y-6" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Email Address"
                  required
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="mx-auto text-white bg-pink focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow"
                >
                  Login
                </button>
              </div>
              <div class="text-sm font-medium text-center text-black">
                Don't have an account?{" "}
                <a href="#" className="text-pink hover:underline">
                  Signup
                </a>
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
)(SigninModal);


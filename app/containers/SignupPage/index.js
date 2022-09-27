import React, { memo, useState } from "react";
import googleLogo from "./googleLogo.svg";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { makeSelectIsOpen } from "../App/selectors";
import SigninModal from "../../components/SigninModal";
import reducer from "./reducer";
import saga from "./saga";
import { toggleModal } from "../App/actions";
import { useInjectReducer } from "../../utils/injectReducer";
import { useInjectSaga } from "../../utils/injectSaga";
import { SIGNUP } from "./constants";
import { makeSelectSignupSuccess } from "./selectors";

const key = "signup";
function SignupPage({ isOpen, onToggleModal, signup }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const google = () => {
    window.open("http://localhost:7000/api/google", "_self");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = firstName + " " + lastName;
    signup(name, email, password);
  };

  return (
    <div>
      <div
        className={`p-4 w-full h-full md:h-auto flex justify-center items-center flex-col ${isOpen &&
          "opacity-50"}`}
      >
        <h3 className="mb-4 text-xl font-medium text-gray-900">
          Create an Account to start using our services
        </h3>
        <div className="flex justify-center mb-4">
          <button
            type="submit"
            class="flex items-center text-black border border-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={google}
          >
            <img className="mr-2" src={googleLogo} alt="googleLogo" />
            <span>Signup with Google</span>
          </button>
        </div>
        <div className="flex justify-center mb-4">
          <span className="text-gray-500">-OR-</span>
        </div>
        <form class="space-y-6 w-1/2" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label
              for="last_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email_address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              for="confirm_password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="mx-auto text-white bg-[#3498DB] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow"
            >
              Submit
            </button>
          </div>
        </form>
        <div class="text-sm mt-4 font-medium text-center text-black">
          Don't have an account?{" "}
          <button
            onClick={() => onToggleModal()}
            className="text-pink hover:underline"
          >
            Login
          </button>
        </div>
      </div>
      {isOpen && <SigninModal />}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectIsOpen(),
  success: makeSelectSignupSuccess(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onToggleModal: () => {
      dispatch(toggleModal());
    },
    signup: (name, email, password) => {
      dispatch({ type: SIGNUP, name, email, password });
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
)(SignupPage);

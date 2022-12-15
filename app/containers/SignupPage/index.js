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
import { makeSelectSignupLoading, makeSelectSignupSuccess } from "./selectors";
import MoonLoader from "react-spinners/MoonLoader";

const override = {
  display: "block",
  position: "absolute",
  top: "40%",
  left: "50%",
  zIndex: 1000,
};

const key = "signup";
function SignupPage({ isOpen, onToggleModal, signup, loading }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputStyles =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "email":
          if (!value) {
            stateObj[name] = "Please enter email.";
          } else if (!validateEmail(value)) {
            stateObj[name] = "Please enter a valid email address";
          }
          break;
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;
      }

      return stateObj;
    });
  };

  const google = () => {
    window.open(`${process.env.SERVER_URL}/google`, "_self");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = input.firstName + " " + input.lastName;
    signup(name, input.email, input.password);
  };

  return (
    <div>
      <div
        className={`p-4 w-full h-full md:h-auto flex justify-center items-center flex-col ${
          isOpen || loading ? "opacity-50" : "opacity-100"
        }`}
      >
        <h3 className="mb-4 hidden md:block text-xl font-medium text-gray-900">
          Create an Account to start using our services
        </h3>
        <h3 className="mb-4 block md:hidden font-medium text-gray-900">
          Create an Account
        </h3>

        <form
          className="space-y-6 w-full p-3 md:w-4/5 lg:w-1/2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div>
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              className={inputStyles}
              placeholder="First Name"
              required
              value={input.firstName}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className={inputStyles}
              value={input.lastName}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className={inputStyles}
              placeholder="Email Address"
              required
              value={input.email}
              onChange={onInputChange}
            />
            {error.email && (
              <span className="text-red-500 text-sm">{error.email}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={inputStyles}
              value={input.password}
              onChange={onInputChange}
              onBlur={validateInput}
            />
            {error.password && (
              <span className="text-red-500 text-sm">{error.password}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className={inputStyles}
              value={input.confirmPassword}
              onChange={onInputChange}
              onBlur={validateInput}
            />
            {error.confirmPassword && (
              <span className="text-red-500 text-sm">
                {error.confirmPassword}
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="mx-auto py-2 px-5 text-sm font-medium text-center text-pink rounded-lg border border-solid border-pink  hover:bg-pink hover:text-white"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="flex justify-center mb-4">
          <span className="text-gray-500">-OR-</span>
        </div>
        <div className="flex justify-center mb-4">
          <button
            type="submit"
            className="flex items-center hover:border-gray-500 text-black border border-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={google}
          >
            <img className="mr-2" src={googleLogo} alt="googleLogo" />
            <span>Signup with Google</span>
          </button>
        </div>
        <div className="text-sm mt-4 font-medium text-center text-black">
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
      {loading ? (
        <MoonLoader cssOverride={override} size={40} loading={loading} />
      ) : null}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isOpen: makeSelectIsOpen(),
  success: makeSelectSignupSuccess(),
  loading: makeSelectSignupLoading(),
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

/**
 *
 * AccountSettingsPage
 *
 */

import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectAccountSettingsPage, {
  makeSelectAccountLoading,
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { makeSelectUser } from "../HomePage/selectors";
import { UPDATE_USER } from "./constants";
import { AUTH_STATE } from "../HomePage/constants";
import { updatePasswordFailureToast } from "../../utils/toast";
import MoonLoader from "react-spinners/MoonLoader";

const override = {
  display: "block",
  position: "absolute",
  top: "40%",
  left: "50%",
  zIndex: 1000,
};

const inputStyles =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

export function AccountSettingsPage({
  user,
  updateUser,
  checkAuthState,
  loading,
}) {
  useInjectReducer({ key: "accountSettingsPage", reducer });
  useInjectSaga({ key: "accountSettingsPage", saga });
  const [changePasswordClicked, setchangePasswordClicked] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      oldPassword === newPassword &&
      oldPassword !== "" &&
      newPassword !== ""
    ) {
      updatePasswordFailureToast();
    } else {
      updateUser(user.email, name, oldPassword, newPassword);
    }
  };
  useEffect(() => {
    checkAuthState();
  }, []);
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  return (
    <div>
      <div
        className={`${
          loading ? "opacity-50" : "opacity-100"
        } p-4 w-full h-full md:h-auto flex justify-center items-center flex-col`}
      >
        <h3 className="mb-4 block text-xl font-medium text-gray-900">
          Account Settings
        </h3>
        <form
          className="space-y-6 w-full p-3 md:w-4/5 lg:w-1/2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              className={inputStyles}
              placeholder="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              disabled
              type="email"
              name="email"
              className={inputStyles}
              placeholder="Email Address"
              required
              value={email}
              // onChange={onInputChange}
            />
          </div>
          {changePasswordClicked ? (
            <>
              <div>
                <label
                  htmlFor="oldPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="Old Password"
                  className={inputStyles}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  // onBlur={validateInput}
                />
              </div>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  className={inputStyles}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  // onBlur={validateInput}
                />
              </div>
            </>
          ) : null}
          <div className="flex justify-between flex-col">
            {!changePasswordClicked ? (
              <button
                className="mx-auto py-2 px-5 text-sm font-medium text-center bg-pink text-white rounded-lg border border-solid border-pink  hover:bg-white hover:text-pink mb-4"
                onClick={(e) => {
                  e.preventDefault();
                  setchangePasswordClicked(true);
                }}
              >
                Do you want to change your password?
              </button>
            ) : null}
            <button
              type="submit"
              className="mx-auto py-2 px-5 text-sm font-medium text-center text-white rounded-lg border border-solid border-[#3498DB] bg-[#3498DB] hover:bg-white hover:text-[#3498DB]"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      {loading ? (
        <MoonLoader cssOverride={override} size={40} loading={loading} />
      ) : null}
    </div>
  );
}

AccountSettingsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  accountSettingsPage: makeSelectAccountSettingsPage(),
  user: makeSelectUser(),
  loading: makeSelectAccountLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateUser: (email, name, oldPassword, newPassword) => {
      dispatch({ type: UPDATE_USER, email, name, oldPassword, newPassword });
    },
    checkAuthState: () => {
      dispatch({ type: AUTH_STATE });
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
)(AccountSettingsPage);

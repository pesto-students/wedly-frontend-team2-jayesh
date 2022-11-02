/**
 *
 * AccountSettingsPage
 *
 */

import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectAccountSettingsPage from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { makeSelectUser } from "../HomePage/selectors";

const inputStyles =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

export function AccountSettingsPage({ user }) {
  useInjectReducer({ key: "accountSettingsPage", reducer });
  useInjectSaga({ key: "accountSettingsPage", saga });
  const [changePasswordClicked, setchangePasswordClicked] = useState(false);
  console.log(user);
  return (
    <div>
      <div
        className={`p-4 w-full h-full md:h-auto flex justify-center items-center flex-col`}
      >
        <h3 className="mb-4 block text-xl font-medium text-gray-900">
          Account Settings
        </h3>
        <form
          className="space-y-6 w-full p-3 md:w-4/5 lg:w-1/2"
          // onSubmit={(e) => handleSubmit(e)}
        >
          <div>
            <label
              for="name"
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
              value={user.name}
              disabled
              // onChange={onInputChange}
            />
          </div>
          <div>
            <label
              for="email"
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
              value={user.email}
              // onChange={onInputChange}
            />
          </div>
          {changePasswordClicked ? (
            <>
              <div>
                <label
                  for="oldPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  placeholder="Old Password"
                  className={inputStyles}
                  // value={input.password}
                  // onChange={onInputChange}
                  // onBlur={validateInput}
                />
              </div>
              <div>
                <label
                  for="newPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  className={inputStyles}
                  // value={input.confirmPassword}
                  // onChange={onInputChange}
                  // onBlur={validateInput}
                />
              </div>
            </>
          ) : null}
          <div className="flex justify-between">
            <button
              className="mx-auto py-2 px-5 text-sm font-medium text-center text-pink rounded-lg border border-solid border-pink  hover:bg-pink hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                setchangePasswordClicked(true);
              }}
            >
              Change Password
            </button>
          </div>
          {/* <div className="flex justify-between">
            <button
              type="submit"
              className="mx-auto py-2 px-5 text-sm font-medium text-center text-pink rounded-lg border border-solid border-pink  hover:bg-pink hover:text-white"
            >
              Submit
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
}

AccountSettingsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  accountSettingsPage: makeSelectAccountSettingsPage(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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

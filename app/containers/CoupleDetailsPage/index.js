/**
 *
 * CoupleDetailsPage
 *
 */

import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import { makeSelectCoupleDetailsPage } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import Details from "../../components/Details";
import { ADD_COUPLE_DETAILS } from "./constants";
import history from "../../utils/history";

function CoupleDetailsPage({ addCoupleDetails }) {
  useInjectReducer({ key: "coupleDetailsPage", reducer });
  useInjectSaga({ key: "coupleDetailsPage", saga });

  const [groomInput, setGroomInput] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    city: "",
    state: "",
  });

  const [brideInput, setBrideInput] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    city: "",
    state: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCoupleDetails(
      brideInput.fullName,
      brideInput.motherName,
      brideInput.fatherName,
      brideInput.state,
      brideInput.city,
      groomInput.fullName,
      groomInput.motherName,
      groomInput.fatherName,
      groomInput.state,
      groomInput.city,   
    );
    history.push("/events");
  };

  return (
    <div className="p-5">
      <h3 className="pl-4 mb-4 text-xl font-semibold text-gray-900">
        Fill the wedding details to start inviting people to your wedding.
      </h3>
      <div className="flex flex-col md:flex-row">
        <Details
          role="Groom"
          input={groomInput}
          setInput={setGroomInput}
          classes="lg:mr-24"
        />
        <Details role="Bride" input={brideInput} setInput={setBrideInput} />
      </div>
      <div className="flex justify-end px-4 my-12">
        <button
          type="submit"
          className="text-white bg-[#3498DB] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow"
          onClick={(e) => handleSubmit(e)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

CoupleDetailsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  coupleDetailsPage: makeSelectCoupleDetailsPage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    addCoupleDetails: (
      brideName,
      brideMotherName,
      brideFatherName,
      brideState,
      brideCity,
      groomName,
      groomMotherName,
      groomFatherName,
      groomState,
      groomCity
    ) => {
      dispatch({
        type: ADD_COUPLE_DETAILS,
        brideName,
        brideMotherName,
        brideFatherName,
        brideState,
        brideCity,
        groomName,
        groomMotherName,
        groomFatherName,
        groomState,
        groomCity,
      });
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
)(CoupleDetailsPage);

/**
 *
 * CoupleDetailsPage
 *
 */

import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import { makeSelectCoupleDetailsPage, makeSelectLoading } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import Details from "../../components/Details";
import { ADD_COUPLE_DETAILS, GET_COUPLE_DETAILS } from "./constants";
import history from "../../utils/history";
import MoonLoader from "react-spinners/MoonLoader";

const override = {
  display: "block",
  position: "absolute",
  top: "40%",
  left: "50%",
  zIndex: 1000,
};

function CoupleDetailsPage({
  addCoupleDetails,
  coupleDetailsPage,
  getCoupleDetails,
  loading,
}) {
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

  useEffect(() => {
    getCoupleDetails();
  }, []);

  useEffect(() => {
    console.log(coupleDetailsPage);
    if (Object.keys(coupleDetailsPage).length > 0) {
      const { bride, groom } = coupleDetailsPage;
      setGroomInput({
        fullName: groom.name,
        fatherName: groom.fatherName,
        motherName: groom.motherName,
        city: groom.city,
        state: groom.state,
      });
      setBrideInput({
        fullName: bride.name,
        fatherName: bride.fatherName,
        motherName: bride.motherName,
        city: bride.city,
        state: bride.state,
      });
    }
  }, [coupleDetailsPage]);

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
      groomInput.city
    );
    history.push("/events");
  };

  return (
    <div className={`${loading ? "opacity-50" : "opacity-100"} p-5`}>
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
      {loading ? (
        <MoonLoader cssOverride={override} size={40} loading={loading} />
      ) : null}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  coupleDetailsPage: makeSelectCoupleDetailsPage(),
  loading: makeSelectLoading(),
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
    getCoupleDetails: () => {
      dispatch({ type: GET_COUPLE_DETAILS });
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

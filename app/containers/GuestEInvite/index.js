/**
 *
 * GuestEInvite
 *
 */

import React, { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectGuestEInvite from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import axios from "axios";

export function GuestEInvite() {
  useInjectReducer({ key: "guestEInvite", reducer });
  useInjectSaga({ key: "guestEInvite", saga });

  useEffect(() => {
    // const page1 = `<div id="page1" class="bg-[url(https://image.wedmegood.com/e-invite-images/b6c97b4d-fd62-403e-85ed-219db391d1bd-bgImage.JPEG)] bg-center bg-contain h-[600px] pt-5 mb-2.5 w-[500px]"><h2 class="text-2xl text-center text-[#CCCCCC] mt-2">Anushka</h2><h2 class="text-2xl text-center text-[#CCCCCC]">&amp;</h2><h2 class="text-2xl text-center text-[#CCCCCC] mb-4">Virat</h2><h4 class="text-center text-[#CCCCCC]">Sunday, October 30, 2022</h4></div>`;
    // const page1HTML = new DOMParser().parseFromString(page1, "text/html");
    // const elem = document.getElementById("page");
    // elem.appendChild(page1HTML.body.firstChild);
    loadInvite();
  }, []);

  const loadInvite = async () => {
    const res = await axios.post(
      `${process.env.SERVER_URL}/geteinvite`,
      { templateId: 1 },
      { withCredentials: true }
    );
    const page1HTML = new DOMParser().parseFromString(
      res.data.einvite.page1Content,
      "text/html"
    );
    const page2HTML = new DOMParser().parseFromString(
      res.data.einvite.page2Content,
      "text/html"
    );
    const page3HTML = new DOMParser().parseFromString(
      res.data.einvite.page3Content,
      "text/html"
    );
    const page4HTML = new DOMParser().parseFromString(
      res.data.einvite.page4Content,
      "text/html"
    );
    const elem = document.getElementById("page");
    elem.appendChild(page1HTML.body.firstChild);
    elem.appendChild(page2HTML.body.firstChild);
    elem.appendChild(page3HTML.body.firstChild);
    elem.appendChild(page4HTML.body.firstChild);
  };

  return <div className="flex" id="page" />;
}

GuestEInvite.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  guestEInvite: makeSelectGuestEInvite(),
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
)(GuestEInvite);

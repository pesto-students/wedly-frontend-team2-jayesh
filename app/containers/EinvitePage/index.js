/**
 *
 * EinvitePage
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectEinvitePage from "./selectors";
import reducer from "./reducer";
import homeReducer from "../HomePage/reducer";
import saga from "./saga";
import messages from "./messages";
import { templates } from "../../utils/eInviteTemplates";
import history from "../../utils/history";

export function EinvitePage() {
  useInjectReducer({ key: "einvitePage", reducer });
  useInjectReducer({ key: "home", reducer: homeReducer });
  useInjectSaga({ key: "einvitePage", saga });

  return (
    <div className="p-5">
      <h3 className="pl-4 mb-4 text-xl font-semibold text-gray-900">
        Select your template
      </h3>
      {templates.map((template) => (
        <div
          onClick={() => history.push(`/einviteEdit/${template.id}`)}
          key={template.id}
          className="cursor-pointer px-4"
        >
          <img
            className="h-96"
            src={template.imageUrls.firstPage}
            alt={template.name}
          />
          <h5 className="my-3">{template.name}</h5>
        </div>
      ))}
    </div>
  );
}

EinvitePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  einvitePage: makeSelectEinvitePage(),
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
)(EinvitePage);

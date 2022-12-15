import React, { memo, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import homeReducer from "../HomePage/reducer";
import einviteReducer from "../GuestEInvite/reducer";
import saga from "./saga";
import einviteSaga from "../GuestEInvite/saga";
import { makeSelectGuests, makeSelectIsLoading } from "./selectors";
import { DELETE_GUEST, GET_GUEST, SEND_INVITE } from "./constants";
import { AUTH_STATE } from "../HomePage/constants";
import { makeSelectUser } from "../HomePage/selectors";
import GuestsSection from "../../components/GuestsSection";
import MobileGuestsSection from "../../components/MobileGuestsSection";
import searchByName from "../../utils/searchByName";
import MoonLoader from "react-spinners/MoonLoader";

import { GET_EINVITE } from "../GuestEInvite/constants";
import { makeSelectGuestEInvite } from "../GuestEInvite/selectors";

const override = {
  display: "block",
  position: "absolute",
  top: "40%",
  left: "50%",
  zIndex: 1000,
};

export function GuestsPage({
  guests,
  getGuests,
  deleteGuest,
  user,
  sendInvite,
  checkAuthState,
  loading,
  getEinvite,
  einvite,
}) {
  useInjectReducer({ key: "guestsPage", reducer });
  useInjectReducer({ key: "home", reducer: homeReducer });
  useInjectReducer({ key: "guestEInvite", reducer: einviteReducer });
  useInjectSaga({ key: "guestsPage", saga });
  useInjectSaga({ key: "guestEInvite", saga: einviteSaga });
  const [selectedGuests, setSelectedGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [einviteData, setEinviteData] = useState([]);
  useEffect(() => {
    checkAuthState();
  }, []);
  useEffect(() => {
    if (Object.keys(user).length > 0) getGuests();
  }, [user]);

  useEffect(() => {
    if (Object.keys(user).length > 0)
      getEinvite(user._id ? user._id : user[0]._id);
  }, [user]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSelectedGuests(searchByName(guests, debouncedSearchTerm));
    } else {
      setSelectedGuests(guests);
    }
  }, [debouncedSearchTerm, guests]);

  useEffect(() => {
    setEinviteData(einvite);
  }, [einvite]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempCheckedGuests = selectedGuests.map((guest) => {
        if (guest.isChecked === undefined) guest.isChecked = false;
        return selectedGuests.includes(guest)
          ? { ...guest, isChecked: checked }
          : { ...guest, isChecked: guest.isChecked };
      });
      setSelectedGuests(tempCheckedGuests);
    } else {
      let tempCheckedGuests = selectedGuests.map((guest) =>
        guest._id === name ? { ...guest, isChecked: checked } : guest
      );
      setSelectedGuests(tempCheckedGuests);
    }
  };
  return (
    <>
      <GuestsSection
        einvite={einviteData}
        loading={loading}
        guests={guests}
        getGuests={getGuests}
        deleteGuest={deleteGuest}
        user={user}
        sendInvite={sendInvite}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGuests={selectedGuests}
        setSelectedGuests={setSelectedGuests}
        handleChange={handleChange}
      />
      <MobileGuestsSection
        einvite={einviteData}
        guests={guests}
        loading={loading}
        getGuests={getGuests}
        deleteGuest={deleteGuest}
        user={user}
        sendInvite={sendInvite}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGuests={selectedGuests}
        setSelectedGuests={setSelectedGuests}
      />
      {loading ? (
        <MoonLoader cssOverride={override} size={40} loading={loading} />
      ) : null}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  guests: makeSelectGuests(),
  user: makeSelectUser(),
  loading: makeSelectIsLoading(),
  einvite: makeSelectGuestEInvite(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGuests: () => {
      dispatch({ type: GET_GUEST });
    },
    deleteGuest: (id) => {
      dispatch({ type: DELETE_GUEST, id });
    },
    sendInvite: (from, to, mobile, userId) => {
      dispatch({ type: SEND_INVITE, from, to, mobile, userId });
    },
    checkAuthState: () => {
      dispatch({ type: AUTH_STATE });
    },
    getEinvite: (hostID) => {
      dispatch({ type: GET_EINVITE, hostID });
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
)(GuestsPage);

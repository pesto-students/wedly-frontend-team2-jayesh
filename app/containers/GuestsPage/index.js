import React, { memo, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import reducer from "./reducer";
import homeReducer from "../HomePage/reducer";
import saga from "./saga";
import { makeSelectGuests } from "./selectors";
import { DELETE_GUEST, GET_GUEST, SEND_INVITE } from "./constants";
import { AUTH_STATE } from "../HomePage/constants";
import { makeSelectUser } from "../HomePage/selectors";
import GuestsSection from "../../components/GuestsSection";
import MobileGuestsSection from "../../components/MobileGuestsSection";
import searchByName from "../../utils/searchByName";

export function GuestsPage({
  guests,
  getGuests,
  deleteGuest,
  user,
  sendInvite,
  checkAuthState,
}) {
  useInjectReducer({ key: "guestsPage", reducer });
  useInjectReducer({ key: "home", reducer: homeReducer });
  useInjectSaga({ key: "guestsPage", saga });
  const [selectedGuests, setSelectedGuests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  useEffect(() => {
    checkAuthState();
  }, []);
  useEffect(() => {
    if (Object.keys(user).length > 0) getGuests();
  }, [user]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSelectedGuests(searchByName(guests, debouncedSearchTerm));
    } else {
      setSelectedGuests(guests);
    }
  }, [debouncedSearchTerm, guests]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempCheckedGuests = selectedGuests.map((guest) => {
        if (guest.isChecked === undefined) guest.isChecked = false;
        return selectedGuests.includes(guest)
          ? { ...guest, isChecked: checked }
          : { ...guest, isChecked: guest.isChecked };
      });
      // let tempFilteredUsers = filteredUsers.map((user) => {
      //   if (user.isChecked === undefined) user.isChecked = false;
      //   return usersCurrent.includes(user)
      //     ? { ...user, isChecked: checked }
      //     : { ...user, isChecked: user.isChecked };
      // });
      // setFilteredUsers(tempFilteredUsers);
      // setUsers(tempUsers);
      setSelectedGuests(tempCheckedGuests);
    } else {
      let tempCheckedGuests = selectedGuests.map((guest) =>
        guest._id === name ? { ...guest, isChecked: checked } : guest
      );
      setSelectedGuests(tempCheckedGuests);
      // let tempFilteredUsers = filteredUsers.map((user) =>
      //   user.id === name ? { ...user, isChecked: checked } : user
      // );
      // setFilteredUsers(tempFilteredUsers);
      // setUsers(tempUsers);
    }
  };

  return (
    <>
      <GuestsSection
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
        guests={guests}
        getGuests={getGuests}
        deleteGuest={deleteGuest}
        user={user}
        sendInvite={sendInvite}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGuests={selectedGuests}
        setSelectedGuests={setSelectedGuests}
      />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  guests: makeSelectGuests(),
  user: makeSelectUser(),
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

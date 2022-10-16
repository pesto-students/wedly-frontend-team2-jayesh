import React, { useState, memo, useEffect, useRef } from "react";
import useOnClickOutside from "use-onclickoutside";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import { makeSelectEvents } from "../EventsPage/selectors";
import reducer1 from "../EventsPage/reducer";
import homeReducer from "../HomePage/reducer";
import saga from "../EventsPage/saga";
import {
  AiOutlineInfoCircle,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { BsPlusLg, BsThreeDotsVertical } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import UploadModal from "../../components/UploadModal";
import AddEventModal from "../../components/AddEventModal";
import { GET_EVENT, DELETE_EVENT } from "../EventsPage/constants";

const tableHeaders = ["Event Name", "Event Date", "Event Time", "Event Venue"];
function MobileEventsPage({ getEvents, events, deleteEvent }) {
  useInjectReducer({ key: "eventsPage", reducer: reducer1 });
  useInjectReducer({ key: "home", reducer: homeReducer });
  useInjectSaga({ key: "eventsPage", saga });
  useEffect(() => {
    getEvents();
  }, []);
  const ref = useRef();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isUpdateOrDelete, setIsUpdateOrDelete]  = useState([]);

  useEffect(() => {
      setIsUpdateOrDelete(new Array(events.length).fill(false));
  }, [events])

  const [clicked, setClicked] = useState(false);
  useOnClickOutside(ref, () =>
    setIsUpdateOrDelete(new Array(events.length).fill(false))
  );

  const deleteAndUpdateEvent = async (id) => {
    await deleteEvent(id);
  };

  return (
    <div>
      <div
        className={`${
          isAddOpen || isUploadOpen ? "opacity-50" : "opacity-100"
        } w-full bg-gray-100 relative`}
      >
        <div className="mx-auto sm:px-6 lg:px-8 mt-12">
          <div className="flex flex-col">
            <div className="flex flex-wrap flex-grow justify-between mb-2">
              <div className="flex items-center py-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  Event Details
                </h3>
              </div>

              <div className="flex py-2">
                <button
                  type="submit"
                  className="flex items-center text-white bg-[#44A300] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow mr-4"
                  onClick={() => setIsUploadOpen(!isUploadOpen)}
                >
                  <HiDownload size="1.1rem" className="mr-1" />
                  Import
                </button>
                <button
                  type="submit"
                  className="flex items-center text-white bg-[#3498DB] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow"
                  onClick={() => setIsAddOpen(!isAddOpen)}
                >
                  <BsPlusLg size="0.7rem" className="mr-1" />
                  Add an Event
                </button>
              </div>
            </div>
            <div className="p-2 flex flex-wrap gap-2 justify-center mb-[100px]">
              {events.length > 0 &&
                events.map((eventDetails, index) => (
                  <div
                    className="p-1.5 flex flex-col bg-white w-[45%] rounded-md justify-between relative"
                    key={eventDetails._id}
                  >
                    <div>
                      <BsThreeDotsVertical
                        size="1rem"
                        className="float-right text-black cursor-pointer"
                        onClick={() =>
                          setIsUpdateOrDelete((prevState) =>
                            prevState.map((item, idx) =>
                              idx === index ? !item : item
                            )
                          )
                        }
                      />
                      {isUpdateOrDelete[index] && (
                        <div
                          ref={ref}
                          className="flex flex-col p-1.5 space-y-1 absolute right-4 top-3 bg-mainTheme rounded-md z-10"
                        >
                          <h6 className="font-normal text-xs flex items-center">
                            <AiOutlineEdit
                              className="mr-1 text-black"
                              size="1rem"
                            />{" "}
                            Edit
                          </h6>
                          <h6
                            onClick={() => {
                              setClicked(!clicked);
                            }}
                            className="cursor-pointer font-normal text-xs flex items-center"
                          >
                            <AiOutlineDelete
                              className="mr-1 text-red-500"
                              size="1rem"
                            />
                            Delete
                          </h6>
                        </div>
                      )}
                      <h3 className="text-sm font-semibold text-gray-900">
                        {eventDetails.customEvent || eventDetails.category}
                      </h3>
                      <div className="text-xs text-gray-900 mt-1">
                        {eventDetails.date &&
                          eventDetails.date
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("-")}
                      </div>
                      <div className="text-xs text-gray-900">
                        {eventDetails.time}
                      </div>
                      <div className="text-xs text-gray-900 mb-2">
                        {eventDetails.venue}
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <button className="bg-pink rounded-xl text-white py-1 px-2 text-xs xs:w-1/2">
                        Remind
                      </button>
                      <AiOutlineInfoCircle
                        size="1rem"
                        className=" text-black"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {isAddOpen && (
          <AddEventModal
            role="add"
            isOpen={isAddOpen}
            setIsOpen={setIsAddOpen}
          />
        )}
        {isUploadOpen && (
          <UploadModal
            role="event"
            isOpen={isUploadOpen}
            setIsOpen={setIsUploadOpen}
          />
        )}
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  events: makeSelectEvents(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEvents: () => {
      dispatch({ type: GET_EVENT });
    },
    deleteEvent: (id) => {
      dispatch({ type: DELETE_EVENT, id });
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
)(MobileEventsPage);

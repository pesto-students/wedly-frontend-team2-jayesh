import React, { useState, memo, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import { makeSelectEvents } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import {
  AiOutlineInfoCircle,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import UploadModal from "../../components/UploadModal";
import AddEventModal from "../../components/AddEventModal";
import { GET_EVENT, DELETE_EVENT } from "./constants";

const tableHeaders = ["Event Name", "Event Date", "Event Time", "Event Venue"];
function EventsPage({ getEvents, events, deleteEvent }) {
  useInjectReducer({ key: "eventsPage", reducer });
  useInjectSaga({ key: "eventsPage", saga });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <div
        className={`${
          isAddOpen || isUploadOpen ? "opacity-50" : "opacity-100"
        } w-full bg-gray-100 relative`}
      >
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-12">
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
            <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-12">
              <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 tracking-wider">
                      {tableHeaders.map((tableHeader) => (
                        <th className="px-6 py-3 text-left font-medium">
                          {tableHeader}
                        </th>
                      ))}
                      <th className="px-6 py-3 text-left font-medium" />
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {events.map((eventDetails, index) => (
                      <tr className={index % 2 && `bg-[#f7f8ff]`}>
                        <td className="px-6 py-4 whitespace-no-wrap ">
                          <div className="text-sm leading-5 text-gray-900">
                            {eventDetails.customEvent || eventDetails.category}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap ">
                          <div className="text-sm leading-5 text-gray-900">
                            {eventDetails.date
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join("-")}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap ">
                          <div className="text-sm leading-5 text-gray-900">
                            {eventDetails.time}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-no-wrap "
                          width="20%"
                        >
                          <div className="text-sm leading-5 text-gray-900">
                            {eventDetails.venue}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap  text-sm leading-5 text-gray-500 flex items-center justify-around">
                          <div className="flex items-center justify-between">
                            <button className="bg-pink rounded-xl text-white py-1 px-4 mr-1">
                              Remind
                            </button>
                            <AiOutlineInfoCircle
                              size="1rem"
                              className=" text-black"
                            />
                          </div>
                          <AiOutlineEdit
                            size="1.5rem"
                            className=" text-black"
                          />
                          <AiOutlineDelete
                            onClick={() => deleteEvent(eventDetails._id)}
                            size="1.5rem"
                            className=" text-red-500"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAddOpen && (
        <AddEventModal isOpen={isAddOpen} setIsOpen={setIsAddOpen} />
      )}
      {isUploadOpen && (
        <UploadModal isOpen={isUploadOpen} setIsOpen={setIsUploadOpen} />
      )}
    </div>
  );
}

EventsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
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
)(EventsPage);

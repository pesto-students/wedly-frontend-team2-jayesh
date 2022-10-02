/**
 *
 * EventsPage
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectEventsPage from "./selectors";
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

const tableHeaders = ["Event Name", "Event Date", "Event Time", "Event Venue"];
const events = [
  {
    _id: { $oid: "6335c1b2c30ef952bf3b0223" },
    customEvent: "Blah blah",
    date: "25th October, 2022",
    time: "18:00",
    venue: "Raj Maidan, Darbhanga",
    hostId: { $oid: "6331e2d26c86f5a57f12be59" },
    __v: { $numberInt: "0" },
    createdAt: { $date: { $numberLong: "1664467378531" } },
    updatedAt: { $date: { $numberLong: "1664467378531" } },
  },
  {
    _id: { $oid: "6335c1b2c30ef952bf3b0224" },
    customEvent: "Love love",
    date: "26th October, 2022",
    time: "18:00",
    venue: "Raj Maidan, Darbhanga",
    hostId: { $oid: "6331e2d26c86f5a57f12be59" },
    __v: { $numberInt: "0" },
    createdAt: { $date: { $numberLong: "1664467378531" } },
    updatedAt: { $date: { $numberLong: "1664467378531" } },
  },
  {
    _id: { $oid: "6335c8c854cdb0d2f6ee82d6" },
    customEvent: "Tilak",
    date: "27th October, 2022",
    time: "20:00",
    venue: "Raj Maidan, Darbhanga",
    hostId: { $oid: "6331e2d26c86f5a57f12be59" },
    createdAt: { $date: { $numberLong: "1664469192166" } },
    updatedAt: { $date: { $numberLong: "1664470328196" } },
    __v: { $numberInt: "0" },
  },
];
export function EventsPage() {
  useInjectReducer({ key: "eventsPage", reducer });
  useInjectSaga({ key: "eventsPage", saga });

  return (
    <div className="w-full bg-gray-100 relative">
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
              >
                <HiDownload size="1.1rem" className="mr-1" />
                Import
              </button>
              <button
                type="submit"
                className="flex items-center text-white bg-[#3498DB] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow"
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
                          {eventDetails.customEvent}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap ">
                        <div className="text-sm leading-5 text-gray-900">
                          {eventDetails.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap ">
                        <div className="text-sm leading-5 text-gray-900">
                          {eventDetails.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap " width="20%">
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
                        <AiOutlineEdit size="1.5rem" className=" text-black" />
                        <AiOutlineDelete
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
      <UploadModal />
    </div>
  );
}

EventsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  eventsPage: makeSelectEventsPage(),
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
)(EventsPage);

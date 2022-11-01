import React, { useState, useEffect } from "react";
import { AiOutlineInfoCircle } from "@react-icons/all-files/ai/AiOutlineInfoCircle";
import { AiOutlineEdit } from "@react-icons/all-files/ai/AiOutlineEdit";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import { BsPlus } from "@react-icons/all-files/bs/BsPlus";
import { HiDownload } from "@react-icons/all-files/hi/HiDownload";
import UploadModal from "components/UploadModal";
import AddEventModal from "components/AddEventModal";
import ReactTooltip from "react-tooltip";
import LoadingIndicator from "../../components/LoadingIndicator";

const tableHeaders = ["Event Name", "Event Date", "Event Time", "Event Venue"];
export default function EventsSection({
  events,
  deleteEvent,
  guests,
  remindEvent,
  loading,
  user,
}) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState([]);

  useEffect(() => {
    setIsUpdate(new Array(events.length).fill(false));
  }, [events]);
  const sendReminderofEvent = async (eventDetails) => {
    await remindEvent(
      guests,
      user.name ? user.name : user[0].name,
      eventDetails
    );
  };
  return (
    <div
      className={`hidden lg:block ${loading ? "opacity-50" : "opacity-100"}`}
    >
      <div
        className={`${
          isAddOpen || isUploadOpen || isUpdate.filter((item) => item).length
            ? "opacity-50 pointer-events-none"
            : "opacity-100"
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
                  onClick={() => {
                    setIsAddOpen(!isAddOpen);
                    setisLoading(false);
                  }}
                >
                  <BsPlus size="0.7rem" className="mr-1" />
                  Add an Event
                </button>
              </div>
            </div>
            {events.length !== 0 ? (
              <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-12">
                <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 tracking-wider">
                        {tableHeaders.map((tableHeader, index) => (
                          <th
                            className="px-6 py-3 text-left font-medium"
                            key={index}
                          >
                            {tableHeader}
                          </th>
                        ))}
                        <th className="px-6 py-3 text-left font-medium" />
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {events.map((eventDetails, index) => (
                        <tr
                          className={index % 2 && `bg-[#f7f8ff]`}
                          key={eventDetails._id}
                        >
                          <td className="px-6 py-4 whitespace-no-wrap ">
                            <div className="text-sm leading-5 text-gray-900">
                              {eventDetails.customEvent ||
                                eventDetails.category}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap ">
                            <div className="text-sm leading-5 text-gray-900">
                              {eventDetails.date &&
                                eventDetails.date
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
                              <button
                                onClick={() =>
                                  sendReminderofEvent(eventDetails)
                                }
                                className="bg-pink rounded-xl text-white py-1 px-4 mr-1"
                              >
                                Remind
                              </button>
                              <button data-tip data-for="remind">
                                <AiOutlineInfoCircle
                                  size="1rem"
                                  className=" text-black"
                                />
                              </button>
                              <ReactTooltip
                                id="remind"
                                place="top"
                                effect="solid"
                              >
                                Sends event reminder to all the invited guests
                              </ReactTooltip>
                            </div>
                            <AiOutlineEdit
                              onClick={() =>
                                setIsUpdate((prevState) =>
                                  prevState.map((item, idx) =>
                                    idx === index ? !item : item
                                  )
                                )
                              }
                              size="1.5rem"
                              className="cursor-pointer text-black"
                            />
                            <AiOutlineDelete
                              onClick={() => deleteEvent(eventDetails._id)}
                              size="1.5rem"
                              className="cursor-pointer text-red-500"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <LoadingIndicator />
            )}
          </div>
        </div>
      </div>
      {isAddOpen && (
        <AddEventModal role="add" isOpen={isAddOpen} setIsOpen={setIsAddOpen} />
      )}
      {isUploadOpen && (
        <UploadModal
          role="event"
          isOpen={isUploadOpen}
          setIsOpen={setIsUploadOpen}
        />
      )}
      {isUpdate.indexOf(true) >= 0 && (
        <AddEventModal
          role="update"
          index={isUpdate.indexOf(true) >= 0}
          eventDetails={events[isUpdate.indexOf(true)]}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          events={events}
        />
      )}
    </div>
  );
}

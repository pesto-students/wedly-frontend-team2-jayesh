import React, { useState, useEffect, useRef } from "react";
import useOnClickOutside from "use-onclickoutside";
import {
  AiOutlineInfoCircle,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { BsPlusLg, BsThreeDotsVertical } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import UploadModal from "components/UploadModal";
import AddEventModal from "components/AddEventModal";

export default function MobileEventsSection({
  guests,
  events,
  deleteEvent,
  remindEvent,
  loading,
  user,
}) {
  const ref = useRef();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isUpdateOrDelete, setIsUpdateOrDelete] = useState([]);
  const [isUpdate, setIsUpdate] = useState([]);
  useEffect(() => {
    setIsUpdateOrDelete(new Array(events.length).fill(false));
    setIsUpdate(new Array(events.length).fill(false));
  }, [events]);

  useOnClickOutside(ref, () =>
    setIsUpdateOrDelete(new Array(events.length).fill(false))
  );

  const sendReminderofEvent = async (eventName, date, time, venue) => {
    console.log("reminder Called");
    for (let guest of guests) {
      await remindEvent(
        guest.name,
        user.name,
        eventName,
        date,
        time,
        venue,
        guest.mobile
      );
    }
  };

  return (
    <div
      className={`block lg:hidden  ${loading ? "opacity-50" : "opacity-100"}`}
    >
      <div
        className={`${
          isAddOpen || isUploadOpen || isUpdate.filter((item) => item).length
            ? "opacity-50 pointer-events-none"
            : "opacity-100"
        } w-full bg-gray-100 relative`}
      >
        <div className="mx-auto sm:px-6 lg:px-8 mt-12">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2 px-2">
              <p className="text-xl font-semibold text-gray-900">
                Event Details
              </p>

              <button
                type="submit"
                className="flex items-center text-white bg-[#44A300] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-1.5 text-center shadow"
                onClick={() => setIsUploadOpen(!isUploadOpen)}
              >
                <HiDownload size="1rem" />
                Import
              </button>
            </div>
            <div className="p-2 flex flex-wrap gap-2 justify-center mb-[100px]">
              <div
                className="p-1.5 flex flex-col bg-pink w-[45%] rounded-md justify-center items-center text-white font-semibold space-y-2 cursor-pointer"
                onClick={() => setIsAddOpen(!isAddOpen)}
              >
                <BsPlusLg size="1.5rem" />
                <div className="text-center">Add an event </div>
              </div>
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
                          <h6
                            className="font-normal text-xs flex items-center"
                            onClick={() => {
                              setIsUpdate((prevState) =>
                                prevState.map((item, idx) =>
                                  idx === index ? !item : item
                                )
                              );
                            }}
                          >
                            <AiOutlineEdit
                              className="mr-1 text-black"
                              size="1rem"
                            />
                            Edit
                          </h6>
                          <h6
                            className="cursor-pointer font-normal text-xs flex items-center"
                            onClick={() => deleteEvent(eventDetails._id)}
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
                      <button
                        onClick={() =>
                          sendReminderofEvent(
                            eventDetails.category || eventDetails.customEvent,
                            eventDetails.date
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join("-"),
                            eventDetails.time,
                            eventDetails.venue
                          )
                        }
                        className="bg-pink rounded-xl text-white py-1 px-2 text-xs xs:w-1/2"
                      >
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

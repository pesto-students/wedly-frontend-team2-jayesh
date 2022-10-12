import React, { useEffect, useState } from "react";
import { options } from "../../utils/constants";

export default function EinviteOtherPage({ template, pageData }) {
  const [input, setInput] = useState({
    category: "",
    date: "",
    time: "",
    eventVenue: "",
    customEvent: "",
  });

  useEffect(() => {
    setInput({
      category: pageData.event.category ? pageData.event.category : "Other",
      date: pageData.event.date.split("T")[0],
      time: pageData.event.time,
      eventVenue: pageData.event.venue,
      customEvent: pageData.event.customEvent,
    });
  }, [pageData]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="flex h-[800px] mt-10">
      <div
        className={`bg-[url(${
          template.imageUrls.otherPages
        })] bg-center bg-contain h-[600px] pt-5 mb-2.5 w-[500px]`}
      >
        {pageData.event.category || pageData.event.customEvent}
      </div>

      <div className="ml-60 flex flex-col w-96">
        <h3 className="mb-4 text-xl font-semibold text-gray-900">
          Edit Details
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-1 text-gray-900">Event Category</h4>
            <select
              name="category"
              onChange={onInputChange}
              value={input.category}
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-1.5 py-2 md:p-2.5"
            >
              <option>Category</option>
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          {pageData.event.customEvent && (
            <div>
              <h4 className="font-semibold mb-1 text-gray-900">Event Name</h4>
              <input
                type="text"
                name="eventName"
                id="eventName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 py-2 md:p-2.5"
                required
                value={input.customEvent}
                onChange={onInputChange}
              />
            </div>
          )}
          <div>
            <h4 className="font-semibold mb-1 text-gray-900">Event Date</h4>
            <input
              type="date"
              name="date"
              id="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 py-2 md:p-2.5"
              required
              value={input.date}
              onChange={onInputChange}
            />
          </div>
          <div>
            <h4 className="font-semibold mb-1 text-gray-900">Event Time</h4>
            <input
              type="time"
              name="time"
              id="time"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 py-2 md:p-2.5"
              required
              value={input.time}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label
              for="eventVenue"
              className="block mb-1 md:mb-2 text-sm font-medium text-gray-900"
            >
              Event Venue
            </label>
            <input
              type="text"
              name="eventVenue"
              id="eventVenue"
              placeholder="Enter the venue of event"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-1.5 py-2 md:p-2.5"
              required
              value={input.eventVenue}
              onChange={onInputChange}
            />
          </div>
          <div className="flex justify-end mt-2">
            <button className="bg-pink rounded-lg text-white py-3 px-4">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

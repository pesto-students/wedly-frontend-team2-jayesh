import React, { useEffect, useState, memo } from "react";
import { options } from "../../utils/constants";
import { connect } from "react-redux";
import { compose } from "redux";
import { ADD_CONTENT } from "../../containers/EinviteEditPage/constants";
import { useInjectSaga } from "../../utils/injectSaga";
import saga from "../../containers/EinviteEditPage/saga.js";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

function EinviteOtherPage({ template, pageData, addInviteDetails, page, id }) {
  const [input, setInput] = useState({
    category: "",
    date: "",
    time: "",
    eventVenue: "",
    customEvent: "",
  });
  useInjectSaga({ key: "einviteEditPage", saga });
  useEffect(() => {
    if (pageData.event) {
      setInput({
        category: pageData.event.category ? pageData.event.category : "Other",
        date: pageData.event.date.split("T")[0],
        time: pageData.event.time,
        eventVenue: pageData.event.venue,
        customEvent: pageData.event.customEvent,
      });
    } else {
      setInput({
        category: "",
        date: "",
        time: "",
        eventVenue: "",
        customEvent: "",
      });
    }
  }, [pageData]);

  const handleClick = (e) => {
    e.preventDefault();
    let htmlData = document.getElementById("otherPage").outerHTML;
    addInviteDetails(
      id,
      undefined,
      page === 2 ? htmlData : undefined,
      page === 3 ? htmlData : undefined,
      page === 4 ? htmlData : undefined
    );
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="flex flex-col md:flex-row h-[800px] mt-10">
      <div
        id="otherPage"
        className={`bg-[url(${
          template.imageUrls.otherPages
        })] bg-center bg-contain h-[600px] pt-5 mb-2.5 w-[500px]`}
      >
        {pageData.event && (
          <div className="text-center mt-24 text-[#CCCCCC]">
            <p>Join for my</p>
            <h1>{pageData.event.category || pageData.event.customEvent}</h1>
            <p>
              {new Date(input.date).toLocaleDateString("en-US", dateOptions)}
            </p>
            <p>@</p>
            <p>{input.eventVenue}</p>
          </div>
        )}
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
          {pageData.event && pageData.event.customEvent && (
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
            <button
              onClick={(e) => handleClick(e)}
              className="bg-pink rounded-lg text-white py-3 px-4"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    addInviteDetails: (
      templateId,
      page1Content,
      page2Content,
      page3Content,
      page4Content
    ) => {
      dispatch({
        type: ADD_CONTENT,
        templateId,
        page1Content,
        page2Content,
        page3Content,
        page4Content,
      });
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(EinviteOtherPage);

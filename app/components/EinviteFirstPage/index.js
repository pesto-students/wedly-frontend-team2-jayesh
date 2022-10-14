import axios from "axios";
import React, { useEffect, useState, memo } from "react";
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
function EinviteFirstPage({ template, id, addInviteDetails }) {
  const [weddingDate, setWeddingDate] = useState("");
  useInjectSaga({ key: "einviteEditPage", saga });
  useEffect(() => {
    getEvents();
  }, []);
  let page1;
  useEffect(() => {
    page1 = document.getElementById("page1").outerHTML;
  }, [weddingDate]);
  const getEvents = () => {
    axios
      .get(`${process.env.SERVER_URL}/event`, { withCredentials: true })
      .then((res) => {
        const weddingEvent = res.data.events.find(
          (event) => event.category === "Wedding"
        );
        if (weddingEvent) {
          setWeddingDate(weddingEvent.date.split("T")[0]);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClick = (e) => {
    e.preventDefault();
    addInviteDetails(id, page1);
  };

  return (
    <div className="flex h-[800px] mt-10">
      <div
        id="page1"
        className={`bg-[url(${
          template.imageUrls.firstPage
        })] bg-center bg-contain h-[600px] pt-5 mb-2.5 w-[500px]`}
      >
        <h2 className="text-2xl text-center text-[#CCCCCC] mt-2">Anushka</h2>
        <h2 className="text-2xl text-center text-[#CCCCCC]">&</h2>
        <h2 className="text-2xl text-center text-[#CCCCCC] mb-4">Virat</h2>
        <h4 className="text-center text-[#CCCCCC]">
          {weddingDate &&
            new Date(weddingDate).toLocaleDateString("en-US", dateOptions)}
        </h4>
      </div>
      <div className="ml-60 flex flex-col justify-center h-1/2 w-96">
        <h3 className="mb-4 text-xl font-semibold text-gray-900">
          Edit Details
        </h3>
        <h4 className="mb-4 font-semibold text-gray-900">Wedding Date</h4>
        <input
          type="date"
          name="date"
          id="date"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 py-2 md:p-2.5"
          required
          value={weddingDate}
          onChange={(e) => setWeddingDate(e.target.value)}
        />
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
)(EinviteFirstPage);

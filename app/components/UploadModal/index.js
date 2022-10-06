import React, { memo } from "react";
import { AiOutlineCloudUpload, AiOutlineCloseCircle } from "react-icons/ai";
import { connect } from "react-redux";
import { compose } from "redux";
import { ADD_MULTIPLE_EVENTS } from "../../containers/EventsPage/constants";
import { useInjectReducer } from "../../utils/injectReducer";
import { useInjectSaga } from "../../utils/injectSaga";
import reducer from "../../containers/EventsPage/reducer";
import saga from "../../containers/EventsPage/saga";
import { ADD_MULTIPLE_GUESTS } from "../../containers/GuestsPage/constants";

function UploadModal({
  isOpen,
  setIsOpen,
  addMultipleEvents,
  addMultipleGuests,
  role,
}) {
  useInjectReducer({ key: "eventsPage", reducer });
  useInjectSaga({ key: "eventsPage", saga });
  const upload = () => {
    let fileUpload = document.getElementById("upload");
    if (typeof FileReader !== undefined) {
      let reader = new FileReader();
      let arrayOfEvents = [];
      let arrayOfGuests = [];
      reader.onload = async function(e) {
        let rows = await e.target.result.split("\n");
        for (var i = 0; i < rows.length; i++) {
          if (rows[i].length > 0) {
            let cells = await rows[i].split(",");
            console.log(cells);
            const eventBody = {};
            const guestBody = {};
            if (role === "event") {
              if (cells[0] !== "Other") {
                eventBody["category"] = cells[0];
              }
              if (cells[1] !== "") {
                eventBody["customEvent"] = cells[1];
              }
              eventBody["date"] = cells[2];
              eventBody["time"] = cells[3];
              eventBody["venue"] = cells[4];
              arrayOfEvents.push(eventBody);
            } else {
              guestBody["name"] = cells[0];
              guestBody["mobile"] = cells[1];
              guestBody["email"] = cells[2];
              arrayOfGuests.push(guestBody);
            }
          }
        }
        role === "event"
          ? await addMultipleEvents(arrayOfEvents)
          : await addMultipleGuests(arrayOfGuests);
      };
      reader.readAsText(fileUpload.files[0]);
    }
    setIsOpen(!isOpen);
  };
  return (
    <div className="overflow-y-hidden overflow-x-hidden fixed top-1/3 left-1/2 z-50 w-1/4 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col items-center p-2 rounded-lg text-center">
      <AiOutlineCloseCircle
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-0 right-0 m-2"
      />
      <AiOutlineCloudUpload
        size="3rem"
        className="mt-2 rounded-full p-2 bg-mainTheme"
      />
      <input
        id="upload"
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        className=" "
        hidden
      />
      <label
        htmlFor="upload"
        className="cursor-pointer text-xl font-semibold text-wedlyPink"
      >
        Choose file
      </label>
      <button
        onClick={() => {
          upload();
          window.location.reload();
        }}
      >
        Upload
      </button>
      <p className="cursor-pointer text-xs underline font-medium text-[#0E62AA]">
        Download Sample csv
      </p>
      <p className="mt-2">Only .xls and .csv accepted (Max 1MB)</p>
    </div>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    addMultipleEvents: (arrayOfEvents) => {
      dispatch({ type: ADD_MULTIPLE_EVENTS, arrayOfEvents });
    },
    addMultipleGuests: (arrayOfGuests) => {
      dispatch({ type: ADD_MULTIPLE_GUESTS, arrayOfGuests });
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
)(UploadModal);

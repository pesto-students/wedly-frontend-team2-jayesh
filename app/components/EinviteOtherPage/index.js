import React from "react";

export default function EinviteOtherPage({ template }) {
  return (
    
      <div className="flex h-[800px] mt-10">
        <div
          className={`bg-[url(${
            template.imageUrls.otherPages
          })] bg-center bg-contain h-[600px] pt-5 mb-2.5 w-[500px]`}
        />
      
      <div className="ml-60 flex flex-col w-96">
        <h3 className="mb-4 text-xl font-semibold text-gray-900">
          Edit Details
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-1 text-gray-900">Event Category</h4>
            <input
              type="text"
              name="category"
              id="eventCategory"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 py-2 md:p-2.5"
              required
              value=""
              onChange={(e) => console.log(e)}
            />
          </div>
          <div>
            <h4 className="font-semibold mb-1 text-gray-900">Event Name</h4>
            <input
              type="text"
              name="eventName"
              id="eventName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 py-2 md:p-2.5"
              required
              value=""
              onChange={(e) => console.log(e)}
            />
          </div>
          <div>
            <h4 className="font-semibold mb-1 text-gray-900">Event Date</h4>
            <input
              type="date"
              name="eventDate"
              id="eventDate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 py-2 md:p-2.5"
              required
              value=""
              onChange={(e) => console.log(e)}
            />
          </div>
          <div>
            <h4 className="font-semibold mb-1 text-gray-900">Event Time</h4>
            <input
              type="time"
              name="eventTime"
              id="eventTime"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 py-2 md:p-2.5"
              required
              value=""
              onChange={(e) => console.log(e)}
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

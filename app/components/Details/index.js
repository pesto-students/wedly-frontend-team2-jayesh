import React from "react";

const inputStyles =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

export default function Details({ input, setInput, role, classes }) {
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className={`p-4 pt-1 w-full h-full md:h-auto flex items-start flex-col ${classes}`}>
      <h4 className="mb-1 text-lg font-medium text-gray-900">{role} Details</h4>
      <form className="space-y-6 w-full" onSubmit={(e) => console.log(e)}>
        <div>
          <label
            htmlFor="fullName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            className={inputStyles}
            placeholder="Full Name"
            required
            value={input.fullName}
            onChange={onInputChange}
          />
        </div>
        <div>
          <label
            htmlFor="fatherName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Father&apos;s Name
          </label>
          <input
            type="text"
            name="fatherName"
            placeholder="Father's Name"
            className={inputStyles}
            value={input.fatherName}
            onChange={onInputChange}
          />
        </div>
        <div>
          <label
            htmlFor="motherName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Mother&apos;s Name
          </label>
          <input
            type="text"
            name="motherName"
            placeholder="Mother's Name"
            className={inputStyles}
            value={input.motherName}
            onChange={onInputChange}
          />
        </div>
        <div className="flex justify-between">
          <div className="w-2/5">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              City
            </label>
            <input
              type="text"
              name="city"
              className={inputStyles}
              placeholder="City"
              value={input.city}
              onChange={onInputChange}
            />
          </div>
          <div className="w-2/5">
            <label
              htmlFor="state"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              State
            </label>
            <input
              type="text"
              name="state"
              placeholder="State"
              className={inputStyles}
              value={input.state}
              onChange={onInputChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

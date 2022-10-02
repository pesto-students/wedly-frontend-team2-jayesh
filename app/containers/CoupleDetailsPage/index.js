import React, { useState } from "react";

const inputStyles =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

export default function CoupleDetailsPage() {
  const [input, setInput] = useState({
    fullName: "",
    fatherName: "",
    motherName: "",
    city: "",
    state: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  return (
    <div className="p-5">
      <h3 className="pl-4 mb-4 text-xl font-semibold text-gray-900">
        Fill the wedding details to start inviting people to your wedding.
      </h3>
      <div className="flex">
        <div className="p-4 pt-1 w-full h-full md:h-auto flex items-start flex-col mr-24">
          <h4 className="mb-1 text-lg font-medium text-gray-900">
            Groom Details
          </h4>
          <form className="space-y-6 w-full" onSubmit={(e) => console.log(e)}>
            <div>
              <label
                for="fullName"
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
                for="fatherName"
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
                for="motherName"
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
                  for="city"
                  class="block mb-2 text-sm font-medium text-gray-900"
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
                  for="state"
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

        <div className="p-4 pt-1 w-full h-full md:h-auto flex items-start flex-col">
          <h4 className="mb-1 text-lg font-medium text-gray-900">
            Bride Details
          </h4>
          <form className="space-y-6 w-full" onSubmit={(e) => console.log(e)}>
            <div>
              <label
                for="fullName"
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
                for="fatherName"
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
                for="motherName"
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
                  for="city"
                  class="block mb-2 text-sm font-medium text-gray-900"
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
                  for="state"
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
      </div>
      <div className="flex justify-end p-4 pt-12">
        <button
          type="submit"
          className="text-white bg-[#3498DB] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow"
        >
          Next
        </button>
      </div>
    </div>
  );
}

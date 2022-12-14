import React, { useState, useEffect } from "react";
import { formDataSuccessToast } from "../../utils/toast";

function ContactUs() {
  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      formDataSuccessToast();
    }, 1000);
  };
  return (
    <section id="contactUs" className="w-full mt-3 md:mt-0 md:w-1/2">
      <div className="py-8 lg:py-16 px-4">
        <h2 className="mb-4 text-xl font-semibold">Contact Us</h2>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-8">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-inputGrey"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-inputGrey text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="Name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-inputGrey"
            >
              Email
            </label>
            <input
              type="email"
              className="block p-3 w-full text-sm text-inputGrey rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Email"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-inputGrey"
            >
              What do you wanna say?
            </label>
            <textarea
              id="message"
              rows="6"
              className="block p-2.5 w-full text-sm text-inputGrey bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
              placeholder="Share your concern..."
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="py-2 px-5 text-sm font-medium text-center text-pink rounded-lg border border-solid border-pink  hover:bg-pink hover:text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactUs;

import React, { memo, useState } from "react";
import googleLogo from "./googleLogo.svg";


function DetailsPage() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

  const google = () => {
    window.open("http://localhost:7000/api/google", "_self");
  };

  return (
  
      <div class="relative p-4 w-full max-w-md h-full md:h-auto">
        <div class="relative bg-white rounded-2xl">
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900">Login</h3>
            <div className="flex justify-center mb-4">
              <button
                type="submit"
                class="flex items-center text-black border border-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={google}
              >
                <img className="mr-2" src={googleLogo} alt="googleLogo" />
                <span>Login with Google</span>
              </button>
            </div>
            <div className="flex justify-center mb-4">
              <span className="text-gray-500">-OR-</span>
            </div>
            <form
              class="space-y-6"
              onSubmit={(e)=>{console.log(e)}}
            >
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Enter Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="mx-auto text-white bg-pink focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow"
                >
                  Login
                </button>
              </div>
              <div class="text-sm font-medium text-center text-black">
                Don't have an account?{" "}
                <a href="#" className="text-pink hover:underline">
                  Signup
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    
  );
}

export default DetailsPage;

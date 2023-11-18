import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RegisterUser } from "../utils/register";

export const Register = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setname(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const userInput = {
    email,
    name,
    password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await RegisterUser(userInput);
      window.location.href = "/login";
      console.log(response);
    } catch (error) {
      console.error("Error during register:", error);
    }
  };

  return (
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-300">
      <div class="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div class="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800">Register Account</div>
        <div class="relative mt-10 h-px bg-gray-300"></div>
        <div class="mt-10">
          <form onSubmit={handleSubmit}>
            <div class="flex flex-col mb-6">
              <label for="username" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                Username:
              </label>
              <div class="relative">
                <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  {/* Replace with your custom SVG icon */}
                  <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em">
                    <path fill="currentColor" fillRule="evenodd" d="M16 9a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0112.065 14a8.984 8.984 0 017.092 3.458A9 9 0 103 12zm9 9a8.963 8.963 0 01-5.672-2.012A6.992 6.992 0 0112.065 16a6.991 6.991 0 015.689 2.92A8.964 8.964 0 0112 21z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <input
                  onChange={handleUsernameChange}
                  id="username"
                  type="text"
                  name="username"
                  class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Username"
                />
              </div>
            </div>

            <div class="flex flex-col mb-6">
              <label for="email" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                E-Mail Address:
              </label>
              <div class="relative">
                <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>

                <input
                  onChange={handleEmailChange}
                  id="email"
                  type="email"
                  name="email"
                  class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="E-Mail Address"
                />
              </div>
            </div>
            <div class="flex flex-col mb-6">
              <label for="password" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                Password:
              </label>
              <div class="relative">
                <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                </div>

                <input
                  onChange={handlePasswordChange}
                  id="password"
                  type="password"
                  name="password"
                  class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Password"
                />
              </div>
            </div>

            <div class="flex w-full">
              <button type="submit" class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                <span class="mr-2 uppercase">Register</span>
                <span>
                  <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center mt-6">
          <Link to="/login" className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center">
            <span className="ml-2">You have an account?</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

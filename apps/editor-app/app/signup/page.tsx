"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

function Signup() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Animation Section */}
      <div className="w-full md:w-2/3 flex flex-col  justify-center items-center bg-black text-white p-4 md:p-0 h-2/5 md:h-auto">
      <div className="mb-20">
            <img src="logo.png" alt="CollabMinds" className="w-48  md:w-48 lg:w-64" />
        </div>
        <h1 className="text-5xl ml-8 md:text-6xl animate-bounce font-sans">
          <span className="text-red-500 font-extrabold">Welcome </span> to our website
        </h1>
      </div>

      {/* Signup Form */}
      <div className="w-full md:w-1/3 flex flex-col justify-center items-center bg-gray-100 p-4 md:p-0">
        <div className="flex flex-col justify-center items-center w-full px-10">
          
          <div className="p-4 text-4xl text-black ml-5 md:text-5xl font-sans font-extrabold">
            Sign in with your Gmail
          </div>
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center mt-5  px-10 py-2 bg-white border border-gray-300 rounded-2xl shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
          >
            <FcGoogle className="mr-2" size={50} />
            <span className="hidden text-black md:inline">Sign up with Google</span>
            <span className="md:hidden">Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
